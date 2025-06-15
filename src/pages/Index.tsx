import { useState } from "react";
import MoodboardSidebar from "../components/MoodboardSidebar";
import MoodboardCard, { CardData } from "../components/MoodboardCard";
import AddIdeaModal from "../components/AddIdeaModal";
import SectionChatPanel from "../components/SectionChatPanel";
import { Button } from "@/components/ui/button";
import { Bell, Users } from "lucide-react";

// Sidebar sections as keys for demo data.
const sectionOrder = [
  "Video Scripts",
  "Instagram Grid",
  "Productions",
  "Post Production",
  "Product",
  "App Design",
  "App Development",
  "Incubator"
];

// New: minimal demo card data per section for UI
const demoCards: Record<string, CardData[]> = {
  "Video Scripts": [
    { id: "1", type: "note", title: "Interview script draft", content: "Outline key talking points for the founder Q&A." }
  ],
  "Instagram Grid": [
    { id: "2", type: "note", title: "Reel idea: Launch Teaser", content: "15-sec montage of app features dropping in." }
  ],
  "Productions": [
    { id: "3", type: "note", title: "Behind the Scenes", content: "Share editing workflow with team." }
  ],
  "Post Production": [
    { id: "4", type: "note", title: "Color Grading Notes", content: "Aim for a soft, cinematic look." }
  ],
  "Product": [
    { id: "5", type: "note", title: "USP", content: "Highlight 'instant collaboration' in every asset." }
  ],
  "App Design": [
    { id: "6", type: "note", title: "Styleguide", content: "Stick to soft blues, violets, and lots of negative space." }
  ],
  "App Development": [
    { id: "7", type: "note", title: "API endpoints", content: "Draft major API actions and auth requirements." }
  ],
  "Incubator": [
    { id: "8", type: "note", title: "Potential partners", content: "Reach out to production studios for pilot." }
  ]
};

export default function Index() {
  const [section, setSection] = useState(sectionOrder[0]);
  const [cards, setCards] = useState<Record<string, CardData[]>>(demoCards);
  const [addOpen, setAddOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false); // changed: false by default

  function handleAdd(
    type: "note",
    data: { title: string; description: string; file?: File | null }
  ) {
    setCards(prev => ({
      ...prev,
      [section]: [
        {
          id: Date.now().toString(),
          type: type,
          title: data.title,
          content: data.description,
          // For demo: ignore file (handled in form only)
        },
        ...(prev[section] || [])
      ]
    }));
  }

  return (
    <div className="flex w-full min-h-screen bg-neutral-950 text-neutral-100">
      <MoodboardSidebar
        currentSection={section}
        setSection={sect => {
          setSection(sect);
        }}
      />
      <main className="flex-1 flex flex-col px-2 sm:px-10 py-6 sm:py-10 max-w-[1680px] mx-auto min-w-0 relative bg-neutral-900/90 rounded-md shadow-xl">
        {/* Top-right bar */}
        <div className="absolute top-3 right-4 flex items-center gap-4 z-20">
          <div className="flex items-center gap-2 bg-neutral-900 px-4 py-2 rounded-full border border-border shadow-md">
            {/* Avatars and presence indicators */}
            <div className="relative flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-tr from-blue-600 to-purple-700 rounded-full flex items-center justify-center font-bold text-white text-xs border-2 border-blue-200 shadow">
                A
              </div>
              <span className="text-sm font-semibold text-blue-100">You</span>
              <div className="absolute -bottom-1 left-[6px] w-2 h-2 rounded-full bg-green-400 border-2 border-neutral-900 animate-pulse" />
            </div>
            <div className="relative flex items-center gap-1 ml-4">
              <div className="w-7 h-7 bg-gradient-to-tr from-pink-700 to-yellow-400 rounded-full flex items-center justify-center font-bold text-white text-xs border-2 border-yellow-100 shadow">
                U
              </div>
              <span className="text-sm font-semibold text-yellow-100">Utkarsh</span>
              <div className="absolute -bottom-1 left-[6px] w-2 h-2 rounded-full bg-green-400 border-2 border-neutral-900 animate-pulse" />
            </div>
          </div>
          <button className="flex items-center bg-neutral-800 border border-border rounded-full px-3 py-2 hover:bg-neutral-700 transition-colors shadow-md">
            <Bell className="w-5 h-5 text-yellow-300" />
            <span className="sr-only">Notifications</span>
          </button>
        </div>
        {/* End top bar */}
        <div className="flex items-start flex-wrap gap-4 mb-8 pr-[350px]">
          <h1 className="text-3xl font-bold tracking-tight text-blue-200">{section}</h1>
          <Button variant="outline" size="sm" className="ml-2 border-blue-500 text-blue-100 hover:bg-blue-900/80" onClick={() => setAddOpen(true)}>
            + Add Idea
          </Button>
          <Button
            variant={chatOpen ? "default" : "outline"}
            size="sm"
            className={`ml-2 ${chatOpen ? "bg-blue-800 text-white" : "border-blue-400 text-blue-200 hover:bg-blue-950/60"}`}
            onClick={() => setChatOpen(o => !o)}
          >
            <span className="hidden sm:inline">{chatOpen ? "Hide" : "Show"} Chat</span>
            <span className="sm:hidden">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Button>
        </div>

        <section
          className={`w-full grid gap-6`}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          }}
        >
          {(cards[section] ?? []).map(card => (
            <MoodboardCard data={card} key={card.id} />
          ))}
        </section>

        <AddIdeaModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onAdd={handleAdd}
          section={section}
        />

        {chatOpen && (
          <div className="fixed right-0 top-0 h-full hidden sm:block" style={{ width: 350, zIndex: 30 }}>
            <SectionChatPanel section={section} onClose={() => setChatOpen(false)} />
          </div>
        )}
        {chatOpen && (
          <div className="block sm:hidden mt-6">
            <SectionChatPanel section={section} onClose={() => setChatOpen(false)} />
          </div>
        )}
      </main>
    </div>
  );
}
