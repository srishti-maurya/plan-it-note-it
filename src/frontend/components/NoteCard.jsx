import React from "react";
//icons
import { BsFillPinFill } from "react-icons/bs";
import {
  MdOutlineArchive,
  MdLabelOutline,
  MdDeleteOutline,
} from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
//context
import { useNotes } from "../context";

export function NoteCard() {
  const {
    state,
    deleteNote,
    setcurrNoteId,
    setIsEditable,
    setEditNoteCard,
    setUserInput,
    userInput,
  } = useNotes();

  return (
    <>
      {state.notesList?.map((item) => (
        <div
          className="notes-card"
          key={item._id}
          onClick={() => {
            setIsEditable(true);
            setEditNoteCard(true);
            setcurrNoteId(item._id);
            setUserInput({ ...userInput, title: item.title, note: item.note });
          }}
        >
          <ul>
            <li>{item.title} </li>
            <li>{item.note}</li>
          </ul>
          <div>
            <p className="text-xs color-text-grey padding-sm">
              {item.createdAt}
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
              <div
                onClick={(e) => {
                  deleteNote(item._id);
                  e.stopPropagation();
                }}
              >
                <MdDeleteOutline />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
