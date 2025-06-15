
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardData, Comment } from "./MoodboardCard";

interface Props {
  open: boolean;
  onClose: () => void;
  onAddComment: (cardId: string, comment: string) => void;
  card: CardData | null;
}

export default function CommentModal({ open, onClose, onAddComment, card }: Props) {
  const [newComment, setNewComment] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!card || !newComment.trim()) return;
    
    onAddComment(card.id, newComment);
    setNewComment("");
    // Don't close the modal so user can see the comment was added
  }

  if (!card) return null;

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-lg bg-white border border-gray-300 text-gray-900 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Comments - {card.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Existing comments */}
          <div className="max-h-60 overflow-y-auto space-y-3">
            {card.comments && card.comments.length > 0 ? (
              card.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm text-gray-700">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-800 text-sm break-words">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No comments yet. Be the first to comment!</p>
            )}
          </div>

          {/* Add new comment */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 pt-4">
            <div className="flex gap-2">
              <Input
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500"
              />
              <Button type="submit" disabled={!newComment.trim()} className="bg-blue-600 hover:bg-blue-700 text-white">
                Comment
              </Button>
            </div>
          </form>
        </div>

        <DialogFooter>
          <Button type="button" variant="ghost" onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
