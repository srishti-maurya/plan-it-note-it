import { useParams } from "react-router-dom";
import { FolderIcon, Search } from "lucide-react";
import { useNotes } from "../../context";
import { useSearchNotes } from "@/lib/use-search-notes";
import { SingleNoteCard } from "../../components/SingleNoteCard";

export function FolderView() {
  const { folderId } = useParams<{ folderId: string }>();
  const { state, folders, searchQuery } = useNotes();

  const folder = folders.find((f) => f._id === folderId);
  const folderNotes = state.notesList.filter((n) => n.folderId === folderId);

  const { results } = useSearchNotes(folderNotes, searchQuery);
  const isActiveSearch = searchQuery.trim().length > 0;
  const displayNotes = isActiveSearch ? results.map((r) => r.note) : folderNotes;
  const matchMap = isActiveSearch
    ? new Map(results.map((r) => [r.note._id, r.matches]))
    : null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {folder?.name || "Folder"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {folderNotes.length} note{folderNotes.length !== 1 ? "s" : ""}
        </p>
      </div>

      {isActiveSearch && displayNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Search className="h-12 w-12 mb-3" />
          <p className="text-lg font-medium">No matching notes</p>
          <p className="text-sm">Try a different search term</p>
        </div>
      ) : folderNotes.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <FolderIcon className="h-12 w-12 mb-3" />
          <p className="text-lg font-medium">This folder is empty</p>
          <p className="text-sm">Move notes here or create a new note in this folder</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {displayNotes.map((note) => (
            <SingleNoteCard
              item={note}
              key={note._id}
              searchMatches={matchMap?.get(note._id) ?? null}
            />
          ))}
        </div>
      )}
    </div>
  );
}
