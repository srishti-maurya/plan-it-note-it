import { NavLink } from "react-router-dom";
import { Home, Tags, Archive, Trash2 } from "lucide-react";
import { useNotes } from "../context";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/labels", label: "Labels", icon: Tags },
  { to: "/archive", label: "Archive", icon: Archive },
  { to: "/trash", label: "Trash", icon: Trash2 },
];

interface AppSidebarProps {
  collapsed?: boolean;
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const { state } = useNotes();

  const counts: Record<string, number> = {
    "/home": state.notesList?.length ?? 0,
    "/archive": state.archiveList?.length ?? 0,
    "/trash": state.trashList?.length ?? 0,
  };

  return (
    <div className="flex flex-col gap-1 p-3">
      {navItems.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              collapsed && "justify-center px-2"
            )
          }
        >
          <Icon className="h-4 w-4 shrink-0" />
          {!collapsed && (
            <>
              <span className="flex-1">{label}</span>
              {counts[to] !== undefined && (
                <span className="text-xs text-muted-foreground">
                  {counts[to]}
                </span>
              )}
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
