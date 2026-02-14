type ChatMessageOtherProps = {
  content: string;
  timeLabel: string;
};

export function ChatMessageOther({
  content,
  timeLabel,
}: ChatMessageOtherProps) {
  return (
    // ★returnの中身
    <div className="flex justify-start">
      <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm">
          <p>{content}</p>
        <p className="mt-1 text-right text-[10px] text-zinc-500">{timeLabel}</p>
      </div>
    </div>
  );
}
