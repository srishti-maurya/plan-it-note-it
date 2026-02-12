import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Shield, ShieldOff } from "lucide-react";
import { useHabits } from "../context";
import { getHabitIcon, CURATED_ICONS } from "../utils/habitHelpers";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import type { HabitFrequencyType } from "../../types";

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

export function HabitDialog() {
  const {
    habitDialogOpen,
    setHabitDialogOpen,
    editingHabit,
    setEditingHabit,
    addHabit,
    updateHabit,
  } = useHabits();

  const [name, setName] = useState("");
  const [icon, setIcon] = useState("Circle");
  const [freqType, setFreqType] = useState<HabitFrequencyType>("daily");
  const [daysOfWeek, setDaysOfWeek] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [reminderTime, setReminderTime] = useState("");
  const [streakFreeze, setStreakFreeze] = useState(false);
  const [iconPickerOpen, setIconPickerOpen] = useState(false);

  const isEdit = !!editingHabit;

  useEffect(() => {
    if (editingHabit) {
      setName(editingHabit.name);
      setIcon(editingHabit.icon);
      setFreqType(editingHabit.frequency.type);
      setDaysOfWeek(
        (editingHabit.frequency.daysOfWeek ?? []).map(String)
      );
      setStartDate(editingHabit.startDate);
      setReminderTime(editingHabit.reminderTime || "");
      setStreakFreeze(editingHabit.streakFreeze);
    } else {
      setName("");
      setIcon("Circle");
      setFreqType("daily");
      setDaysOfWeek([]);
      setStartDate(dayjs().format("YYYY-MM-DD"));
      setReminderTime("");
      setStreakFreeze(false);
    }
  }, [editingHabit, habitDialogOpen]);

  const handleClose = (open: boolean) => {
    if (!open) {
      setHabitDialogOpen(false);
      setEditingHabit(null);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    const input = {
      name: name.trim(),
      icon,
      frequency: {
        type: freqType,
        ...(freqType === "custom" ? { daysOfWeek: daysOfWeek.map(Number) } : {}),
      },
      reminderTime: reminderTime || null,
      startDate,
      streakFreeze,
    };

    if (isEdit) {
      updateHabit(editingHabit._id, input);
    } else {
      addHabit(input);
    }

    setHabitDialogOpen(false);
    setEditingHabit(null);
  };

  const IconComponent = getHabitIcon(icon);

  return (
    <Dialog open={habitDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Habit" : "New Habit"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update your habit details." : "Set up a new habit to track."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          {/* Name */}
          <div className="grid gap-2">
            <Label htmlFor="habit-name">Name</Label>
            <Input
              id="habit-name"
              placeholder="e.g. Morning Run"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>

          {/* Icon */}
          <div className="grid gap-2">
            <Label>Icon</Label>
            <Popover open={iconPickerOpen} onOpenChange={setIconPickerOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-fit gap-2">
                  <IconComponent className="h-4 w-4" />
                  {icon}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72" align="start">
                <div className="grid grid-cols-6 gap-1">
                  {CURATED_ICONS.map((iconName) => {
                    const Ic = getHabitIcon(iconName);
                    return (
                      <Button
                        key={iconName}
                        variant={icon === iconName ? "default" : "ghost"}
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => {
                          setIcon(iconName);
                          setIconPickerOpen(false);
                        }}
                      >
                        <Ic className="h-4 w-4" />
                      </Button>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>

          {/* Frequency */}
          <div className="grid gap-2">
            <Label>Frequency</Label>
            <RadioGroup
              value={freqType}
              onValueChange={(v) => setFreqType(v as HabitFrequencyType)}
              className="flex gap-4"
            >
              {(["daily", "weekly", "custom"] as const).map((ft) => (
                <div key={ft} className="flex items-center gap-1.5">
                  <RadioGroupItem value={ft} id={`freq-${ft}`} />
                  <Label htmlFor={`freq-${ft}`} className="capitalize cursor-pointer">
                    {ft}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            {freqType === "custom" && (
              <ToggleGroup
                type="multiple"
                value={daysOfWeek}
                onValueChange={setDaysOfWeek}
                className="justify-start"
              >
                {DAY_LABELS.map((label, i) => (
                  <ToggleGroupItem
                    key={i}
                    value={String(i)}
                    className="h-8 w-8 rounded-full text-xs"
                  >
                    {label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
          </div>

          {/* Start date */}
          <div className="grid gap-2">
            <Label htmlFor="start-date">Start Date</Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-fit"
            />
          </div>

          {/* Reminder time */}
          <div className="grid gap-2">
            <Label htmlFor="reminder-time">Reminder Time (optional)</Label>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-fit"
            />
          </div>

          {/* Streak freeze */}
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant={streakFreeze ? "default" : "outline"}
              size="sm"
              className={cn("gap-1.5", streakFreeze && "bg-blue-600 hover:bg-blue-700")}
              onClick={() => setStreakFreeze(!streakFreeze)}
            >
              {streakFreeze ? (
                <Shield className="h-4 w-4" />
              ) : (
                <ShieldOff className="h-4 w-4" />
              )}
              Streak Freeze
            </Button>
            <span className="text-xs text-muted-foreground">
              {streakFreeze ? "1 missed day grace period active" : "No grace period"}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleClose(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name.trim()}>
            {isEdit ? "Save Changes" : "Create Habit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
