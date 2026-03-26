"use client";

import { useMemo, useState } from "react";
import ToolGrid from "@/components/ToolGrid";
import SectionTitle from "@/components/SectionTitle";
import UploadPanel from "@/components/UploadPanel";
import { SearchIcon } from "@/components/icons";
import { quickActions, toolSections } from "@/lib/tools";

export default function Dashboard() {
  const [query, setQuery] = useState("");

  const filteredSections = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return toolSections;

    return toolSections
      .map((section) => ({
        ...section,
        tools: section.tools.filter((tool) =>
          tool.title.toLowerCase().includes(normalized)
        )
      }))
      .filter((section) => section.tools.length > 0);
  }, [query]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10">
      <section className="section-card relative animate-fade-up overflow-hidden rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-soft dark:border-slate-800/60 dark:bg-slate-900/70">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />
        <div className="absolute bottom-0 right-12 h-24 w-24 rounded-full bg-sky-400/10 blur-2xl" />
        <div className="relative flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">
              PDF Toolkit
            </p>
            <h1 className="font-heading text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
              One dashboard for every PDF workflow.
            </h1>
            <p className="max-w-2xl text-base text-slate-600 dark:text-slate-300">
              AI-powered insights, lightning-fast conversions, and secure file
              handling built for modern teams.
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative w-full flex-1">
              <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search tools, e.g., merge, translate, JPG"
                className="w-full rounded-2xl border border-slate-200/70 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 shadow-soft outline-none transition focus:border-slate-300 dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-200"
              />
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              {quickActions.map((action) => (
                <button
                  key={action.title}
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200/70 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-soft transition hover:-translate-y-0.5 dark:border-slate-700/70 dark:bg-slate-950 dark:text-slate-200"
                >
                  <action.icon className="h-5 w-5" />
                  {action.title}
                </button>
              ))}
            </div>
          </div>
          <UploadPanel />
        </div>
      </section>

      {filteredSections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300/60 bg-white/70 p-10 text-center text-sm text-slate-500 dark:border-slate-700/60 dark:bg-slate-900/70">
          No tools match your search. Try another keyword.
        </div>
      ) : (
        filteredSections.map((section) => (
          <section
            key={section.id}
            className="section-card animate-fade-up rounded-3xl border border-slate-200/60 bg-white/90 p-8 shadow-soft dark:border-slate-800/60 dark:bg-slate-900/70"
          >
            <SectionTitle
              title={section.title}
              description={section.description}
            />
            <ToolGrid tools={section.tools} />
          </section>
        ))
      )}
    </div>
  );
}
