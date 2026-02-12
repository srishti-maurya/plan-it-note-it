import { useState, useMemo } from "react";
import dayjs from "dayjs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useJournal } from "../context";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

// Mood keywords → color mapping
const MOOD_COLORS: { keywords: string[]; bg: string; ring: string; label: string }[] = [
  { keywords: ["great", "amazing", "fantastic", "wonderful", "excited", "happy", "joyful", "awesome", "excellent"],
    bg: "bg-emerald-400", ring: "ring-emerald-400", label: "Great" },
  { keywords: ["good", "nice", "fine", "okay", "pleasant", "positive", "calm", "content", "grateful", "relaxed", "peaceful"],
    bg: "bg-sky-400", ring: "ring-sky-400", label: "Good" },
  { keywords: ["neutral", "meh", "so-so", "alright", "average", "normal"],
    bg: "bg-amber-300", ring: "ring-amber-300", label: "Neutral" },
  { keywords: ["bad", "sad", "down", "low", "tired", "exhausted", "stressed", "anxious", "worried", "upset", "frustrated", "angry", "terrible", "awful"],
    bg: "bg-rose-400", ring: "ring-rose-400", label: "Bad" },
];

function getMoodColor(mood: string | undefined) {
  if (!mood) return null;
  const lower = mood.toLowerCase();
  for (const entry of MOOD_COLORS) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) return entry;
    }
  }
  // Has text but no match → default purple (wrote something)
  return { bg: "bg-violet-400", ring: "ring-violet-400", label: "Entry" };
}

const DAY_HEADERS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface JournalSidebarContentProps {
  collapsed?: boolean;
}

export function JournalSidebarContent({ collapsed = false }: JournalSidebarContentProps) {
  const { selectedDate, setSelectedDate, entryDates, getEntryForDate } = useJournal();
  const today = dayjs().format("YYYY-MM-DD");
  const [viewMonth, setViewMonth] = useState(dayjs(selectedDate));

  const calendarDays = useMemo(() => {
    const startOfMonth = viewMonth.startOf("month");
    const endOfMonth = viewMonth.endOf("month");
    const startDay = startOfMonth.day(); // 0=Sun
    const daysInMonth = endOfMonth.date();

    const cells: Array<{ date: string; day: number; inMonth: boolean }> = [];

    // Leading blanks
    for (let i = 0; i < startDay; i++) {
      const d = startOfMonth.subtract(startDay - i, "day");
      cells.push({ date: d.format("YYYY-MM-DD"), day: d.date(), inMonth: false });
    }

    // Days of the month
    for (let d = 1; d <= daysInMonth; d++) {
      const date = viewMonth.date(d).format("YYYY-MM-DD");
      cells.push({ date, day: d, inMonth: true });
    }

    // Trailing blanks to fill last row
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let i = 1; i <= remaining; i++) {
        const d = endOfMonth.add(i, "day");
        cells.push({ date: d.format("YYYY-MM-DD"), day: d.date(), inMonth: false });
      }
    }

    return cells;
  }, [viewMonth]);

  const prevMonth = () => setViewMonth((m) => m.subtract(1, "month"));
  const nextMonth = () => setViewMonth((m) => m.add(1, "month"));
  const goToday = () => {
    setViewMonth(dayjs());
    setSelectedDate(today);
  };

  if (collapsed) {
    return (
      <div className="flex flex-col items-center gap-1 p-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-xs"
          onClick={goToday}
        >
          {dayjs().format("DD")}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2 px-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={prevMonth}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <button
          onClick={goToday}
          className="text-sm font-medium hover:underline"
        >
          {viewMonth.format("MMMM YYYY")}
        </button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={nextMonth}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center">
        {DAY_HEADERS.map((d) => (
          <span key={d} className="text-[10px] font-medium text-muted-foreground py-1">
            {d}
          </span>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map(({ date, day, inMonth }) => {
          const isSelected = date === selectedDate;
          const isToday = date === today;
          const hasEntry = entryDates.includes(date);
          const isFuture = dayjs(date).isAfter(dayjs(), "day");
          const entry = hasEntry ? getEntryForDate(date) : undefined;
          const moodColor = entry ? getMoodColor(entry.responses.mood) : null;

          return (
            <Tooltip key={date}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => {
                    if (!isFuture) setSelectedDate(date);
                  }}
                  disabled={isFuture}
                  className={cn(
                    "relative flex flex-col items-center justify-center h-9 w-full rounded-md text-xs transition-colors",
                    !inMonth && "text-muted-foreground/40",
                    inMonth && !isSelected && "text-foreground hover:bg-accent",
                    isSelected && "bg-primary text-primary-foreground",
                    isToday && !isSelected && "font-bold ring-1 ring-primary/50",
                    isFuture && "opacity-30 cursor-default"
                  )}
                >
                  {day}
                  {/* Mood color dot */}
                  {hasEntry && moodColor && (
                    <span
                      className={cn(
                        "absolute bottom-0.5 h-1.5 w-1.5 rounded-full",
                        isSelected ? "bg-primary-foreground" : moodColor.bg
                      )}
                    />
                  )}
                  {/* Entry dot (no mood detected) */}
                  {hasEntry && !moodColor && (
                    <span
                      className={cn(
                        "absolute bottom-0.5 h-1.5 w-1.5 rounded-full",
                        isSelected ? "bg-primary-foreground" : "bg-muted-foreground"
                      )}
                    />
                  )}
                </button>
              </TooltipTrigger>
              {hasEntry && (
                <TooltipContent side="right" className="text-xs">
                  <p className="font-medium">{dayjs(date).format("MMM D, YYYY")}</p>
                  {moodColor && (
                    <p className="flex items-center gap-1.5 mt-0.5">
                      <span className={cn("h-2 w-2 rounded-full", moodColor.bg)} />
                      {moodColor.label}
                    </p>
                  )}
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-1 pt-1 border-t">
        {MOOD_COLORS.map((m) => (
          <span key={m.label} className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span className={cn("h-2 w-2 rounded-full", m.bg)} />
            {m.label}
          </span>
        ))}
      </div>

      {/* Recent entries list */}
      <div className="border-t pt-2 mt-1">
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-1">
          Recent Entries
        </span>
        <div className="flex flex-col gap-0.5 mt-1">
          {entryDates
            .sort((a, b) => (a > b ? -1 : 1))
            .slice(0, 5)
            .map((date) => {
              const entry = getEntryForDate(date);
              const moodColor = entry ? getMoodColor(entry.responses.mood) : null;
              const isActive = date === selectedDate;

              return (
                <button
                  key={date}
                  onClick={() => {
                    setSelectedDate(date);
                    setViewMonth(dayjs(date));
                  }}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-left transition-colors",
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  {moodColor && (
                    <span className={cn("h-2 w-2 rounded-full shrink-0", moodColor.bg)} />
                  )}
                  {!moodColor && (
                    <span className="h-2 w-2 rounded-full shrink-0 bg-muted-foreground/30" />
                  )}
                  <span className="flex-1 truncate">
                    {date === today ? "Today" : dayjs(date).format("ddd, MMM D")}
                  </span>
                </button>
              );
            })}
        </div>
      </div>
    </div>
  );
}
