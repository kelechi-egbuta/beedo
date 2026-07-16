export const STAGES = [
  { id: "new", label: "New", color: "#64748B" },
  { id: "contacted", label: "Contacted", color: "#3B82F6" },
  { id: "qualified", label: "Qualified", color: "#8B5CF6" },
  { id: "proposal", label: "Proposal", color: "#E8A33D" },
  { id: "won", label: "Won", color: "#1F9D55" },
  { id: "lost", label: "Lost", color: "#EF4444" },
];

export const STAGE_MAP = STAGES.reduce((acc, s) => {
  acc[s.id] = s;
  return acc;
}, {});

export const OPEN_STAGE_IDS = ["new", "contacted", "qualified", "proposal"];

export const LEAD_SOURCES = [
  "Referral",
  "Website",
  "Cold Outreach",
  "Event",
  "Social Media",
  "Partner",
  "Other",
];

export const STORAGE_KEY = "beedo:leads:v1";
