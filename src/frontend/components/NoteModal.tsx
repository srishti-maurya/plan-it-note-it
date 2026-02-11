import { useNotes } from "../context";
import { tagsList } from "./Tags";
import { priorityList } from "./PriorityList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";

const colorPalette = [
  { label: "Lavender", value: "#E8E0F0" },
  { label: "Sage", value: "#DEE8D5" },
  { label: "Rose", value: "#F0D8DA" },
  { label: "Sky", value: "#D4E4F1" },
  { label: "Peach", value: "#F0E0D0" },
  { label: "Stone", value: "#E8E6E3" },
];

export function NoteModal() {
  const {
    addNewNote,
    getTime,
    isEditable,
    setIsEditable,
    editNoteCard,
    setEditNoteCard,
    editNote,
    userInput,
    setUserInput,
    currNoteId,
  } = useNotes();

  const priorityKey = userInput.priority
    ? Object.keys(userInput.priority)[0]
    : "low";

  return (
    <Dialog
      open={isEditable}
      onOpenChange={(open) => {
        if (!open) {
          setIsEditable(false);
          setEditNoteCard(false);
        }
      }}
    >
      <DialogContent
        style={{ backgroundColor: userInput.bgColor || undefined }}
      >
        <DialogHeader>
          <DialogTitle>
            {editNoteCard ? "Edit Note" : "New Note"}
          </DialogTitle>
          <DialogDescription>
            {editNoteCard
              ? "Make changes to your note below."
              : "Fill in the details for your new note."}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Title"
            name="title"
            value={userInput.title}
            onChange={(e) =>
              setUserInput({ ...userInput, title: e.target.value })
            }
          />
          <RichTextEditor
            content={userInput.note}
            onChange={(html) =>
              setUserInput({ ...userInput, note: html, createdAt: getTime() })
            }
            placeholder="Take a note..."
          />

          {/* Color picker */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Color</Label>
            <ToggleGroup
              type="single"
              value={userInput.bgColor}
              onValueChange={(value) => {
                if (value) setUserInput({ ...userInput, bgColor: value });
              }}
              className="justify-start"
            >
              {colorPalette.map((c) => (
                <ToggleGroupItem
                  key={c.value}
                  value={c.value}
                  className={cn(
                    "h-7 w-7 rounded-full p-0 border-2",
                    userInput.bgColor === c.value
                      ? "border-ring ring-2 ring-ring"
                      : "border-transparent"
                  )}
                  style={{ backgroundColor: c.value }}
                >
                  <span className="sr-only">{c.label}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Tag select */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Label</Label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={userInput.tag}
              onChange={(e) =>
                setUserInput({ ...userInput, tag: e.target.value })
              }
            >
              <option value="">None</option>
              {tagsList.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Priority</Label>
            <ToggleGroup
              type="single"
              value={priorityKey}
              onValueChange={(value) => {
                if (value) {
                  const selected = priorityList.find(
                    (p) => Object.keys(p)[0] === value
                  );
                  if (selected) {
                    setUserInput({ ...userInput, priority: selected });
                  }
                }
              }}
              className="justify-start"
            >
              {priorityList.map((p) => {
                const key = Object.keys(p)[0];
                return (
                  <ToggleGroupItem
                    key={key}
                    value={key}
                    size="sm"
                    className="gap-1.5 capitalize"
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        key === "low" && "bg-green-500",
                        key === "medium" && "bg-yellow-500",
                        key === "high" && "bg-red-500"
                      )}
                    />
                    {key}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              setIsEditable(false);
              setEditNoteCard(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsEditable(false);
              editNoteCard
                ? editNote(userInput, currNoteId as string)
                : addNewNote(userInput);
            }}
          >
            {editNoteCard ? "Save Changes" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
