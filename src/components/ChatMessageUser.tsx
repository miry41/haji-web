import Image from "next/image";

// 自分側メッセージの吹き出しを描画する。
type ChatMessageMeProps = {
  messageType: "text" | "image";
  content: string;
  time: string;
};

export function ChatMessageUser({ messageType, content, time }: ChatMessageMeProps) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[78%] rounded-2xl rounded-br-md bg-[#95ec69] px-3 py-2 text-sm text-zinc-900 shadow-sm">
        {/* 画像メッセージは画像を、それ以外はテキストを表示する。 */}
        {messageType === "image" ? (
          <Image
            src={content}
            alt="送信画像"
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
