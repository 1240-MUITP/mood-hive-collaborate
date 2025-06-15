
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (type: "script" | "image" | "note", data: { title: string; content?: string; imageUrl?: string; language?: string }) => void;
  section: string;
};

export default function AddIdeaModal({ open, onClose, onAdd, section }: Props) {
  const [type, setType] = useState<"script" | "image" | "note">("script");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("js");
  const [imageUrl, setImageUrl] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(type, { title, content, imageUrl, language });
    setTitle("");
    setContent("");
    setImageUrl("");
    setLanguage("js");
    onClose();
  }

  // Section type presets
  // Scripts: "script", Inspiration: "note", Image board: "image"
  const autoType = section === "Script Ideas" ? "script" : section === "Visual Inspiration" ? "note" : "image";
  if (type !== autoType) setType(autoType);

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add to {section}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Title for your idea..." />
          </div>
          {type === "script" && (
            <>
              <div>
                <label className="block font-medium mb-1">Language</label>
                <select
                  className="border-input bg-background rounded p-2 w-full"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="js">JavaScript</option>
                  <option value="ts">TypeScript</option>
                  <option value="py">Python</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Script</label>
                <textarea required rows={4} className="w-full border-input bg-background rounded p-2" value={content} onChange={e=>setContent(e.target.value)} placeholder={'Paste code or script...'}/>
              </div>
            </>
          )}
          {type === "note" && (
            <div>
              <label className="block font-medium mb-1">Note</label>
              <textarea required rows={4} className="w-full border-input bg-background rounded p-2" value={content} onChange={e=>setContent(e.target.value)} placeholder={'Describe your idea...'}/>
            </div>
          )}
          {type === "image" && (
            <div>
              <label className="block font-medium mb-1">Image URL</label>
              <Input value={imageUrl} onChange={e => setImageUrl(e.target.value)} required placeholder="Paste image link..." />
            </div>
          )}
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="default">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
