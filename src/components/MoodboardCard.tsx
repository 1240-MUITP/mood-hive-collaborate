
import { FC } from "react";
import { BookOpen, Code, FolderOpen, Edit, MessageSquare, Paperclip, Trash2, ExternalLink } from "lucide-react";

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
  script: "bg-blue-50 border-blue-200",
  image: "bg-green-50 border-green-200",
  note: "bg-violet-50 border-violet-200",
};

const headerColor: Record<CardType, string> = {
  script: "text-blue-700",
  image: "text-green-700",
  note: "text-violet-700",
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
}

const MoodboardCard: FC<MoodboardCardProps> = ({ data, onEdit, onComment, onDelete }) => {
  const Icon = typeIcon[data.type];

  return (
    <div className={`rounded-xl p-4 shadow-sm border-2 ${cardBg[data.type]} hover:shadow-md transition-shadow relative`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${headerColor[data.type]}`} />
          <span className={`font-semibold text-lg ${headerColor[data.type]}`}>{data.title}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            onClick={() => onEdit(data)}
            className="p-1 rounded hover:bg-white/60 transition-colors"
            title="Edit idea"
          >
            <Edit className="w-4 h-4 text-gray-600" />
          </button>
          <button 
            onClick={() => onComment(data)}
            className="p-1 rounded hover:bg-white/60 transition-colors flex items-center gap-1"
            title="Comments"
          >
            <MessageSquare className="w-4 h-4 text-gray-600" />
            {data.comments && data.comments.length > 0 && (
              <span className="text-xs bg-blue-500 text-white rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
                {data.comments.length}
              </span>
            )}
          </button>
          <button 
            onClick={() => onDelete(data.id)}
            className="p-1 rounded hover:bg-red-100 transition-colors"
            title="Delete idea"
          >
            <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
          </button>
        </div>
      </div>
      
      {data.type === "script" && (
        <pre
          className={`rounded bg-gray-100 text-sm text-gray-800 p-3 mt-2 font-mono overflow-x-auto border ${data.language ? syntaxColor[data.language] : syntaxColor.default}`}
          dangerouslySetInnerHTML={{ __html: prettifyCode(data.content) }}
        />
      )}
      
      {data.type === "image" && data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full rounded-lg mt-2 shadow-sm object-cover max-h-44 mx-auto border border-gray-200"
        />
      )}
      
      {data.type === "note" && (
        <div className="text-base mt-1 text-gray-700">{data.content}</div>
      )}
      
      {data.link && (
        <div className="mt-3 flex items-center gap-2 text-sm text-blue-600 bg-blue-50 rounded p-2 border border-blue-200">
          <ExternalLink className="w-4 h-4" />
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {data.link}
          </a>
        </div>
      )}
      
      {data.fileName && (
        <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 bg-white/50 rounded p-2 border border-gray-200">
          <Paperclip className="w-4 h-4" />
          <span>{data.fileName}</span>
        </div>
      )}
    </div>
  );
};

export default MoodboardCard;
export type { CardData, CardType, Comment };
