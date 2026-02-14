"use client";

import { ChatMessageMe } from "./ChatMessageMe";
import { ChatMessageOther } from "./ChatMessageOther";
import { useChatMessagesRealtime } from "@/hooks/useChatMessagesRealtime";
import type { ChatMessage } from "@/types/chatMessage";

type ChatMessageListProps = {
  messages: ChatMessage[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  const realtimeMessages = useChatMessagesRealtime({ initialMessages: messages });

  const toTimeLabel = (createdAt: string) => {
    const date = new Date(createdAt);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return new Intl.DateTimeFormat("ja-JP", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  };

  return (
    <section className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
      {realtimeMessages.map((message) =>
        message.sender === "user" ? (
          <ChatMessageMe
            key={message.id}
            content={message.content}
            timeLabel={toTimeLabel(message.created_at)}
          />
        ) : (
          <ChatMessageOther
            key={message.id}
            content={message.content}
            timeLabel={toTimeLabel(message.created_at)}
          />
        ),
      )}
    </section>
  );
}
