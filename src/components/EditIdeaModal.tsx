
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardData } from "./MoodboardCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (updatedCard: CardData) => void;
  card: CardData | null;
}

export default function EditIdeaModal({ open, onClose, onSave, card }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [existingFileName, setExistingFileName] = useState("");

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      setContent(card.content || "");
      setExistingFileName(card.fileName || "");
      setFile(null);
    }
  }, [card]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!card || !title.trim() || !content.trim()) return;
    
    const updatedCard: CardData = {
      ...card,
      title,
      content,
      fileName: file ? file.name : (existingFileName || undefined),
    };
    
    onSave(updatedCard);
    onClose();
  }

  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md bg-white border border-gray-300 text-gray-900 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Edit Idea</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Title</label>
            <Input 
              required 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              placeholder="Title for your idea..." 
              className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500" 
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Content</label>
            <textarea
              required
              rows={6}
              className="w-full border border-gray-300 bg-white rounded p-2 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Describe your idea..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Attachment</label>
            {existingFileName && !file && (
              <div className="text-sm text-gray-600 mb-2 p-2 bg-gray-50 rounded border">
                Current file: {existingFileName}
              </div>
            )}
            <Input 
              type="file" 
              onChange={handleFileChange} 
              className="file:text-gray-700 file:bg-gray-100 file:border-gray-300 bg-white border-gray-300 text-gray-900" 
            />
            {file && <div className="text-xs mt-1 text-gray-600">New file: {file.name}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-600 hover:text-gray-800">
              Cancel
            </Button>
            <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
