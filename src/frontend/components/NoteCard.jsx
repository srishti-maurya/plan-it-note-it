import React from "react";
import { useNotes } from "../context";
import { SingleNoteCard } from "./SingleNoteCard";

const filteringByPriority = (notes, filter) => {
  if (filter) {
    return [...notes].filter(
      (note) => Object.values(note.priority)[0] === Object.values(filter)[0]
    );
  }
  return notes;
};

const sortByDate = (notes, sortBy) => {
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

const sortByPriority = (notes, sortBy) => {
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

export function NoteCard() {
  const { state, notesOrder } = useNotes();

  const sortedByDate = sortByDate(state.notesList, notesOrder.sort);

  const sortedByPriority = sortByPriority(sortedByDate, notesOrder.sort);

  const filterByPriority = filteringByPriority(
    sortedByPriority,
    notesOrder.filter
  );

  const filteredNotes = filterByPriority;

  return (
    <>
      {state.notesList.length < 1 ? (
        <h2>No Notes found</h2>
      ) : (
        filteredNotes?.map((item) => (
          <SingleNoteCard item={item} key={item._id} />
        ))
      )}
    </>
  );
}
