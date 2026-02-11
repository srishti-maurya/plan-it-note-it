import { useNotes } from "../context";
import type { Note } from "../../types";

export const tagsList = [
  "Personal",
  "Work",
  "Ideas",
  "Finance",
  "Health",
  "Learning",
  "Errands",
];

interface Props {
  item: Note;
}

export function Tags({ item }: Props) {
  const { setUserInput, state, editNote, usedTags, setUsedTags } = useNotes();
  const matchedNote = state.notesList.find((ele) => ele._id === item._id);

  return (
    <div className="flex flex-col gap-1">
      {tagsList.map((currTag) => (
        <button
          className="rounded-md px-2.5 py-1 text-xs text-left transition-colors hover:bg-accent hover:text-accent-foreground"
          key={currTag}
          onClick={() => {
            if (matchedNote) {
              setUserInput({ ...matchedNote, tag: currTag });
              editNote({ ...matchedNote, tag: currTag }, item._id);
              setUsedTags([...usedTags, currTag]);
            }
          }}
        >
          {currTag}
        </button>
      ))}
    </div>
  );
}
