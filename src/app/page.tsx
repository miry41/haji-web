import { ChatHeader } from "@/components/ChatHeader";
import { ChatInputBar } from "@/components/ChatInputBar";
import { ChatMessageList } from "@/components/ChatMessageList";
import { chatMockMessages, chatMockMeta } from "@/data/chatMockData";

export default function Home() {
  return (
    <main className="mx-auto flex h-[calc(100vh-3rem)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-black/5 bg-[#edf3f8] shadow-xl">
      <ChatHeader roomName={chatMockMeta.roomName} />
      <ChatMessageList messages={chatMockMessages} />
      <ChatInputBar />
    </main>
  );
}
