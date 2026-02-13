import { ChatMessageMe } from "./ChatMessageMe";
import { ChatMessageOther } from "./ChatMessageOther";

export type ChatMessage = {
  id: number;
  from: "me" | "other";
  text: string;
  time: string;
};

type ChatMessageListProps = {
  messages: ChatMessage[];
};

export function ChatMessageList({ messages }: ChatMessageListProps) {
  return (
    <section className="flex-1 space-y-3 overflow-y-auto px-3 py-4">
      {messages.map((message) =>
        message.from === "me" ? (
          <ChatMessageMe key={message.id} text={message.text} time={message.time} />
        ) : (
          <ChatMessageOther
            key={message.id}
            text={message.text}
            time={message.time}
          />
        ),
      )}
    </section>
  );
}
