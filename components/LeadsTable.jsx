"use client";

import { useMemo, useState } from "react";
import { useCrm } from "@/lib/store";
import { STAGES, STAGE_MAP } from "@/lib/constants";
import { formatCurrency, formatDate, initials } from "@/lib/utils";
import LeadModal from "./LeadModal";

export default function LeadsTable() {
  const { leads, dispatch } = useCrm();
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");
  const [sortBy, setSortBy] = useState("updated");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const filtered = useMemo(() => {
    let rows = leads;
    if (stageFilter !== "all") {
      rows = rows.filter((l) => l.stage === stageFilter);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      rows = rows.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.company.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q)
      );
    }
    const sorted = [...rows].sort((a, b) => {
      if (sortBy === "value") return b.value - a.value;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });
    return sorted;
  }, [leads, query, stageFilter, sortBy]);

  function openAdd() {
    setEditingLead(null);
    setModalOpen(true);
  }

  function openEdit(lead) {
    setEditingLead(lead);
    setModalOpen(true);
  }

  function handleDelete(lead) {
    if (window.confirm(`Delete ${lead.name}? This can't be undone.`)) {
      dispatch({ type: "DELETE_LEAD", id: lead.id });
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[220px]">
          <SearchIcon className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-ink/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, company, or email…"
            className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-3 text-sm placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-coral/40"
          />
        </div>

        <select
          value={stageFilter}
          onChange={(e) => setStageFilter(e.target.value)}
          className="rounded-md border border-line bg-surface py-2 px-3 text-sm"
        >
          <option value="all">All stages</option>
          {STAGES.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="rounded-md border border-line bg-surface py-2 px-3 text-sm"
        >
          <option value="updated">Recently updated</option>
          <option value="value">Highest value</option>
          <option value="name">Name A–Z</option>
        </select>

        <button
          onClick={openAdd}
          className="ml-auto rounded-md bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-dark transition-colors"
        >
          + Add lead
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-line bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-ink/[0.02] text-left text-[11px] uppercase tracking-[0.08em] text-ink/45">
              <th className="px-4 py-3 font-medium">Lead</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium text-right">Value</th>
              <th className="px-4 py-3 font-medium">Source</th>
              <th className="px-4 py-3 font-medium">Updated</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-ink/40 text-sm">
                  {leads.length === 0
                    ? "No leads yet. Add your first one to start the pipeline."
                    : "No leads match this search or filter."}
                </td>
              </tr>
            ) : (
              filtered.map((lead) => {
                const stage = STAGE_MAP[lead.stage];
                return (
                  <tr
                    key={lead.id}
                    className="border-b border-line last:border-0 hover:bg-ink/[0.015] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-medium text-white">
                          {initials(lead.name)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-medium text-ink">{lead.name}</p>
                          <p className="truncate text-xs text-ink/45">
                            {lead.company || lead.email || "—"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{
                          backgroundColor: `${stage.color}1A`,
                          color: stage.color,
                        }}
                      >
                        <span
                          className="h-1.5 w-1.5 rounded-full"
                          style={{ backgroundColor: stage.color }}
                        />
                        {stage.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-mono tabular">
                      {formatCurrency(lead.value)}
                    </td>
                    <td className="px-4 py-3 text-ink/60">{lead.source}</td>
                    <td className="px-4 py-3 text-ink/60">{formatDate(lead.updatedAt)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3 text-xs">
                        <button
                          onClick={() => openEdit(lead)}
                          className="text-ink/50 hover:text-coral transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(lead)}
                          className="text-ink/50 hover:text-stage-lost transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} lead={editingLead} />
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="9" cy="9" r="5.5" />
      <path d="M17 17l-3.5-3.5" strokeLinecap="round" />
    </svg>
  );
}
