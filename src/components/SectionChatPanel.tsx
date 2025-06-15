
import { FC } from "react";
import { MessageCircle, X } from "lucide-react";

interface Props {
  section: string;
  onClose: () => void;
}

const SectionChatPanel: FC<Props> = ({ section, onClose }) => (
  <div className="w-full bg-gray-800 flex flex-col h-full text-gray-200">
    <div className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-blue-400" />
        <span className="font-semibold text-white">{section} Chat</span>
      </div>
      <button 
        className="p-1 rounded hover:bg-gray-700 transition-colors" 
        onClick={onClose}
        title="Close chat"
      >
        <X className="w-4 h-4 text-gray-400" />
      </button>
    </div>
    
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {/* Demo chat messages */}
      <div className="bg-gray-700 rounded-lg px-3 py-2 max-w-[80%] border border-gray-600">
        <span className="text-xs text-blue-400 opacity-70">Utkarsh:</span>
        <div className="text-gray-200 mt-1">Let's collect ideas here!</div>
      </div>
      <div className="bg-blue-600 text-white rounded-lg px-3 py-2 self-end max-w-[80%] ml-auto">
        <span className="text-xs text-blue-200 opacity-70">You:</span>
        <div className="mt-1">Sounds good, let's begin brainstorming.</div>
      </div>
    </div>
    
    <div className="p-4 border-t border-gray-700">
      <form className="flex rounded-lg border border-gray-600 overflow-hidden bg-gray-700">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm bg-transparent text-gray-200 border-0 focus:ring-0 outline-none placeholder-gray-400"
          disabled
        />
        <button 
          type="submit" 
          className="py-2 px-4 bg-blue-600 text-white text-sm hover:bg-blue-700 transition-colors" 
          disabled
        >
          Send
        </button>
      </form>
      <span className="text-xs text-gray-500 mt-2 block">[Demo only. Real-time chat coming soon!]</span>
    </div>
  </div>
);

export default SectionChatPanel;
