import { useNotes } from "../../context";
import { TrashCard } from "../../components";

export function Trash() {
  const { state } = useNotes();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trash</h1>
        <p className="text-sm text-muted-foreground">
          {state.trashList.length} trashed note{state.trashList.length !== 1 ? "s" : ""}
        </p>
      </div>
      <TrashCard />
    </div>
  );
}
