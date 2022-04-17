import React from "react";
import { useNotes } from "../context";

export const priorityList = [{ low: "1" }, { medium: "2" }, { high: "3" }];

export function PriorityList({ item }) {
  const { state, setUserInput, editNote } = useNotes();
  const matchedNote = state.notesList.find((ele) => ele._id === item._id);
  return (
    <>
      {priorityList.map((ele) => (
        <button
          className="tag-btn"
          key={Object.keys(ele)[0]}
          onClick={() => {
            setUserInput({ ...matchedNote, priority: ele });
            editNote({ ...matchedNote, priority: ele }, item._id);
          }}
        >
          {Object.keys(ele)[0]}
        </button>
      ))}
    </>
  );
}
