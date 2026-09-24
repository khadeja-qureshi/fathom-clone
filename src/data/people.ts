import type { Person } from "@/lib/types";

export const people: Record<string, Person> = {
  maya: {
    id: "maya",
    name: "Maya Chen",
    email: "maya@harborline.com",
    role: "Head of Product",
    initials: "MC",
    color: "#0f6b5c",
  },
  alex: {
    id: "alex",
    name: "Alex Rivera",
    email: "alex@harborline.com",
    role: "Engineering Manager",
    initials: "AR",
    color: "#c45c26",
  },
  jordan: {
    id: "jordan",
    name: "Jordan Blake",
    email: "jordan@harborline.com",
    role: "CEO",
    initials: "JB",
    color: "#3d4f7c",
  },
  priya: {
    id: "priya",
    name: "Priya Nair",
    email: "priya@harborline.com",
    role: "Customer Success",
    initials: "PN",
    color: "#7a4b8d",
  },
  sam: {
    id: "sam",
    name: "Sam Okonkwo",
    email: "sam@harborline.com",
    role: "Staff Engineer",
    initials: "SO",
    color: "#2f6b3a",
  },
  rina: {
    id: "rina",
    name: "Rina Park",
    email: "rina@harborline.com",
    role: "Design Lead",
    initials: "RP",
    color: "#a15c12",
  },
  chris: {
    id: "chris",
    name: "Chris Delgado",
    email: "chris@northstar.health",
    role: "VP Ops, Northstar",
    initials: "CD",
    color: "#9b2c2c",
  },
  lee: {
    id: "lee",
    name: "Lee Nguyen",
    email: "lee@harborline.com",
    role: "Sales",
    initials: "LN",
    color: "#1f6f8b",
  },
  devon: {
    id: "devon",
    name: "Devon Walsh",
    email: "devon@harborline.com",
    role: "Finance",
    initials: "DW",
    color: "#5c4a3a",
  },
  noah: {
    id: "noah",
    name: "Noah Berg",
    email: "noah@harborline.com",
    role: "Support Lead",
    initials: "NB",
    color: "#4a6670",
  },
};

export function personList(ids: string[]): Person[] {
  return ids.map((id) => people[id]).filter(Boolean);
}
