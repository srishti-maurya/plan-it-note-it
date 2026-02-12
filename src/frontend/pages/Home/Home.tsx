import { useNotes } from "../../context";
import { NoteCard } from "../../components";

export function Home() {
  const { state, searchQuery } = useNotes();
  const isActiveSearch = searchQuery.trim().length > 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notes</h1>
        <p className="text-sm text-muted-foreground">
          {isActiveSearch
            ? `Searching for "${searchQuery}"`
            : `${state.notesList.length} note${state.notesList.length !== 1 ? "s" : ""}`}
        </p>
      </div>
      <NoteCard />
    </div>
  );
}
