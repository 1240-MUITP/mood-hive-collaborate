
import { FC } from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  section: string;
  onClose: () => void;
}

const SectionChatPanel: FC<Props> = ({ section, onClose }) => (
  <aside className="w-full sm:w-[330px] bg-neutral-900 border-l border-border flex flex-col h-full p-4 z-10 shadow-xl text-gray-100">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        <span className="font-semibold">{section} Chat</span>
      </div>
      <button className="opacity-40 hover:opacity-90 px-2 py-1" onClick={onClose}>×</button>
    </div>
    <div className="flex-1 overflow-y-auto flex flex-col gap-4 items-start pt-1">
      {/* Demo chat UI */}
      <div className="bg-background/40 rounded-lg px-2 py-1 max-w-[80%]">
        <span className="text-xs opacity-60">Utkarsh:</span>
        <div>Let's collect ideas here!</div>
      </div>
      <div className="bg-accent text-accent-foreground rounded-lg px-2 py-1 self-end max-w-[80%]">
        <span className="text-xs opacity-60">You:</span>
        <div>Sounds good, let's begin brainstorming.</div>
      </div>
    </div>
    <form className="mt-2 flex rounded border border-border overflow-hidden">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm bg-neutral-950 text-gray-100 border-0 focus:ring-0 outline-none"
        disabled
      />
      <button type="submit" className="py-2 px-4 bg-primary text-white text-sm" disabled>
        Send
      </button>
    </form>
    <span className="text-xs opacity-50 mt-2">[Demo only. Real-time chat coming soon!]</span>
  </aside>
);

export default SectionChatPanel;
