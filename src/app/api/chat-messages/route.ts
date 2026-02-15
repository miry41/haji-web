// ==============================================
// !!! 触らないでください !!!
// ==============================================
import { NextResponse } from "next/server";
import type { ChatMessage } from "@/types/chatMessage";
import { chatMockMessages, chatTableName } from "@/data/chatMockData";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

type ChatMessagesResponse = {
  messages: ChatMessage[];
  tableName: string | null;
};

// チャット履歴の初期表示データを返す API。
export async function GET() {
  // テーブル未設定時はモックデータを返す。
  if (!chatTableName) {
    return NextResponse.json<ChatMessagesResponse>({
      messages: chatMockMessages,
      tableName: null,
    });
  }

  // サーバー側 Supabase クライアントを初期化する。
  const client = createSupabaseServerClient();
  const tableName = chatTableName;

  // 接続情報不足時はモックへフォールバックする。
  if (!client) {
    console.error("Supabase env vars are missing. Falling back to mock messages.");
    return NextResponse.json<ChatMessagesResponse>({
      messages: chatMockMessages,
      tableName: null,
    });
  }

  // 指定テーブルからメッセージ履歴を時系列で取得する。
  const { data, error } = await client
    .from(tableName)
    .select("id,sender,message_type,content,created_at")
    .order("created_at", { ascending: true });

  // 取得失敗時はモックへフォールバックして画面表示を継続する。
  if (error) {
    console.error(`Failed to fetch messages from ${tableName}:`, error.message);
    return NextResponse.json<ChatMessagesResponse>({
      messages: chatMockMessages,
      tableName: null,
    });
  }

  // 取得結果があればそれを返し、空ならモックを返す。
  return NextResponse.json<ChatMessagesResponse>({
    messages: data ?? chatMockMessages,
    tableName,
  });
}
