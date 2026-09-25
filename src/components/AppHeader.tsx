"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Meetings" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)]/80 bg-[color-mix(in_oklab,var(--panel)_88%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1536px] items-center justify-between gap-6 px-5 py-3.5 md:px-8">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)] md:text-[1.75rem]">
            Throughline
          </span>
          <span className="hidden text-xs font-medium uppercase tracking-wider text-[var(--ink-muted)] sm:inline">
            decisions after the call
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm md:gap-2">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-[var(--accent)] text-white shadow-xs"
                    : "text-[var(--ink-muted)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <span className="ml-2 hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel-2)] px-3 py-1 text-xs text-[var(--ink-muted)] md:inline-flex">
            <span className="tl-live-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Capture stubbed · seeded demo
          </span>
        </nav>
      </div>
    </header>
  );
}
