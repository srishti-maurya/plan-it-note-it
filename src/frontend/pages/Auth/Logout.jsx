import React from "react";
import { Link } from "react-router-dom";
//assests
import { logout } from "../../assets";
//icons
import { FaCheckCircle } from "react-icons/fa";

export function Logout() {
  return (
    <>
      <section className="auth-container p-5">
        <div className="pb-2 logout-icon-wrapper">
          <img src={logout} alt="logout" />
        </div>

        <div className="alert color-bg-success mb-2">
          <span>
            <FaCheckCircle />
          </span>
          You have successfully logged out
        </div>
        <div className="back-to-home-link">
          <Link to="/" className="nav-links">
            Go Back
          </Link>
        </div>
      </section>
    </>
  );
}
