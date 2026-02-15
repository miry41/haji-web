import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./prompt";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import {GoogleGenAI} from '@google/genai';

type LlmResponseRequestBody = {
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as LlmResponseRequestBody;
  // TODO4: 入力テキストの抽出
  // const message = xxx; 
  //console.log(`\n【入力したメッセージ】\n${message}`);

  // TODO5: 既存プロンプトとの結合
  // const promptWithMessage = xxx;
  console.log(`\n【既存プロンプト】\n${SYSTEM_PROMPT}`);
  // console.log(`\n【プロンプト】\n${promptWithMessage}`);

  // ★LLM API呼び出し
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: promptWithMessage,
  });
  console.log(response.text);

  const data = await response.text;
  //const llmText = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  console.log(data);

  // ★Supabaseに保存
  const tableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME;
  const client = createSupabaseServerClient();
  if (tableName && client) {
    await client.from(tableName).insert({
      sender: "other",
      message_type: "text",
      content: data,
    });
  }

  return NextResponse.json({ ok: true });
}
