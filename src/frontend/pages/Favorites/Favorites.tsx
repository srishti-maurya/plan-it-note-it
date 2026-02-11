import { Star } from "lucide-react";
import { useNotes } from "../../context";
import { SingleNoteCard } from "../../components/SingleNoteCard";

export function Favorites() {
  const { state } = useNotes();

  const favoriteNotes = state.notesList.filter((n) => n.favorite);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Favorites</h1>
        <p className="text-sm text-muted-foreground">
          {favoriteNotes.length} note{favoriteNotes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {favoriteNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Star className="h-12 w-12 mb-3" />
          <p className="text-lg font-medium">No favorites yet</p>
          <p className="text-sm">Star notes to add them to your favorites</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {favoriteNotes.map((note) => (
            <SingleNoteCard item={note} key={note._id} />
          ))}
        </div>
      )}
    </div>
  );
}
