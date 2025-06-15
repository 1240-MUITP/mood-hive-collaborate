
import { useState } from "react";
import MoodboardSidebar from "../components/MoodboardSidebar";
import MoodboardCard, { CardData, Comment } from "../components/MoodboardCard";
import AddIdeaModal from "../components/AddIdeaModal";
import EditIdeaModal from "../components/EditIdeaModal";
import CommentModal from "../components/CommentModal";
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
    { 
      id: "1", 
      type: "note", 
      title: "Interview script draft", 
      content: "Outline key talking points for the founder Q&A.",
      comments: [
        {
          id: "c1",
          author: "Utkarsh",
          content: "This looks great! Maybe add a question about the company's future vision?",
          timestamp: "2 hours ago"
        }
      ]
    }
  ],
  "Instagram Grid": [
    { id: "2", type: "note", title: "Reel idea: Launch Teaser", content: "15-sec montage of app features dropping in.", comments: [] }
  ],
  "Productions": [
    { id: "3", type: "note", title: "Behind the Scenes", content: "Share editing workflow with team.", comments: [] }
  ],
  "Post Production": [
    { id: "4", type: "note", title: "Color Grading Notes", content: "Aim for a soft, cinematic look.", comments: [] }
  ],
  "Product": [
    { id: "5", type: "note", title: "USP", content: "Highlight 'instant collaboration' in every asset.", comments: [] }
  ],
  "App Design": [
    { id: "6", type: "note", title: "Styleguide", content: "Stick to soft blues, violets, and lots of negative space.", comments: [] }
  ],
  "App Development": [
    { id: "7", type: "note", title: "API endpoints", content: "Draft major API actions and auth requirements.", comments: [] }
  ],
  "Incubator": [
    { id: "8", type: "note", title: "Potential partners", content: "Reach out to production studios for pilot.", comments: [] }
  ]
};

export default function Index() {
  const [section, setSection] = useState(sectionOrder[0]);
  const [cards, setCards] = useState<Record<string, CardData[]>>(demoCards);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [chatOpen, setChatOpen] = useState(false);

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
          comments: [],
        },
        ...(prev[section] || [])
      ]
    }));
  }

  function handleEdit(card: CardData) {
    setSelectedCard(card);
    setEditOpen(true);
  }

  function handleSaveEdit(updatedCard: CardData) {
    setCards(prev => ({
      ...prev,
      [section]: prev[section].map(card => 
        card.id === updatedCard.id ? updatedCard : card
      )
    }));
  }

  function handleComment(card: CardData) {
    setSelectedCard(card);
    setCommentOpen(true);
  }

  function handleAddComment(cardId: string, commentText: string) {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "You",
      content: commentText,
      timestamp: "Just now"
    };

    setCards(prev => ({
      ...prev,
      [section]: prev[section].map(card => 
        card.id === cardId 
          ? { ...card, comments: [...(card.comments || []), newComment] }
          : card
      )
    }));
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-50 text-gray-900">
      <MoodboardSidebar
        currentSection={section}
        setSection={sect => {
          setSection(sect);
        }}
      />
      <main className="flex-1 flex flex-col px-2 sm:px-10 py-6 sm:py-10 max-w-[1680px] mx-auto min-w-0 relative bg-white rounded-md shadow-sm">
        {/* Top-right bar */}
        <div className="absolute top-3 right-4 flex items-center gap-4 z-20">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            {/* Avatars and presence indicators */}
            <div className="relative flex items-center gap-2">
              <div className="w-7 h-7 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xs border-2 border-blue-200 shadow-sm">
                A
              </div>
              <span className="text-sm font-semibold text-blue-700">You</span>
              <div className="absolute -bottom-1 left-[6px] w-2 h-2 rounded-full bg-green-500 border-2 border-white animate-pulse" />
            </div>
            <div className="relative flex items-center gap-1 ml-4">
              <div className="w-7 h-7 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-xs border-2 border-yellow-200 shadow-sm">
                U
              </div>
              <span className="text-sm font-semibold text-yellow-700">Utkarsh</span>
              <div className="absolute -bottom-1 left-[6px] w-2 h-2 rounded-full bg-green-500 border-2 border-white animate-pulse" />
            </div>
          </div>
          <button className="flex items-center bg-gray-100 border border-gray-200 rounded-full px-3 py-2 hover:bg-gray-200 transition-colors shadow-sm">
            <Bell className="w-5 h-5 text-yellow-600" />
            <span className="sr-only">Notifications</span>
          </button>
        </div>
        {/* End top bar */}
        <div className="flex items-start flex-wrap gap-4 mb-8 pr-[350px]">
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">{section}</h1>
          <Button variant="outline" size="sm" className="ml-2 border-blue-500 text-blue-600 hover:bg-blue-50" onClick={() => setAddOpen(true)}>
            + Add Idea
          </Button>
          <Button
            variant={chatOpen ? "default" : "outline"}
            size="sm"
            className={`ml-2 ${chatOpen ? "bg-blue-600 text-white" : "border-blue-400 text-blue-600 hover:bg-blue-50"}`}
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
            <MoodboardCard 
              data={card} 
              key={card.id} 
              onEdit={handleEdit}
              onComment={handleComment}
            />
          ))}
        </section>

        <AddIdeaModal
          open={addOpen}
          onClose={() => setAddOpen(false)}
          onAdd={handleAdd}
          section={section}
        />

        <EditIdeaModal
          open={editOpen}
          onClose={() => setEditOpen(false)}
          onSave={handleSaveEdit}
          card={selectedCard}
        />

        <CommentModal
          open={commentOpen}
          onClose={() => setCommentOpen(false)}
          onAddComment={handleAddComment}
          card={selectedCard}
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
