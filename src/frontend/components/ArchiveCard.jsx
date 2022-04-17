import React from "react";
//icons
import { MdDeleteOutline, MdOutlineUnarchive } from "react-icons/md";
//context
import { useNotes } from "../context";

export function ArchiveCard() {
  const { state, restoreArchiveNote, deleteArchiveNote } = useNotes();
  return (
    <>
      {state.archiveList.length < 1 ? (
        <h2>No Archived Notes found</h2>
      ) : (
        state.archiveList?.map((item) => (
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
              {item.tag === "" ? null : <p className="tag-title">{item.tag}</p>}
              <div className="notes-card-icons">
                <p className="text-xs color-text-grey padding-sm">
                  {item.createdAt}
                </p>
                <div
                  onClick={() => {
                    restoreArchiveNote(item);
                  }}
                >
                  <MdOutlineUnarchive />
                </div>
                <div
                  onClick={() => {
                    deleteArchiveNote(item);
                  }}
                >
                  <MdDeleteOutline />
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
}
