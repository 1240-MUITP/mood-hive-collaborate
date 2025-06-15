import { FC } from "react";
import { BookOpen, Code, FolderOpen, Edit, MessageSquare, Paperclip, Trash2, ExternalLink, X } from "lucide-react";

type CardType = "script" | "image" | "note";

interface CardData {
  id: string;
  type: CardType;
  title: string;
  content?: string;
  imageUrl?: string;
  language?: string;
  fileName?: string;
  link?: string;
  comments?: Comment[];
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}

const typeIcon: Record<CardType, any> = {
  script: Code,
  image: FolderOpen,
  note: BookOpen,
};

const cardBg: Record<CardType, string> = {
  script: "bg-gray-800 border-gray-700",
  image: "bg-gray-800 border-gray-700",
  note: "bg-gray-800 border-gray-700",
};

const headerColor: Record<CardType, string> = {
  script: "text-blue-400",
  image: "text-green-400",
  note: "text-violet-400",
};

const syntaxColor: Record<string, string> = {
  js: "text-yellow-600",
  py: "text-cyan-600",
  ts: "text-blue-600",
  default: "text-gray-700",
};

const prettifyCode = (code?: string) =>
  code?.replace(/</g, "&lt;").replace(/>/g, "&gt;") ?? "";

interface MoodboardCardProps {
  data: CardData;
  onEdit: (card: CardData) => void;
  onComment: (card: CardData) => void;
  onDelete: (cardId: string) => void;
  onDeleteAttachment?: (cardId: string) => void;
}

const MoodboardCard: FC<MoodboardCardProps> = ({ data, onEdit, onComment, onDelete, onDeleteAttachment }) => {
  const Icon = typeIcon[data.type];

  return (
    <div className={`rounded-xl p-4 shadow-lg border ${cardBg[data.type]} hover:shadow-xl transition-all relative`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${headerColor[data.type]}`} />
          <span className={`font-semibold text-lg ${headerColor[data.type]} truncate`}>{data.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(data)}
            className="p-1.5 rounded hover:bg-gray-700 transition-colors"
            title="Edit idea"
          >
            <Edit className="w-4 h-4 text-gray-400" />
          </button>
          <button 
            onClick={() => onComment(data)}
            className="p-1.5 rounded hover:bg-gray-700 transition-colors flex items-center gap-1"
            title="Comments"
          >
            <MessageSquare className="w-4 h-4 text-gray-400" />
            {data.comments && data.comments.length > 0 && (
              <span className="text-xs bg-blue-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {data.comments.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => onDelete(data.id)}
            className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
            title="Delete idea"
          >
            <Trash2 className="w-4 h-4 text-red-400 hover:text-red-300" />
          </button>
        </div>
      </div>
      
      {data.type === "script" && (
        <pre
          className={`rounded-lg bg-gray-900 text-sm text-gray-200 p-3 mt-2 font-mono overflow-x-auto border border-gray-600`}
          dangerouslySetInnerHTML={{ __html: prettifyCode(data.content) }}
        />
      )}
      
      {data.type === "image" && data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full rounded-lg mt-2 shadow-sm object-cover max-h-44 mx-auto border border-gray-600"
        />
      )}
      
      {data.type === "note" && (
        <div 
          className="text-base mt-1 text-gray-300 break-words overflow-hidden"
          style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 4,
            WebkitBoxOrient: 'vertical',
            maxHeight: '6rem'
          }}
        >
          {data.content}
        </div>
      )}
      
      {data.link && (
        <div className="mt-3 flex items-center gap-2 text-sm text-blue-400 bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
          <ExternalLink className="w-4 h-4 flex-shrink-0" />
          <a 
            href={data.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:underline truncate"
            title={data.link}
          >
            {data.link}
          </a>
        </div>
      )}
      
      {data.fileName && (
        <div className="mt-3 flex items-center justify-between gap-2 text-sm text-gray-400 bg-gray-700/50 rounded-lg p-3 border border-gray-600">
          <div className="flex items-center gap-2 min-w-0">
            <Paperclip className="w-4 h-4 flex-shrink-0" />
            <span className="truncate" title={data.fileName}>{data.fileName}</span>
          </div>
          {onDeleteAttachment && (
            <button
              onClick={() => onDeleteAttachment(data.id)}
              className="p-1 rounded hover:bg-red-500/20 transition-colors flex-shrink-0"
              title="Remove attachment"
            >
              <X className="w-3 h-3 text-red-400 hover:text-red-300" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MoodboardCard;
export type { CardData, CardType, Comment };
