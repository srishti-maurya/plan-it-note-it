import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";
import { NoteModal } from "./NoteModal";
import {
  Sheet,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/lib/use-media-query";

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Desktop sidebar */}
      {!isMobile && (
        <aside
          className={cn(
            "hidden md:flex flex-col border-r bg-sidebar transition-all duration-300",
            sidebarOpen ? "w-64" : "w-14"
          )}
        >
          <AppSidebar collapsed={!sidebarOpen} />
        </aside>
      )}

      {/* Mobile sidebar */}
      {isMobile && (
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <AppSidebar />
          </SheetContent>
        </Sheet>
      )}

      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-6">
          <NoteModal />
          <Outlet />
        </main>
      </div>
    </div>
  );
}
