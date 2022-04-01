import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdLabel,
  MdArchive,
  MdHome,
  MdDelete,
  MdAccountCircle,
} from "react-icons/md";
import { useNotes } from "../context";

export function SideBar() {
  const { isEditable, setIsEditable } = useNotes();

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
        <NavLink to="/profile" className={navLinkStyle}>
          <MdAccountCircle size={25} />
          <span> Profile</span>
        </NavLink>
        <button
          className="btn color-primary-outline"
          onClick={() => setIsEditable(!isEditable)}
        >
          + Add Note
        </button>
      </aside>
    </>
  );
}
