import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  LandingPage,
  Home,
  Archive,
  Login,
  Logout,
  Signup,
  Labels,
  Profile,
  Trash,
} from "../pages";
import { PrivateRoute } from "./PrivateRoute";

export function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="labels" element={<Labels />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trash" element={<Trash />} />
          <Route path="home" element={<Home />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </>
  );
}
