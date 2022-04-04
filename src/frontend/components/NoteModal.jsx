import React from "react";
//context
import { useNotes } from "../context";

export function NoteModal() {
  const {
    addNewNote,
    getTime,
    isEditable,
    setIsEditable,
    editNoteCard,
    setEditNoteCard,
    editNote,
    userInput,
    setUserInput,
    currNoteId,
  } = useNotes();
  return (
    <div>
      {isEditable ? (
        <div className="modal modal-interstitial">
          <div className="notes-input-container">
            <input
              type="text"
              className="text-base padding-xs"
              placeholder="Title"
              name="title"
              value={userInput.title}
              onChange={(e) =>
                setUserInput({ ...userInput, title: e.target.value })
              }
            />
            <textarea
              className=" padding-xs my-1"
              placeholder="Take a note..."
              name="note"
              value={userInput.note}
              onChange={(e) => {
                setUserInput({
                  ...userInput,
                  note: e.target.value,
                  createdAt: getTime,
                });
              }}
            />
            <div className="btn-wrapper">
              <button
                onClick={() => {
                  setIsEditable(false);
                  setEditNoteCard(!editNoteCard);
                }}
                type="button"
                className="btn btn-sm color-secondary-outline"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-sm"
                onClick={() => {
                  setIsEditable(false);
                  editNoteCard
                    ? editNote(userInput, currNoteId)
                    : addNewNote(userInput);
                }}
              >
                {editNoteCard ? "edit" : "save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
