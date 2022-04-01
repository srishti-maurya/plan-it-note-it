import React from "react";
import { useNotes } from "../context";
import { BsFillPinFill } from "react-icons/bs";
import {
  MdOutlineArchive,
  MdLabelOutline,
  MdDeleteOutline,
} from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";

export function NoteCard() {
  const {
    state,
    deleteNote,
    isEditable,
    setIsEditable,
    dispatch,
    setEditNoteCard,
  } = useNotes();
  return (
    <>
      {state.notesList?.map((item) => (
        <div
          className="notes-card"
          key={item._id}
          onClick={() => {
            setIsEditable(!isEditable);
            setEditNoteCard(true);
            dispatch({ type: "EDIT_NOTE", payload: item });
          }}
        >
          <ul>
            <li>{item.title} </li>
            <li>{item.note}</li>
          </ul>
          <div>
            <p className="text-xs color-text-grey padding-sm">
              {item.createdTime}
            </p>
            <div className="notes-card-icons">
              <div>
                <BsFillPinFill />
              </div>
              <div>
                <MdLabelOutline />
              </div>
              <div>
                <IoColorPaletteOutline />
              </div>
              <div>
                <MdOutlineArchive />
              </div>
              <div onClick={() => deleteNote(item._id)}>
                <MdDeleteOutline />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
