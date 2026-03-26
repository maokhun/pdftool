export default function SectionTitle({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <h2 className="font-heading text-2xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}
