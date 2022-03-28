import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export function Signup() {
  const { signupInput, setSignupInput, signupHandler } = useAuth();

  const signupInputHandler = (e) => {
    const { name, value } = e.target;
    setSignupInput({ ...signupInput, [name]: value });
  };

  return (
    <>
      <section className="auth-container">
        <div className="auth-wrapper">
          <h2 className="text-center p-1 color-text-primary">Signup</h2>
          <form onSubmit={signupHandler}>
            <div className="auth-form-container">
              <div className="input-text-group pb-1">
                <label className="pb-05">
                  Full name<span className="color-text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  name="fullname"
                  value={signupInput.fullname || ""}
                  onChange={signupInputHandler}
                  required
                />
              </div>
              <div className="input-text-group pb-1">
                <label className="pb-05">
                  Email address<span className="color-text-error">*</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  name="email"
                  value={signupInput.email || ""}
                  onChange={signupInputHandler}
                  required
                />
              </div>
              <div className="input-text-group pb-1">
                <label className="pb-05">
                  Password<span className="color-text-error">*</span>{" "}
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={signupInput.password || ""}
                  onChange={signupInputHandler}
                  required
                />
              </div>
              <div className="input-text-group mb-2">
                <label className="pb-05">
                  Confirm password<span className="color-text-error">*</span>{" "}
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  name="cnfpassword"
                  value={signupInput.cnfpassword || ""}
                  onChange={signupInputHandler}
                  required
                />
              </div>
              <button className="btn btn-primary btn-full-width" type="submit">
                Create new account
              </button>
              <div className="text-center p-1 anchor-text">
                <Link to="/login" className="color-text-secondary">
                  Already have an account ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
