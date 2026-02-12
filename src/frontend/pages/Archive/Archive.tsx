import { useNotes } from "../../context";
import { ArchiveCard } from "../../components";

export function Archive() {
  const { state } = useNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Archive</h1>
        <p className="text-sm text-muted-foreground">
          {state.archiveList.length} archived note{state.archiveList.length !== 1 ? "s" : ""}
        </p>
      </div>
      <ArchiveCard />
    </div>
  );
}
