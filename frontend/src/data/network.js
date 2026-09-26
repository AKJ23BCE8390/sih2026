export const networkNodes = [
  {
    id: "rahul",
    name: "Rahul Kumar",
    type: "Person",
    group: "person",
  },
  {
    id: "amit",
    name: "Amit Sharma",
    type: "Person",
    group: "person",
  },
  {
    id: "vikram",
    name: "Vikram Singh",
    type: "Person",
    group: "person",
  },
  {
    id: "karan",
    name: "Karan Mehta",
    type: "Person",
    group: "person",
  },

  {
    id: "case1024",
    name: "CASE-2026-1024",
    type: "Case",
    group: "case",
  },
  {
    id: "case1019",
    name: "CASE-2026-1019",
    type: "Case",
    group: "case",
  },
  {
    id: "case1012",
    name: "CASE-2026-1012",
    type: "Case",
    group: "case",
  },

  {
    id: "xyz",
    name: "XYZ Logistics",
    type: "Organization",
    group: "organization",
  },
  {
    id: "abc",
    name: "ABC Finance",
    type: "Organization",
    group: "organization",
  },

  {
    id: "chennai",
    name: "Chennai",
    type: "Location",
    group: "location",
  },
  {
    id: "bengaluru",
    name: "Bengaluru",
    type: "Location",
    group: "location",
  },
];

export const networkLinks = [
  {
    source: "rahul",
    target: "case1024",
    relationship: "INVOLVED_IN",
  },
  {
    source: "rahul",
    target: "xyz",
    relationship: "ASSOCIATED_WITH",
  },
  {
    source: "rahul",
    target: "amit",
    relationship: "CONNECTED_TO",
  },
  {
    source: "rahul",
    target: "chennai",
    relationship: "LOCATED_AT",
  },

  {
    source: "amit",
    target: "case1024",
    relationship: "INVOLVED_IN",
  },
  {
    source: "amit",
    target: "case1019",
    relationship: "INVOLVED_IN",
  },
  {
    source: "amit",
    target: "abc",
    relationship: "ASSOCIATED_WITH",
  },
  {
    source: "amit",
    target: "bengaluru",
    relationship: "LOCATED_AT",
  },

  {
    source: "vikram",
    target: "case1012",
    relationship: "INVOLVED_IN",
  },
  {
    source: "vikram",
    target: "case1024",
    relationship: "CONNECTED_TO",
  },

  {
    source: "karan",
    target: "case1019",
    relationship: "INVOLVED_IN",
  },
  {
    source: "karan",
    target: "amit",
    relationship: "CONNECTED_TO",
  },

  {
    source: "case1024",
    target: "chennai",
    relationship: "OCCURRED_AT",
  },

  {
    source: "case1019",
    target: "bengaluru",
    relationship: "OCCURRED_AT",
  },

  {
    source: "xyz",
    target: "case1024",
    relationship: "MENTIONED_IN",
  },

  {
    source: "abc",
    target: "case1019",
    relationship: "MENTIONED_IN",
  },
];

export const networkData = {
  nodes: networkNodes,
  links: networkLinks,
};