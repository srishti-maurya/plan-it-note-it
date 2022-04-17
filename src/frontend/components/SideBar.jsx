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
          <span className="flex-center">
            <MdHome size={25} /> <span> Home</span>
          </span>
        </NavLink>
        <NavLink to="/labels" className={navLinkStyle}>
          <span className="flex-center">
            <MdLabel size={25} /> <span> Labels</span>
          </span>
        </NavLink>
        <NavLink to="/archive" className={navLinkStyle}>
          <span className="flex-center">
            <MdArchive size={25} />
            <span> Archive</span>
          </span>
        </NavLink>
        <NavLink to="/trash" className={navLinkStyle}>
          <span className="flex-center">
            <MdDelete size={25} />
            <span> Trash</span>
          </span>
        </NavLink>

        {location.pathname === "/home" ? (
          <button
            className="btn color-primary-outline"
            onClick={() => {
              setIsEditable(true);
              setUserInput({
                ...userInput,
                title: "",
                note: "",
                bgColor: "",
                tag: "",
              });
            }}
          >
            + Add Note
          </button>
        ) : null}
      </aside>
    </>
  );
}
