import { Link } from "react-router-dom";
import React from "react";
import { logo } from "../assets";
import { useAuth } from "../context/auth-context";

export function Nav() {
  const { isLoggedIn, logoutHandler, navigate } = useAuth();
  return (
    <>
      <div className="navigation-container">
        <Link to="/">
          <img src={logo} alt="logo" className="logo" />
        </Link>
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
