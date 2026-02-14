import { buildMessages } from "@/llm/builder";
import { getMessages } from "@/llm/getMessages";
import { createContext } from "./_components/context";
import { createUserRow, handleImageConversation, handleTextConversation } from "./_components/handlers";
import { validateRequest } from "./_components/request";
import { errorResponse } from "./_components/response";

// 会話APIの本体処理を行い、テキスト/画像生成へ分岐する。
export async function POST(request: Request) {
  // リクエストを検証し、失敗時は即時レスポンスを返す。
  const validated = await validateRequest(request);
  if ("response" in validated) {
    return validated.response;
  }

  // 環境依存情報と実行コンテキストを構築する。
  const contextResult = createContext(validated.messageType, validated.model);
  if ("response" in contextResult) {
    return contextResult.response;
  }

  const context = contextResult.context;

  try {
    // 履歴を含めた LLM 入力を作成し、ユーザー行を準備する。
    const history = await getMessages(20);
    const llmMessages = buildMessages(history, validated.message, context.messageType);
    const userRow = createUserRow(validated.message);

    // メッセージ種別に応じてテキスト生成か画像生成を実行する。
    if (context.messageType === "text") {
      return handleTextConversation(context, llmMessages, userRow);
    }

    return handleImageConversation(context, llmMessages, userRow);
  } catch (error) {
    // 予期しない例外は統一エラーレスポンスへ変換する。
    const message = error instanceof Error ? error.message : "unexpected error";
    return errorResponse(context.messageType, context.model, message);
  }
}
