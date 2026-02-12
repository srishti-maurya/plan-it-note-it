import { ArchiveRestore, Trash2, Archive, Star } from "lucide-react";
import { useNotes } from "../context";
import { getEffectiveTags } from "../utils/getEffectiveTags";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { stripHtml } from "@/lib/strip-html";
import { cn } from "@/lib/utils";

export function ArchiveCard() {
  const { state, restoreArchiveNote, deleteArchiveNote, toggleArchiveFavorite } = useNotes();

  if (state.archiveList.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <Archive className="h-12 w-12 mb-3" />
        <p className="text-lg font-medium">No archived notes</p>
        <p className="text-sm">Notes you archive will appear here</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {state.archiveList?.map((item) => {
        const tags = getEffectiveTags(item);
        return (
          <Card
            className="flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md break-words"
            key={item._id}
            style={{ backgroundColor: item.bgColor || undefined }}
          >
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="flex-1 font-semibold text-sm">{item.title}</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 shrink-0 text-muted-foreground"
                  onClick={() => toggleArchiveFavorite(item)}
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      item.favorite && "fill-yellow-400 text-yellow-400"
                    )}
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
                {stripHtml(item.note)}
              </p>
            </CardContent>
            <CardFooter className="flex items-center justify-between pt-2 pb-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {tags.map((t) => (
                  <Badge key={t} variant="secondary" className="text-xs">
                    {t}
                  </Badge>
                ))}
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
                      onClick={() => restoreArchiveNote(item)}
                    >
                      <ArchiveRestore className="h-4 w-4" />
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
                      onClick={() => deleteArchiveNote(item)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Move to Trash</TooltipContent>
                </Tooltip>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
