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

export function buildMessages(
  history: ChatMessage[],
  userInput: string,
  messageType: MessageType = "text"
): LlmMessage[] {
  const systemPrompt =
    messageType === "image" ? SYSTEM_PROMPT_FOR_IMAGE : SYSTEM_PROMPT;

  return [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: userInput },
  ];
}
