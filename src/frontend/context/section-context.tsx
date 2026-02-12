import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { AppSection } from "../../types";

interface SectionContextType {
  activeSection: AppSection;
  setActiveSection: (section: AppSection) => void;
}

const SectionContext = createContext<SectionContextType | null>(null);

export const useSection = (): SectionContextType => {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error("useSection must be used within a SectionProvider");
  }
  return context;
};

function getSectionFromPath(pathname: string): AppSection {
  if (pathname.startsWith("/habits")) return "habits";
  if (pathname.startsWith("/journal")) return "journal";
  return "notes";
}

const sectionDefaultRoutes: Record<AppSection, string> = {
  notes: "/home",
  habits: "/habits",
  journal: "/journal",
};

export function SectionProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSectionState] = useState<AppSection>(
    getSectionFromPath(location.pathname)
  );

  useEffect(() => {
    setActiveSectionState(getSectionFromPath(location.pathname));
  }, [location.pathname]);

  function setActiveSection(section: AppSection) {
    setActiveSectionState(section);
    navigate(sectionDefaultRoutes[section]);
  }

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </SectionContext.Provider>
  );
}
