"use client";
// ==============================================
// !!! 触らないでください !!!
// ==============================================

import { useEffect, useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";
import type { ChatMessage } from "@/types/chatMessage";

// 初回取得とRealtime購読をまとめて管理するカスタムフック。
type UseChatMessagesRealtimeArgs = {
  initialMessages: ChatMessage[];
};

export function useChatMessagesRealtime({
  initialMessages,
}: UseChatMessagesRealtimeArgs) {
  // 画面表示に使うメッセージ状態を保持する。
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [tableName, setTableName] = useState<string | null>(null);

  useEffect(() => {
    // 親から渡された初期データが変わったら同期する。
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    let active = true;

    const fetchInitialMessages = async () => {
      // API から初期履歴と購読対象テーブル名を取得する。
      const response = await fetch("/api/chat-messages", { cache: "no-store" });
      if (!response.ok || !active) {
        return;
      }

      const payload = (await response.json()) as {
        messages?: ChatMessage[];
        tableName?: string | null;
      };

      if (!active) {
        return;
      }

      // API レスポンスで初期表示データを更新する。
      if (payload.messages) {
        setMessages(payload.messages);
      }
      setTableName(payload.tableName ?? null);
    };

    void fetchInitialMessages();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    // テーブル名がない場合は購読処理を行わない。
    if (!tableName) {
      return;
    }

    // ブラウザ側 Supabase クライアントを初期化する。
    const supabase = createSupabaseBrowserClient();

    // INSERT/DELETE を購読して UI を即時反映する。
    const channel = supabase
      .channel(`chat-realtime-${tableName}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: tableName },
        (payload: { new: ChatMessage }) => {
          const inserted = payload.new;
          // 重複追加を防ぎつつ時系列順を維持して追加する。
          setMessages((prev) => {
            if (prev.some((message) => message.id === inserted.id)) {
              return prev;
            }

            return [...prev, inserted].sort(
              (a, b) =>
                new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
            );
          });
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: tableName },
        (payload: { old: { id?: string } }) => {
          const deletedId = payload.old.id;
          if (!deletedId) {
            return;
          }
          // 削除イベントの対象IDを一覧から除外する。
          setMessages((prev) => prev.filter((message) => message.id !== deletedId));
        },
      )
      .subscribe();

    return () => {
      // アンマウント時に購読を解除してリークを防ぐ。
      void supabase.removeChannel(channel);
    };
  }, [tableName]);

  // 最新状態のメッセージ配列を呼び出し元へ返す。
  return messages;
}
