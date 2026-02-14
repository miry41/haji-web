"use client";

import { ChatMessageUser } from "./ChatMessageUser";
import { ChatMessageOther } from "./ChatMessageOther";
import { useChatMessagesRealtime } from "@/hooks/useChatMessagesRealtime";

// メッセージ配列を左右の吹き出しUIに振り分けて表示する。
export type ChatMessage = {
  id: string;
  sender: "user" | "other";
  message_type: "text" | "image";
  content: string;
  created_at: string;
};

type ChatMessageListProps = {
  messages: ChatMessage[];
};

function formatMessageTime(createdAt: string) {
  // DBの日時文字列をチャット表示用の時刻形式へ変換する。
  return new Date(createdAt).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// メッセージ一覧を受け取り、送信者に応じた吹き出しを描画する。
export function ChatMessageList({ messages }: ChatMessageListProps) {
  // Realtime反映済みメッセージをフックから取得する。
  const realtimeMessages = useChatMessagesRealtime({ initialMessages: messages });

  return (
    <section className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
      {/* sender 種別で自分/相手の吹き出しコンポーネントを切り替える。 */}
      {realtimeMessages.map((message) =>
        message.sender === "user" ? (
          <ChatMessageUser
            key={message.id}
            messageType={message.message_type}
            content={message.content}
            time={formatMessageTime(message.created_at)}
          />
        ) : (
          <ChatMessageOther
            key={message.id}
            messageType={message.message_type}
            content={message.content}
            time={formatMessageTime(message.created_at)}
          />
        ),
      )}
    </section>
  );
}
