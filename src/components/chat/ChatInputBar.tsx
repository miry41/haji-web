export function ChatInputBar() {
  return (
    <footer className="border-t border-black/5 bg-white px-3 py-2">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="h-9 w-9 rounded-full bg-zinc-100 text-lg text-zinc-500"
        >
          ＋
        </button>
        <div className="flex-1 rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-400">
          メッセージを入力
        </div>
        <button
          type="button"
          className="rounded-full bg-[#07c160] px-4 py-2 text-sm font-medium text-white"
        >
          送信
        </button>
      </div>
    </footer>
  );
}
