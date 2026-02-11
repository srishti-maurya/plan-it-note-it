import type { Note } from "../../types";

export const filteringByPriority = (notes: Note[], filter: string | { [key: string]: string }) => {
  if (filter) {
    return [...notes].filter(
      (note) => Object.values(note.priority)[0] === Object.values(filter as Record<string, string>)[0]
    );
  }
  return notes;
};
