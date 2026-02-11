import { Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { AppShell } from "../components/AppShell";
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
  FolderView,
  Recent,
  Favorites,
} from "../pages";

export function PageRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      <Route path="logout" element={<Logout />} />
      <Route path="/*" element={<NotFound />} />
      <Route element={<PrivateRoute />}>
        <Route element={<AppShell />}>
          <Route path="home" element={<Home />} />
          <Route path="labels" element={<Labels />} />
          <Route path="archive" element={<Archive />} />
          <Route path="trash" element={<Trash />} />
          <Route path="folders/:folderId" element={<FolderView />} />
          <Route path="recent" element={<Recent />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
      </Route>
    </Routes>
  );
}
