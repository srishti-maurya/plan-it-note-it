import React from "react";
//components
import { LabelList, SideBar } from "../../components";

export function Labels() {
  return (
    <>
      <div className="page-container">
        <SideBar />
        <div className="notes-input-wrapper">
          <div className="notes-card-wrapper">
            <LabelList />
          </div>
        </div>
      </div>
    </>
  );
}
