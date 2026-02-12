import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useAuth } from "./auth-context";
import type { JournalEntry } from "../../types";

interface JournalContextType {
  entries: JournalEntry[];
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  currentEntry: JournalEntry | undefined;
  entryDates: string[];
  getEntryForDate: (date: string) => JournalEntry | undefined;
  saveEntry: (date: string, responses: JournalEntry["responses"]) => void;
}

const JournalContext = createContext<JournalContextType | null>(null);

export const useJournal = (): JournalContextType => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error("useJournal must be used within a JournalProvider");
  }
  return context;
};

export function JournalProvider({ children }: { children: ReactNode }) {
  const { token, isLoggedIn } = useAuth();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  useEffect(() => {
    if (isLoggedIn) {
      (async () => {
        try {
          const response = await axios.get("/api/journal", {
            headers: { authorization: token },
          });
          setEntries(response.data.entries);
        } catch (error) {
          console.error("ERROR", error);
        }
      })();
    }
  }, [isLoggedIn, token]);

  const currentEntry = entries.find((e) => e.date === selectedDate);
  const entryDates = entries.map((e) => e.date);

  function getEntryForDate(date: string) {
    return entries.find((e) => e.date === date);
  }

  function saveEntry(date: string, responses: JournalEntry["responses"]) {
    (async () => {
      try {
        const response = await axios.post(
          "/api/journal",
          { date, responses },
          { headers: { authorization: token } }
        );
        setEntries(response.data.entries);
      } catch (error) {
        console.error("ERROR", error);
      }
    })();
  }

  return (
    <JournalContext.Provider
      value={{
        entries,
        selectedDate,
        setSelectedDate,
        currentEntry,
        entryDates,
        getEntryForDate,
        saveEntry,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}
