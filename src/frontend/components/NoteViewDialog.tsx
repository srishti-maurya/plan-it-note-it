import { Pencil } from "lucide-react";
import type { Note } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface NoteViewDialogProps {
  note: Note;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

export function NoteViewDialog({
  note,
  open,
  onOpenChange,
  onEdit,
}: NoteViewDialogProps) {
  const priorityKey = note.priority ? Object.keys(note.priority)[0] : "";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-lg max-h-[85vh] flex flex-col"
        style={{ backgroundColor: note.bgColor || undefined }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl leading-snug pr-8">
            {note.title}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-2 pt-1">
            <span>{note.createdAt}</span>
            {note.tag && (
              <>
                <span className="text-border">|</span>
                <Badge variant="secondary" className="text-xs">
                  {note.tag}
                </Badge>
              </>
            )}
            {priorityKey && (
              <>
                <span className="text-border">|</span>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs capitalize gap-1",
                    priorityKey === "low" && "text-green-700",
                    priorityKey === "medium" && "text-yellow-700",
                    priorityKey === "high" && "text-red-700"
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      priorityKey === "low" && "bg-green-500",
                      priorityKey === "medium" && "bg-yellow-500",
                      priorityKey === "high" && "bg-red-500"
                    )}
                  />
                  {priorityKey}
                </Badge>
              </>
            )}
          </DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex-1 overflow-auto py-2">
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {note.note}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onOpenChange(false);
              onEdit();
            }}
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
