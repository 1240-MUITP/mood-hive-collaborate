
// Collaborative Moodboard app for U

import { useState } from "react";
import MoodboardSidebar from "../components/MoodboardSidebar";
import MoodboardCard, { CardData } from "../components/MoodboardCard";
import AddIdeaModal from "../components/AddIdeaModal";
import { Button } from "@/components/ui/button";

// Demo data per section for first use
const demoCards: Record<string, CardData[]> = {
  "Script Ideas": [
    {
      id: "1",
      type: "script",
      title: "Sort Array (JS)",
      content: "const arr = [3,1,2];\narr.sort(); // [1,2,3]",
      language: "js"
    },
    {
      id: "2",
      type: "script",
      title: "Text Analyzer (Python)",
      content: "text = input('Enter: ')\nprint(len(text.split()))",
      language: "py"
    }
  ],
  "Visual Inspiration": [
    {
      id: "3",
      type: "note",
      title: "UI Shapes",
      content: "Emphasize card layouts with subtle 3D hover effects!"
    },
    {
      id: "4",
      type: "note",
      title: "Color Palette",
      content: "Soft background with pastel blue/lilac accents."
    }
  ],
  "Image Board": [
    {
      id: "5",
      type: "image",
      title: "Cozy Work Setup",
      imageUrl: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=400&q=80"
    },
    {
      id: "6",
      type: "image",
      title: "Code Screen",
      imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
    }
  ]
};

const sectionOrder = ["Script Ideas", "Visual Inspiration", "Image Board"];

export default function Index() {
  const [section, setSection] = useState(sectionOrder[0]);
  const [cards, setCards] = useState<Record<string, CardData[]>>(demoCards);
  const [addOpen, setAddOpen] = useState(false);

  function handleAdd(type: "script" | "image" | "note", data: any) {
    setCards(prev => ({
      ...prev,
      [section]: [{ id: Date.now().toString(), type, ...data }, ...(prev[section]||[])]
    }));
  }

  return (
    <div className="flex w-full min-h-screen bg-background">
      <MoodboardSidebar currentSection={section} setSection={setSection} />
      <main className="flex-1 flex flex-col px-10 py-10 max-w-[1680px] mx-auto min-w-0">
        <div className="flex items-start flex-wrap gap-6 mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-primary">{section}</h1>
          <Button variant="outline" size="sm" className="ml-2" onClick={()=>setAddOpen(true)}>
            + Add Idea
          </Button>
        </div>

        <section
          className={`w-full grid gap-6`}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))"
          }}
        >
          {(cards[section] ?? []).map(card => (
            <MoodboardCard data={card} key={card.id} />
          ))}
        </section>

        <AddIdeaModal open={addOpen} onClose={()=>setAddOpen(false)} onAdd={handleAdd} section={section} />
      </main>
    </div>
  );
}
