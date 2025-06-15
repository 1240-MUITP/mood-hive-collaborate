
import { FC } from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  section: string;
  onClose: () => void;
}

const SectionChatPanel: FC<Props> = ({ section, onClose }) => (
  <aside className="w-full sm:w-[330px] bg-neutral-950 border-l border-blue-900 flex flex-col h-full p-4 z-10 shadow-xl text-neutral-100">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-blue-400" />
        <span className="font-semibold text-blue-200">{section} Chat</span>
      </div>
      <button className="opacity-40 hover:opacity-90 px-2 py-1 text-2xl text-neutral-300" onClick={onClose}>×</button>
    </div>
    <div className="flex-1 overflow-y-auto flex flex-col gap-4 items-start pt-1">
      {/* Demo chat UI */}
      <div className="bg-blue-900/60 rounded-lg px-2 py-1 max-w-[80%] border border-blue-700 shadow">
        <span className="text-xs opacity-70 text-blue-100">Utkarsh:</span>
        <div className="text-blue-50">Let's collect ideas here!</div>
      </div>
      <div className="bg-blue-900 text-blue-200 rounded-lg px-2 py-1 self-end max-w-[80%] border border-blue-700 shadow">
        <span className="text-xs opacity-70 text-blue-200">You:</span>
        <div>Sounds good, let's begin brainstorming.</div>
      </div>
    </div>
    <form className="mt-2 flex rounded border border-blue-900 overflow-hidden bg-neutral-900">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm bg-neutral-900 text-neutral-100 border-0 focus:ring-0 outline-none"
        disabled
      />
      <button type="submit" className="py-2 px-4 bg-blue-800 text-blue-100 text-sm" disabled>
        Send
      </button>
    </form>
    <span className="text-xs opacity-50 mt-2 text-blue-300">[Demo only. Real-time chat coming soon!]</span>
  </aside>
);

export default SectionChatPanel;
