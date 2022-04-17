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
import { ColorPalette } from "./ColorPalette";

function SingleNoteCard({ item }) {
  const {
    moveToTrash,
    setcurrNoteId,
    setIsEditable,
    setEditNoteCard,
    setUserInput,
    userInput,
    archiveNote,
  } = useNotes();
  const [isColorPalette, setIsColorPalette] = useState(false);
  return (
    <div
      className="notes-card"
      onClick={() => {
        setIsEditable(true);
        setEditNoteCard(true);
        setcurrNoteId(item._id);
        setUserInput({
          ...userInput,
          title: item.title,
          note: item.note,
          bgColor: item.bgColor,
        });
      }}
      style={{ backgroundColor: item.bgColor }}
    >
      <ul>
        <li>{item.title} </li>
        <li>{item.note}</li>
      </ul>
      <div>
        <p className="text-xs color-text-grey padding-sm">{item.createdAt}</p>
        <div className="notes-card-icons" onClick={(e) => e.stopPropagation()}>
          <div>
            <BsFillPinFill />
          </div>
          <div>
            <MdLabelOutline />
          </div>
          <div onClick={() => setIsColorPalette(!isColorPalette)}>
            {isColorPalette ? (
              <div className="color-palette-wrapper">
                <ColorPalette item={item} />
              </div>
            ) : null}
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
              moveToTrash(item);
            }}
          >
            <MdDeleteOutline />
          </div>
        </div>
      </div>
    </div>
  );
}

export { SingleNoteCard };
