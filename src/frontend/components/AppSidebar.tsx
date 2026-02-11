import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, Tags, Archive, Trash2, Clock, Star, FolderIcon, Plus } from "lucide-react";
import { useNotes } from "../context";
import { FolderTree } from "./FolderTree";
import { FolderDialog } from "./FolderDialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { to: "/home", label: "Home", icon: Home, countKey: "/home" },
  { to: "/recent", label: "Recently Edited", icon: Clock },
  { to: "/favorites", label: "Favorites", icon: Star, countKey: "/favorites" },
];

const bottomNavItems = [
  { to: "/labels", label: "Labels", icon: Tags },
  { to: "/archive", label: "Archive", icon: Archive, countKey: "/archive" },
  { to: "/trash", label: "Trash", icon: Trash2, countKey: "/trash" },
];

interface AppSidebarProps {
  collapsed?: boolean;
}

export function AppSidebar({ collapsed = false }: AppSidebarProps) {
  const { state, folders, addFolder } = useNotes();
  const [folderDialogOpen, setFolderDialogOpen] = useState(false);

  const counts: Record<string, number> = {
    "/home": state.notesList?.length ?? 0,
    "/archive": state.archiveList?.length ?? 0,
    "/trash": state.trashList?.length ?? 0,
    "/favorites": state.notesList?.filter((n) => n.favorite).length ?? 0,
  };

  const renderNavItem = ({ to, label, icon: Icon, countKey }: {
    to: string;
    label: string;
    icon: typeof Home;
    countKey?: string;
  }) => (
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
          {countKey && counts[countKey] !== undefined && (
            <span className="text-xs text-muted-foreground">
              {counts[countKey]}
            </span>
          )}
        </>
      )}
    </NavLink>
  );

  return (
    <div className="flex flex-col gap-1 p-3">
      {/* Main nav */}
      {mainNavItems.map(renderNavItem)}

      <Separator className="my-2" />

      {/* Folders section */}
      <div className="flex items-center justify-between px-3 py-1">
        {!collapsed && (
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Folders
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setFolderDialogOpen(true)}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {folders.length > 0 && (
        <FolderTree
          folders={folders}
          parentId={null}
          level={0}
          collapsed={collapsed}
        />
      )}

      {folders.length === 0 && !collapsed && (
        <p className="px-3 py-2 text-xs text-muted-foreground">
          No folders yet
        </p>
      )}

      <Separator className="my-2" />

      {/* Bottom nav */}
      {bottomNavItems.map(renderNavItem)}

      <FolderDialog
        open={folderDialogOpen}
        onOpenChange={setFolderDialogOpen}
        mode="create"
        parentId={null}
        onConfirm={(name) => {
          addFolder(name, null);
          setFolderDialogOpen(false);
        }}
      />
    </div>
  );
}
