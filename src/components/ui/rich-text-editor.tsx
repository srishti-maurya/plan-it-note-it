import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  ListChecks,
  Code2,
  Quote,
  Undo2,
  Redo2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2] },
      }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "tiptap outline-none min-h-[120px] px-3 py-2 text-sm",
        "data-placeholder": placeholder,
      },
    },
  });

  if (!editor) return null;

  const tools = [
    [
      {
        icon: Bold,
        label: "Bold",
        action: () => editor.chain().focus().toggleBold().run(),
        active: editor.isActive("bold"),
      },
      {
        icon: Italic,
        label: "Italic",
        action: () => editor.chain().focus().toggleItalic().run(),
        active: editor.isActive("italic"),
      },
      {
        icon: UnderlineIcon,
        label: "Underline",
        action: () => editor.chain().focus().toggleUnderline().run(),
        active: editor.isActive("underline"),
      },
      {
        icon: Strikethrough,
        label: "Strikethrough",
        action: () => editor.chain().focus().toggleStrike().run(),
        active: editor.isActive("strike"),
      },
    ],
    [
      {
        icon: Heading1,
        label: "Heading 1",
        action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        active: editor.isActive("heading", { level: 1 }),
      },
      {
        icon: Heading2,
        label: "Heading 2",
        action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        active: editor.isActive("heading", { level: 2 }),
      },
    ],
    [
      {
        icon: List,
        label: "Bullet List",
        action: () => editor.chain().focus().toggleBulletList().run(),
        active: editor.isActive("bulletList"),
      },
      {
        icon: ListOrdered,
        label: "Ordered List",
        action: () => editor.chain().focus().toggleOrderedList().run(),
        active: editor.isActive("orderedList"),
      },
      {
        icon: ListChecks,
        label: "Checklist",
        action: () => editor.chain().focus().toggleTaskList().run(),
        active: editor.isActive("taskList"),
      },
    ],
    [
      {
        icon: Code2,
        label: "Code Block",
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        active: editor.isActive("codeBlock"),
      },
      {
        icon: Quote,
        label: "Blockquote",
        action: () => editor.chain().focus().toggleBlockquote().run(),
        active: editor.isActive("blockquote"),
      },
    ],
    [
      {
        icon: Undo2,
        label: "Undo",
        action: () => editor.chain().focus().undo().run(),
        active: false,
      },
      {
        icon: Redo2,
        label: "Redo",
        action: () => editor.chain().focus().redo().run(),
        active: false,
      },
    ],
  ];

  return (
    <div className="rounded-md border border-input focus-within:ring-1 focus-within:ring-ring">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-input px-1.5 py-1">
        {tools.map((group, gi) => (
          <div key={gi} className="flex items-center">
            {gi > 0 && (
              <Separator orientation="vertical" className="mx-1 h-5" />
            )}
            {group.map((tool) => (
              <Button
                key={tool.label}
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7",
                  tool.active && "bg-accent text-accent-foreground"
                )}
                onClick={tool.action}
                title={tool.label}
              >
                <tool.icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        ))}
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
