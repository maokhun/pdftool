import Link from "next/link";
import type { ComponentType } from "react";
import type { IconProps } from "@/components/icons";

const toneStyles: Record<string, string> = {
  indigo: "text-indigo-600 bg-indigo-500/10 dark:text-indigo-300 dark:bg-indigo-500/20",
  sky: "text-sky-600 bg-sky-500/10 dark:text-sky-300 dark:bg-sky-500/20",
  emerald: "text-emerald-600 bg-emerald-500/10 dark:text-emerald-300 dark:bg-emerald-500/20",
  rose: "text-rose-600 bg-rose-500/10 dark:text-rose-300 dark:bg-rose-500/20",
  amber: "text-amber-600 bg-amber-500/10 dark:text-amber-300 dark:bg-amber-500/20",
  slate: "text-slate-600 bg-slate-500/10 dark:text-slate-300 dark:bg-slate-500/20"
};

export default function ToolCard({
  title,
  href,
  icon: Icon,
  tone
}: {
  title: string;
  href: string;
  icon: ComponentType<IconProps>;
  tone: keyof typeof toneStyles;
}) {
  return (
    <Link
      href={href}
      className="tool-card group flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200/70 bg-white px-4 py-6 text-center shadow-soft transition duration-300 hover:-translate-y-1 hover:border-slate-300/60 hover:shadow-card dark:border-slate-700/60 dark:bg-slate-900/70"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
          toneStyles[tone]
        }`}
      >
        <Icon className="h-7 w-7" />
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </p>
        <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Fast, secure, cloud-ready
        </p>
      </div>
    </Link>
  );
}
