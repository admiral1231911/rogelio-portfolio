/**
 * State is carried by icon shape + weight, not color alone — a filled dot,
 * a half-filled dot, and an open ring are distinguishable without color.
 */
type Status = "live" | "pending" | "planned";

const GLYPH: Record<Status, React.ReactNode> = {
  live: (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="currentColor" />
    </svg>
  ),
  pending: (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2.2 2.2" />
    </svg>
  ),
  planned: (
    <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" aria-hidden="true">
      <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
};

const TONE: Record<Status, string> = {
  live: "text-live bg-live-soft",
  pending: "text-pending bg-pending-soft",
  planned: "text-muted bg-surface-subtle",
};

export function StatusChip({ status, label }: { status: Status; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${TONE[status]}`}
    >
      <span className={status === "live" ? "pulse-ring rounded-full" : ""}>{GLYPH[status]}</span>
      {label}
    </span>
  );
}
