export default function StatCard({ label, value, hint, accent }) {
  return (
    <div className="rounded-lg border border-line bg-surface px-5 py-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] uppercase tracking-[0.12em] text-ink/45">{label}</p>
        {accent ? (
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />
        ) : null}
      </div>
      <p className="mt-2 font-mono tabular text-2xl font-medium text-ink">{value}</p>
      {hint ? <p className="mt-1 text-xs text-ink/45">{hint}</p> : null}
    </div>
  );
}
