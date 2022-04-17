import React, { useState } from "react";
//icons
import {
  MdOutlineArchive,
  MdLabelOutline,
  MdDeleteOutline,
  MdLowPriority,
} from "react-icons/md";
import { IoColorPaletteOutline } from "react-icons/io5";
//context
import { useNotes } from "../context";
import { ColorPalette } from "./ColorPalette";
import { Tags } from "./Tags";
import { PriorityList } from "./PriorityList";

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
  const [isTagOptions, setIsTagOptions] = useState(false);
  const [isPriorityOptions, setIsPriorityOptions] = useState(false);
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
          tag: item.tag,
          priority: item.priority,
        });
      }}
      style={{ backgroundColor: item.bgColor }}
    >
      <ul>
        <li>{item.title} </li>
        <li>{item.note}</li>
      </ul>
      <div>
        {item.tag === "" ? null : <p className="tag-title">{item.tag}</p>}
        {item.priority === "" ? null : (
          <p className="priority-title">{item.priority}</p>
        )}
        <p className="text-xs color-text-grey padding-sm">{item.createdAt}</p>
        <div className="notes-card-icons" onClick={(e) => e.stopPropagation()}>
          <div onClick={() => setIsPriorityOptions(!isPriorityOptions)}>
            {isPriorityOptions ? (
              <div className="tag-options-wrapper priority-option">
                <PriorityList item={item} />
              </div>
            ) : null}
            <MdLowPriority />
          </div>
          <div onClick={() => setIsTagOptions(!isTagOptions)}>
            {isTagOptions ? (
              <div className="tag-options-wrapper tag-option">
                <Tags item={item} />
              </div>
            ) : null}
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
