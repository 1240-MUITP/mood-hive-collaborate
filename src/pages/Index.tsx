import { useState } from "react";
import SidebarCRM from "../components/SidebarCRM";
import TopbarCRM from "../components/TopbarCRM";
import MoodboardCard, { CardData, Comment } from "../components/MoodboardCard";
import AddIdeaModal from "../components/AddIdeaModal";
import EditIdeaModal from "../components/EditIdeaModal";
import CommentModal from "../components/CommentModal";
import SectionChatPanel from "../components/SectionChatPanel";
import { Button } from "@/components/ui/button";

// Sidebar sections as keys for demo data.
const sectionOrder = ["Video Scripts", "Instagram Grid", "Productions", "Post Production", "Product", "App Design", "App Development", "Incubator"];

// Empty initial data - removed all dummy cards
const initialCards: Record<string, CardData[]> = {
  "Video Scripts": [],
  "Instagram Grid": [],
  "Productions": [],
  "Post Production": [],
  "Product": [],
  "App Design": [],
  "App Development": [],
  "Incubator": []
};
export default function Index() {
  const [section, setSection] = useState(sectionOrder[0]);
  const [cards, setCards] = useState<Record<string, CardData[]>>(initialCards);
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  function handleAdd(type: "note", data: {
    title: string;
    description: string;
    file?: File | null;
    link?: string;
  }) {
    setCards(prev => ({
      ...prev,
      [section]: [{
        id: Date.now().toString(),
        type: type,
        title: data.title,
        content: data.description,
        fileName: data.file?.name,
        link: data.link,
        comments: []
      }, ...(prev[section] || [])]
    }));
  }
  function handleEdit(card: CardData) {
    setSelectedCard(card);
    setEditOpen(true);
  }
  function handleSaveEdit(updatedCard: CardData) {
    setCards(prev => ({
      ...prev,
      [section]: prev[section].map(card => card.id === updatedCard.id ? updatedCard : card)
    }));
  }
  function handleDelete(cardId: string) {
    if (confirm("Are you sure you want to delete this idea?")) {
      setCards(prev => ({
        ...prev,
        [section]: prev[section].filter(card => card.id !== cardId)
      }));
    }
  }
  function handleDeleteAttachment(cardId: string) {
    if (confirm("Are you sure you want to remove this attachment?")) {
      setCards(prev => ({
        ...prev,
        [section]: prev[section].map(card => card.id === cardId ? {
          ...card,
          fileName: undefined
        } : card)
      }));
    }
  }
  function handleComment(card: CardData) {
    setSelectedCard(card);
    setCommentOpen(true);
  }
  function handleAddComment(cardId: string, commentText: string) {
    const newComment: Comment = {
      id: Date.now().toString(),
      author: "Nisarg",
      content: commentText,
      timestamp: "Just now"
    };
    setCards(prev => ({
      ...prev,
      [section]: prev[section].map(card => card.id === cardId ? {
        ...card,
        comments: [...(card.comments || []), newComment]
      } : card)
    }));

    // Update selectedCard to reflect the new comment immediately
    setSelectedCard(prev => prev && prev.id === cardId ? {
      ...prev,
      comments: [...(prev.comments || []), newComment]
    } : prev);
  }
  return <div className="flex w-full min-h-screen bg-[#15171c] text-white">
      <SidebarCRM currentSection={section} setSection={sect => setSection(sect)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <TopbarCRM section={section} />
        <main className="flex-1 flex flex-col px-2 sm:px-8 pt-6 pb-10 max-w-[1600px] mx-auto min-w-0 relative">
          <div className="flex items-start gap-3 mb-8">
            <input
              type="text"
              placeholder="Search ideas..."
              className="bg-[#23242A] text-white placeholder:text-gray-400 px-3 py-2 rounded-md border border-[#33394d] focus:outline-none focus:border-blue-500 w-52 transition"
            />
            <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow" onClick={() => setAddOpen(true)}>
              + Add Idea
            </Button>
            <Button variant={chatOpen ? "default" : "outline"} size="sm" className={chatOpen ? "bg-[#22244b] text-blue-400 border-none" : "bg-[#1a1b24] border border-[#33394d] text-gray-300 hover:bg-[#18192d]"} onClick={() => setChatOpen(o => !o)}>
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span className="hidden sm:inline">{chatOpen ? "Hide" : "Show"} Chat</span>
            </Button>
          </div>
          {(cards[section] ?? []).length === 0 ? <div className="flex flex-col items-center justify-center py-24 text-center w-full bg-[#23242A] shadow-lg transition-all rounded-none">
              <div className="mb-4 flex justify-center">
                <span className="inline-flex items-center justify-center text-[56px] text-yellow-400 drop-shadow" style={{
              filter: "drop-shadow(0 0 25px #FFD60066)"
            }}>
                  <svg width={64} height={64} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 18h6m-3 3v-3m6.39-2A7.5 7.5 0 1 0 4.61 16M12 4v2M6.34 6.34l1.42 1.42M17.66 6.34l-1.42 1.42" stroke="#FFD600" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-100 mb-1">No ideas yet in {section}</h2>
              <p className="text-gray-400 mb-7">Start by adding your first idea to get the creative process going!</p>
              <Button onClick={() => setAddOpen(true)} className="bg-blue-600 hover:bg-blue-700 shadow text-white text-base px-7 py-2 rounded-lg" size="lg">
                Add Your First Idea
              </Button>
            </div> : <section className={`w-full grid gap-6`} style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))"
        }}>
              {(cards[section] ?? []).map(card => <MoodboardCard data={card} key={card.id} onEdit={handleEdit} onComment={handleComment} onDelete={handleDelete} onDeleteAttachment={handleDeleteAttachment} />)}
            </section>}

          <AddIdeaModal open={addOpen} onClose={() => setAddOpen(false)} onAdd={handleAdd} section={section} />

          <EditIdeaModal open={editOpen} onClose={() => setEditOpen(false)} onSave={handleSaveEdit} card={selectedCard} />

          <CommentModal open={commentOpen} onClose={() => setCommentOpen(false)} onAddComment={handleAddComment} card={selectedCard} />

          {chatOpen && <div className="fixed right-0 top-0 h-full hidden sm:block" style={{
          width: 350,
          zIndex: 30
        }}>
              <SectionChatPanel section={section} onClose={() => setChatOpen(false)} />
            </div>}
          {chatOpen && <div className="block sm:hidden mt-6">
              <SectionChatPanel section={section} onClose={() => setChatOpen(false)} />
            </div>}
        </main>
      </div>
    </div>;
}
