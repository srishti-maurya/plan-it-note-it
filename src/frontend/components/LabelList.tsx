import { Tags } from "lucide-react";
import { useNotes } from "../context";
import { SingleNoteCard } from "./SingleNoteCard";
import { getEffectiveTags } from "../utils/getEffectiveTags";
import { Separator } from "@/components/ui/separator";

export function LabelList() {
  const { state, usedTags } = useNotes();
  const uniqueTags = usedTags.filter(
    (item, index, arr) => arr.indexOf(item) === index
  );

  if (uniqueTags.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Tags className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">No labels yet</p>
        <p className="text-sm">Add labels to your notes to see them here</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {uniqueTags.map((currTag) => {
        const filteredNotes = state.notesList?.filter((currItem) =>
          getEffectiveTags(currItem).includes(currTag)
        );
        if (filteredNotes.length === 0) return null;
        return (
          <div key={currTag}>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {currTag}
            </h3>
            <Separator className="mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredNotes.map((ele) => (
                <SingleNoteCard item={ele} key={ele._id} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
