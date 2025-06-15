
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    name: "Video Scripts",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    dotColor: "bg-blue-400",
    icon: "🎬",
    count: 0
  },
  {
    name: "Instagram Grid",
    color: "text-pink-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    dotColor: "bg-pink-400",
    icon: "📷",
    count: 0
  },
  {
    name: "Productions",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
    borderColor: "border-yellow-500/30",
    dotColor: "bg-yellow-400",
    icon: "🎭",
    count: 0
  },
  {
    name: "Post Production",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/30",
    dotColor: "bg-orange-400",
    icon: "🎞️",
    count: 0
  },
  {
    name: "Product",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    dotColor: "bg-green-400",
    icon: "📦",
    count: 0
  },
  {
    name: "App Design",
    color: "text-violet-400",
    bgColor: "bg-violet-500/10",
    borderColor: "border-violet-500/30",
    dotColor: "bg-violet-400",
    icon: "🎨",
    count: 0
  },
  {
    name: "App Development",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    dotColor: "bg-cyan-400",
    icon: "💻",
    count: 0
  },
  {
    name: "Incubator",
    color: "text-rose-400",
    bgColor: "bg-rose-500/10",
    borderColor: "border-rose-500/30",
    dotColor: "bg-rose-400",
    icon: "🚀",
    count: 0
  }
];

interface CRMSidebarProps {
  currentSection: string;
  setSection: (section: string) => void;
  sectionCounts: Record<string, number>;
}

export default function CRMSidebar({ currentSection, setSection, sectionCounts }: CRMSidebarProps) {
  return (
    <aside className="w-80 bg-gray-900 border-r border-gray-700 flex flex-col h-full">
      <nav className="flex-1 p-4 space-y-2">
        {sections.map(sec => (
          <button 
            key={sec.name}
            className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all group ${
              currentSection === sec.name 
                ? `${sec.bgColor} ${sec.color} border ${sec.borderColor}` 
                : "text-gray-400 hover:text-gray-200 hover:bg-gray-800/50"
            }`}
            onClick={() => setSection(sec.name)}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{sec.icon}</span>
              <span className={`inline-block w-2 h-2 rounded-full ${currentSection === sec.name ? sec.dotColor : 'bg-gray-600'}`} />
              <span className="truncate">{sec.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {sectionCounts[sec.name] > 0 && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  currentSection === sec.name ? 'bg-white/20' : 'bg-gray-700 text-gray-300'
                }`}>
                  {sectionCounts[sec.name]}
                </span>
              )}
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-800/50 rounded-lg px-3 py-2">
          <Zap className="w-3 h-3" />
          <span>All updates are instant</span>
        </div>
      </div>
    </aside>
  );
}
