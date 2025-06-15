
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
      <DialogContent className="max-w-md bg-white border border-gray-300 text-gray-900 shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Add to {section}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <div>
            <label className="block font-medium mb-1 text-gray-700">Title</label>
            <Input required value={title} onChange={e => setTitle(e.target.value)} placeholder="Title for your idea..." className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500" />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Description</label>
            <textarea
              required
              rows={4}
              className="w-full border border-gray-300 bg-white rounded p-2 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your idea..."
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-gray-700">Attach File</label>
            <Input type="file" onChange={handleFileChange} className="file:text-gray-700 file:bg-gray-100 file:border-gray-300 bg-white border-gray-300 text-gray-900" />
            {file && <div className="text-xs mt-1 text-gray-600">{file.name}</div>}
          </div>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onClose} className="text-gray-600 hover:text-gray-800">Cancel</Button>
            <Button type="submit" variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
