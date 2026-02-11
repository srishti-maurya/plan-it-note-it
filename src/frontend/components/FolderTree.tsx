import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Folder,
  FolderOpen,
  ChevronRight,
  ChevronDown,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import { useNotes } from "../context";
import { FolderDialog } from "./FolderDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Folder as FolderType } from "../../types";

interface FolderTreeProps {
  folders: FolderType[];
  parentId: string | null;
  level: number;
  collapsed?: boolean;
}

export function FolderTree({ folders, parentId, level, collapsed = false }: FolderTreeProps) {
  const { deleteFolder, renameFolder, addFolder } = useNotes();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "rename">("create");
  const [dialogParentId, setDialogParentId] = useState<string | null>(null);
  const [dialogCurrentName, setDialogCurrentName] = useState("");
  const [dialogFolderId, setDialogFolderId] = useState<string>("");

  const children = folders.filter((f) => f.parentId === parentId);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const hasChildren = (id: string) => folders.some((f) => f.parentId === id);

  const openCreateDialog = (parentFolderId: string) => {
    setDialogMode("create");
    setDialogParentId(parentFolderId);
    setDialogCurrentName("");
    setDialogOpen(true);
  };

  const openRenameDialog = (folderId: string, currentName: string) => {
    setDialogMode("rename");
    setDialogFolderId(folderId);
    setDialogCurrentName(currentName);
    setDialogOpen(true);
  };

  const handleDialogConfirm = (name: string) => {
    if (dialogMode === "create") {
      addFolder(name, dialogParentId);
    } else {
      renameFolder(dialogFolderId, name);
    }
    setDialogOpen(false);
  };

  if (children.length === 0) return null;

  return (
    <>
      <div className="flex flex-col">
        {children.map((folder) => {
          const isExpanded = expanded.has(folder._id);
          const hasKids = hasChildren(folder._id);

          return (
            <div key={folder._id}>
              <div
                className="group flex items-center"
                style={{ paddingLeft: `${level * 12}px` }}
              >
                <button
                  className={cn(
                    "h-6 w-6 flex items-center justify-center shrink-0 rounded-sm hover:bg-accent",
                    !hasKids && "invisible"
                  )}
                  onClick={() => toggleExpand(folder._id)}
                >
                  {isExpanded ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className="h-3.5 w-3.5" />
                  )}
                </button>

                <NavLink
                  to={`/folders/${folder._id}`}
                  className={({ isActive }) =>
                    cn(
                      "flex flex-1 items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors",
                      isActive
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )
                  }
                >
                  {isExpanded ? (
                    <FolderOpen className="h-4 w-4 shrink-0" />
                  ) : (
                    <Folder className="h-4 w-4 shrink-0" />
                  )}
                  {!collapsed && (
                    <span className="truncate text-sm">{folder.name}</span>
                  )}
                </NavLink>

                {!collapsed && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 shrink-0"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => openCreateDialog(folder._id)}>
                        <Plus className="h-4 w-4" />
                        New subfolder
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => openRenameDialog(folder._id, folder.name)}>
                        <Pencil className="h-4 w-4" />
                        Rename
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive focus:text-destructive"
                        onClick={() => deleteFolder(folder._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {isExpanded && (
                <FolderTree
                  folders={folders}
                  parentId={folder._id}
                  level={level + 1}
                  collapsed={collapsed}
                />
              )}
            </div>
          );
        })}
      </div>

      <FolderDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        mode={dialogMode}
        parentId={dialogParentId}
        currentName={dialogCurrentName}
        onConfirm={handleDialogConfirm}
      />
    </>
  );
}
