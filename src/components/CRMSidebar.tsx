
import { Users, ChevronRight, BarChart3, Calendar, FileText, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    name: "Video Scripts",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    count: 0
  },
  {
    name: "Instagram Grid",
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
    count: 0
  },
  {
    name: "Productions",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    count: 0
  },
  {
    name: "Post Production",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    count: 0
  },
  {
    name: "Product",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    count: 0
  },
  {
    name: "App Design",
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    borderColor: "border-violet-200",
    count: 0
  },
  {
    name: "App Development",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-200",
    count: 0
  },
  {
    name: "Incubator",
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    borderColor: "border-rose-200",
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
    <aside className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Sections</h2>
      </div>
      
      <nav className="flex-1 p-2 space-y-1">
        {sections.map(sec => (
          <button 
            key={sec.name}
            className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all hover:bg-white hover:shadow-sm group ${
              currentSection === sec.name 
                ? `${sec.bgColor} ${sec.color} shadow-sm border ${sec.borderColor}` 
                : "text-gray-700 hover:text-gray-900"
            }`}
            onClick={() => setSection(sec.name)}
          >
            <div className="flex items-center gap-3">
              <span className={`inline-block w-2 h-2 rounded-full ${currentSection === sec.name ? 'bg-current' : 'bg-gray-400'}`} />
              <span className="truncate">{sec.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {sectionCounts[sec.name] > 0 && (
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  currentSection === sec.name ? 'bg-white bg-opacity-70' : 'bg-gray-200 text-gray-600'
                }`}>
                  {sectionCounts[sec.name]}
                </span>
              )}
              <ChevronRight className={`w-4 h-4 transition-transform ${
                currentSection === sec.name ? 'rotate-90 opacity-70' : 'opacity-0 group-hover:opacity-50'
              }`} />
            </div>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200 space-y-2">
        <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 hover:text-gray-900">
          <BarChart3 className="w-4 h-4 mr-3" />
          Analytics
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 hover:text-gray-900">
          <Calendar className="w-4 h-4 mr-3" />
          Calendar
        </Button>
        <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 hover:text-gray-900">
          <HelpCircle className="w-4 h-4 mr-3" />
          Help & Support
        </Button>
      </div>
    </aside>
  );
}
