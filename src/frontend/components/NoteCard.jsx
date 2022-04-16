import React, { useState } from "react";
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
    archiveNote,
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
            <div
              className="notes-card-icons"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <BsFillPinFill />
              </div>
              <div>
                <MdLabelOutline />
              </div>
              <div>
                <IoColorPaletteOutline />
              </div>
              <div
                onClick={() => {
                  archiveNote(item);
                }}
              >
                <MdOutlineArchive />
              </div>
              <div
                onClick={() => {
                  deleteNote(item);
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
