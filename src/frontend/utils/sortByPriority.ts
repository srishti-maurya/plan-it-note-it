import type { Note } from "../../types";

export const sortByPriority = (notes: Note[], sortBy: string) => {
  if (sortBy === "highToLow") {
    return [...notes].sort(
      (a, b) => Number(Object.values(b.priority)[0]) - Number(Object.values(a.priority)[0])
    );
  } else if (sortBy === "lowToHigh") {
    return [...notes].sort(
      (a, b) => Number(Object.values(a.priority)[0]) - Number(Object.values(b.priority)[0])
    );
  }
  return notes;
};
