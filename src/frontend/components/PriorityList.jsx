import React from "react";
import { useNotes } from "../context";

export const priorityList = ["low", "medium", "high"];

export function PriorityList({ item }) {
  const { state, setUserInput, editNote } = useNotes();
  const matchedNote = state.notesList.find((ele) => ele._id === item._id);
  return (
    <>
      {priorityList.map((ele) => (
        <button
          className="tag-btn"
          key={ele}
          onClick={() => {
            setUserInput({ ...matchedNote, priority: ele });
            editNote({ ...matchedNote, priority: ele }, item._id);
          }}
        >
          {ele}
        </button>
      ))}
    </>
  );
}
