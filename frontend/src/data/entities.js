export const entities = [
  {
    id: "ENT-001",
    name: "Rahul Kumar",
    type: "Person",
    status: "Active",
    risk: "High",
    location: "Chennai",
    aliases: ["R. Kumar", "Rahul K."],
    cases: [
      "CASE-2026-1024",
      "CASE-2026-0998",
    ],
    organizations: [
      "XYZ Logistics",
      "Metro Trading",
    ],
    connections: 18,
    evidence: 14,
    description:
      "Person entity appearing across multiple investigation records with connections to cases, organizations and other individuals.",
  },

  {
    id: "ENT-002",
    name: "Amit Sharma",
    type: "Person",
    status: "Under Investigation",
    risk: "High",
    location: "Bengaluru",
    aliases: ["A. Sharma"],
    cases: [
      "CASE-2026-1024",
      "CASE-2026-1019",
    ],
    organizations: [
      "ABC Finance",
    ],
    connections: 14,
    evidence: 11,
    description:
      "Person entity linked to multiple cases and organizations through shared records.",
  },

  {
    id: "ENT-003",
    name: "Vikram Singh",
    type: "Person",
    status: "Active",
    risk: "Medium",
    location: "Hyderabad",
    aliases: ["V. Singh"],
    cases: [
      "CASE-2026-1012",
      "CASE-2026-1024",
    ],
    organizations: [
      "City Motors",
    ],
    connections: 11,
    evidence: 9,
    description:
      "Entity identified across vehicle theft and property theft investigation records.",
  },

  {
    id: "ENT-004",
    name: "XYZ Logistics",
    type: "Organization",
    status: "Monitored",
    risk: "Medium",
    location: "Chennai",
    aliases: ["XYZ Logistics Pvt Ltd"],
    cases: [
      "CASE-2026-1024",
    ],
    organizations: [],
    connections: 9,
    evidence: 7,
    description:
      "Organization entity referenced in investigation documents and connected to multiple persons.",
  },

  {
    id: "ENT-005",
    name: "ABC Finance",
    type: "Organization",
    status: "Under Review",
    risk: "High",
    location: "Bengaluru",
    aliases: ["ABC Financial Services"],
    cases: [
      "CASE-2026-1019",
    ],
    organizations: [],
    connections: 12,
    evidence: 16,
    description:
      "Organization referenced in financial investigation records.",
  },

  {
    id: "ENT-006",
    name: "Chennai",
    type: "Location",
    status: "Monitored",
    risk: "Low",
    location: "Tamil Nadu",
    aliases: ["Chennai City", "Madras"],
    cases: [
      "CASE-2026-1024",
    ],
    organizations: [],
    connections: 24,
    evidence: 32,
    description:
      "Geographic entity associated with multiple investigation records.",
  },
];