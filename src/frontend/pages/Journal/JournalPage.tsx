import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { Save, Pencil } from "lucide-react";
import { toast } from "sonner";
import { useJournal } from "../../context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

export function JournalPage() {
  const { selectedDate, currentEntry, saveEntry } = useJournal();

  const [responses, setResponses] = useState({
    mood: "",
    gratitude: "",
    goals: "",
    freeform: "",
  });
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    if (currentEntry) {
      setResponses(currentEntry.responses);
      setIsViewing(true);
    } else {
      setResponses({ mood: "", gratitude: "", goals: "", freeform: "" });
      setIsViewing(false);
    }
  }, [selectedDate, currentEntry]);

  const handleSave = () => {
    saveEntry(selectedDate, responses);
    setIsViewing(true);
    toast.success("Journal entry saved!");
  };

  const formattedDate = dayjs(selectedDate).format("dddd, MMMM D, YYYY");
  const isToday = selectedDate === dayjs().format("YYYY-MM-DD");

  const hasContent = responses.mood || responses.gratitude || responses.goals || responses.freeform;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Journal</h1>
          <p className="text-sm text-muted-foreground">
            {isToday ? "Today — " : ""}{formattedDate}
          </p>
        </div>
        {isViewing ? (
          <Button onClick={() => setIsViewing(false)}>
            <Pencil className="h-4 w-4" />
            Edit Entry
          </Button>
        ) : (
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Entry
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">How are you feeling today?</CardTitle>
          </CardHeader>
          <CardContent>
            {isViewing ? (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap min-h-[3rem]">
                {responses.mood || <span className="italic">No entry</span>}
              </p>
            ) : (
              <Textarea
                placeholder="Describe your mood..."
                value={responses.mood}
                onChange={(e) => setResponses((r) => ({ ...r, mood: e.target.value }))}
                rows={3}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">What are you grateful for?</CardTitle>
          </CardHeader>
          <CardContent>
            {isViewing ? (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap min-h-[3rem]">
                {responses.gratitude || <span className="italic">No entry</span>}
              </p>
            ) : (
              <Textarea
                placeholder="List things you're grateful for..."
                value={responses.gratitude}
                onChange={(e) => setResponses((r) => ({ ...r, gratitude: e.target.value }))}
                rows={3}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Goals for tomorrow</CardTitle>
          </CardHeader>
          <CardContent>
            {isViewing ? (
              <p className="text-sm text-muted-foreground whitespace-pre-wrap min-h-[3rem]">
                {responses.goals || <span className="italic">No entry</span>}
              </p>
            ) : (
              <Textarea
                placeholder="What do you want to accomplish?"
                value={responses.goals}
                onChange={(e) => setResponses((r) => ({ ...r, goals: e.target.value }))}
                rows={3}
              />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Free thoughts</CardTitle>
          </CardHeader>
          <CardContent>
            {isViewing ? (
              <div
                className="prose-view text-sm text-muted-foreground min-h-[3rem]"
                dangerouslySetInnerHTML={{
                  __html: responses.freeform || "<em>No entry</em>",
                }}
              />
            ) : (
              <RichTextEditor
                key={`${selectedDate}-edit`}
                content={responses.freeform}
                onChange={(html) => setResponses((r) => ({ ...r, freeform: html }))}
                placeholder="Write freely..."
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
