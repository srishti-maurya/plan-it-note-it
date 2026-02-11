import { Clock } from "lucide-react";
import { useNotes } from "../../context";
import { SingleNoteCard } from "../../components/SingleNoteCard";

export function Recent() {
  const { state } = useNotes();

  // Sort by createdAt descending, take notes from last 7 days (minimum 10)
  const sorted = [...state.notesList].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  let recentNotes = sorted.filter(
    (n) => new Date(n.createdAt).getTime() >= sevenDaysAgo.getTime()
  );

  // Ensure at least 10 notes if available
  if (recentNotes.length < 10) {
    recentNotes = sorted.slice(0, Math.max(10, recentNotes.length));
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Recently Edited</h1>
        <p className="text-sm text-muted-foreground">
          {recentNotes.length} note{recentNotes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {recentNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Clock className="h-12 w-12 mb-3" />
          <p className="text-lg font-medium">No recent notes</p>
          <p className="text-sm">Notes you create or edit will appear here</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {recentNotes.map((note) => (
            <SingleNoteCard item={note} key={note._id} />
          ))}
        </div>
      )}
    </div>
  );
}
