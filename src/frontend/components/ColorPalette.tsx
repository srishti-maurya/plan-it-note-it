import { useNotes } from "../context";
import type { Note } from "../../types";
import { cn } from "@/lib/utils";

const colorPalette = [
  "#E8E0F0",
  "#DEE8D5",
  "#F0D8DA",
  "#D4E4F1",
  "#F0E0D0",
  "#E8E6E3",
];

interface Props {
  item: Note;
}

export function ColorPalette({ item }: Props) {
  const { setUserInput, editNote, state } = useNotes();
  const matchedNote = state.notesList.find((ele) => ele._id === item._id);

  return (
    <div className="flex gap-1">
      {colorPalette.map((color) => (
        <button
          className={cn(
            "h-7 w-7 rounded-full border-2 transition-all hover:scale-110",
            item.bgColor === color
              ? "border-ring ring-2 ring-ring"
              : "border-transparent"
          )}
          key={color}
          onClick={() => {
            if (matchedNote) {
              setUserInput({ ...matchedNote, bgColor: color });
              editNote({ ...matchedNote, bgColor: color }, item._id);
            }
          }}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
