import { NextResponse } from "next/server";
import type { LlmMessage } from "@/llm/builder";
import { buildGeminiRequest, callGemini, readImageFromGemini, readTextFromGemini } from "./gemini";
import type { ConversationContext } from "./context";
import type { ConversationsPostResponse } from "./types";

// ユーザー送信メッセージを DB 保存用レコードへ変換する。
export function createUserRow(message: string) {
  return {
    sender: "user" as const,
    message_type: "text" as const,
    content: message,
    created_at: new Date().toISOString(),
  };
}

// テキスト会話を生成して DB 保存し、レスポンスを返す。
export async function handleTextConversation(
  context: ConversationContext,
  llmMessages: LlmMessage[],
  userRow: ReturnType<typeof createUserRow>,
) {
  // Gemini に会話生成を依頼する。
  const geminiResponse = await callGemini(
    context.model,
    buildGeminiRequest(llmMessages),
    context.apiKey,
  );
  // 応答テキストを抽出し、空なら定型文を使う。
  const answerText = readTextFromGemini(geminiResponse) || "すみません、うまく生成できませんでした。";

  // ユーザー文と生成文を同時に保存する。
  const { error } = await context.supabase.from(context.tableName).insert([
    userRow,
    {
      sender: "other" as const,
      message_type: "text" as const,
      content: answerText,
      created_at: new Date().toISOString(),
    },
  ]);
  if (error) {
    throw new Error(error.message);
  }

  // 正常系レスポンスを返す。
  return NextResponse.json<ConversationsPostResponse>({
    ok: true,
    messageType: context.messageType,
    model: context.model,
    answerContent: answerText,
  });
}

// 画像会話を生成して Storage/DB 保存し、公開URLを返す。
export async function handleImageConversation(
  context: ConversationContext,
  llmMessages: LlmMessage[],
  userRow: ReturnType<typeof createUserRow>,
) {
  // テキストと画像の両モダリティで Gemini を実行する。
  const geminiResponse = await callGemini(
    context.model,
    buildGeminiRequest(llmMessages, ["TEXT", "IMAGE"]),
    context.apiKey,
  );
  // 応答から画像データを抽出する。
  const imageResult = readImageFromGemini(geminiResponse);
  if (!imageResult.base64) {
    throw new Error("image generation failed");
  }

  // 画像データをアップロード可能な形式へ変換する。
  const buffer = Buffer.from(imageResult.base64, "base64");
  const fileExt = imageResult.mimeType.includes("jpeg") ? "jpg" : "png";
  const filePath = `${context.tableName}/${new Date().toISOString().replaceAll(":", "-")}-${crypto.randomUUID()}.${fileExt}`;

  // Storage へ画像を保存する。
  const { error: uploadError } = await context.supabase.storage
    .from("images")
    .upload(filePath, buffer, { contentType: imageResult.mimeType, upsert: false });
  if (uploadError) {
    throw new Error(uploadError.message);
  }

  // 保存した画像の公開URLを取得する。
  const { data: publicUrlData } = context.supabase.storage.from("images").getPublicUrl(filePath);
  const imageUrl = publicUrlData.publicUrl;

  // ユーザー文と生成画像URLを DB に保存する。
  const { error: dbError } = await context.supabase.from(context.tableName).insert([
    userRow,
    {
      sender: "other" as const,
      message_type: "image" as const,
      content: imageUrl,
      created_at: new Date().toISOString(),
    },
  ]);
  if (dbError) {
    throw new Error(dbError.message);
  }

  // 正常系レスポンスを返す。
  return NextResponse.json<ConversationsPostResponse>({
    ok: true,
    messageType: context.messageType,
    model: context.model,
    answerContent: imageUrl,
  });
}
