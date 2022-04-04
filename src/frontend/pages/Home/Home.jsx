import React from "react";
//components
import { SideBar, NoteCard, NoteModal } from "../../components";

export function Home() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="notes-input-wrapper">
          <div className="notes-card-wrapper">
            <NoteModal />
            <NoteCard />
          </div>
        </div>
      </div>
    </>
  );
}
