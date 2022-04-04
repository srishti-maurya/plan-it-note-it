import { Toaster } from "react-hot-toast";
//stylesheet
import "../src/frontend/styles/styles.css";
//components
import { Nav } from "./frontend/components";
//routes
import { PageRoutes } from "./frontend/routes/PageRoutes";

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
