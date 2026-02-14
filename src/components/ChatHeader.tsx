type ChatHeaderProps = {
  roomName: string;
};

// チャット相手名を表示するヘッダー部分。
export function ChatHeader({ roomName }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-[#07c160] px-4 py-3 text-white">
      {/* ルーム名と固定タイトルを表示する。 */}
      <div>
        <p className="text-sm opacity-90">トーク</p>
        <h1 className="text-base font-semibold">{roomName}</h1>
      </div>
    </header>
  );
}
