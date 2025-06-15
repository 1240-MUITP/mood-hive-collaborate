
import { useState } from "react";
import { MessageSquare, Grid3X3, List, Filter, SortAsc } from "lucide-react";
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
    <div className="flex-1 flex flex-col bg-white relative">
      {/* Section Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">{section}</h1>
              <p className="text-sm text-gray-500 mt-1">
                {cards.length} {cards.length === 1 ? 'idea' : 'ideas'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            
            <Button variant="outline" size="sm">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort
            </Button>
            
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            
            <Button
              variant={chatOpen ? "default" : "outline"}
              size="sm"
              onClick={() => setChatOpen(!chatOpen)}
              className={chatOpen ? "bg-blue-600 text-white" : ""}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Chat
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        <div className={`flex-1 p-6 ${chatOpen ? 'pr-0' : ''}`}>
          {cards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No ideas yet</h3>
              <p className="text-gray-500 mb-6 max-w-md">
                Start brainstorming by adding your first idea to the {section} section.
              </p>
              <Button onClick={onAddIdea} className="bg-blue-600 hover:bg-blue-700 text-white">
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
          <div className="w-80 border-l border-gray-200 bg-gray-50">
            <SectionChatPanel section={section} onClose={() => setChatOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
