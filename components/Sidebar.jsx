"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Dashboard", icon: GridIcon },
  { href: "/leads", label: "Leads", icon: ListIcon },
  { href: "/pipeline", label: "Pipeline", icon: ColumnsIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 shrink-0 bg-ink text-white flex flex-col">
      <div className="px-6 py-7">
        <span className="font-display italic text-2xl tracking-tight">beedo</span>
        <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/40">
          Leads &amp; sales
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  active ? "bg-coral" : "bg-transparent"
                }`}
                aria-hidden="true"
              />
              <Icon className="h-4 w-4 opacity-80" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-6 py-5 text-[11px] text-white/30 border-t border-white/10">
        Data is stored locally in this browser.
      </div>
    </aside>
  );
}

function GridIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="11" y="3" width="6" height="6" rx="1" />
      <rect x="3" y="11" width="6" height="6" rx="1" />
      <rect x="11" y="11" width="6" height="6" rx="1" />
    </svg>
  );
}

function ListIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="4" cy="5" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="10" r="1" fill="currentColor" stroke="none" />
      <circle cx="4" cy="15" r="1" fill="currentColor" stroke="none" />
      <path d="M8 5h9M8 10h9M8 15h9" strokeLinecap="round" />
    </svg>
  );
}

function ColumnsIcon(props) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <rect x="3" y="3" width="4" height="14" rx="1" />
      <rect x="8.5" y="3" width="4" height="10" rx="1" />
      <rect x="14" y="3" width="4" height="7" rx="1" />
    </svg>
  );
}
