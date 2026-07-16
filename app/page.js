"use client";

import { useMemo, useState } from "react";
import { useCrm } from "@/lib/store";
import { STAGES, STAGE_MAP, OPEN_STAGE_IDS } from "@/lib/constants";
import { formatCurrency, initials, timeAgo } from "@/lib/utils";
import StatCard from "@/components/StatCard";
import LeadModal from "@/components/LeadModal";

export default function DashboardPage() {
  const { leads } = useCrm();
  const [modalOpen, setModalOpen] = useState(false);

  const stats = useMemo(() => {
    const open = leads.filter((l) => OPEN_STAGE_IDS.includes(l.stage));
    const won = leads.filter((l) => l.stage === "won");
    const lost = leads.filter((l) => l.stage === "lost");
    const openValue = open.reduce((s, l) => s + (Number(l.value) || 0), 0);
    const wonValue = won.reduce((s, l) => s + (Number(l.value) || 0), 0);
    const decided = won.length + lost.length;
    const conversion = decided > 0 ? Math.round((won.length / decided) * 100) : 0;

    const byStage = STAGES.map((s) => ({
      ...s,
      count: leads.filter((l) => l.stage === s.id).length,
      value: leads
        .filter((l) => l.stage === s.id)
        .reduce((sum, l) => sum + (Number(l.value) || 0), 0),
    }));
    const maxStageValue = Math.max(1, ...byStage.map((s) => s.value));

    const recent = [...leads]
      .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
      .slice(0, 6);

    return {
      total: leads.length,
      openCount: open.length,
      openValue,
      wonValue,
      wonCount: won.length,
      conversion,
      byStage,
      maxStageValue,
      recent,
    };
  }, [leads]);

  return (
    <div className="px-8 py-8 max-w-6xl">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="font-display text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-ink/50">
            A quick read on where every lead and deal stands today.
          </p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="rounded-md bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-dark transition-colors"
        >
          + Add lead
        </button>
      </header>

      <section className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-8">
        <StatCard label="Total leads" value={stats.total} />
        <StatCard
          label="Open deals"
          value={stats.openCount}
          hint={formatCurrency(stats.openValue) + " in pipeline"}
          accent="#3B82F6"
        />
        <StatCard
          label="Won revenue"
          value={formatCurrency(stats.wonValue)}
          hint={`${stats.wonCount} deal${stats.wonCount === 1 ? "" : "s"} closed`}
          accent="#1F9D55"
        />
        <StatCard
          label="Conversion rate"
          value={`${stats.conversion}%`}
          hint="Won vs. won + lost"
          accent="#FF6B4A"
        />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-4 font-display text-lg">Pipeline by stage</h2>
          <div className="space-y-3">
            {stats.byStage.map((s) => (
              <div key={s.id}>
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-ink/70">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    {s.label}
                    <span className="text-ink/35">· {s.count}</span>
                  </span>
                  <span className="font-mono tabular text-ink/60">
                    {formatCurrency(s.value)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-ink/[0.06]">
                  <div
                    className="h-2 rounded-full transition-all"
                    style={{
                      width: `${Math.max(3, (s.value / stats.maxStageValue) * 100)}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-lg border border-line bg-surface p-5">
          <h2 className="mb-4 font-display text-lg">Recent activity</h2>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-ink/40">Nothing yet — add your first lead.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recent.map((lead) => {
                const stage = STAGE_MAP[lead.stage];
                return (
                  <li key={lead.id} className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-white">
                      {initials(lead.name)}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-ink">{lead.name}</p>
                      <p className="truncate text-xs text-ink/45">
                        {lead.company || "—"}
                      </p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium"
                      style={{ backgroundColor: `${stage.color}1A`, color: stage.color }}
                    >
                      {stage.label}
                    </span>
                    <span className="w-14 shrink-0 text-right text-[11px] text-ink/35">
                      {timeAgo(lead.updatedAt)}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} lead={null} />
    </div>
  );
}
