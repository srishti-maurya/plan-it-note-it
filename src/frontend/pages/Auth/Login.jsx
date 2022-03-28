import React from "react";
import "./authStyles.css";

export function Login() {
  return (
    <>
      <section className="auth-container">
        <div className="auth-wrapper">
          <h2 className="text-center p-1 color-text-primary">Login</h2>
          <form>
            <div className="auth-form-container">
              <div className="input-text-group pb-1">
                <label className="pb-05">Email address</label>
                <input
                  type="text"
                  placeholder="Enter your email address"
                  name="email"
                  required
                />
              </div>
              <div className="input-text-group">
                <label className="pb-05">Password </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  required
                />
              </div>
              <div>
                <button className="btn color-secondary-outline btn-full-width margin-sm">
                  Login with test credentials
                </button>
                <button
                  className="btn btn-primary btn-full-width"
                  type="submit"
                >
                  Login
                </button>
              </div>
              <div className="text-center p-1 anchor-text">
                <p>Create new account</p>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
