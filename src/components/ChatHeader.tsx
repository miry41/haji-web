type ChatHeaderProps = {
  roomName: string;
};

export function ChatHeader({ roomName }: ChatHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-black/5 bg-[#07c160] px-4 py-3 text-white">
      <div>
        <p className="text-sm opacity-90">トーク</p>
        <h1 className="text-base font-semibold">{roomName}</h1>
      </div>
    </header>
  );
}
