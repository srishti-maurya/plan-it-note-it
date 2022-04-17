export const sortByDate = (notes, sortBy) => {
  if (sortBy === "latest") {
    return [...notes].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (sortBy === "oldest") {
    return [...notes].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }
  return notes;
};
