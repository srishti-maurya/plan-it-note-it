import React from "react";
import { Link } from "react-router-dom";
//assests
import { logo } from "../assets";
//context
import { useAuth } from "../context"

export function Nav() {
  const { isLoggedIn, logoutHandler, navigate } = useAuth();
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
