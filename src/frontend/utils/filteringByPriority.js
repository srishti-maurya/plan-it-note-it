export const filteringByPriority = (notes, filter) => {
  if (filter) {
    return [...notes].filter(
      (note) => Object.values(note.priority)[0] === Object.values(filter)[0]
    );
  }
  return notes;
};
