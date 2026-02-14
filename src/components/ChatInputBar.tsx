 "use client";

import { useState } from "react";

// 送信欄の見た目を提供する入力バー部分。
export function ChatInputBar() {
  const [message, setMessage] = useState("");
  const [isOn, setIsOn] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    const messageType = isOn ? "image" : "text";

    await fetch("/api/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        messageType,
      }),
    });

    setMessage("");
  };

  return (
    <footer className="border-t border-black/5 bg-white px-3 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsOn((prev) => !prev)}
          aria-pressed={isOn}
          className={`h-9 w-14 rounded-full px-3 text-center text-xs font-semibold transition ${
            isOn ? "bg-[#07c160] text-white" : "bg-zinc-100 text-zinc-500"
          }`}
        >
          🎨{isOn ? "ON" : "OFF"}
        </button>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="メッセージを入力"
          className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700 placeholder:text-zinc-400"
        />
        <button
          type="button"
          onClick={handleSend}
          className="rounded-full bg-[#07c160] px-4 py-2 text-sm font-medium text-white"
        >
          送信
        </button>
      </div>
    </footer>
  );
}
