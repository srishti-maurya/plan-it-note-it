import { Nav } from "./frontend/components/Nav";
import "../src/frontend/styles/styles.css";
import { PageRoutes } from "./frontend/routes/PageRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Nav />
      <Toaster position="bottom-right" />
      <PageRoutes />
    </div>
  );
}

export default App;
