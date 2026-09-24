import Link from "next/link";

const links = [
  { href: "/", label: "Meetings" },
  { href: "/search", label: "Search" },
  { href: "/about", label: "About" },
];

export function AppHeader() {
  return (
    <header className="border-b border-[var(--line)]/80 bg-[color-mix(in_oklab,var(--panel)_82%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-4 md:px-8">
        <Link href="/" className="group flex items-baseline gap-3">
          <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight text-[var(--ink)] md:text-[1.75rem]">
            Throughline
          </span>
          <span className="hidden text-sm text-[var(--ink-muted)] sm:inline">
            decisions after the call
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm md:gap-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-[var(--ink-muted)] transition hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              {link.label}
            </Link>
          ))}
          <span className="ml-2 hidden items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--panel-2)] px-3 py-1 text-xs text-[var(--ink-muted)] md:inline-flex">
            <span className="tl-live-dot h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            Capture stubbed · seeded demo
          </span>
        </nav>
      </div>
    </header>
  );
}
