import React from "react";
import { useNotes } from "../context";
import { SingleNoteCard } from "./SingleNoteCard";

export function NoteCard() {
  const { state } = useNotes();
  return (
    <>
      {state.notesList.length < 1 ? (
        <h2>No Notes found</h2>
      ) : (
        state.notesList?.map((item) => (
          <SingleNoteCard item={item} key={item._id} />
        ))
      )}
    </>
  );
}
