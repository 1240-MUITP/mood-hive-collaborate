
import { BookOpen, Users, Code, Folder } from "lucide-react";

const sections = [
  {
    name: "Script Ideas",
    icon: Code,
    color: "text-blue-500"
  },
  {
    name: "Visual Inspiration",
    icon: BookOpen,
    color: "text-purple-500"
  },
  {
    name: "Image Board",
    icon: Folder,
    color: "text-green-500"
  }
];

export default function MoodboardSidebar({ currentSection, setSection }: { currentSection: string; setSection: (section: string) => void }) {
  return (
    <aside className="h-screen sticky top-0 py-8 px-4 bg-sidebar flex flex-col gap-8 border-r border-border min-w-[220px]">
      <div className="mb-6 flex items-center gap-2 text-xl font-bold tracking-tight text-primary">
        <Users className="w-6 h-6" />
        <span>Moodboard U</span>
      </div>
      <nav className="flex-1">
        <ul className="flex flex-col gap-2">
          {sections.map(sec => (
            <li key={sec.name}>
              <button
                className={`w-full flex items-center gap-3 rounded px-3 py-2 text-lg font-medium hover:bg-accent hover:scale-[1.02] transition-all hover:shadow ${currentSection===sec.name ? "bg-accent" : ""} ${sec.color}`}
                onClick={() => setSection(sec.name)}
                aria-current={currentSection === sec.name ? "page" : undefined}
              >
                <sec.icon className="w-5 h-5" />
                {sec.name}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto flex flex-col gap-2 text-sm text-muted-foreground pt-10 border-t border-border">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Partner is present
        </div>
        <span className="opacity-60">All updates are instant ✨</span>
      </div>
    </aside>
  );
}
