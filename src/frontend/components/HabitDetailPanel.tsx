import { Flame, Trophy, Target, Pencil, Shield } from "lucide-react";
import { useHabits } from "../context";
import { getHabitIcon, frequencyLabel } from "../utils/habitHelpers";
import { HabitHeatmap } from "./HabitHeatmap";
import { HabitWeeklyChart } from "./HabitWeeklyChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Habit } from "../../types";

interface HabitDetailPanelProps {
  habit: Habit | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HabitDetailPanel({ habit, open, onOpenChange }: HabitDetailPanelProps) {
  const {
    getStreak,
    getLongestStreak,
    getCompletionPercentage,
    setEditingHabit,
    setHabitDialogOpen,
  } = useHabits();

  if (!habit) return null;

  const Icon = getHabitIcon(habit.icon);
  const streak = getStreak(habit._id);
  const longest = getLongestStreak(habit._id);
  const pct = getCompletionPercentage(habit._id, 30);

  const handleEdit = () => {
    onOpenChange(false);
    setEditingHabit(habit);
    setHabitDialogOpen(true);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-xl">{habit.name}</DialogTitle>
              <DialogDescription className="flex items-center gap-2 mt-1">
                <Badge variant="secondary">{frequencyLabel(habit.frequency)}</Badge>
                {habit.streakFreeze && (
                  <Badge variant="outline" className="gap-1">
                    <Shield className="h-3 w-3" />
                    Freeze
                  </Badge>
                )}
              </DialogDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleEdit}>
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          <Card>
            <CardContent className="p-4 text-center">
              <Flame className="h-5 w-5 mx-auto text-orange-500 mb-1" />
              <p className="text-2xl font-bold">{streak}d</p>
              <p className="text-xs text-muted-foreground">Current Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-5 w-5 mx-auto text-yellow-500 mb-1" />
              <p className="text-2xl font-bold">{longest}d</p>
              <p className="text-xs text-muted-foreground">Longest Streak</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-5 w-5 mx-auto text-blue-500 mb-1" />
              <p className="text-2xl font-bold">{pct}%</p>
              <p className="text-xs text-muted-foreground">Last 30 Days</p>
            </CardContent>
          </Card>
        </div>

        {/* Heatmap */}
        <div>
          <h3 className="text-sm font-medium mb-2">Activity</h3>
          <HabitHeatmap habit={habit} />
        </div>

        {/* Weekly chart */}
        <div>
          <h3 className="text-sm font-medium mb-2">Weekly Progress</h3>
          <HabitWeeklyChart habit={habit} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
