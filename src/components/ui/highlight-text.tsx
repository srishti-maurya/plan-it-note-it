interface HighlightTextProps {
  text: string;
  indices: ReadonlyArray<readonly [number, number]>;
}

function mergeRanges(
  ranges: ReadonlyArray<readonly [number, number]>
): Array<[number, number]> {
  if (ranges.length === 0) return [];
  const sorted = [...ranges].sort((a, b) => a[0] - b[0]);
  const merged: Array<[number, number]> = [[sorted[0][0], sorted[0][1]]];
  for (let i = 1; i < sorted.length; i++) {
    const last = merged[merged.length - 1];
    if (sorted[i][0] <= last[1] + 1) {
      last[1] = Math.max(last[1], sorted[i][1]);
    } else {
      merged.push([sorted[i][0], sorted[i][1]]);
    }
  }
  return merged;
}

export function HighlightText({ text, indices }: HighlightTextProps) {
  if (!indices || indices.length === 0) {
    return <>{text}</>;
  }

  const merged = mergeRanges(indices);
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const [start, end] of merged) {
    if (start > lastIndex) {
      parts.push(text.slice(lastIndex, start));
    }
    parts.push(
      <mark
        key={start}
        className="bg-yellow-200 dark:bg-yellow-500/30 rounded-sm px-0.5"
      >
        {text.slice(start, end + 1)}
      </mark>
    );
    lastIndex = end + 1;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return <>{parts}</>;
}
