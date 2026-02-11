import "@/styles/index.css";
import { PageRoutes } from "./frontend/routes/PageRoutes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <PageRoutes />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
