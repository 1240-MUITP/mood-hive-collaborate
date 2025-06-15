
import { Users, Bell } from "lucide-react";

const sections = [
  { name: "Video Scripts", color: "text-blue-400" },
  { name: "Instagram Grid", color: "text-pink-400" },
  { name: "Productions", color: "text-yellow-400" },
  { name: "Post Production", color: "text-orange-400" },
  { name: "Product", color: "text-green-400" },
  { name: "App Design", color: "text-violet-400" },
  { name: "App Development", color: "text-cyan-400" },
  { name: "Incubator", color: "text-rose-400" },
];

export default function MoodboardSidebar({ currentSection, setSection }: { currentSection: string; setSection: (section: string) => void }) {
  return (
    <aside className="h-screen sticky top-0 py-8 px-4 bg-sidebar text-gray-200 flex flex-col gap-8 border-r border-border min-w-[220px]">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold tracking-tight text-primary">
        <Users className="w-7 h-7" />
        <span>Moodboard U</span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {sections.map(sec => (
            <li key={sec.name}>
              <button
                className={`w-full flex items-center gap-3 rounded px-3 py-2 text-base font-medium hover:bg-accent hover:scale-[1.02] transition-all hover:shadow ${currentSection===sec.name ? "bg-accent" : ""} ${sec.color} ${currentSection===sec.name?"font-bold":""}`}
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
      <div className="mt-auto flex flex-col gap-2 text-xs text-muted-foreground pt-10 border-t border-border">
        <span className="opacity-60">All updates are instant ✨</span>
      </div>
    </aside>
  );
}
