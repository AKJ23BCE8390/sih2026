export const colors = {
  // Background
  background: "#F4EEFF",
  surface: "#FFFFFF",
  surfaceHover: "#DCD6F7",

  // Borders
  border: "#DCD6F7",
  borderHover: "#A6B1E1",

  // Brand
  primary: "#424874",
  primaryHover: "#353A63",

  secondary: "#A6B1E1",
  secondaryHover: "#8F9BCF",

  accent: "#DCD6F7",

  // Semantic
  success: "#6F8F5B",
  warning: "#C79A28",
  danger: "#C85A5A",

  // Text
  text: "#424874",
  textSecondary: "#62698C",
  textMuted: "#8A8FA8",

  white: "#FFFFFF",
  black: "#000000",
};

export const severityColors = {
  CRITICAL: colors.danger,
  HIGH: "#D97958",
  MEDIUM: colors.warning,
  LOW: colors.success,
};

export const entityColors = {
  PERSON: colors.primary,
  ORGANIZATION: "#6D75A5",
  LOCATION: "#A6B1E1",
  CASE: "#C79A28",
  DOCUMENT: "#9A82C4",
};

export const statusColors = {
  ACTIVE: colors.success,
  VERIFIED: colors.success,
  REVIEW: colors.warning,
  REVIEW_REQUIRED: colors.warning,
  CRITICAL: colors.danger,
  OCR_PROCESSED: colors.primary,
  INACTIVE: colors.textMuted,
};