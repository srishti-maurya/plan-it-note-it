import { Nav } from "./frontend/components/Nav";
import "../src/frontend/styles/styles.css";
import { PageRoutes } from "./frontend/routes/PageRoutes";

function App() {
  return (
    <div className="App">
      <Nav />
      <PageRoutes />
    </div>
  );
}

export default App;
