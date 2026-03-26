import ToolCard from "@/components/ToolCard";
import type { ToolItem } from "@/lib/tools";

export default function ToolGrid({ tools }: { tools: ToolItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tools.map((tool) => (
        <ToolCard
          key={tool.title}
          title={tool.title}
          href={tool.href}
          icon={tool.icon}
          tone={tool.tone}
        />
      ))}
    </div>
  );
}
