
import { Search, Plus, Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationDropdown from "./NotificationDropdown";

interface CRMHeaderProps {
  onAddIdea: () => void;
}

export default function CRMHeader({ onAddIdea }: CRMHeaderProps) {
  return (
    <header className="h-16 bg-gray-900 border-b border-gray-700 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <span className="text-gray-900 font-bold text-sm">🎭</span>
          </div>
          <h1 className="text-xl font-semibold text-white">Moodboard U</h1>
        </div>
        
        <div className="hidden md:flex items-center bg-gray-800 rounded-lg px-3 py-2 w-96 ml-8 border border-gray-700">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search ideas, comments, or sections..." 
            className="bg-transparent border-0 outline-none flex-1 text-sm text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <NotificationDropdown />
        
        <Button variant="ghost" size="sm" className="p-2 text-gray-400 hover:text-gray-200 hover:bg-gray-800">
          <Settings className="w-4 h-4" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
            N
          </div>
          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center font-bold text-white text-sm">
            U
          </div>
        </div>
      </div>
    </header>
  );
}
