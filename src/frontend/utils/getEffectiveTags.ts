import type { Note } from "../../types";

export function getEffectiveTags(note: Note): string[] {
  if (note.tags && note.tags.length > 0) return note.tags;
  if (note.tag) return [note.tag];
  return [];
}
