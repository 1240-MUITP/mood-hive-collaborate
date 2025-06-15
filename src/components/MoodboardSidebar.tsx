
import { Users } from "lucide-react";

// Add darker background, and use lighter text for dark mode. Add hover/focus for accessibility.
const sections = [
  { name: "Video Scripts", color: "text-blue-400" },
  { name: "Instagram Grid", color: "text-pink-400" },
  { name: "Productions", color: "text-yellow-300" },
  { name: "Post Production", color: "text-orange-300" },
  { name: "Product", color: "text-green-400" },
  { name: "App Design", color: "text-violet-300" },
  { name: "App Development", color: "text-cyan-300" },
  { name: "Incubator", color: "text-rose-400" },
];

export default function MoodboardSidebar({ currentSection, setSection }: { currentSection: string; setSection: (section: string) => void }) {
  return (
    <aside className="h-screen sticky top-0 py-8 px-4 bg-neutral-950 text-neutral-50 flex flex-col gap-8 border-r border-border min-w-[220px] shadow-xl">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tight text-primary">
        <Users className="w-7 h-7" />
        <span>Moodboard U</span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {sections.map(sec => (
            <li key={sec.name}>
              <button
                className={`w-full flex items-center gap-3 rounded px-3 py-2 text-base font-semibold transition-all hover:bg-blue-800/30 hover:text-white hover:scale-[1.02] hover:shadow-lg focus-visible:outline focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  currentSection === sec.name
                    ? "bg-blue-800/50 text-white ring-2 ring-blue-500"
                    : "bg-transparent"
                } ${sec.color} ${currentSection === sec.name ? "font-bold" : ""}`}
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
      <div className="mt-auto flex flex-col gap-2 text-xs text-neutral-400 pt-10 border-t border-border">
        <span className="opacity-70">All updates are instant ✨</span>
      </div>
    </aside>
  );
}
