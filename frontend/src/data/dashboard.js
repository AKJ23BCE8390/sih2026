export const dashboardStats = {
  activeCases: 24,
  totalEntities: 186,
  relationships: 472,
  evidenceRecords: 318,
};

export const caseActivity = [
  { month: "Apr", cases: 8 },
  { month: "May", cases: 12 },
  { month: "Jun", cases: 15 },
  { month: "Jul", cases: 19 },
  { month: "Aug", cases: 23 },
  { month: "Sep", cases: 24 },
];

export const crimeDistribution = [
  { type: "Fraud", count: 32 },
  { type: "Organized Crime", count: 24 },
  { type: "Cyber Crime", count: 21 },
  { type: "Property Theft", count: 18 },
  { type: "Financial Crime", count: 15 },
];

export const networkStats = [
  {
    label: "Persons",
    value: 94,
    percentage: 51,
  },
  {
    label: "Organizations",
    value: 38,
    percentage: 20,
  },
  {
    label: "Locations",
    value: 29,
    percentage: 16,
  },
  {
    label: "Other Entities",
    value: 25,
    percentage: 13,
  },
];

export const recentInvestigations = [
  {
    id: "CASE-2026-1024",
    title: "Organized Property Theft",
    location: "Chennai",
    priority: "HIGH",
    status: "ACTIVE",
    entities: 18,
    updated: "12 min ago",
  },
  {
    id: "CASE-2026-1019",
    title: "Financial Fraud Network",
    location: "Bengaluru",
    priority: "CRITICAL",
    status: "ACTIVE",
    entities: 27,
    updated: "38 min ago",
  },
  {
    id: "CASE-2026-1012",
    title: "Interstate Vehicle Network",
    location: "Hyderabad",
    priority: "MEDIUM",
    status: "REVIEW",
    entities: 14,
    updated: "1 hr ago",
  },
  {
    id: "CASE-2026-1008",
    title: "Cyber Fraud Investigation",
    location: "Delhi",
    priority: "HIGH",
    status: "ACTIVE",
    entities: 21,
    updated: "2 hrs ago",
  },
];

export const investigationTimeline = [
  {
    time: "09:42",
    title: "New evidence indexed",
    description:
      "Financial transaction report added to CASE-2026-1024.",
    type: "EVIDENCE",
  },
  {
    time: "09:18",
    title: "Entity resolved",
    description:
      "Possible duplicate identity resolved against existing entity.",
    type: "ENTITY",
  },
  {
    time: "08:54",
    title: "Relationship discovered",
    description:
      "New connection identified between person and organization.",
    type: "NETWORK",
  },
  {
    time: "08:31",
    title: "Case updated",
    description:
      "CASE-2026-1019 received additional investigation records.",
    type: "CASE",
  },
];