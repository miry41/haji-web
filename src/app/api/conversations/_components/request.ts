import type { MessageType } from "@/llm/builder";
import { errorResponse } from "./response";
import { IMAGE_MODEL, TEXT_MODEL } from "./types";

type ValidateRequestResult =
  | {
      message: string;
      messageType: MessageType;
      model: string;
    }
  | {
      response: ReturnType<typeof errorResponse>;
    };

// 会話APIの入力を検証し、実行に必要な値へ正規化する。
export async function validateRequest(request: Request): Promise<ValidateRequestResult> {
  // リクエストJSONから必要項目を取り出す。
  const body = (await request.json()) as {
    message?: string;
    messageType?: MessageType;
  };
  // 文字列を整形し、種別とモデルを確定させる。
  const message = body.message?.trim() ?? "";
  const messageType: MessageType = body.messageType === "image" ? "image" : "text";
  const model = messageType === "image" ? IMAGE_MODEL : TEXT_MODEL;

  // メッセージ未指定なら 400 エラーを返す。
  if (!message) {
    return { response: errorResponse(messageType, model, "message is required", 400) };
  }

  return { message, messageType, model };
}
