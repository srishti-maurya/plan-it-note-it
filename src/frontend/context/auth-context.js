import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//utils
import { loginToast, logoutToast, signupToast } from "../utils/toasts";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") || false
  );
  const [loginInput, setLoginInput] = useState({});
  const [signupInput, setSignupInput] = useState({});

  const loginRequest = (input) => {
    return axios.post(`/api/auth/login`, input);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginRequest(loginInput);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      loginToast();
      setToken(data.encodedToken);
      setIsLoggedIn(true);
      navigate("/home");
      setLoginInput({ email: "", password: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    logoutToast();
    setIsLoggedIn(false);
    navigate("/logout");
  };

  const signupRequest = (input) => {
    return axios.post(`/api/auth/signup`, input);
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signupRequest(signupInput);
      localStorage.setItem("token", JSON.stringify(data.encodedToken));
      localStorage.setItem("isLoggedIn", JSON.stringify(true));
      signupToast();
      setToken(data.encodedToken);
      setIsLoggedIn(true);
      navigate("/");
      setSignupInput({
        fullname: "",
        email: "",
        password: "",
        cnfpassword: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        loginInput,
        setLoginInput,
        loginHandler,
        logoutHandler,
        navigate,
        signupInput,
        setSignupInput,
        signupHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
