type ChatMessageMeProps = {
  text: string;
  time: string;
};

export function ChatMessageMe({ text, time }: ChatMessageMeProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#95ec69] px-3 py-2 text-sm text-zinc-900 shadow-sm">
        <p>{text}</p>
        <p className="mt-1 text-right text-[10px] text-zinc-500">{time}</p>
      </div>
    </div>
  );
}
