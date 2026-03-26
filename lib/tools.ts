import type { ComponentType } from "react";
import {
  SparkIcon,
  ChatIcon,
  TranslateIcon,
  SummarizeIcon,
  MergeIcon,
  CompressIcon,
  ConvertIcon,
  SplitIcon,
  EditIcon,
  ResizeIcon,
  ReaderIcon,
  DocIcon,
  SheetIcon,
  SlidesIcon,
  TxtIcon,
  ImageIcon
} from "@/components/icons";
import type { IconProps } from "@/components/icons";

export type ToolItem = {
  title: string;
  href: string;
  icon: ComponentType<IconProps>;
  tone: "indigo" | "sky" | "emerald" | "rose" | "amber" | "slate";
};

export type ToolSection = {
  id: string;
  title: string;
  description: string;
  tools: ToolItem[];
};

export const toolSections: ToolSection[] = [
  {
    id: "ai-tools",
    title: "AI Tools",
    description: "Intelligent helpers for faster document work.",
    tools: [
      { title: "Chat with PDF", href: "#chat", icon: ChatIcon, tone: "indigo" },
      { title: "Translate PDF", href: "#translate", icon: TranslateIcon, tone: "sky" },
      { title: "AI PDF Summarizer", href: "#summarize", icon: SummarizeIcon, tone: "emerald" }
    ]
  },
  {
    id: "organize",
    title: "Organize & Manage",
    description: "Combine, compress, and keep things tidy.",
    tools: [
      { title: "Merge PDF", href: "#merge", icon: MergeIcon, tone: "indigo" },
      { title: "Compress PDF", href: "#compress", icon: CompressIcon, tone: "amber" },
      { title: "Convert PDF", href: "#convert", icon: ConvertIcon, tone: "sky" },
      { title: "Split PDF", href: "#split", icon: SplitIcon, tone: "rose" }
    ]
  },
  {
    id: "view-edit",
    title: "View & Edit",
    description: "Quick edits and on-the-fly viewing.",
    tools: [
      { title: "Edit PDF", href: "#edit", icon: EditIcon, tone: "indigo" },
      { title: "Resize PDF", href: "#resize", icon: ResizeIcon, tone: "sky" },
      { title: "PDF Reader", href: "#reader", icon: ReaderIcon, tone: "emerald" }
    ]
  },
  {
    id: "convert-from",
    title: "Convert from PDF",
    description: "Export your PDFs into editable formats.",
    tools: [
      { title: "PDF to Word", href: "#pdf-word", icon: DocIcon, tone: "indigo" },
      { title: "PDF to Excel", href: "#pdf-excel", icon: SheetIcon, tone: "emerald" },
      { title: "PDF to PPT", href: "#pdf-ppt", icon: SlidesIcon, tone: "amber" }
    ]
  },
  {
    id: "convert-to",
    title: "Convert to PDF",
    description: "Turn office documents into polished PDFs.",
    tools: [
      { title: "Word to PDF", href: "#word-pdf", icon: DocIcon, tone: "indigo" },
      { title: "Excel to PDF", href: "#excel-pdf", icon: SheetIcon, tone: "emerald" },
      { title: "PPT to PDF", href: "#ppt-pdf", icon: SlidesIcon, tone: "amber" },
      { title: "TXT to PDF", href: "#txt-pdf", icon: TxtIcon, tone: "slate" }
    ]
  },
  {
    id: "convert-image",
    title: "Convert Image",
    description: "Move between images and PDFs in seconds.",
    tools: [
      { title: "PNG to PDF", href: "#png-pdf", icon: ImageIcon, tone: "sky" },
      { title: "JPG to PDF", href: "#jpg-pdf", icon: ImageIcon, tone: "rose" },
      { title: "PDF to JPG", href: "#pdf-jpg", icon: ImageIcon, tone: "amber" }
    ]
  }
];

export const quickActions: ToolItem[] = [
  { title: "AI Quick Summary", href: "#summary", icon: SparkIcon, tone: "indigo" },
  { title: "Instant Translate", href: "#instant-translate", icon: TranslateIcon, tone: "sky" },
  { title: "Smart Convert", href: "#smart-convert", icon: ConvertIcon, tone: "emerald" }
];
