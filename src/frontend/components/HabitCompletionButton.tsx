import { Check, SkipForward, ChevronDown } from "lucide-react";
import { useHabits } from "../context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { CompletionStatus } from "../../types";

interface HabitCompletionButtonProps {
  habitId: string;
  date: string;
}

export function HabitCompletionButton({ habitId, date }: HabitCompletionButtonProps) {
  const { getCompletionStatus, markCompletion, removeCompletion } = useHabits();
  const status = getCompletionStatus(habitId, date);

  const handleMainClick = () => {
    if (status) {
      removeCompletion(habitId, date);
    } else {
      markCompletion(habitId, date, "done");
    }
  };

  const handleMenuAction = (action: CompletionStatus | "clear") => {
    if (action === "clear") {
      removeCompletion(habitId, date);
    } else {
      markCompletion(habitId, date, action);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant={status ? "default" : "outline"}
        size="icon"
        className={cn(
          "h-10 w-10 rounded-full shrink-0",
          status === "done" && "bg-emerald-600 hover:bg-emerald-700 text-white",
          status === "skipped" && "bg-amber-500 hover:bg-amber-600 text-white"
        )}
        onClick={handleMainClick}
      >
        {status === "done" && <Check className="h-5 w-5" />}
        {status === "skipped" && <SkipForward className="h-4 w-4" />}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0">
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleMenuAction("done")}>
            <Check className="h-4 w-4 text-emerald-600" />
            Mark Done
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("skipped")}>
            <SkipForward className="h-4 w-4 text-amber-500" />
            Skip
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleMenuAction("clear")}>
            Clear
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
