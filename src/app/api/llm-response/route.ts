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

  // TODO6: Gemini APIを叩くコードを書く
  // console.log(`\n【Gemini生成テキスト】\n${data}`);

  // TODO7: supabaseに保存するためのSQLを書く（バック）
    /*
  const tableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME;
  const client = createSupabaseServerClient();
  if (tableName && client) {
    await client.from(tableName).insert({
      // ここにSQLを書く
    });
    */
   
  return NextResponse.json({ ok: true });
}
