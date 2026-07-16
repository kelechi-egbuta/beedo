"use client";

import { useMemo, useState } from "react";
import { useCrm } from "@/lib/store";
import { STAGES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import LeadCard from "./LeadCard";
import LeadModal from "./LeadModal";

export default function KanbanBoard() {
  const { leads, dispatch } = useCrm();
  const [dragOverStage, setDragOverStage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);

  const byStage = useMemo(() => {
    const map = {};
    STAGES.forEach((s) => (map[s.id] = []));
    leads.forEach((l) => {
      if (map[l.stage]) map[l.stage].push(l);
    });
    Object.keys(map).forEach((k) => {
      map[k].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    });
    return map;
  }, [leads]);

  function handleDragStart(e, lead) {
    e.dataTransfer.setData("text/plain", lead.id);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDrop(e, stageId) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) dispatch({ type: "MOVE_STAGE", id, stage: stageId });
    setDragOverStage(null);
  }

  function openEdit(lead) {
    setEditingLead(lead);
    setModalOpen(true);
  }

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => {
          const items = byStage[stage.id] || [];
          const total = items.reduce((sum, l) => sum + (Number(l.value) || 0), 0);
          const isOver = dragOverStage === stage.id;
          return (
            <div
              key={stage.id}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOverStage(stage.id);
              }}
              onDragLeave={() => setDragOverStage((cur) => (cur === stage.id ? null : cur))}
              onDrop={(e) => handleDrop(e, stage.id)}
              className={`flex w-[260px] shrink-0 flex-col rounded-lg border bg-ink/[0.015] transition-colors ${
                isOver ? "border-coral/50 bg-coral/[0.04]" : "border-line"
              }`}
            >
              <div className="flex items-center justify-between px-3 py-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <h3 className="text-sm font-medium text-ink">{stage.label}</h3>
                  <span className="text-xs text-ink/35">{items.length}</span>
                </div>
              </div>
              <p className="px-3 pb-2 font-mono tabular text-xs text-ink/45">
                {formatCurrency(total)}
              </p>

              <div className="flex-1 space-y-2 px-2 pb-3 min-h-[80px]">
                {items.length === 0 ? (
                  <p className="px-2 py-6 text-center text-xs text-ink/30">Drop a lead here</p>
                ) : (
                  items.map((lead) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      onDragStart={handleDragStart}
                      onClick={openEdit}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} lead={editingLead} />
    </>
  );
}
