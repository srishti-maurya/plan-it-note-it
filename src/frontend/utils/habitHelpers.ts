import dayjs from "dayjs";
import {
  Circle, Dumbbell, BookOpen, Droplets, Apple, Brain, Heart,
  Moon, Sun, Coffee, Leaf, Music, Pencil, Footprints, Bike,
  Pill, Smile, Timer, Utensils, Bed, Eye, Dog, Code, Flame,
  Glasses,
  type LucideIcon,
} from "lucide-react";
import type { Habit, HabitCompletion, HabitFrequency } from "../../types";

const ICON_MAP: Record<string, LucideIcon> = {
  Circle, Dumbbell, BookOpen, Droplets, Apple, Brain, Heart,
  Moon, Sun, Coffee, Leaf, Music, Pencil, Footprints, Bike,
  Pill, Smile, Timer, Utensils, Bed, Eye, Dog, Code, Flame,
  Glasses,
};

export const CURATED_ICONS = Object.keys(ICON_MAP);

export function getHabitIcon(name: string): LucideIcon {
  return ICON_MAP[name] || Circle;
}

export function isScheduledDay(habit: Habit, dateStr: string): boolean {
  const date = dayjs(dateStr);
  const start = dayjs(habit.startDate);
  if (date.isBefore(start, "day")) return false;

  switch (habit.frequency.type) {
    case "daily":
      return true;
    case "weekly":
      return date.day() === start.day();
    case "custom":
      return (habit.frequency.daysOfWeek ?? []).includes(date.day());
    default:
      return true;
  }
}

const DAY_ABBREVS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function frequencyLabel(frequency: HabitFrequency): string {
  switch (frequency.type) {
    case "daily":
      return "Daily";
    case "weekly":
      return "Weekly";
    case "custom":
      return (frequency.daysOfWeek ?? [])
        .sort((a, b) => a - b)
        .map((d) => DAY_ABBREVS[d])
        .join("/");
    default:
      return "Daily";
  }
}

export function normalizeHabit(habit: any): Habit {
  const today = dayjs().format("YYYY-MM-DD");
  return {
    _id: habit._id,
    name: habit.name || "Untitled",
    icon: habit.icon || "Circle",
    frequency: habit.frequency || { type: "daily" },
    reminderTime: habit.reminderTime ?? null,
    startDate: habit.startDate || today,
    streakFreeze: habit.streakFreeze ?? false,
    longestStreak: habit.longestStreak ?? 0,
    createdAt: habit.createdAt || new Date().toISOString(),
  };
}

export function normalizeCompletion(completion: any): HabitCompletion {
  return {
    _id: completion._id,
    habitId: completion.habitId,
    date: completion.date,
    status: completion.status || "done",
  };
}
