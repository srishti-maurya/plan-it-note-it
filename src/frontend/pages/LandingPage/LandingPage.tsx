import { useNavigate } from "react-router-dom";
import { StickyNote, Palette, Tags, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: StickyNote,
    title: "Organize Notes",
    description: "Create, edit, and manage your notes with an intuitive interface.",
  },
  {
    icon: Palette,
    title: "Color Code",
    description: "Add colors and priorities to keep your notes visually organized.",
  },
  {
    icon: Tags,
    title: "Labels & Filters",
    description: "Tag notes and filter by priority to find what you need fast.",
  },
  {
    icon: Archive,
    title: "Archive & Trash",
    description: "Archive notes for later or move them to trash when you're done.",
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <StickyNote className="h-10 w-10 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Plan it, Note it
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto">
            Manage your everyday tasks and workflow with an advanced yet
            simple approach to increase your productivity.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-muted py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold tracking-tight text-center mb-12">
            Everything you need to stay organized
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-none bg-background">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
