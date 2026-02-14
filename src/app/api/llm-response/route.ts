import { NextResponse } from "next/server";
import { SYSTEM_PROMPT } from "./prompt";

type LlmResponseRequestBody = {
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as LlmResponseRequestBody;
  const message = body.message ?? "";

  console.log(message);

  // ★プロンプトと入力値の結合
  const promptWithMessage = `${SYSTEM_PROMPT}${message}`;
  console.log(promptWithMessage);

  // ★LLM API呼び出し
  const apiKey = process.env.GEMINI_API_KEY;
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptWithMessage }],
          },
        ],
      }),
    }
  );
  const data = await response.json();
  console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "");
  

  return NextResponse.json({ ok: true });
}
