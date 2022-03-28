import { Nav } from "./frontend/components/Nav";
import "../src/frontend/styles/styles.css";
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
} from "./frontend/pages";

function App() {

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="home" element={<Home />} />
        <Route path="archive" element={<Archive />} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
        <Route path="labels" element={<Labels />} />
        <Route path="profile" element={<Profile />} />
        <Route path="trash" element={<Trash />} />
      </Routes>
    </div>
  );
}

export default App;
