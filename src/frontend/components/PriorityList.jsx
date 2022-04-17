import React from "react";

export const priorityList = ["low", "medium", "high"];

export function PriorityList() {
  return (
    <>
      {priorityList.map((ele) => (
        <button className="tag-btn" key={ele}>
          {ele}
        </button>
      ))}
    </>
  );
}
