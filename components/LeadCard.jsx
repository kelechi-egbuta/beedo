"use client";

import { formatCurrency, initials, timeAgo } from "@/lib/utils";

export default function LeadCard({ lead, onDragStart, onClick }) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead)}
      onClick={() => onClick(lead)}
      className="cursor-grab rounded-md border border-line bg-surface p-3 shadow-sm hover:shadow-md hover:border-ink/15 transition-all active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">{lead.name}</p>
          <p className="truncate text-xs text-ink/45">{lead.company || "—"}</p>
        </div>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink/[0.06] text-[10px] font-medium text-ink/70">
          {initials(lead.name)}
        </span>
      </div>
      <div className="mt-2.5 flex items-center justify-between text-xs">
        <span className="font-mono tabular font-medium text-ink/80">
          {formatCurrency(lead.value)}
        </span>
        <span className="text-ink/35">{timeAgo(lead.updatedAt)}</span>
      </div>
    </div>
  );
}
