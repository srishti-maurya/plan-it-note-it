import { useNotes } from "../context";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";

export function FilterList() {
  const { notesOrder, setNotesOrder } = useNotes();

  const filterValue = (() => {
    if (typeof notesOrder.filter === "object") {
      if ((notesOrder.filter as Record<string, string>).Low === "1")
        return "low";
      if ((notesOrder.filter as Record<string, string>).Medium === "2")
        return "medium";
      if ((notesOrder.filter as Record<string, string>).High === "3")
        return "high";
    }
    return "";
  })();

  return (
    <div className="w-64 space-y-3" onClick={(e) => e.stopPropagation()}>
      <Tabs defaultValue="sort">
        <TabsList className="w-full">
          <TabsTrigger value="sort" className="flex-1">
            Sort
          </TabsTrigger>
          <TabsTrigger value="filter" className="flex-1">
            Filter
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sort" className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Date
            </h4>
            <RadioGroup
              value={notesOrder.sort}
              onValueChange={(value) =>
                setNotesOrder({ ...notesOrder, sort: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="latest" id="latest" />
                <Label htmlFor="latest" className="cursor-pointer">
                  Latest first
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="oldest" id="oldest" />
                <Label htmlFor="oldest" className="cursor-pointer">
                  Oldest first
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Priority
            </h4>
            <RadioGroup
              value={notesOrder.sort}
              onValueChange={(value) =>
                setNotesOrder({ ...notesOrder, sort: value })
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lowToHigh" id="lowToHigh" />
                <Label htmlFor="lowToHigh" className="cursor-pointer">
                  Low to High
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="highToLow" id="highToLow" />
                <Label htmlFor="highToLow" className="cursor-pointer">
                  High to Low
                </Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>

        <TabsContent value="filter" className="space-y-3">
          <div>
            <h4 className="text-xs font-medium text-muted-foreground mb-2">
              Priority
            </h4>
            <RadioGroup
              value={filterValue}
              onValueChange={(value) => {
                const map: Record<string, Record<string, string>> = {
                  low: { Low: "1" },
                  medium: { Medium: "2" },
                  high: { High: "3" },
                };
                setNotesOrder({ ...notesOrder, filter: map[value] });
              }}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="low" id="filter-low" />
                <Label htmlFor="filter-low" className="cursor-pointer">
                  Low
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="filter-medium" />
                <Label htmlFor="filter-medium" className="cursor-pointer">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="high" id="filter-high" />
                <Label htmlFor="filter-high" className="cursor-pointer">
                  High
                </Label>
              </div>
            </RadioGroup>
          </div>
        </TabsContent>
      </Tabs>

      <Separator />

      <Button
        variant="ghost"
        size="sm"
        className="w-full"
        onClick={() => setNotesOrder({ sort: "", filter: "" })}
      >
        Clear all
      </Button>
    </div>
  );
}
