import LeadsTable from "@/components/LeadsTable";

export const metadata = {
  title: "Leads — beedo",
};

export default function LeadsPage() {
  return (
    <div className="px-8 py-8 max-w-6xl">
      <header className="mb-6">
        <h1 className="font-display text-3xl">Leads</h1>
        <p className="mt-1 text-sm text-ink/50">
          Every lead in one list — search, filter, and keep details current.
        </p>
      </header>
      <LeadsTable />
    </div>
  );
}
