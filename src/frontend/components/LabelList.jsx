import React from "react";
import { useNotes } from "../context";
import { SingleNoteCard } from "./SingleNoteCard";

export function LabelList() {
  const { state, usedTags } = useNotes();
  let uniqueTags = usedTags.filter(
    (item, index, usedTagsArr) => usedTagsArr.indexOf(item) === index
  );
  return (
    <>
      {uniqueTags.length < 0 ? (
        uniqueTags?.map((currTag) => {
          const filteredNotes = state.notesList?.filter(
            (currItem) => currItem.tag === currTag
          );
          return (
            <>
              {filteredNotes.length > 0 ? (
                <div className="notes-input-wrapper">
                  <h3 className="padding-sm">{currTag}</h3>
                  {filteredNotes.map((ele) => (
                    <>
                      <div className="notes-card-wrapper">
                        <SingleNoteCard item={ele} />
                      </div>
                    </>
                  ))}
                </div>
              ) : null}
            </>
          );
        })
      ) : (
        <h2>No Notes found</h2>
      )}
    </>
  );
}
