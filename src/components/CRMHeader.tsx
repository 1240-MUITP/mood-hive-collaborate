
import { Search, Plus, Bell, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationDropdown from "./NotificationDropdown";

interface CRMHeaderProps {
  onAddIdea: () => void;
}

export default function CRMHeader({ onAddIdea }: CRMHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">MB</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">Moodboard CRM</h1>
        </div>
        
        <div className="hidden md:flex items-center bg-gray-50 rounded-lg px-3 py-2 w-96 ml-8">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search ideas, comments, or sections..." 
            className="bg-transparent border-0 outline-none flex-1 text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button 
          onClick={onAddIdea}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 h-9"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Idea
        </Button>
        
        <NotificationDropdown />
        
        <Button variant="ghost" size="sm" className="p-2">
          <Settings className="w-4 h-4 text-gray-600" />
        </Button>
        
        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-xs">
              N
            </div>
            <span className="text-sm font-medium text-gray-700">Nisarg</span>
          </div>
          <div className="w-px h-4 bg-gray-300 mx-1" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full flex items-center justify-center font-bold text-white text-xs">
              U
            </div>
            <span className="text-sm font-medium text-gray-700">Utkarsh</span>
          </div>
        </div>
      </div>
    </header>
  );
}
