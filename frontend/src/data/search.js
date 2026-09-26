export const searchResults = [
  {
    id: "SEARCH-001",
    type: "Case",
    title: "Organized Property Theft",
    reference: "CASE-2026-1024",
    location: "Chennai",
    date: "2026-09-18",
    score: 0.94,
    summary:
      "Investigation involving multiple connected individuals, organizations and locations associated with coordinated property theft.",
    entities: [
      "Rahul Kumar",
      "Amit Sharma",
      "XYZ Logistics",
    ],
    reasons: [
      "Similar entity relationships",
      "Common location",
      "Related investigation pattern",
    ],
  },

  {
    id: "SEARCH-002",
    type: "Case",
    title: "Financial Fraud Network",
    reference: "CASE-2026-1019",
    location: "Bengaluru",
    date: "2026-09-15",
    score: 0.89,
    summary:
      "Financial investigation containing overlapping entities and relationship patterns with the search context.",
    entities: [
      "Amit Sharma",
      "Karan Mehta",
      "ABC Finance",
    ],
    reasons: [
      "Shared entity",
      "Similar document content",
      "Related organization",
    ],
  },

  {
    id: "SEARCH-003",
    type: "Case",
    title: "Vehicle Theft Series",
    reference: "CASE-2026-1012",
    location: "Hyderabad",
    date: "2026-09-11",
    score: 0.81,
    summary:
      "Series of vehicle theft records containing entities and geographic patterns related to the search.",
    entities: [
      "Vikram Singh",
      "Rahul Kumar",
      "City Motors",
    ],
    reasons: [
      "Connected person",
      "Related case",
      "Similar crime pattern",
    ],
  },

  {
    id: "SEARCH-004",
    type: "Document",
    title: "Investigation Report — Chennai",
    reference: "DOC-2026-443",
    location: "Chennai",
    date: "2026-09-10",
    score: 0.77,
    summary:
      "Investigation document containing references to persons, locations and organizations associated with the search query.",
    entities: [
      "Rahul Kumar",
      "Chennai",
      "XYZ Logistics",
    ],
    reasons: [
      "Entity overlap",
      "Location overlap",
    ],
  },
];