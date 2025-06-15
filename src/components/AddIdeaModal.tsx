
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
      <DialogContent className="max-w-md bg-neutral-950 border border-blue-800 text-neutral-100 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-blue-200">Add to {section}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-medium mb-1 text-blue-100">Title</label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Title for your idea..." className="bg-neutral-900 border-blue-700 text-neutral-100 placeholder:text-neutral-400" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-blue-100">Description</label>
            <textarea
              required
              rows={4}
              className="w-full border border-blue-700 bg-neutral-900 rounded p-2 text-neutral-100 placeholder:text-neutral-400"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your idea..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-blue-100">Attach File</label>
            <Input type="file" onChange={handleFileChange} className="file:text-blue-200 file:bg-neutral-800 file:border-blue-600 bg-neutral-900 border-blue-700 text-neutral-100" />
            {file && <div className="text-xs mt-1 text-blue-200">{file.name}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} className="text-neutral-400 hover:text-white">Cancel</Button>
            <Button type="submit" variant="default" className="bg-blue-700 hover:bg-blue-800 text-white">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
