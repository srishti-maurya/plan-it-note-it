import React from "react";
import { useNotes } from "../context";
export const tagsList = [
  "toDo",
  "grocery",
  "projects",
  "shopping",
  "expense",
  "personal",
  "work",
];
export function Tags({ item }) {
  const { setUserInput, state, editNote, usedTags, setUsedTags } = useNotes();

  const matchedNote = state.notesList.find((ele) => ele._id === item._id);
  return tagsList.map((currTag) => (
    <button
      className="tag-btn"
      key={currTag}
      onClick={() => {
        setUserInput({ ...matchedNote, tag: currTag });
        editNote({ ...matchedNote, tag: currTag }, item._id);
        setUsedTags([...usedTags, currTag]);
      }}
    >
      {currTag}
    </button>
  ));
}
