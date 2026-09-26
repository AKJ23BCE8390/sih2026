export const evidenceItems = [
  {
    id: "EVD-001",
    title: "Financial Transaction Report",
    type: "FINANCIAL_RECORD",
    source: "Bank Transaction Database",
    caseId: "CASE-2026-1024",
    date: "2026-08-14",
    location: "Chennai",
    status: "VERIFIED",
    confidence: 96,
    entities: [
      "Rahul Kumar",
      "Amit Sharma",
      "ABC Finance",
    ],
    extractedData: [
      "Account Number",
      "Transaction Amount",
      "Transaction Date",
      "Sender",
      "Receiver",
    ],
    description:
      "Structured financial transaction record linking multiple entities within the investigation.",
    hash: "8f4a7c91d2e84a6f",
  },

  {
    id: "EVD-002",
    title: "Police Incident Report",
    type: "POLICE_REPORT",
    source: "Chennai Police Records",
    caseId: "CASE-2026-1024",
    date: "2026-08-12",
    location: "Chennai",
    status: "VERIFIED",
    confidence: 94,
    entities: [
      "Rahul Kumar",
      "Vikram Singh",
    ],
    extractedData: [
      "Person Names",
      "Incident Location",
      "Incident Date",
      "Case Number",
    ],
    description:
      "Official incident report containing structured and unstructured references to investigated entities.",
    hash: "3d92a61ef8b742c1",
  },

  {
    id: "EVD-003",
    title: "Scanned Investigation Document",
    type: "SCANNED_DOCUMENT",
    source: "Case File Archive",
    caseId: "CASE-2026-1019",
    date: "2026-07-29",
    location: "Bengaluru",
    status: "OCR_PROCESSED",
    confidence: 87,
    entities: [
      "Amit Sharma",
      "XYZ Logistics",
    ],
    extractedData: [
      "Person Names",
      "Organization Names",
      "Phone Numbers",
      "Addresses",
    ],
    description:
      "Scanned document processed through OCR and entity extraction pipeline.",
    hash: "72c91bd8e41a56f0",
  },

  {
    id: "EVD-004",
    title: "Vehicle Registration Record",
    type: "GOVERNMENT_RECORD",
    source: "Vehicle Registration Database",
    caseId: "CASE-2026-1012",
    date: "2026-07-18",
    location: "Hyderabad",
    status: "VERIFIED",
    confidence: 91,
    entities: [
      "Vikram Singh",
      "XYZ Logistics",
    ],
    extractedData: [
      "Vehicle Number",
      "Owner",
      "Registration Date",
      "Organization",
    ],
    description:
      "Government record connecting a registered vehicle with an investigated entity.",
    hash: "a83c91e72f6b4d10",
  },

  {
    id: "EVD-005",
    title: "News Article Archive",
    type: "OPEN_SOURCE",
    source: "Open Web Sources",
    caseId: "CASE-2026-1019",
    date: "2026-06-22",
    location: "Mumbai",
    status: "REVIEW_REQUIRED",
    confidence: 74,
    entities: [
      "Amit Sharma",
      "ABC Finance",
    ],
    extractedData: [
      "Person Names",
      "Organization Names",
      "Location",
      "Event Date",
    ],
    description:
      "Open-source article containing references that may require investigator verification.",
    hash: "f41b8d72a6930e15",
  },
];