
import { Users } from "lucide-react";

const sections = [
  { name: "Video Scripts", color: "text-blue-600" },
  { name: "Instagram Grid", color: "text-pink-600" },
  { name: "Productions", color: "text-yellow-600" },
  { name: "Post Production", color: "text-orange-600" },
  { name: "Product", color: "text-green-600" },
  { name: "App Design", color: "text-violet-600" },
  { name: "App Development", color: "text-cyan-600" },
  { name: "Incubator", color: "text-rose-600" },
];

export default function MoodboardSidebar({ currentSection, setSection }: { currentSection: string; setSection: (section: string) => void }) {
  return (
    <aside className="h-screen sticky top-0 py-8 px-4 bg-white text-gray-900 flex flex-col gap-8 border-r border-gray-200 min-w-[220px] shadow-sm">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tight text-blue-600">
        <Users className="w-7 h-7" />
        <span>Moodboard U</span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {sections.map(sec => (
            <li key={sec.name}>
              <button
                className={`w-full flex items-center gap-3 rounded px-3 py-2 text-base font-medium transition-all hover:bg-blue-50 hover:text-blue-700 focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  currentSection === sec.name
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "bg-transparent text-gray-700"
                } ${sec.color}`}
                onClick={() => setSection(sec.name)}
                aria-current={currentSection === sec.name ? "page" : undefined}
              >
                <span className="inline-block w-2 h-2 rounded-full bg-current" />
                {sec.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto flex flex-col gap-2 text-xs text-gray-500 pt-10 border-t border-gray-200">
        <span className="opacity-70">All updates are instant ✨</span>
      </div>
    </aside>
  );
}
