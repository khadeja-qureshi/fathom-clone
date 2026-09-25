import type { Person } from "@/lib/types";

interface AvatarProps {
  person?: Person;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Avatar({ person, size = "md", className = "" }: AvatarProps) {
  if (!person) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-[var(--line)] font-medium text-[var(--ink-muted)] ${
          size === "sm"
            ? "h-6 w-6 text-[10px]"
            : size === "lg"
            ? "h-10 w-10 text-sm"
            : "h-8 w-8 text-xs"
        } ${className}`}
      >
        ?
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-semibold text-white shadow-2xs transition group-hover:scale-105 ${
        size === "sm"
          ? "h-6 w-6 text-[10px]"
          : size === "lg"
          ? "h-10 w-10 text-sm"
          : "h-8 w-8 text-xs"
      } ${className}`}
      style={{ backgroundColor: person.color || "var(--accent)" }}
      title={`${person.name} (${person.role || person.email})`}
    >
      {person.initials}
    </div>
  );
}
