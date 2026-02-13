type ChatMessageOtherProps = {
  text: string;
  time: string;
};

export function ChatMessageOther({ text, time }: ChatMessageOtherProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm">
        <p>{text}</p>
        <p className="mt-1 text-right text-[10px] text-zinc-500">{time}</p>
      </div>
    </div>
  );
}
