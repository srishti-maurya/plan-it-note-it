import React from "react";
import { Link } from "react-router-dom";
//stylesheet
import "./authStyles.css";
//context
import { useAuth } from "../../context";

export function Login() {
  const { loginHandler, loginInput, setLoginInput } = useAuth();

  const loginInputHandler = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const testCredentialsLogin = () => {
    setLoginInput({
      email: "srishtimaurya@gmail.com",
      password: "srishtimaurya",
    });
  };

  return (
    <>
      <section className="auth-container">
        <div className="auth-wrapper">
          <h2 className="text-center p-1 color-text-primary">Login</h2>
          <form onSubmit={loginHandler}>
            <div className="auth-form-container">
              <div className="input-text-group pb-1">
                <label className="pb-05">
                  Email address<span className="color-text-error">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your email address"
                  name="email"
                  value={loginInput.email || ""}
                  onChange={loginInputHandler}
                  required
                />
              </div>
              <div className="input-text-group">
                <label className="pb-05">
                  Password<span className="color-text-error">*</span>{" "}
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={loginInput.password || ""}
                  onChange={loginInputHandler}
                  required
                />
              </div>
              <button
                className="btn color-primary-outline btn-full-width btn-sm margin-sm mt-05"
                onClick={testCredentialsLogin}
              >
                Login with test credentials
              </button>
              <button
                className="btn btn-primary btn-full-width btn-sm"
                type="submit"
              >
                Login
              </button>
              <div className="text-center p-1 anchor-text">
                <Link to="/signup">Create new account ?</Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
