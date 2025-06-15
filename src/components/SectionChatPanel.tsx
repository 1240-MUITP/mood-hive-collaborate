
import { FC } from "react";
import { MessageCircle } from "lucide-react";

interface Props {
  section: string;
  onClose: () => void;
}

const SectionChatPanel: FC<Props> = ({ section, onClose }) => (
  <aside className="w-full sm:w-[330px] bg-white border-l border-gray-200 flex flex-col h-full p-4 z-10 shadow-lg text-gray-900">
    <div className="flex items-center justify-between mb-2">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-blue-700">{section} Chat</span>
      </div>
      <button className="opacity-60 hover:opacity-90 px-2 py-1 text-2xl text-gray-600" onClick={onClose}>×</button>
    </div>
    <div className="flex-1 overflow-y-auto flex flex-col gap-4 items-start pt-1">
      {/* Demo chat UI */}
      <div className="bg-blue-50 rounded-lg px-3 py-2 max-w-[80%] border border-blue-200 shadow-sm">
        <span className="text-xs opacity-70 text-blue-600">Utkarsh:</span>
        <div className="text-blue-800">Let's collect ideas here!</div>
      </div>
      <div className="bg-blue-100 text-blue-800 rounded-lg px-3 py-2 self-end max-w-[80%] border border-blue-300 shadow-sm">
        <span className="text-xs opacity-70 text-blue-700">You:</span>
        <div>Sounds good, let's begin brainstorming.</div>
      </div>
    </div>
    <form className="mt-2 flex rounded border border-gray-300 overflow-hidden bg-white">
      <input
        type="text"
        placeholder="Type a message..."
        className="flex-1 px-3 py-2 text-sm bg-white text-gray-900 border-0 focus:ring-0 outline-none"
        disabled
      />
      <button type="submit" className="py-2 px-4 bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" disabled>
        Send
      </button>
    </form>
    <span className="text-xs opacity-50 mt-2 text-blue-600">[Demo only. Real-time chat coming soon!]</span>
  </aside>
);

export default SectionChatPanel;
