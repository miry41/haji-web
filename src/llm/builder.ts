// ==============================================
// !!! 触らないでください !!!
// ==============================================

import { SYSTEM_PROMPT } from "./promptForText";
import { SYSTEM_PROMPT_FOR_IMAGE } from "./promptForImage";

export type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export type LlmMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type MessageType = "text" | "image";

// 履歴・入力・種別から LLM 送信用メッセージ配列を組み立てる。
export function buildMessages(
  history: ChatMessage[],
  userInput: string,
  messageType: MessageType = "text"
): LlmMessage[] {
  // メッセージ種別に応じてシステムプロンプトを切り替える。
  const systemPrompt =
    messageType === "image" ? SYSTEM_PROMPT_FOR_IMAGE : SYSTEM_PROMPT;

  // system -> 過去履歴 -> 最新ユーザー入力の順に並べる。
  return [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userInput },
  ];
}
