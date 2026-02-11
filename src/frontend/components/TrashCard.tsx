import { RotateCcw, Trash2 } from "lucide-react";
import { useNotes } from "../context";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { stripHtml } from "@/lib/strip-html";

export function TrashCard() {
  const { state, restoreFromTrash, deleteNoteFromTrash } = useNotes();

  if (state.trashList.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Trash2 className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">Trash is empty</p>
        <p className="text-sm">Notes you delete will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {state.trashList?.map((item) => (
        <Card
          className="flex flex-col justify-between opacity-75 transition-all duration-200 hover:opacity-100 hover:-translate-y-0.5 hover:shadow-md break-words"
          key={item._id}
          style={{ backgroundColor: item.bgColor || undefined }}
        >
          <CardHeader className="pb-2">
            <h3 className="font-semibold text-sm">{item.title}</h3>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
              {stripHtml(item.note)}
            </p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-2 pb-3">
            <div className="flex items-center gap-1.5">
              {item.tag !== "" && (
                <Badge variant="secondary" className="text-xs">
                  {item.tag}
                </Badge>
              )}
              <span className="text-xs text-muted-foreground">
                {item.createdAt}
              </span>
            </div>
            <div className="flex gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={() => restoreFromTrash(item)}
                  >
                    <RotateCcw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Restore</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteNoteFromTrash(item)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete permanently</TooltipContent>
              </Tooltip>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
