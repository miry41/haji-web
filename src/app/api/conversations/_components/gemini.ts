import type { LlmMessage } from "@/llm/builder";
import type { GeminiResponse } from "./types";

// LLMメッセージ配列を Gemini API の payload 形式に変換する。
export function buildGeminiRequest(messages: LlmMessage[], responseModalities?: string[]) {
  // 先頭の system メッセージを systemInstruction に分離する。
  const [system, ...conversation] = messages;

  return {
    systemInstruction:
      system?.role === "system"
        ? { parts: [{ text: system.content }] }
        : undefined,
    contents: conversation.map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content }],
    })),
    // 画像生成時など必要な場合だけモダリティ指定を付与する。
    generationConfig: responseModalities ? { responseModalities } : undefined,
  };
}

// Gemini API へリクエストし、成功時は JSON 応答を返す。
export async function callGemini(model: string, payload: unknown, apiKey: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  // HTTP 異常時は本文付きで例外化する。
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  return (await response.json()) as GeminiResponse;
}

// Gemini 応答から最初のテキストパートを取り出す。
export function readTextFromGemini(data: GeminiResponse) {
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  return parts.find((part) => typeof part.text === "string")?.text?.trim() ?? "";
}

// Gemini 応答から最初の画像パート(base64)を取り出す。
export function readImageFromGemini(data: GeminiResponse) {
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find(
    (part) => typeof part.inlineData?.data === "string" && part.inlineData.data.length > 0,
  );
  return {
    base64: imagePart?.inlineData?.data ?? "",
    mimeType: imagePart?.inlineData?.mimeType ?? "image/png",
  };
}
