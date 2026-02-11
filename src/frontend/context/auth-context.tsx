import { createContext, useContext, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginToast, logoutToast, signupToast } from "../utils/toasts";
import type { AuthContextType, LoginInput, SignupInput } from "../../types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | string>(
    localStorage.getItem("isLoggedIn") || false
  );
  const [loginInput, setLoginInput] = useState<LoginInput>({});
  const [signupInput, setSignupInput] = useState<SignupInput>({});

  const loginRequest = (input: LoginInput) => {
    return axios.post(`/api/auth/login`, input);
  };

  const loginHandler = async (e: React.FormEvent) => {
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

  const signupRequest = (input: SignupInput) => {
    return axios.post(`/api/auth/signup`, input);
  };

  const signupHandler = async (e: React.FormEvent) => {
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
