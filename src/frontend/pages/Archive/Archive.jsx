import React from "react";
//components
import { SideBar, ArchiveCard, NoteModal } from "../../components";

export function Archive() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="notes-input-wrapper">
          <div className="notes-card-wrapper">
            <NoteModal />
            <ArchiveCard />
          </div>
        </div>
      </div>
    </>
  );
}
