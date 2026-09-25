import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1000px] px-4 py-8 md:px-8 space-y-8">
      {/* Header */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel-2)] p-8 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]">
          Throughline Thesis & Architecture
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-[var(--ink)] sm:text-4xl">
          Redesigned around decisions & follow-through
        </h1>

        <p className="text-sm text-[var(--ink-muted)] leading-relaxed max-w-3xl">
          Throughline is an AI meeting workspace that prioritizes post-meeting commitment clarity over raw note capture. Rather than hiding commitments in long prose summaries, decisions and action items act as first-class objects connected directly to transcript evidence.
        </p>
      </div>

      {/* Product Improvements */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-6 space-y-2 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">
            1
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)]">
            Unified Workspace
          </h3>
          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
            Coordinated multi-pane view holding media timeline, active transcript cues, template-switchable summaries, decisions, and action items together.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-6 space-y-2 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">
            2
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)]">
            First-Class Action Items
          </h3>
          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
            Interactive assignees, completion state toggles, due dates, source timestamps, and one-click jump-to-source transcript navigation.
          </p>
        </div>

        <div className="rounded-2xl border border-[var(--line)] bg-[var(--panel-2)] p-6 space-y-2 shadow-2xs">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent-soft)] text-sm font-bold text-[var(--accent)]">
            3
          </div>
          <h3 className="font-[family-name:var(--font-display)] text-base font-bold text-[var(--ink)]">
            Evidence-Backed Search
          </h3>
          <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
            Cross-meeting search returning verified transcript quotes, speaker context, timestamp badges, and deep links into the workspace at that exact second.
          </p>
        </div>
      </div>

      {/* Capture Stubbing Rationale */}
      <div className="rounded-3xl border border-[var(--line)] bg-[var(--panel-2)] p-8 shadow-sm space-y-4">
        <h2 className="font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ink)] flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          Capture Layer Stubbing Decision
        </h2>

        <div className="space-y-3 text-xs text-[var(--ink-muted)] leading-relaxed">
          <p>
            Per product specification and assignment boundaries, recording bots, calendar OAuth, and live conferencing integrations are intentionally stubbed. Recon testing confirmed Fathom&apos;s Windows desktop client startup crash (<code className="font-[family-name:var(--font-mono)] text-[var(--ink)]">exit -1073741515</code>) blocked live recording onboarding on Windows environments.
          </p>
          <p>
            By stubbing the capture layer and seeding finished, high-density meetings (including a realistic 8-person ~60-minute council call), we invest 100% of product surface depth into post-call decisions, action item workflows, evidence search, and public sharing.
          </p>
          <p className="font-semibold text-[var(--ink)]">
            Verification: Automatic agent capture verification remains active in <code className="font-[family-name:var(--font-mono)] text-[var(--ink)]">CAPTURE-TEST.md</code> and <code className="font-[family-name:var(--font-mono)] text-[var(--ink)]">.agent-logs/</code>.
          </p>
        </div>

        <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-4">
          <Link
            href="/"
            className="rounded-xl bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-xs hover:opacity-90"
          >
            ← Back to Meetings Library
          </Link>
          <Link
            href="/search"
            className="rounded-xl border border-[var(--line)] bg-[var(--panel)] px-4 py-2 text-xs font-semibold text-[var(--ink)] hover:bg-[var(--bg)]"
          >
            Try Evidence Search →
          </Link>
        </div>
      </div>
    </div>
  );
}
