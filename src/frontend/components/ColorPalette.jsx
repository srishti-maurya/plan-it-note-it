import React from "react";
import { useNotes } from "../context";

export function ColorPalette({ item }) {
  const { setUserInput, editNote, state } = useNotes();
  const colorPalette = [
    "#F7ECDE",
    "#F0FFC2",
    "#FFE4C0",
    "#FFBBBB",
    "#D6E5FA",
    "#f0f2f4",
  ];
  const matchedNote = state.notesList.find((ele) => ele._id === item._id);
  return colorPalette.map((color) => (
    <button
      className="btn btn-sm round-pill"
      key={color}
      onClick={() => {
        setUserInput({ ...matchedNote, bgColor: color });
        editNote({ ...matchedNote, bgColor: color }, item._id);
      }}
      style={{ backgroundColor: color }}
    ></button>
  ));
}
