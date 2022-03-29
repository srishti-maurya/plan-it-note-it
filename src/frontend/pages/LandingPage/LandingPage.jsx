import React from "react";
import { hero } from "../../assets";
import { Link, useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  return (
    <>
      <section className="hero-section">
        <div className="pt-1">
          <p className="m-1 text-right text-4xl font-bold color-text-primary">
            Plan it, Note it
          </p>
          <p className="m-1 text-right text-xl">
            Are you planning to manage your everyday tasks and workflow in an
            advanced approach to increase your productivity without putting in
            any effort?
          </p>
          <p className="m-1 text-right text-xl color-text-secondary">
            Don't worry, we've got you covered; plan and manage your task with
            us.
          </p>
          <div className="hero-btn-group">
            <button
              className="btn color-primary"
              onClick={() => navigate("/signup")}
            >
              Join now
            </button>
            <Link to="/login" className="color-text-secondary">
              Already have an account ?
            </Link>
          </div>
        </div>

        <img src={hero} alt="hero" className="hero-img" />
      </section>
    </>
  );
}
