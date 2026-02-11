import { useState, useRef } from "react";
import {
  MoreHorizontal,
  Pencil,
  Eye,
  Archive,
  Trash2,
  Palette,
  Tag,
  ArrowUpDown,
  Star,
  FolderIcon,
} from "lucide-react";
import { useNotes } from "../context";
import { tagsList } from "./Tags";
import { priorityList } from "./PriorityList";
import { NoteViewDialog } from "./NoteViewDialog";
import { getEffectiveTags } from "../utils/getEffectiveTags";
import type { Note } from "../../types";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { stripHtml } from "@/lib/strip-html";

const colorPalette = [
  { label: "Lavender", value: "#E8E0F0" },
  { label: "Sage", value: "#DEE8D5" },
  { label: "Rose", value: "#F0D8DA" },
  { label: "Sky", value: "#D4E4F1" },
  { label: "Peach", value: "#F0E0D0" },
  { label: "Stone", value: "#E8E6E3" },
];

interface Props {
  item: Note;
}

export function SingleNoteCard({ item }: Props) {
  const [viewOpen, setViewOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuClosedAt = useRef(0);

  const {
    moveToTrash,
    setcurrNoteId,
    setIsEditable,
    setEditNoteCard,
    setUserInput,
    userInput,
    archiveNote,
    editNote,
    state,
    toggleFavorite,
    moveNoteToFolder,
    folders,
    customTags,
  } = useNotes();

  const matchedNote = state.notesList.find((ele) => ele._id === item._id);
  const priorityKey = item.priority ? Object.keys(item.priority)[0] : "";
  const effectiveTags = getEffectiveTags(item);
  const allTagOptions = [...tagsList, ...customTags.filter((t) => !tagsList.includes(t))];

  const handleEdit = () => {
    setIsEditable(true);
    setEditNoteCard(true);
    setcurrNoteId(item._id);
    setUserInput({
      ...userInput,
      title: item.title,
      note: item.note,
      bgColor: item.bgColor,
      tag: item.tag,
      priority: item.priority,
      tags: item.tags || [],
      folderId: item.folderId,
      favorite: item.favorite,
    });
  };

  const handlePriorityChange = (value: string) => {
    const selected = priorityList.find(
      (p) => Object.keys(p)[0] === value
    );
    if (matchedNote && selected) {
      setUserInput({ ...matchedNote, priority: selected });
      editNote({ ...matchedNote, priority: selected }, item._id);
    }
  };

  const handleTagToggle = (tag: string, checked: boolean) => {
    if (!matchedNote) return;
    const currentTags = getEffectiveTags(matchedNote);
    const newTags = checked
      ? [...currentTags, tag]
      : currentTags.filter((t) => t !== tag);
    const updated = { ...matchedNote, tags: newTags, tag: newTags[0] || "" };
    setUserInput(updated);
    editNote(updated, item._id);
  };

  const handleColorChange = (color: string) => {
    if (matchedNote) {
      setUserInput({ ...matchedNote, bgColor: color });
      editNote({ ...matchedNote, bgColor: color }, item._id);
    }
  };

  return (
    <>
      <Card
        className="flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md break-words cursor-pointer"
        style={{ backgroundColor: item.bgColor || undefined }}
        onClick={() => {
          // Don't open view if dropdown just closed (prevents ghost click)
          if (Date.now() - menuClosedAt.current < 300) return;
          setViewOpen(true);
        }}
      >
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="flex-1 font-semibold text-sm leading-tight">
              {item.title}
            </h3>
            <div className="flex items-center gap-0.5 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(item);
                }}
              >
                <Star
                  className={cn(
                    "h-4 w-4",
                    item.favorite && "fill-yellow-400 text-yellow-400"
                  )}
                />
              </Button>
              <DropdownMenu
                open={menuOpen}
                onOpenChange={(open) => {
                  setMenuOpen(open);
                  if (!open) menuClosedAt.current = Date.now();
                }}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DropdownMenuItem onClick={() => setViewOpen(true)}>
                    <Eye className="h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleEdit}>
                    <Pencil className="h-4 w-4" />
                    Edit
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <ArrowUpDown className="h-4 w-4" />
                      Set Priority
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={priorityKey}
                        onValueChange={handlePriorityChange}
                      >
                        {priorityList.map((p) => {
                          const key = Object.keys(p)[0];
                          return (
                            <DropdownMenuRadioItem key={key} value={key}>
                              <span
                                className={cn(
                                  "mr-2 h-2 w-2 rounded-full",
                                  key === "low" && "bg-green-500",
                                  key === "medium" && "bg-yellow-500",
                                  key === "high" && "bg-red-500"
                                )}
                              />
                              <span className="capitalize">{key}</span>
                            </DropdownMenuRadioItem>
                          );
                        })}
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Tag className="h-4 w-4" />
                      Set Labels
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      {allTagOptions.map((tag) => (
                        <DropdownMenuCheckboxItem
                          key={tag}
                          checked={effectiveTags.includes(tag)}
                          onCheckedChange={(checked) =>
                            handleTagToggle(tag, checked as boolean)
                          }
                        >
                          {tag}
                        </DropdownMenuCheckboxItem>
                      ))}
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  {folders.length > 0 && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        <FolderIcon className="h-4 w-4" />
                        Move to Folder
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={item.folderId || ""}
                          onValueChange={(value) =>
                            moveNoteToFolder(item._id, value || null)
                          }
                        >
                          <DropdownMenuRadioItem value="">
                            No folder
                          </DropdownMenuRadioItem>
                          {folders.map((f) => (
                            <DropdownMenuRadioItem key={f._id} value={f._id}>
                              {f.name}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  )}

                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Palette className="h-4 w-4" />
                      Change Color
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuLabel className="text-xs">
                        Pick a color
                      </DropdownMenuLabel>
                      <div className="flex gap-1 px-2 py-1.5">
                        {colorPalette.map((c) => (
                          <button
                            key={c.value}
                            className={cn(
                              "h-6 w-6 rounded-full border-2 transition-all hover:scale-110",
                              item.bgColor === c.value
                                ? "border-ring ring-2 ring-ring"
                                : "border-transparent"
                            )}
                            style={{ backgroundColor: c.value }}
                            onClick={() => handleColorChange(c.value)}
                          />
                        ))}
                      </div>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem onClick={() => archiveNote(item)}>
                    <Archive className="h-4 w-4" />
                    Archive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => moveToTrash(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Move to Trash
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {stripHtml(item.note)}
          </p>
        </CardContent>

        <CardFooter className="flex flex-wrap items-center gap-1.5 pt-2 pb-3">
          {effectiveTags.map((t) => (
            <Badge key={t} variant="secondary" className="text-xs">
              {t}
            </Badge>
          ))}
          {priorityKey && (
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
          )}
          <span className="ml-auto text-xs text-muted-foreground">
            {item.createdAt}
          </span>
        </CardFooter>
      </Card>

      <NoteViewDialog
        note={item}
        open={viewOpen}
        onOpenChange={setViewOpen}
        onEdit={handleEdit}
      />
    </>
  );
}
