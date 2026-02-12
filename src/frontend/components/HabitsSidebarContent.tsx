import { Plus, Trash2, Pencil, Flame } from "lucide-react";
import { useHabits } from "../context";
import { getHabitIcon } from "../utils/habitHelpers";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface HabitsSidebarContentProps {
  collapsed?: boolean;
}

export function HabitsSidebarContent({ collapsed = false }: HabitsSidebarContentProps) {
  const {
    habits,
    deleteHabit,
    getStreak,
    setHabitDialogOpen,
    setEditingHabit,
  } = useHabits();

  const openNewDialog = () => {
    setEditingHabit(null);
    setHabitDialogOpen(true);
  };

  const openEditDialog = (habit: typeof habits[0]) => {
    setEditingHabit(habit);
    setHabitDialogOpen(true);
  };

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-1 p-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={openNewDialog}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1 px-3">
      <div className="flex items-center justify-between py-1">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          My Habits
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={openNewDialog}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>

      {habits.length === 0 && (
        <p className="py-2 text-xs text-muted-foreground">
          No habits yet. Click + to add one.
        </p>
      )}

      <div className="flex flex-col gap-0.5">
        {habits.map((habit) => {
          const streak = getStreak(habit._id);
          const Icon = getHabitIcon(habit.icon);
          return (
            <div
              key={habit._id}
              className={cn(
                "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm",
                "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1 truncate">{habit.name}</span>
              {streak > 0 && (
                <span className="flex items-center gap-0.5 text-xs text-orange-500">
                  <Flame className="h-3 w-3" />
                  {streak}d
                </span>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => openEditDialog(habit)}
              >
                <Pencil className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => deleteHabit(habit._id)}
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
