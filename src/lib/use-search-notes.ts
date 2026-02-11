import { useState, useEffect, useMemo } from "react";
import Fuse, { type IFuseOptions } from "fuse.js";
import type { Note } from "../types";
import { stripHtml } from "./strip-html";
import { getEffectiveTags } from "../frontend/utils/getEffectiveTags";

export interface SearchMatchIndices {
  titleIndices: ReadonlyArray<readonly [number, number]>;
  bodyIndices: ReadonlyArray<readonly [number, number]>;
  tagsIndices: ReadonlyArray<readonly [number, number]>;
}

export interface SearchResult {
  note: Note;
  plainBody: string;
  matches: SearchMatchIndices;
}

interface SearchableNote {
  note: Note;
  plainBody: string;
  tagsJoined: string;
}

const fuseOptions: IFuseOptions<SearchableNote> = {
  keys: [
    { name: "note.title", weight: 0.4 },
    { name: "plainBody", weight: 0.4 },
    { name: "tagsJoined", weight: 0.2 },
  ],
  includeMatches: true,
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export function useSearchNotes(notes: Note[], searchQuery: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const searchableNotes = useMemo<SearchableNote[]>(
    () =>
      notes.map((note) => ({
        note,
        plainBody: stripHtml(note.note),
        tagsJoined: getEffectiveTags(note).join(" "),
      })),
    [notes]
  );

  const fuse = useMemo(
    () => new Fuse(searchableNotes, fuseOptions),
    [searchableNotes]
  );

  const results = useMemo<SearchResult[]>(() => {
    const trimmed = debouncedQuery.trim();
    if (trimmed.length < 1) return [];

    return fuse.search(trimmed).map((result) => {
      const titleIndices: Array<readonly [number, number]> = [];
      const bodyIndices: Array<readonly [number, number]> = [];
      const tagsIndices: Array<readonly [number, number]> = [];

      result.matches?.forEach((match) => {
        const indices = match.indices.map(
          ([start, end]) => [start, end] as const
        );
        if (match.key === "note.title") {
          titleIndices.push(...indices);
        } else if (match.key === "plainBody") {
          bodyIndices.push(...indices);
        } else if (match.key === "tagsJoined") {
          tagsIndices.push(...indices);
        }
      });

      return {
        note: result.item.note,
        plainBody: result.item.plainBody,
        matches: { titleIndices, bodyIndices, tagsIndices },
      };
    });
  }, [fuse, debouncedQuery]);

  const isSearching = searchQuery !== debouncedQuery;

  return { results, isSearching };
}
