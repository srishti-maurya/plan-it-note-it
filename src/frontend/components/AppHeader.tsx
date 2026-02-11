import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Menu, SlidersHorizontal, Plus, LogOut, StickyNote, Search, X } from "lucide-react";
import { useNotes, useAuth } from "../context";
import { FilterList } from "./FilterList";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface AppHeaderProps {
  onToggleSidebar: () => void;
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const location = useLocation();
  const { logoutHandler } = useAuth();
  const { setIsEditable, setUserInput, userInput, searchQuery, setSearchQuery } = useNotes();

  // Clear search on navigation
  useEffect(() => {
    setSearchQuery("");
  }, [location.pathname, setSearchQuery]);

  const showNoteActions =
    location.pathname === "/home" ||
    location.pathname.startsWith("/folders/") ||
    location.pathname === "/recent" ||
    location.pathname === "/favorites";

  const openNewNote = () => {
    setIsEditable(true);
    setUserInput({
      ...userInput,
      title: "",
      note: "",
      bgColor: "",
      tag: "",
      priority: { low: "1" },
      tags: [],
      folderId: undefined,
      favorite: false,
    });
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-background px-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Toggle sidebar</TooltipContent>
      </Tooltip>

      <div className="flex items-center gap-2">
        <StickyNote className="h-5 w-5 text-foreground" />
        <span className="text-lg font-semibold tracking-tight">PlanIt</span>
      </div>

      {showNoteActions ? (
        <div className="flex-1 flex justify-center px-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-8 h-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex-1" />
      )}

      <div className="flex items-center gap-2">
        {showNoteActions && (
          <Popover>
            <Tooltip>
              <TooltipTrigger asChild>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="sr-only">Filter</span>
                  </Button>
                </PopoverTrigger>
              </TooltipTrigger>
              <TooltipContent>Filter & Sort</TooltipContent>
            </Tooltip>
            <PopoverContent align="end" sideOffset={8} className="w-auto">
              <FilterList />
            </PopoverContent>
          </Popover>
        )}

        {showNoteActions && (
          <Button size="sm" onClick={openNewNote}>
            <Plus className="h-4 w-4" />
            New Note
          </Button>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar>
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logoutHandler()}>
              <LogOut className="h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
