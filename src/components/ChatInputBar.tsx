 "use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabaseBrowser";

export function ChatInputBar() {
  const [message, setMessage] = useState("");

  const onSend = async () => {
    // ★onsendの中身を書かせるか
    if (!message.trim()) return;
    const currentMessage = message;
   
    /*
    const res = await fetch("api/helth", {
      method: "GET",
    });
    console.log(res.ok);
    */

    // ★onsendの中身を書かせるか
    const tableName = process.env.NEXT_PUBLIC_SUPABASE_TABLE_NAME;
    if (!tableName) return;
    const client = createSupabaseBrowserClient();
    const { error } = await client.from(tableName).insert({
      sender: "user",
      message_type: "text",
      content: currentMessage,
    });
    if (!error) setMessage("");

    //★ ここでLLMにリクエストを送るコードを書かせる
    await fetch("/api/llm-response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: currentMessage }),
    });
  };

  return (
    <footer className="border-t border-black/5 bg-white px-3 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-zinc-100 text-lg text-zinc-500"
        >
          ＋
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="メッセージを入力"
          className="flex-1 rounded-full text-black border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm"
        />
        <button
          type="button"
          onClick={onSend}
          className="rounded-full bg-[#07c160] px-4 py-2 text-sm font-medium text-white"
        >
          送信
        </button>
      </div>
    </footer>
  );
}
