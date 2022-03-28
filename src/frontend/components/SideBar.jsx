import React from "react";
import { NavLink } from "react-router-dom";
import {
  BsFillArchiveFill,
  BsFillBookmarksFill,
  BsFillHouseFill,
  BsFillTrashFill,
  BsFillPersonFill,
} from "react-icons/bs";

export function SideBar() {
  return (
    <>
      <aside className="aside-bar font-semibold text-lg">
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? "active" : "aside-link")}
        >
          <BsFillHouseFill /> <span> Home</span>
        </NavLink>
        <NavLink
          to="/labels"
          className={({ isActive }) => (isActive ? "active" : "aside-link")}
        >
          <BsFillBookmarksFill /> <span> Labels</span>
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) => (isActive ? "active" : "aside-link")}
        >
          <BsFillArchiveFill />
          <span> Archive</span>
        </NavLink>
        <NavLink
          to="/trash"
          className={({ isActive }) => (isActive ? "active" : "aside-link")}
        >
          <BsFillTrashFill />
          <span> Trash</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "active" : "aside-link")}
        >
          <BsFillPersonFill />
          <span> Profile</span>
        </NavLink>
        <button className="btn btn-sm color-primary-outline">+ Add Note</button>
      </aside>
    </>
  );
}
