import { chatMockMessages, chatTableName } from "@/data/chatMockData";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

type HistoryMessage = {
  sender: "user" | "other";
  content: string;
  created_at: string;
};

type ChatMessagesJson = {
  messages: HistoryMessage[];
  tableName: string | null;
};

const HISTORY_LIMIT = 20;

// 最新20件を時系列でまとめた JSON 形式データを返す。
export async function getLatest20MessagesJson(): Promise<ChatMessagesJson> {
  const mockLatest20: HistoryMessage[] = chatMockMessages
    .slice(-HISTORY_LIMIT)
    .map(({ sender, content, created_at }) => ({ sender, content, created_at }));

  // テーブル未設定時はモックの20件を返す。
  if (!chatTableName) {
    return {
      messages: mockLatest20,
      tableName: null,
    };
  }

  // サーバー側 Supabase クライアントを初期化する。
  const client = createSupabaseServerClient();
  const tableName = chatTableName;

  // 接続情報不足時はモックへフォールバックする。
  if (!client) {
    return {
      messages: mockLatest20,
      tableName: null,
    };
  }

  // created_at の降順で最新20件を取得し、表示向けに昇順へ並べ替える。
  const { data, error } = await client
    .from(tableName)
    .select("sender,content,created_at")
    .order("created_at", { ascending: false })
    .limit(HISTORY_LIMIT);

  if (error || !data) {
    return {
      messages: mockLatest20,
      tableName: null,
    };
  }

  const messages = [...(data as HistoryMessage[])].reverse();

  return {
    messages,
    tableName,
  };
}

/*
使い方
import { getLatest20MessagesJson } from "@/lib/history";
const history = await getLatest20MessagesJson();
// history.messages が20件
}
*/