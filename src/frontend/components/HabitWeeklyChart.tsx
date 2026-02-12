import { useMemo } from "react";
import dayjs from "dayjs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useHabits } from "../context";
import { isScheduledDay } from "../utils/habitHelpers";
import type { Habit } from "../../types";

interface HabitWeeklyChartProps {
  habit: Habit;
}

const CHART_WEEKS = 12;

export function HabitWeeklyChart({ habit }: HabitWeeklyChartProps) {
  const { getCompletionStatus } = useHabits();

  const data = useMemo(() => {
    const today = dayjs();
    const weeks: Array<{
      label: string;
      completed: number;
      total: number;
    }> = [];

    for (let w = CHART_WEEKS - 1; w >= 0; w--) {
      const weekEnd = today.subtract(w * 7, "day");
      const weekStart = weekEnd.subtract(6, "day");
      let total = 0;
      let completed = 0;

      for (let d = 0; d < 7; d++) {
        const day = weekStart.add(d, "day");
        const dateStr = day.format("YYYY-MM-DD");
        if (!isScheduledDay(habit, dateStr)) continue;
        total++;
        const status = getCompletionStatus(habit._id, dateStr);
        if (status === "done") completed++;
      }

      weeks.push({
        label: weekStart.format("MMM D"),
        completed,
        total,
      });
    }

    return weeks;
  }, [habit, getCompletionStatus]);

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            tick={{ fontSize: 10 }}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            formatter={((value: number | undefined, name: string | undefined) => [
              value ?? 0,
              name === "completed" ? "Completed" : "Scheduled",
            ]) as any}
            contentStyle={{
              fontSize: "12px",
              borderRadius: "8px",
              border: "1px solid hsl(var(--border))",
              background: "hsl(var(--popover))",
              color: "hsl(var(--popover-foreground))",
            }}
          />
          <Bar
            dataKey="total"
            fill="hsl(var(--muted))"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="completed"
            fill="hsl(142.1 76.2% 36.3%)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
