export type ChatSender = "user" | "other";

export type ChatMessageType = "text" | "image";

export type ChatMessage = {
  id: string;
  sender: ChatSender;
  message_type: ChatMessageType;
  content: string;
  created_at: string;
};
