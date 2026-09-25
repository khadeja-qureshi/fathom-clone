import type { Person } from "@/lib/types";

export const mayaChen: Person = {
  id: "maya-chen",
  name: "Maya Chen",
  email: "maya@harborline.com",
  role: "Head of Product",
  initials: "MC",
  color: "#0f6b5c",
};

export const alexRivera: Person = {
  id: "alex-rivera",
  name: "Alex Rivera",
  email: "alex@harborline.com",
  role: "Engineering Manager",
  initials: "AR",
  color: "#c45c26",
};

export const priyaKapoor: Person = {
  id: "priya-kapoor",
  name: "Priya Kapoor",
  email: "priya@harborline.com",
  role: "Customer Success Lead",
  initials: "PK",
  color: "#7a4b8d",
};

export const jordanBlake: Person = {
  id: "jordan-blake",
  name: "Jordan Blake",
  email: "jordan@harborline.com",
  role: "VP Sales",
  initials: "JB",
  color: "#3d4f7c",
};

export const elenaVasquez: Person = {
  id: "elena-vasquez",
  name: "Elena Vasquez",
  email: "elena@harborline.com",
  role: "Staff Product Manager",
  initials: "EV",
  color: "#2f6b3a",
};

export const sofiaNakamura: Person = {
  id: "sofia-nakamura",
  name: "Sofia Nakamura",
  email: "sofia@harborline.com",
  role: "Product Analytics Lead",
  initials: "SN",
  color: "#a15c12",
};

export const ninaOkonkwo: Person = {
  id: "nina-okonkwo",
  name: "Nina Okonkwo",
  email: "nina@harborline.com",
  role: "VP Engineering",
  initials: "NO",
  color: "#1f6f8b",
};

export const marcusWebb: Person = {
  id: "marcus-webb",
  name: "Marcus Webb",
  email: "marcus@harborline.com",
  role: "Principal Infra Engineer",
  initials: "MW",
  color: "#5c4a3a",
};

export const liamOBrien: Person = {
  id: "liam-obrien",
  name: "Liam O'Brien",
  email: "liam@harborline.com",
  role: "Staff SRE",
  initials: "LO",
  color: "#4a6670",
};

export const dylanFoster: Person = {
  id: "dylan-foster",
  name: "Dylan Foster",
  email: "dylan@harborline.com",
  role: "Lead Product Designer",
  initials: "DF",
  color: "#9b2c2c",
};

export const peopleList: Person[] = [
  mayaChen,
  alexRivera,
  priyaKapoor,
  jordanBlake,
  elenaVasquez,
  sofiaNakamura,
  ninaOkonkwo,
  marcusWebb,
  liamOBrien,
  dylanFoster,
];

export const peopleMap: Record<string, Person> = {
  "maya-chen": mayaChen,
  "alex-rivera": alexRivera,
  "priya-kapoor": priyaKapoor,
  "jordan-blake": jordanBlake,
  "elena-vasquez": elenaVasquez,
  "sofia-nakamura": sofiaNakamura,
  "nina-okonkwo": ninaOkonkwo,
  "marcus-webb": marcusWebb,
  "liam-obrien": liamOBrien,
  "dylan-foster": dylanFoster,
  // Alias short keys if needed
  maya: mayaChen,
  alex: alexRivera,
  priya: priyaKapoor,
  jordan: jordanBlake,
  elena: elenaVasquez,
  sofia: sofiaNakamura,
  nina: ninaOkonkwo,
  marcus: marcusWebb,
  liam: liamOBrien,
  dylan: dylanFoster,
};

export function getPersonById(id: string): Person | undefined {
  return peopleMap[id];
}
