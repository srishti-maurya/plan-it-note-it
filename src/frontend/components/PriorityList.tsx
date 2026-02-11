import { useNotes } from "../context";
import type { Note, Priority } from "../../types";
import { cn } from "@/lib/utils";

export const priorityList: Priority[] = [
  { low: "1" },
  { medium: "2" },
  { high: "3" },
];

interface Props {
  item: Note;
}

export function PriorityList({ item }: Props) {
  const { state, setUserInput, editNote } = useNotes();
  const matchedNote = state.notesList.find((ele) => ele._id === item._id);

  return (
    <div className="flex flex-col gap-1">
      {priorityList.map((ele) => {
        const key = Object.keys(ele)[0];
        return (
          <button
            className={cn(
              "flex items-center gap-2 rounded-md px-2.5 py-1 text-xs capitalize transition-colors hover:bg-accent hover:text-accent-foreground",
            )}
            key={key}
            onClick={() => {
              if (matchedNote) {
                setUserInput({ ...matchedNote, priority: ele });
                editNote({ ...matchedNote, priority: ele }, item._id);
              }
            }}
          >
            <span
              className={cn(
                "h-2 w-2 rounded-full",
                key === "low" && "bg-green-500",
                key === "medium" && "bg-yellow-500",
                key === "high" && "bg-red-500"
              )}
            />
            {key}
          </button>
        );
      })}
    </div>
  );
}
