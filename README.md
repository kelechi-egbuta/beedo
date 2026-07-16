# beedo — a simple CRM for leads and sales

A small, self-contained Next.js CRM: track leads, move deals through a pipeline, and see the numbers that matter — no database or backend required. All data is saved to your browser's local storage.

## Features

- **Dashboard** — total leads, open deal value, won revenue, conversion rate, and a stage-by-stage breakdown
- **Leads** — a searchable, filterable, sortable table with add / edit / delete
- **Pipeline** — a drag-and-drop Kanban board across six stages: New, Contacted, Qualified, Proposal, Won, Lost
- Sample data is seeded automatically the first time you run it, so the app isn't empty on first look

## Getting started

Requires Node.js 18.18 or later.

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Where your data lives

Everything is stored in `localStorage` under the key `beedo:leads:v1` — it stays on your machine, in that browser. Clearing site data or switching browsers will reset it back to the seed data.

## Project structure

```
app/
  page.js            Dashboard
  leads/page.js       Leads table
  pipeline/page.js    Kanban pipeline
  layout.js           Shell (sidebar + fonts + data provider)
components/
  Sidebar.jsx, StatCard.jsx, LeadModal.jsx,
  LeadsTable.jsx, KanbanBoard.jsx, LeadCard.jsx
lib/
  store.jsx           React context + reducer + localStorage sync
  constants.js         Stages and lead sources
  utils.js             Formatting helpers
  seedData.js          First-run sample leads
```

## Customizing

- **Stages**: edit `lib/constants.js` (`STAGES`) — colors and labels flow through the table, cards, and dashboard automatically.
- **Lead fields**: extend the form in `components/LeadModal.jsx` and the shape in `lib/store.jsx`.
- **Styling**: colors and fonts are defined in `tailwind.config.js` and loaded in `app/layout.js`.
