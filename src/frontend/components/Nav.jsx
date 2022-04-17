import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
//assests
import { logo } from "../assets";
//context
import { useAuth } from "../context";
// icons
import { MdOutlineFilterAlt } from "react-icons/md";
import { FilterList } from "./FilterList";

export function Nav() {
  const { isLoggedIn, logoutHandler, navigate } = useAuth();
  const location = useLocation();
  const [isFilterOption, setIsFilterOption] = useState(false);

  return (
    <>
      <div className="navigation-container">
        <div className="navigation-links">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Link to="/home" className="nav-links">
            Home
          </Link>
        </div>
        <button className="navigation-sidebar-toggle">
          <i className="fas fa-bars fa-2x"></i>
        </button>

        <div className="navigation-tools">
          {location.pathname === "/home" ? (
            <>
              <div
                className="cursor-pointer"
                onClick={() => setIsFilterOption(!isFilterOption)}
              >
                {isFilterOption ? <FilterList /> : null}
                <MdOutlineFilterAlt size={25} />
              </div>
            </>
          ) : null}
          {isLoggedIn ? (
            <>
              <button className="btn btn-sm primary" onClick={logoutHandler}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="btn btn-sm primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
