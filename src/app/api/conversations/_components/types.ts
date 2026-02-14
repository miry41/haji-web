import type { MessageType } from "@/llm/builder";

// 会話API POST のレスポンス型を表す。
export type ConversationsPostResponse = {
  ok: boolean;
  messageType: MessageType;
  model: string;
  answerContent?: string;
  error?: string;
};

// Gemini content.parts の1要素を表す。
export type GeminiPart = {
  text?: string;
  inlineData?: {
    mimeType?: string;
    data?: string;
  };
};

// Gemini API 応答の利用部分だけを抜き出した型。
export type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: GeminiPart[];
    };
  }>;
};

// テキスト会話で使う Gemini モデル名。
export const TEXT_MODEL = "gemini-2.0-flash";
// 画像生成で使う Gemini モデル名。
export const IMAGE_MODEL = "gemini-3-pro-image-preview";
