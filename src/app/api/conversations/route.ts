import { NextResponse } from "next/server";

type ConversationsPostResponse = {
  ok: boolean;
};

export async function POST(request: Request) {
  const body = (await request.json());
  
  console.log("こんにちは");
  console.log(body);
  
  return NextResponse.json<ConversationsPostResponse>({ ok: true });
}
