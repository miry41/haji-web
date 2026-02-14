import { NextResponse } from "next/server";

type LlmResponseRequestBody = {
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as LlmResponseRequestBody;
  const message = body.message ?? "";

  console.log(message);

  return NextResponse.json({ ok: true });
}
