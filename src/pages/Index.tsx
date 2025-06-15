import { useState } from "react";
import { CardData, Comment } from "../components/MoodboardCard";
import AddIdeaModal from "../components/AddIdeaModal";
import EditIdeaModal from "../components/EditIdeaModal";
import CommentModal from "../components/CommentModal";
import CRMHeader from "../components/CRMHeader";
import CRMSidebar from "../components/CRMSidebar";
import CRMMainContent from "../components/CRMMainContent";

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

  // Calculate section counts
  const sectionCounts = Object.fromEntries(
    sectionOrder.map(sec => [sec, cards[sec]?.length || 0])
  );

  function handleAdd(
    type: "note",
    data: { title: string; description: string; file?: File | null; link?: string }
  ) {
    setCards(prev => ({
      ...prev,
      [section]: [
        {
          id: Date.now().toString(),
          type: type,
          title: data.title,
          content: data.description,
          fileName: data.file?.name,
          link: data.link,
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
        [section]: prev[section].map(card => 
          card.id === cardId ? { ...card, fileName: undefined } : card
        )
      }));
    }
  }

  function handleComment(card: CardData) {
    setSelectedCard(card);
    setCommentOpen(true);
  }

  function handleAddComment(cardId: string, commentText: string) {
    const authors = ["Nisarg", "Utkarsh"];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    
    const newComment: Comment = {
      id: Date.now().toString(),
      author: randomAuthor,
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

    setSelectedCard(prev => 
      prev && prev.id === cardId 
        ? { ...prev, comments: [...(prev.comments || []), newComment] }
        : prev
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-900">
      <CRMHeader onAddIdea={() => setAddOpen(true)} />
      
      <div className="flex-1 flex overflow-hidden">
        <CRMSidebar 
          currentSection={section} 
          setSection={setSection}
          sectionCounts={sectionCounts}
        />
        
        <CRMMainContent
          section={section}
          cards={cards[section] || []}
          onEdit={handleEdit}
          onComment={handleComment}
          onDelete={handleDelete}
          onDeleteAttachment={handleDeleteAttachment}
          onAddIdea={() => setAddOpen(true)}
        />
      </div>

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
    </div>
  );
}
