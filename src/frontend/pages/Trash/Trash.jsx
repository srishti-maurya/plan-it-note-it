import React from "react";
//components
import { SideBar, NoteModal, TrashCard } from "../../components";

export function Trash() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="notes-input-wrapper">
          <div className="notes-card-wrapper">
            <NoteModal />
            <TrashCard />
          </div>
        </div>
      </div>
    </>
  );
}
