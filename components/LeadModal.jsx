"use client";

import { useEffect, useState } from "react";
import { STAGES, LEAD_SOURCES } from "@/lib/constants";
import { useCrm } from "@/lib/store";

const EMPTY = {
  name: "",
  company: "",
  email: "",
  phone: "",
  value: "",
  stage: "new",
  source: LEAD_SOURCES[0],
  notes: "",
};

export default function LeadModal({ open, onClose, lead }) {
  const { dispatch } = useCrm();
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");
  const isEdit = Boolean(lead);

  useEffect(() => {
    if (open) {
      setForm(lead ? { ...EMPTY, ...lead, value: String(lead.value ?? "") } : EMPTY);
      setError("");
    }
  }, [open, lead]);

  if (!open) return null;

  function set(field, val) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Add a name for this lead before saving.");
      return;
    }
    const payload = {
      ...form,
      name: form.name.trim(),
      company: form.company.trim(),
      value: Number(form.value) || 0,
    };
    if (isEdit) {
      dispatch({ type: "UPDATE_LEAD", id: lead.id, patch: payload });
    } else {
      dispatch({ type: "ADD_LEAD", lead: payload });
    }
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg rounded-lg bg-surface shadow-xl">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <h2 className="font-display text-lg">
              {isEdit ? "Edit lead" : "Add a lead"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-ink/40 hover:text-ink transition-colors"
              aria-label="Close"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="max-h-[70vh] overflow-y-auto px-6 py-5 space-y-4">
            {error ? (
              <p className="rounded-md bg-stage-lost/10 px-3 py-2 text-sm text-stage-lost">
                {error}
              </p>
            ) : null}

            <div className="grid grid-cols-2 gap-4">
              <Field label="Name" required>
                <input
                  className="input"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Jordan Lee"
                  autoFocus
                />
              </Field>
              <Field label="Company">
                <input
                  className="input"
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  placeholder="Acme Inc."
                />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field label="Email">
                <input
                  type="email"
                  className="input"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="jordan@acme.com"
                />
              </Field>
              <Field label="Phone">
                <input
                  className="input"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="555-0100"
                />
              </Field>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Field label="Deal value (USD)">
                <input
                  type="number"
                  min="0"
                  className="input"
                  value={form.value}
                  onChange={(e) => set("value", e.target.value)}
                  placeholder="5000"
                />
              </Field>
              <Field label="Stage">
                <select
                  className="input"
                  value={form.stage}
                  onChange={(e) => set("stage", e.target.value)}
                >
                  {STAGES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Source">
                <select
                  className="input"
                  value={form.source}
                  onChange={(e) => set("source", e.target.value)}
                >
                  {LEAD_SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Notes">
              <textarea
                className="input min-h-[80px] resize-y"
                value={form.notes}
                onChange={(e) => set("notes", e.target.value)}
                placeholder="Context that helps the next follow-up…"
              />
            </Field>
          </div>

          <div className="flex items-center justify-end gap-3 border-t border-line px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-ink/60 hover:text-ink transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-coral px-4 py-2 text-sm font-medium text-white hover:bg-coral-dark transition-colors"
            >
              {isEdit ? "Save changes" : "Add lead"}
            </button>
          </div>
        </form>
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e4e7ee;
          border-radius: 0.375rem;
          padding: 0.5rem 0.7rem;
          font-size: 0.875rem;
          background: white;
          color: #16213e;
        }
        .input:focus {
          outline: 2px solid #ff6b4a;
          outline-offset: 1px;
        }
      `}</style>
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-ink/55">
        {label}
        {required ? <span className="text-coral"> *</span> : null}
      </span>
      {children}
    </label>
  );
}

function CloseIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
    </svg>
  );
}
