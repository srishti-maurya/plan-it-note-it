import "@/styles/index.css";
import { PageRoutes } from "./frontend/routes/PageRoutes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-context";
import { HabitsProvider, JournalProvider, SectionProvider } from "./frontend/context";

function App() {
  return (
    <ThemeProvider>
      <HabitsProvider>
        <JournalProvider>
          <SectionProvider>
            <TooltipProvider>
              <PageRoutes />
              <Toaster />
            </TooltipProvider>
          </SectionProvider>
        </JournalProvider>
      </HabitsProvider>
    </ThemeProvider>
  );
}

export default App;
