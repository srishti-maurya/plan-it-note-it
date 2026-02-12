import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "./auth-context";
import { isScheduledDay, normalizeHabit, normalizeCompletion } from "../utils/habitHelpers";
import type {
  Habit,
  HabitCompletion,
  HabitInput,
  CompletionStatus,
} from "../../types";

interface HabitsState {
  habits: Habit[];
  completions: HabitCompletion[];
}

type HabitsAction =
  | { type: "SET_HABITS"; payload: Habit[] }
  | { type: "SET_COMPLETIONS"; payload: HabitCompletion[] }
  | { type: "SET_ALL"; payload: { habits: Habit[]; completions: HabitCompletion[] } };

interface HabitsContextType {
  habits: Habit[];
  completions: HabitCompletion[];
  // CRUD
  addHabit: (input: HabitInput) => void;
  updateHabit: (id: string, updates: Partial<HabitInput>) => void;
  deleteHabit: (id: string) => void;
  // Completion
  markCompletion: (habitId: string, date: string, status: CompletionStatus) => void;
  removeCompletion: (habitId: string, date: string) => void;
  getCompletionStatus: (habitId: string, date: string) => CompletionStatus | null;
  isCompletedToday: (habitId: string) => boolean;
  // Streaks
  getStreak: (habitId: string) => number;
  getLongestStreak: (habitId: string) => number;
  // Insights
  getCompletionPercentage: (habitId: string, days: number) => number;
  getCompletionsForRange: (habitId: string, start: string, end: string) => HabitCompletion[];
  // Dialog state
  habitDialogOpen: boolean;
  setHabitDialogOpen: (open: boolean) => void;
  editingHabit: Habit | null;
  setEditingHabit: (habit: Habit | null) => void;
}

const HabitsContext = createContext<HabitsContextType | null>(null);

export const useHabits = (): HabitsContextType => {
  const context = useContext(HabitsContext);
  if (!context) {
    throw new Error("useHabits must be used within a HabitsProvider");
  }
  return context;
};

function habitsReducer(state: HabitsState, action: HabitsAction): HabitsState {
  switch (action.type) {
    case "SET_HABITS":
      return { ...state, habits: action.payload };
    case "SET_COMPLETIONS":
      return { ...state, completions: action.payload };
    case "SET_ALL":
      return { habits: action.payload.habits, completions: action.payload.completions };
    default:
      return state;
  }
}

export function HabitsProvider({ children }: { children: ReactNode }) {
  const { token, isLoggedIn } = useAuth();
  const [state, dispatch] = useReducer(habitsReducer, {
    habits: [],
    completions: [],
  });
  const [habitDialogOpen, setHabitDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const response = await axios.get("/api/habits", {
            headers: { authorization: token },
          });
          dispatch({
            type: "SET_ALL",
            payload: {
              habits: (response.data.habits || []).map(normalizeHabit),
              completions: (response.data.completions || []).map(normalizeCompletion),
            },
          });
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }, [isLoggedIn, token]);

  function addHabit(input: HabitInput) {
    (async () => {
      try {
        const response = await axios.post(
          "/api/habits",
          input,
          { headers: { authorization: token } }
        );
        dispatch({ type: "SET_HABITS", payload: (response.data.habits || []).map(normalizeHabit) });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function updateHabit(id: string, updates: Partial<HabitInput>) {
    (async () => {
      try {
        const response = await axios.post(
          `/api/habits/${id}`,
          updates,
          { headers: { authorization: token } }
        );
        dispatch({ type: "SET_HABITS", payload: (response.data.habits || []).map(normalizeHabit) });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function deleteHabit(id: string) {
    (async () => {
      try {
        const response = await axios.delete(`/api/habits/${id}`, {
          headers: { authorization: token },
        });
        dispatch({
          type: "SET_ALL",
          payload: {
            habits: (response.data.habits || []).map(normalizeHabit),
            completions: (response.data.completions || []).map(normalizeCompletion),
          },
        });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function markCompletion(habitId: string, date: string, status: CompletionStatus) {
    (async () => {
      try {
        const response = await axios.post(
          "/api/habits/complete",
          { habitId, date, status },
          { headers: { authorization: token } }
        );
        dispatch({ type: "SET_COMPLETIONS", payload: (response.data.completions || []).map(normalizeCompletion) });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  function removeCompletion(habitId: string, date: string) {
    (async () => {
      try {
        const response = await axios.post(
          "/api/habits/complete",
          { habitId, date, status: "remove" },
          { headers: { authorization: token } }
        );
        dispatch({ type: "SET_COMPLETIONS", payload: (response.data.completions || []).map(normalizeCompletion) });
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  const getCompletionStatus = useCallback(
    (habitId: string, date: string): CompletionStatus | null => {
      const entry = state.completions.find(
        (c) => c.habitId === habitId && c.date === date
      );
      return entry ? entry.status : null;
    },
    [state.completions]
  );

  const isCompletedToday = useCallback(
    (habitId: string): boolean => {
      const today = dayjs().format("YYYY-MM-DD");
      return state.completions.some(
        (c) => c.habitId === habitId && c.date === today && c.status === "done"
      );
    },
    [state.completions]
  );

  const getStreak = useCallback(
    (habitId: string): number => {
      const habit = state.habits.find((h) => h._id === habitId);
      if (!habit) return 0;

      const completionMap = new Map<string, CompletionStatus>();
      state.completions
        .filter((c) => c.habitId === habitId)
        .forEach((c) => completionMap.set(c.date, c.status));

      let streak = 0;
      let freezeUsed = false;
      let day = dayjs();

      for (let i = 0; i < 365; i++) {
        const dateStr = day.format("YYYY-MM-DD");

        if (day.isBefore(dayjs(habit.startDate), "day")) break;

        if (!isScheduledDay(habit, dateStr)) {
          day = day.subtract(1, "day");
          continue;
        }

        const status = completionMap.get(dateStr);
        if (status === "done" || status === "skipped") {
          streak++;
        } else {
          if (habit.streakFreeze && !freezeUsed) {
            freezeUsed = true;
            day = day.subtract(1, "day");
            continue;
          }
          break;
        }

        day = day.subtract(1, "day");
      }

      // Persist longest streak if beaten
      if (streak > habit.longestStreak) {
        (async () => {
          try {
            await axios.post(
              `/api/habits/${habitId}`,
              { longestStreak: streak },
              { headers: { authorization: token } }
            );
          } catch {
            // silent
          }
        })();
      }

      return streak;
    },
    [state.habits, state.completions, token]
  );

  const getLongestStreak = useCallback(
    (habitId: string): number => {
      const habit = state.habits.find((h) => h._id === habitId);
      if (!habit) return 0;
      const current = getStreak(habitId);
      return Math.max(habit.longestStreak, current);
    },
    [state.habits, getStreak]
  );

  const getCompletionPercentage = useCallback(
    (habitId: string, days: number): number => {
      const habit = state.habits.find((h) => h._id === habitId);
      if (!habit) return 0;

      let scheduled = 0;
      let done = 0;
      const today = dayjs();

      for (let i = 0; i < days; i++) {
        const d = today.subtract(i, "day");
        const dateStr = d.format("YYYY-MM-DD");
        if (!isScheduledDay(habit, dateStr)) continue;
        scheduled++;
        const entry = state.completions.find(
          (c) => c.habitId === habitId && c.date === dateStr && c.status === "done"
        );
        if (entry) done++;
      }

      return scheduled === 0 ? 0 : Math.round((done / scheduled) * 100);
    },
    [state.habits, state.completions]
  );

  const getCompletionsForRange = useCallback(
    (habitId: string, start: string, end: string): HabitCompletion[] => {
      return state.completions.filter(
        (c) =>
          c.habitId === habitId &&
          c.date >= start &&
          c.date <= end
      );
    },
    [state.completions]
  );

  return (
    <HabitsContext.Provider
      value={{
        habits: state.habits,
        completions: state.completions,
        addHabit,
        updateHabit,
        deleteHabit,
        markCompletion,
        removeCompletion,
        getCompletionStatus,
        isCompletedToday,
        getStreak,
        getLongestStreak,
        getCompletionPercentage,
        getCompletionsForRange,
        habitDialogOpen,
        setHabitDialogOpen,
        editingHabit,
        setEditingHabit,
      }}
    >
      {children}
    </HabitsContext.Provider>
  );
}
