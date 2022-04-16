import React from "react";
import { NavLink, useLocation } from "react-router-dom";
//icons
import { MdLabel, MdArchive, MdHome, MdDelete } from "react-icons/md";
//context
import { useNotes } from "../context";

export function SideBar() {
  const { setIsEditable, setUserInput, userInput } = useNotes();
  const location = useLocation();

  const navLinkStyle = ({ isActive }) => (isActive ? "active" : "aside-link");

  return (
    <>
      <aside className="aside-bar font-semibold text-lg">
        <NavLink to="/home" className={navLinkStyle}>
          <MdHome size={25} /> <span> Home</span>
        </NavLink>
        <NavLink to="/labels" className={navLinkStyle}>
          <MdLabel size={25} /> <span> Labels</span>
        </NavLink>
        <NavLink to="/archive" className={navLinkStyle}>
          <MdArchive size={25} />
          <span> Archive</span>
        </NavLink>
        <NavLink to="/trash" className={navLinkStyle}>
          <MdDelete size={25} />
          <span> Trash</span>
        </NavLink>

        {location.pathname === "/home" ? (
          <button
            className="btn color-primary-outline"
            onClick={() => {
              setIsEditable(true);
              setUserInput({ ...userInput, title: "", note: "" });
            }}
          >
            + Add Note
          </button>
        ) : null}
      </aside>
    </>
  );
}
