import { useState } from "react";
import dayjs from "dayjs";
import { Flame, Plus } from "lucide-react";
import { useHabits } from "../../context";
import { getHabitIcon, frequencyLabel } from "../../utils/habitHelpers";
import { HabitCompletionButton } from "../../components/HabitCompletionButton";
import { HabitDetailPanel } from "../../components/HabitDetailPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Habit } from "../../../types";

export function HabitsPage() {
  const {
    habits,
    isCompletedToday,
    getStreak,
    getLongestStreak,
    getCompletionPercentage,
    setHabitDialogOpen,
  } = useHabits();
  const today = dayjs().format("YYYY-MM-DD");
  const [detailHabit, setDetailHabit] = useState<Habit | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Habit Tracker</h1>
          <p className="text-sm text-muted-foreground">{dayjs().format("dddd, MMMM D, YYYY")}</p>
        </div>
        <Button size="sm" onClick={() => setHabitDialogOpen(true)}>
          <Plus className="h-4 w-4" />
          New Habit
        </Button>
      </div>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-muted-foreground">No habits yet. Click "New Habit" to get started!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {habits.map((habit) => {
            const completed = isCompletedToday(habit._id);
            const streak = getStreak(habit._id);
            const longest = getLongestStreak(habit._id);
            const pct = getCompletionPercentage(habit._id, 30);
            const Icon = getHabitIcon(habit.icon);

            return (
              <Card
                key={habit._id}
                className={cn(
                  "cursor-pointer transition-colors hover:border-primary/30",
                  completed && "border-emerald-500/30 bg-emerald-500/5"
                )}
                onClick={() => setDetailHabit(habit)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div onClick={(e) => e.stopPropagation()}>
                      <HabitCompletionButton habitId={habit._id} date={today} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <p className={cn(
                          "font-medium truncate",
                          completed && "line-through text-muted-foreground"
                        )}>
                          {habit.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
                          {frequencyLabel(habit.frequency)}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground">{pct}% (30d)</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {streak > 0 && (
                        <span className="flex items-center gap-1 text-sm text-orange-500 font-medium">
                          <Flame className="h-4 w-4" />
                          {streak}d
                        </span>
                      )}
                      {longest > 0 && (
                        <span className="text-[10px] text-muted-foreground">
                          Best: {longest}d
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      <HabitDetailPanel
        habit={detailHabit}
        open={!!detailHabit}
        onOpenChange={(open) => {
          if (!open) setDetailHabit(null);
        }}
      />
    </div>
  );
}
