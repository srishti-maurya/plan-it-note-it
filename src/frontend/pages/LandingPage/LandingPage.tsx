import { useNavigate } from "react-router-dom";
import {
  StickyNote,
  Palette,
  Tags,
  Archive,
  ListChecks,
  Flame,
  BookOpen,
  CalendarDays,
  FolderOpen,
  Search,
  Sun,
  Moon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sections = [
  {
    label: "Notes",
    description: "Capture ideas with a powerful rich text editor, folders, tags, and color-coded cards.",
    icon: StickyNote,
    color: "bg-blue-500/10 text-blue-600",
    features: [
      { icon: FolderOpen, title: "Nested Folders", description: "Organize notes into a folder hierarchy that works for you." },
      { icon: Palette, title: "Color & Priority", description: "Color-code cards and set priorities to keep things visual." },
      { icon: Tags, title: "Tags & Filters", description: "Label notes with custom tags and filter or sort instantly." },
      { icon: Search, title: "Full-Text Search", description: "Find any note in seconds with real-time search." },
      { icon: Archive, title: "Archive & Trash", description: "Archive notes for later or safely move them to trash." },
    ],
  },
  {
    label: "Habits",
    description: "Build consistency with flexible tracking, streaks, and visual insights.",
    icon: ListChecks,
    color: "bg-emerald-500/10 text-emerald-600",
    features: [
      { icon: ListChecks, title: "Custom Frequency", description: "Track daily, weekly, or pick specific days of the week." },
      { icon: Flame, title: "Streaks & Freeze", description: "Current and longest streak tracking with an optional grace period." },
      { icon: CalendarDays, title: "Activity Heatmap", description: "GitHub-style heatmap showing 26 weeks of habit history." },
    ],
  },
  {
    label: "Journal",
    description: "Reflect daily with guided prompts, a calendar view, and mood tracking.",
    icon: BookOpen,
    color: "bg-violet-500/10 text-violet-600",
    features: [
      { icon: BookOpen, title: "Guided Prompts", description: "Mood, gratitude, goals, and free-form rich text every day." },
      { icon: CalendarDays, title: "Calendar View", description: "Navigate past entries with a month calendar and mood color dots." },
      { icon: Sun, title: "Mood Indicators", description: "Automatic mood color coding based on your journal entries." },
    ],
  },
];

export function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="flex flex-col items-center justify-center px-6 py-28 text-center">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="flex items-center justify-center gap-3 mb-2">
            <StickyNote className="h-10 w-10 text-foreground" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Plan it, Note it
          </h1>
          <p className="text-lg text-muted-foreground max-w-[600px] mx-auto leading-relaxed">
            Your all-in-one productivity workspace — notes, habits, and
            journaling in one clean, focused app.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" onClick={() => navigate("/signup")}>
              Get Started
              <ArrowRight className="h-4 w-4" />
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

      {/* Section features */}
      {sections.map((section, idx) => (
        <section
          key={section.label}
          className={idx % 2 === 0 ? "bg-muted py-20 px-6" : "py-20 px-6"}
        >
          <div className="mx-auto max-w-5xl">
            {/* Section header */}
            <div className="flex flex-col items-center text-center mb-12 space-y-3">
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${section.color}`}>
                <section.icon className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">{section.label}</h2>
              <p className="text-muted-foreground max-w-md">{section.description}</p>
            </div>

            {/* Feature cards */}
            <div className={`grid grid-cols-1 gap-6 ${
              section.features.length <= 3
                ? "sm:grid-cols-3"
                : "sm:grid-cols-2 lg:grid-cols-3"
            }`}>
              {section.features.map((feature) => (
                <Card key={feature.title} className="border-0 shadow-none bg-background">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-20 px-6 text-center">
        <div className="mx-auto max-w-lg space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Ready to get organized?</h2>
          <p className="text-muted-foreground">
            Start capturing notes, building habits, and journaling — all in one place.
          </p>
          <Button size="lg" onClick={() => navigate("/signup")}>
            Create Free Account
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 px-6 text-center text-sm text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
          <StickyNote className="h-4 w-4" />
          <span>PlanIt NoteIt</span>
        </div>
      </footer>
    </div>
  );
}
