import { NextResponse } from "next/server";
import type { MessageType } from "@/llm/builder";
import type { ConversationsPostResponse } from "./types";

// 会話API用の共通エラーレスポンスを生成する。
export function errorResponse(
  messageType: MessageType,
  model: string,
  error: string,
  status = 500,
) {
  return NextResponse.json<ConversationsPostResponse>(
    { ok: false, messageType, model, error },
    { status },
  );
}
