import React from "react";
import { useNotes } from "../context";
import { filteringByPriority, sortByDate, sortByPriority } from "../utils";
import { SingleNoteCard } from "./SingleNoteCard";

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
