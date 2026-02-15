type ChatMessageMeProps = {
  content: string;
  timeLabel: string;
};

export function ChatMessageMe({
  content,
  timeLabel,
}: ChatMessageMeProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#95ec69] px-3 py-2 text-sm text-zinc-900 shadow-sm">
          <p>{content}</p>
        <p className="mt-1 text-right text-[10px] text-zinc-500">{timeLabel}</p>
      </div>
    </div>
  );
}
