import { Link } from "react-router-dom";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-12 text-center">
      <FileQuestion className="h-16 w-16 text-muted-foreground mb-4" />
      <div className="text-[6rem] font-bold text-foreground leading-none mb-4">
        404
      </div>
      <h1 className="text-xl text-muted-foreground mb-8">
        Looks like you lost your way.
      </h1>
      <Button asChild>
        <Link to="/">Go Back Home</Link>
      </Button>
    </div>
  );
}
