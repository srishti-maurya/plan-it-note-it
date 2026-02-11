import { LabelList } from "../../components";

export function Labels() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Labels</h1>
        <p className="text-sm text-muted-foreground">
          Notes grouped by label
        </p>
      </div>
      <LabelList />
    </div>
  );
}
