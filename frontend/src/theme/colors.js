export const colors = {
  // Background
  background: "#0B0F08",
  surface: "#12180D",
  surfaceHover: "#192110",

  // Borders
  border: "#2A341C",
  borderHover: "#3D4B25",

  // Main palette
  primary: "#769826",
  primaryHover: "#8AAD2D",

  secondary: "#A1CB35",
  secondaryHover: "#B3D94B",

  warning: "#FFDE4E",
  warningHover: "#FFE66F",

  accent: "#FF9D4D",
  accentHover: "#FFB16D",
  coral: "#FF9D4D",
  coralHover: "#FFB16D",

  // Semantic
  success: "#A1CB35",
  danger: "#FF9D4D",

  // Text
  text: "#F7F9F0",
  textSecondary: "#B8C1A5",
  textMuted: "#788267",

  white: "#FFFFFF",
  black: "#000000",
};

export const severityColors = {
  CRITICAL: colors.accent,
  HIGH: "#FFB347",
  MEDIUM: colors.warning,
  LOW: colors.success,
};

export const entityColors = {
  PERSON: colors.primary,
  ORGANIZATION: colors.secondary,
  LOCATION: colors.warning,
  CASE: colors.accent,
  DOCUMENT: "#B8A2E8",
};

export const statusColors = {
  ACTIVE: colors.success,
  VERIFIED: colors.success,
  REVIEW: colors.warning,
  REVIEW_REQUIRED: colors.warning,
  CRITICAL: colors.accent,
  OCR_PROCESSED: colors.primary,
  INACTIVE: colors.textMuted,
};

const lightColors = {
  ...colors,
  background: "#F5F7F0",
  surface: "#FFFFFF",
  surfaceHover: "#E9EDDF",
  border: "#D0D8C0",
  borderHover: "#AAB694",
  primary: "#58751B",
  primaryHover: "#496317",
  secondary: "#66851A",
  secondaryHover: "#587317",
  warning: "#9B7600",
  warningHover: "#806100",
  accent: "#B85B16",
  accentHover: "#98490F",
  coral: "#B85B16",
  coralHover: "#98490F",
  success: "#66851A",
  danger: "#B85B16",
  text: "#202719",
  textSecondary: "#4F5A42",
  textMuted: "#6E795F",
};

const cssTokenNames = {
  background: "background",
  surface: "surface",
  surfaceHover: "surface-hover",
  border: "border",
  borderHover: "border-hover",
  primary: "primary",
  primaryHover: "primary-hover",
  secondary: "secondary",
  secondaryHover: "secondary-hover",
  warning: "warning",
  warningHover: "warning-hover",
  accent: "accent",
  accentHover: "accent-hover",
  coral: "coral",
  coralHover: "coral-hover",
  success: "success",
  danger: "danger",
  text: "text",
  textSecondary: "text-secondary",
  textMuted: "text-muted",
  white: "white",
  black: "black",
};

export const severityColorVars = {
  CRITICAL: "var(--color-severity-critical)",
  HIGH: "var(--color-severity-high)",
  MEDIUM: "var(--color-warning)",
  LOW: "var(--color-success)",
};

export const entityColorVars = {
  PERSON: "var(--color-entity-person)",
  ORGANIZATION: "var(--color-entity-organization)",
  LOCATION: "var(--color-entity-location)",
  CASE: "var(--color-entity-case)",
  DOCUMENT: "var(--color-entity-document)",
};

export const statusColorVars = {
  ACTIVE: "var(--color-status-active)",
  VERIFIED: "var(--color-status-verified)",
  REVIEW: "var(--color-status-review)",
  REVIEW_REQUIRED: "var(--color-status-review-required)",
  CRITICAL: "var(--color-status-critical)",
  OCR_PROCESSED: "var(--color-status-ocr-processed)",
  INACTIVE: "var(--color-status-inactive)",
};

export function applyTheme(theme = "dark") {
  const root = document.documentElement;
  const selectedColors = theme === "light" ? lightColors : colors;
  const selectedEntityColors = {
    ...entityColors,
    ...(theme === "light" ? {
      PERSON: lightColors.primary,
      ORGANIZATION: lightColors.secondary,
      LOCATION: lightColors.warning,
      CASE: lightColors.accent,
    } : {}),
  };
  const selectedSeverityColors = {
    ...severityColors,
    ...(theme === "light" ? {
      CRITICAL: lightColors.danger,
      HIGH: "#C8791D",
      MEDIUM: lightColors.warning,
      LOW: lightColors.success,
    } : {}),
  };
  const selectedStatusColors = {
    ...statusColors,
    ...(theme === "light" ? {
      ACTIVE: lightColors.success,
      VERIFIED: lightColors.success,
      REVIEW: lightColors.warning,
      REVIEW_REQUIRED: lightColors.warning,
      CRITICAL: lightColors.danger,
      OCR_PROCESSED: lightColors.primary,
      INACTIVE: lightColors.textMuted,
    } : {}),
  };

  root.dataset.theme = theme;
  Object.entries(cssTokenNames).forEach(([key, token]) => {
    root.style.setProperty(`--color-${token}`, selectedColors[key]);
  });

  const semanticVars = {
    "severity-critical": selectedSeverityColors.CRITICAL,
    "severity-high": selectedSeverityColors.HIGH,
    "entity-person": selectedEntityColors.PERSON,
    "entity-organization": selectedEntityColors.ORGANIZATION,
    "entity-location": selectedEntityColors.LOCATION,
    "entity-case": selectedEntityColors.CASE,
    "entity-document": selectedEntityColors.DOCUMENT,
    "status-active": selectedStatusColors.ACTIVE,
    "status-verified": selectedStatusColors.VERIFIED,
    "status-review": selectedStatusColors.REVIEW,
    "status-review-required": selectedStatusColors.REVIEW_REQUIRED,
    "status-critical": selectedStatusColors.CRITICAL,
    "status-ocr-processed": selectedStatusColors.OCR_PROCESSED,
    "status-inactive": selectedStatusColors.INACTIVE,
  };
  Object.entries(semanticVars).forEach(([token, value]) => {
    root.style.setProperty(`--color-${token}`, value);
  });

  root.style.colorScheme = theme;
  window.dispatchEvent(new CustomEvent("veda-theme-change", { detail: { theme } }));
}
