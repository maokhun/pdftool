import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell bg-slate-50 dark:bg-slate-950">
      <div className="relative z-10">
        <Navbar />
        <main className="px-4 pb-16 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}
