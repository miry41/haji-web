import type { ChatMessage } from "@/components/chat/ChatMessageList";

export const chatMockMeta = {
  roomName: "田中さん",
};

export const chatMockMessages: ChatMessage[] = [
  {
    id: 1,
    from: "other",
    text: "おつかれ！今日のミーティング15時からで大丈夫？",
    time: "14:10",
  },
  {
    id: 2,
    from: "me",
    text: "大丈夫です。5分前に入ります！",
    time: "14:12",
  },
  {
    id: 3,
    from: "other",
    text: "ありがとう！資料は先に共有しておくね。",
    time: "14:13",
  },
  {
    id: 4,
    from: "me",
    text: "確認しておきます 🙌",
    time: "14:14",
  },
  {
    id: 5,
    from: "other",
    text: "よろしくお願いします！",
    time: "14:15",
  },
];
