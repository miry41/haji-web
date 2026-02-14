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

function toLlmMessage(row: DbMessageRow): ChatMessage | null {
  if (row.message_type !== "text") return null;
  return {
    role: row.sender === "user" ? "user" : "assistant",
    content: row.content,
  };
}

export async function getMessages(limit = 20): Promise<ChatMessage[]> {
  const mockHistory = chatMockMessages
    .map((row) => toLlmMessage(row))
    .filter((row): row is ChatMessage => row !== null)
    .slice(-limit);

  if (!chatTableName) return mockHistory;

  const client = createSupabaseServerClient();
  if (!client) return mockHistory;

  const { data, error } = await client
    .from(chatTableName)
    .select("sender,content,message_type,created_at")
    .order("created_at", { ascending: true })
    .limit(limit);

  if (error || !data) return mockHistory;

  return data
    .map((row) => toLlmMessage(row as DbMessageRow))
    .filter((row): row is ChatMessage => row !== null);
}
