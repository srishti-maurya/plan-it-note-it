export const sortByPriority = (notes, sortBy) => {
  if (sortBy === "highToLow") {
    return [...notes].sort(
      (a, b) => Object.values(b.priority)[0] - Object.values(a.priority)[0]
    );
  } else if (sortBy === "lowToHigh") {
    return [...notes].sort(
      (a, b) => Object.values(a.priority)[0] - Object.values(b.priority)[0]
    );
  }
  return notes;
};
