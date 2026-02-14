import type { ChatMessage } from "@/types/chatMessage";

export const chatMockMeta = {
  roomName: "田中さん",
};

export const chatTableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME ?? null;

export const chatMockMessages: ChatMessage[] = [
  {
    id: "7702435a-b852-4556-a2e4-e379a13ea45f",
    sender: "other",
    message_type: "text",
    content: "おつかれ！今日のミーティング15時からで大丈夫？",
    created_at: "2026-02-15T14:10:00+09:00",
  },
  {
    id: "5160e9f1-6d5f-456d-ad00-3508f4477fd1",
    sender: "user",
    message_type: "text",
    content: "大丈夫です。5分前に入ります！",
    created_at: "2026-02-15T14:12:00+09:00",
  },
  {
    id: "0804dd9c-c50c-4b15-9efb-eb06bf12f29f",
    sender: "other",
    message_type: "text",
    content: "ありがとう！資料は先に共有しておくね。",
    created_at: "2026-02-15T14:13:00+09:00",
  },
  {
    id: "720d7f36-33e3-4338-889d-77270d4cb4f5",
    sender: "user",
    message_type: "text",
    content: "助かります！よろしくお願いします！",
    created_at: "2026-02-15T14:14:00+09:00",
  },
  {
    id: "94637e7f-e7b8-4248-a376-ad6f6e1ea00d",
    sender: "other",
    message_type: "text",
    content: "よろしくお願いします！",
    created_at: "2026-02-15T14:15:00+09:00",
  },
];
