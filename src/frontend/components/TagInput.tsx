import { useState, useRef, type KeyboardEvent } from "react";
import { X, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions: string[];
  /** Pre-defined labels always shown as toggleable chips */
  presets?: string[];
}

export function TagInput({ tags, onChange, suggestions, presets = [] }: TagInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Suggestions dropdown excludes presets (those are shown as chips) and already-selected tags
  const filteredSuggestions = suggestions.filter(
    (s) =>
      s.toLowerCase().includes(inputValue.toLowerCase()) &&
      !tags.includes(s) &&
      !presets.includes(s)
  );

  // Custom tags = selected tags that aren't in presets
  const customTags = tags.filter((t) => !presets.includes(t));

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
    setInputValue("");
    setShowSuggestions(false);
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const togglePreset = (preset: string) => {
    if (tags.includes(preset)) {
      removeTag(preset);
    } else {
      onChange([...tags, preset]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === "Enter" || e.key === ",") && inputValue.trim()) {
      e.preventDefault();
      addTag(inputValue);
    }
    if (e.key === "Backspace" && !inputValue && customTags.length > 0) {
      removeTag(customTags[customTags.length - 1]);
    }
  };

  return (
    <div className="space-y-2">
      {/* Pre-defined label chips — always visible */}
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {presets.map((preset) => {
            const selected = tags.includes(preset);
            return (
              <button
                key={preset}
                type="button"
                onClick={() => togglePreset(preset)}
                className={cn(
                  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors",
                  selected
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent text-muted-foreground border-input hover:bg-accent hover:text-accent-foreground"
                )}
              >
                {selected && <Check className="h-3 w-3" />}
                {preset}
              </button>
            );
          })}
        </div>
      )}

      {/* Custom tag input with chips */}
      <div className="relative">
        <div
          className={cn(
            "flex flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm",
            "focus-within:ring-1 focus-within:ring-ring"
          )}
          onClick={() => inputRef.current?.focus()}
        >
          {customTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="gap-1 text-xs">
              {tag}
              <button
                type="button"
                className="ml-0.5 rounded-full hover:bg-muted-foreground/20"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          <input
            ref={inputRef}
            className="flex-1 min-w-[80px] bg-transparent outline-none placeholder:text-muted-foreground text-sm"
            placeholder="Type a custom label..."
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setShowSuggestions(true);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => {
              setTimeout(() => setShowSuggestions(false), 150);
            }}
          />
        </div>

        {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-1 shadow-md">
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="flex w-full items-center rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                onMouseDown={(e) => {
                  e.preventDefault();
                  addTag(suggestion);
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
