// ==============================================
// !!! 触らないでください !!!
// ==============================================
import { chatMockMessages, chatTableName } from "@/data/chatMockData";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import type { ChatMessage } from "./builder";

type DbMessageRow = {
  sender: "user" | "other";
  content: string;
  message_type: "text" | "image";
};

// DB行を LLM 用のテキストメッセージ形式へ変換する。
function toLlmMessage(row: DbMessageRow): ChatMessage | null {
  // 画像行は会話履歴のテキスト文脈に含めない。
  if (row.message_type !== "text") return null;
  return {
    role: row.sender === "user" ? "user" : "assistant",
    content: row.content,
  };
}

// テーブル優先で履歴を取得し、失敗時はモック履歴にフォールバックする。
export async function getMessages(limit = 20): Promise<ChatMessage[]> {
  // まずモック履歴を整形してフォールバック候補を作る。
  const mockHistory = chatMockMessages
    .map((row) => toLlmMessage(row))
    .filter((row): row is ChatMessage => row !== null)
    .slice(-limit);

  // テーブル名未設定時はモック履歴を返す。
  if (!chatTableName) return mockHistory;

  // サーバー側 Supabase クライアントを初期化する。
  const client = createSupabaseServerClient();
  if (!client) return mockHistory;

  // 最新履歴を時系列で limit 件取得する。
  const { data, error } = await client
    .from(chatTableName)
    .select("sender,content,message_type,created_at")
    .order("created_at", { ascending: true })
    .limit(limit);

  // 取得失敗時はモック履歴で処理継続する。
  if (error || !data) return mockHistory;

  // 取得行を LLM 形式へ変換して返す。
  return data
    .map((row) => toLlmMessage(row as DbMessageRow))
    .filter((row): row is ChatMessage => row !== null);
}
