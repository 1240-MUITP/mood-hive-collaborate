
import { useState } from "react";
import { MessageSquare, Grid3X3, List, Filter, SortAsc, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import MoodboardCard, { CardData } from "./MoodboardCard";
import SectionChatPanel from "./SectionChatPanel";

interface CRMMainContentProps {
  section: string;
  cards: CardData[];
  onEdit: (card: CardData) => void;
  onComment: (card: CardData) => void;
  onDelete: (cardId: string) => void;
  onDeleteAttachment: (cardId: string) => void;
  onAddIdea: () => void;
}

export default function CRMMainContent({
  section,
  cards,
  onEdit,
  onComment,
  onDelete,
  onDeleteAttachment,
  onAddIdea
}: CRMMainContentProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="flex-1 flex flex-col bg-gray-900 relative">
      {/* Section Header */}
      <div className="border-b border-gray-700 px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-semibold text-white">{section}</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              onClick={onAddIdea}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-10 rounded-lg"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Idea
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setChatOpen(!chatOpen)}
              className={`${chatOpen ? "bg-gray-700 text-white border-gray-600" : "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700"} rounded-lg`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Show Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        <div className={`flex-1 p-6 ${chatOpen ? 'pr-0' : ''}`}>
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">No ideas yet in {section}</h3>
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed">
                Start by adding your first idea to get the creative process going!
              </p>
              <Button 
                onClick={onAddIdea} 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                Add Your First Idea
              </Button>
            </div>
          ) : (
            <div
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 max-w-4xl'
              }`}
            >
              {cards.map(card => (
                <MoodboardCard
                  key={card.id}
                  data={card}
                  onEdit={onEdit}
                  onComment={onComment}
                  onDelete={onDelete}
                  onDeleteAttachment={onDeleteAttachment}
                />
              ))}
            </div>
          )}
        </div>

        {/* Chat Panel */}
        {chatOpen && (
          <div className="w-80 border-l border-gray-700 bg-gray-800">
            <SectionChatPanel section={section} onClose={() => setChatOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
