
import { FC } from "react";
import { BookOpen, Code, FolderOpen } from "lucide-react";

type CardType = "script" | "image" | "note";

interface CardData {
  id: string;
  type: CardType;
  title: string;
  content?: string;
  imageUrl?: string;
  language?: string;
}

const typeIcon: Record<CardType, any> = {
  script: Code,
  image: FolderOpen,
  note: BookOpen,
};

const cardBg: Record<CardType, string> = {
  script: "bg-blue-900/80",
  image: "bg-green-900/80",
  note: "bg-violet-900/80",
};

const syntaxColor: Record<string, string> = {
  js: "text-yellow-400",
  py: "text-cyan-300",
  ts: "text-blue-300",
  default: "text-gray-200",
};

const prettifyCode = (code?: string) =>
  code?.replace(/</g, "&lt;").replace(/>/g, "&gt;") ?? "";

const MoodboardCard: FC<{ data: CardData }> = ({ data }) => {
  const Icon = typeIcon[data.type];

  return (
    <div className={`rounded-xl p-4 shadow-md ${cardBg[data.type]} border border-border hover:shadow-2xl transition-shadow relative animate-fade-in`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-5 h-5 opacity-80 text-white" />
        <span className="font-semibold text-lg text-white">{data.title}</span>
      </div>
      {data.type === "script" && (
        <pre
          className={`rounded bg-black/80 text-xs text-white p-3 mt-2 font-mono overflow-x-auto ${data.language ? syntaxColor[data.language] : syntaxColor.default}`}
          dangerouslySetInnerHTML={{ __html: prettifyCode(data.content) }}
        />
      )}
      {data.type === "image" && data.imageUrl && (
        <img
          src={data.imageUrl}
          alt={data.title}
          className="w-full rounded-lg mt-2 shadow object-cover max-h-44 mx-auto border border-border"
        />
      )}
      {data.type === "note" && (
        <div className="text-base mt-1 text-gray-200">{data.content}</div>
      )}
    </div>
  );
};

export default MoodboardCard;
export type { CardData, CardType };
