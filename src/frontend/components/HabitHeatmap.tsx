import { useMemo } from "react";
import dayjs from "dayjs";
import { useHabits } from "../context";
import { isScheduledDay } from "../utils/habitHelpers";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Habit } from "../../types";

interface HabitHeatmapProps {
  habit: Habit;
}

const DAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const WEEKS = 26;

export function HabitHeatmap({ habit }: HabitHeatmapProps) {
  const { getCompletionStatus } = useHabits();

  const { cells, monthLabels } = useMemo(() => {
    const today = dayjs();
    const totalDays = WEEKS * 7;
    // Start from the first Sunday that gives us exactly WEEKS columns
    const endOfWeek = today.day(6); // Saturday
    const startDate = endOfWeek.subtract(totalDays - 1, "day");

    const cells: Array<{
      date: string;
      dayOfWeek: number;
      weekIndex: number;
      status: "done" | "skipped" | "missed" | "not-scheduled" | "future";
    }> = [];

    const monthPositions: Array<{ label: string; weekIndex: number }> = [];
    let lastMonth = -1;

    for (let i = 0; i < totalDays; i++) {
      const d = startDate.add(i, "day");
      const dateStr = d.format("YYYY-MM-DD");
      const dayOfWeek = d.day();
      const weekIndex = Math.floor(i / 7);

      // Track month labels
      const month = d.month();
      if (month !== lastMonth) {
        monthPositions.push({
          label: d.format("MMM"),
          weekIndex,
        });
        lastMonth = month;
      }

      const isFuture = d.isAfter(today, "day");
      const scheduled = isScheduledDay(habit, dateStr);

      let status: typeof cells[0]["status"];
      if (isFuture || !scheduled) {
        status = "not-scheduled";
      } else {
        const completion = getCompletionStatus(habit._id, dateStr);
        if (completion === "done") status = "done";
        else if (completion === "skipped") status = "skipped";
        else status = "missed";
      }

      cells.push({ date: dateStr, dayOfWeek, weekIndex, status });
    }

    return { cells, monthLabels: monthPositions };
  }, [habit, getCompletionStatus]);

  return (
    <div className="overflow-x-auto">
      {/* Month labels */}
      <div className="flex ml-8 mb-1 text-xs text-muted-foreground">
        {monthLabels.map((m, i) => (
          <span
            key={i}
            className="absolute"
            style={{ marginLeft: `${m.weekIndex * 16}px` }}
          >
            {m.label}
          </span>
        ))}
      </div>

      <div className="flex gap-0.5 mt-5">
        {/* Day labels */}
        <div className="flex flex-col gap-0.5 mr-1">
          {DAY_LABELS.map((label, i) => (
            <div key={i} className="h-3 w-6 text-[10px] text-muted-foreground leading-3">
              {label}
            </div>
          ))}
        </div>

        {/* Grid columns (weeks) */}
        <div
          className="grid gap-0.5"
          style={{
            gridTemplateRows: "repeat(7, 12px)",
            gridAutoFlow: "column",
            gridAutoColumns: "12px",
          }}
        >
          {cells.map((cell) => (
            <Tooltip key={cell.date}>
              <TooltipTrigger asChild>
                <div
                  className={cn(
                    "h-3 w-3 rounded-sm",
                    cell.status === "not-scheduled" && "bg-muted/30",
                    cell.status === "missed" && "bg-muted",
                    cell.status === "done" && "bg-emerald-500",
                    cell.status === "skipped" && "bg-amber-400"
                  )}
                />
              </TooltipTrigger>
              <TooltipContent side="top" className="text-xs">
                <p>{dayjs(cell.date).format("MMM D, YYYY")}</p>
                <p className="capitalize">{cell.status.replace("-", " ")}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  );
}
