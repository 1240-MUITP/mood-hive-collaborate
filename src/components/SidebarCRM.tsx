
import { Video, Instagram, Product } from "lucide-react";
import { cn } from "@/lib/utils";

const sideSections = [
  { label: "Video Scripts", icon: "video", color: "bg-blue-500", iconType: "video" },
  { label: "Instagram Grid", icon: "instagram", color: "bg-pink-500", iconType: "instagram" },
  { label: "Productions", icon: "dot", color: "bg-yellow-400" },
  { label: "Post Production", icon: "cube", color: "bg-orange-500" },
  { label: "Product", icon: "product", color: "bg-green-500", iconType: "product" },
  { label: "App Design", icon: "dot", color: "bg-violet-500" },
  { label: "App Development", icon: "dot", color: "bg-cyan-400", iconType: "app-development" },
  { label: "Incubator", icon: "dot", color: "bg-rose-500" },
];

// Map iconType to component
function getIcon(iconType: string) {
  switch (iconType) {
    case "video":
      return Video;
    case "instagram":
      return Instagram;
    case "product":
      return Product;
    default:
      return null;
  }
}

export default function SidebarCRM({ currentSection, setSection }: { currentSection: string; setSection: (name: string) => void }) {
  return (
    <nav className="h-screen sticky top-0 flex flex-col bg-[#13151A] text-white min-w-[255px] max-w-[255px] pb-6 border-r border-[#23242A] select-none">
      <div className="flex items-center gap-2 px-6 py-8 pb-3 text-lg font-semibold text-blue-400 tracking-wide">
        <span className="w-4 h-4 bg-blue-500 rounded-full mr-1" />
        <span className="font-bold text-xl">Moodboard U</span>
      </div>
      <button className="ml-3 mt-2 mb-6 w-8 h-8 flex items-center justify-center rounded hover:bg-[#23242a] focus:outline-none">
        <svg width={26} height={26} stroke="currentColor" fill="none">
          <rect x="4" y="7" width="18" height="2" rx="1" fill="currentColor" />
          <rect x="4" y="13" width="14" height="2" rx="1" fill="currentColor" />
          <rect x="4" y="19" width="10" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>
      <ul className="flex-1 flex flex-col gap-1 px-2 text-base">
        {sideSections.map((s) => {
          const active = currentSection === s.label;
          const IconComp = getIcon(s.iconType || "");
          return (
            <li key={s.label}>
              <button
                className={cn(
                  "flex items-center gap-3 px-4 py-2 rounded text-left font-medium tracking-tight transition-all w-full",
                  active ? "bg-[#192039] text-white shadow-md border border-blue-400" : "text-gray-300 hover:bg-[#191c22]",
                )}
                style={active ? { boxShadow: "0 0 12px 1px #2051eb30" } : undefined}
                aria-current={active ? "page" : undefined}
                onClick={() => setSection(s.label)}
              >
                {s.icon === "dot" && (
                  <span className={"inline-block w-2 h-2 rounded-full " + s.color} />
                )}
                {s.icon === "cube" && (
                  <span>
                    <svg width={19} height={19} fill="none" stroke="currentColor">
                      <rect x="4" y="4" width="11" height="11" rx="3" fill="#ea580c" />
                    </svg>
                  </span>
                )}
                {IconComp && <IconComp className={`${s.color} w-5 h-5`} />}
                <span>{s.label}</span>
                {active && (
                  <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_2px_rgba(37,99,235,0.25)] ml-auto" />
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto text-xs text-gray-400 pl-5 pb-3 flex items-center gap-2">
        <span className="text-yellow-400">•</span>
        All updates are instant <span className="text-yellow-400">⚡</span>
      </div>
    </nav>
  );
}
