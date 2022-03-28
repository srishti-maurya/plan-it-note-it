import React from "react";
import { logo } from "../assets";

export function Nav() {
  return (
    <>
      <div className="navigation-container">
        <div>
          <img src={logo} alt="logo" className="logo" />
        </div>
        <button className="navigation-sidebar-toggle">
          <i className="fas fa-bars fa-2x"></i>
        </button>
        <div className="navigation-tools">
          <button className="btn color-secondary-outline btn-sm">Login</button>
        </div>
      </div>
    </>
  );
}
