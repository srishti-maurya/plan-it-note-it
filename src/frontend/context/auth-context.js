import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      setToken(data.encodedToken);
      setIsLoggedIn(true);
      //   setTimeout(() => {
      navigate("/home");
      setLoginInput({ email: "", password: "" });
      //   }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const logoutHandler = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
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
      setToken(data.encodedToken);
      setIsLoggedIn(true);
      //   setTimeout(() => {
      navigate("/");
      setSignupInput({
        fullname: "",
        email: "",
        password: "",
        cnfpassword: "",
      });
      //   }, 2000);
    } catch (error) {
      console.log(error);
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
