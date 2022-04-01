import React from "react";
import { NoteCard } from "../../components/NoteCard";
import { SideBar } from "../../components/SideBar";
import { useNotes } from "../../context";

export function Home() {
  const {
    state,
    dispatch,
    addNewNote,
    getTime,
    isEditable,
    setIsEditable,
    editNoteCard,
    editNote,
  } = useNotes();

  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="notes-input-wrapper">
          <div>
            {isEditable ? (
              <div className="modal modal-interstitial">
                <div className="notes-input-container">
                  <input
                    type="text"
                    className="text-base padding-xs"
                    placeholder="Title"
                    name="title"
                    value={state.title}
                    onChange={(e) =>
                      dispatch({
                        type: "ADD_NOTE",
                        payload: {
                          ...state,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <textarea
                    className=" padding-xs my-1"
                    placeholder="Take a note..."
                    name="note"
                    value={state.note}
                    onChange={(e) => {
                      dispatch({
                        type: "ADD_NOTE",
                        payload: {
                          note: e.target.value,
                          title: state.title,
                          createdTime: getTime,
                        },
                      });
                    }}
                  />
                  <div className="btn-wrapper">
                    <button
                      onClick={() => setIsEditable(!isEditable)}
                      type="button"
                      className="btn btn-sm color-secondary-outline"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => {
                        setIsEditable(!isEditable);
                        editNoteCard
                          ? editNote({
                              ...state,
                              title: state.title,
                              note: state.note,
                              createdTime: state.createdTime,
                              _id: state._id,
                            })
                          : addNewNote({
                              title: state.title,
                              note: state.note,
                              createdTime: state.createdTime,
                            });
                      }}
                    >
                      {editNoteCard ? "edit" : "save"}
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          <div className="notes-card-wrapper">
            <NoteCard />
          </div>
        </div>
      </div>
    </>
  );
}
