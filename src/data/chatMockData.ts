import type { ChatMessage } from "@/components/ChatMessageList";

// モック表示時のメタ情報とサンプルメッセージを保持する。
export const chatMockMeta = {
  roomName: "田中さん",
};

// テーブル名は環境変数から取得し、未設定時は空文字にする。
export const chatTableName = process.env.SUPABASE_TABLE_NAME ?? "";

export const chatMockMessages: ChatMessage[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    sender: "other",
    message_type: "text",
    content: "おつかれ！今日のミーティング15時からで大丈夫？",
    created_at: "2026-02-14T14:10:00+09:00",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    sender: "user",
    message_type: "text",
    content: "大丈夫です。5分前に入ります！",
    created_at: "2026-02-14T14:12:00+09:00",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    sender: "other",
    message_type: "image",
    content: "https://picsum.photos/320/200",
    created_at: "2026-02-14T14:13:00+09:00",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    sender: "user",
    message_type: "text",
    content: "確認しておきます 🙌",
    created_at: "2026-02-14T14:14:00+09:00",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440005",
    sender: "other",
    message_type: "text",
    content: "よろしくお願いします！",
    created_at: "2026-02-14T14:15:00+09:00",
  },
];
