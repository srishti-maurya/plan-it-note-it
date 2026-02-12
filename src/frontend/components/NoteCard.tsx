import { Search, StickyNote } from "lucide-react";
import { useNotes } from "../context";
import { filteringByPriority, sortByDate, sortByPriority } from "../utils";
import { useSearchNotes } from "@/lib/use-search-notes";
import { SingleNoteCard } from "./SingleNoteCard";

export function NoteCard() {
  const { state, notesOrder, searchQuery } = useNotes();

  const sortedByDate = sortByDate(state.notesList, notesOrder.sort);
  const sortedByPriority = sortByPriority(sortedByDate, notesOrder.sort);
  const filteredNotes = filteringByPriority(sortedByPriority, notesOrder.filter);

  const { results } = useSearchNotes(filteredNotes, searchQuery);
  const isActiveSearch = searchQuery.trim().length > 0;
  const displayNotes = isActiveSearch ? results.map((r) => r.note) : filteredNotes;
  const matchMap = isActiveSearch
    ? new Map(results.map((r) => [r.note._id, r.matches]))
    : null;

  if (state.notesList.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <StickyNote className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">No notes yet</p>
        <p className="text-sm">Create your first note to get started</p>
      </div>
    );
  }

  if (isActiveSearch && displayNotes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Search className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">No matching notes</p>
        <p className="text-sm">Try a different search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {displayNotes?.map((item) => (
        <SingleNoteCard
          item={item}
          key={item._id}
          searchMatches={matchMap?.get(item._id) ?? null}
        />
      ))}
    </div>
  );
}
