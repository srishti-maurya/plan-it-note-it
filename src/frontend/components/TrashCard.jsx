import React from "react";
//icons
import { MdRestoreFromTrash, MdDeleteForever } from "react-icons/md";
//context
import { useNotes } from "../context";

export function TrashCard() {
  const { state, restoreFromTrash, deleteNoteFromTrash } = useNotes();
  return (
    <>
      {state.trashList?.map((item) => (
        <div
          className="notes-card"
          key={item._id}
          style={{ backgroundColor: item.bgColor }}
        >
          <ul>
            <li>{item.title} </li>
            <li>{item.note}</li>
          </ul>
          <div>
            <div className="notes-card-icons">
              <p className="text-xs color-text-grey padding-sm">
                {item.createdAt}
              </p>
              <div
                onClick={() => {
                  restoreFromTrash(item);
                }}
              >
                <MdRestoreFromTrash />
              </div>
              <div
                onClick={() => {
                  deleteNoteFromTrash(item);
                }}
              >
                <MdDeleteForever />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
