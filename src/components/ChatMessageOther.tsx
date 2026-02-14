import Image from "next/image";

// 相手側メッセージの吹き出しを描画する。
type ChatMessageOtherProps = {
  messageType: "text" | "image";
  content: string;
  time: string;
};

export function ChatMessageOther({
  messageType,
  content,
  time,
}: ChatMessageOtherProps) {
  return (
    <div className="flex justify-start">
      <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm">
        {/* 画像メッセージは画像を、それ以外はテキストを表示する。 */}
        {messageType === "image" ? (
          <Image
            src={content}
            alt="受信画像"
            width={320}
            height={200}
            unoptimized
            className="max-h-56 w-full rounded-lg object-cover"
          />
        ) : (
          <p>{content}</p>
        )}
        <p className="mt-1 text-right text-[10px] text-zinc-500">{time}</p>
      </div>
    </div>
  );
}
