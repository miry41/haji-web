import { chatTableName } from "@/data/chatMockData";
import type { MessageType } from "@/llm/builder";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import { errorResponse } from "./response";

type SupabaseClient = NonNullable<ReturnType<typeof createSupabaseServerClient>>;

export type ConversationContext = {
  messageType: MessageType;
  model: string;
  tableName: string;
  supabase: SupabaseClient;
  apiKey: string;
};

type CreateContextResult =
  | {
      context: ConversationContext;
    }
  | {
      response: ReturnType<typeof errorResponse>;
    };

// 会話処理に必要な環境値と依存オブジェクトを束ねる。
export function createContext(messageType: MessageType, model: string): CreateContextResult {
  // 保存先テーブル名の存在を確認する。
  if (!chatTableName) {
    return { response: errorResponse(messageType, model, "SUPABASE_TABLE_NAME is missing") };
  }

  // サーバー側 Supabase クライアントを初期化する。
  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return { response: errorResponse(messageType, model, "Supabase env vars are missing") };
  }

  // Gemini API キーの存在を確認する。
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return { response: errorResponse(messageType, model, "GEMINI_API_KEY is missing") };
  }

  // 正常時は会話コンテキストを返す。
  return {
    context: {
      messageType,
      model,
      tableName: chatTableName,
      supabase,
      apiKey,
    },
  };
}
