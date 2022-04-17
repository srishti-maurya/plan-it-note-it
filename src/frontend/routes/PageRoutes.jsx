import React from "react";
import { Routes, Route } from "react-router-dom";
//routes
import { PrivateRoute } from "./PrivateRoute";
//pages
import {
  LandingPage,
  Home,
  Archive,
  Login,
  Logout,
  Signup,
  Labels,
  Trash,
  NotFound,
} from "../pages";

export function PageRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/*" element={<NotFound />} />
        <Route element={<PrivateRoute />}>
          <Route path="labels" element={<Labels />} />
          <Route path="trash" element={<Trash />} />
          <Route path="home" element={<Home />} />
          <Route path="archive" element={<Archive />} />
        </Route>
      </Routes>
    </>
  );
}
