import { StickyNote } from "lucide-react";
import { useNotes } from "../context";
import { filteringByPriority, sortByDate, sortByPriority } from "../utils";
import { SingleNoteCard } from "./SingleNoteCard";

export function NoteCard() {
  const { state, notesOrder } = useNotes();

  const sortedByDate = sortByDate(state.notesList, notesOrder.sort);
  const sortedByPriority = sortByPriority(sortedByDate, notesOrder.sort);
  const filteredNotes = filteringByPriority(sortedByPriority, notesOrder.filter);

  if (state.notesList.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <StickyNote className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">No notes yet</p>
        <p className="text-sm">Create your first note to get started</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {filteredNotes?.map((item) => (
        <SingleNoteCard item={item} key={item._id} />
      ))}
    </div>
  );
}
