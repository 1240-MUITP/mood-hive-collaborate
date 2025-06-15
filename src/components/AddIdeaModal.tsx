
import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  open: boolean;
  onClose: () => void;
  onAdd: (
    type: "note",
    data: {
      title: string;
      description: string;
      file?: File | null;
    }
  ) => void;
  section: string;
};

export default function AddIdeaModal({ open, onClose, onAdd, section }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    } else {
      setFile(null);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    onAdd("note", { title, description, file });
    setTitle("");
    setDescription("");
    setFile(null);
    onClose();
  }

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add to {section}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-medium mb-1">Title</label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Title for your idea..." />
          </div>
          <div>
            <label className="block font-medium mb-1">Description</label>
            <textarea
              required
              rows={4}
              className="w-full border-input bg-background rounded p-2"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your idea..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Attach File</label>
            <Input type="file" onChange={handleFileChange} />
            {file && <div className="text-xs mt-1 text-accent">{file.name}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="default">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
