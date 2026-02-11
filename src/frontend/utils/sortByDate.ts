import type { Note } from "../../types";

export const sortByDate = (notes: Note[], sortBy: string) => {
  if (sortBy === "latest") {
    return [...notes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortBy === "oldest") {
    return [...notes].sort(
      (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  return notes;
};
