export const colors = {
  // Background
  background: "#1E2038", // Darkened base of #424874 for dark mode background
  surface: "#2A2F50",    // Soft surface derived from #424874
  surfaceHover: "#353B62",

  // Borders
  border: "#424874",      // Deep Navy / Indigo
  borderHover: "#A6B1E1", // Soft Lavender Blue

  // Main palette
  primary: "#A6B1E1",      // Soft Lavender Blue
  primaryHover: "#DCD6F7", // Periwinkle

  secondary: "#DCD6F7",    // Periwinkle
  secondaryHover: "#F4EEFF", // Off-white / Soft Purple

  warning: "#E2C08D",      // Warm Amber (adjusted for readability)
  warningHover: "#F0D3A7",

  accent: "#A6B1E1",
  accentHover: "#DCD6F7",
  coral: "#A6B1E1",
  coralHover: "#DCD6F7",

  // Semantic
  success: "#8BBF9F",      // Soft Muted Green
  danger: "#E57373",       // Soft Coral Red

  // Text
  text: "#F4EEFF",          // Pale Soft Purple
  textSecondary: "#DCD6F7", // Periwinkle
  textMuted: "#8892BD",

  white: "#FFFFFF",
  black: "#000000",
};

export const severityColors = {
  CRITICAL: "#E57373",
  HIGH: "#E29578",
  MEDIUM: colors.warning,
  LOW: colors.success,
};

export const entityColors = {
  PERSON: colors.primary,
  ORGANIZATION: colors.secondary,
  LOCATION: colors.warning,
  CASE: "#424874",
  DOCUMENT: colors.textSecondary,
};

export const statusColors = {
  ACTIVE: colors.success,
  VERIFIED: colors.success,
  REVIEW: colors.warning,
  REVIEW_REQUIRED: colors.warning,
  CRITICAL: severityColors.CRITICAL,
  OCR_PROCESSED: colors.primary,
  INACTIVE: colors.textMuted,
};

const lightColors = {
  ...colors,
  background: "#F4EEFF",   // Main Light Background (#F4EEFF)
  surface: "#FFFFFF",      // Surface / Cards
  surfaceHover: "#DCD6F7", // Soft Periwinkle Hover
  border: "#DCD6F7",
  borderHover: "#A6B1E1",
  primary: "#424874",      // Deep Navy (#424874)
  primaryHover: "#2A2F50",
  secondary: "#6B74A9",
  secondaryHover: "#424874",
  warning: "#9C6B00",
  warningHover: "#7A5400",
  accent: "#424874",
  accentHover: "#2A2F50",
  coral: "#424874",
  coralHover: "#2A2F50",
  success: "#3B7A57",
  danger: "#C62828",
  text: "#1E2038",          // Dark Navy Text
  textSecondary: "#424874", // Primary Navy Subtext
  textMuted: "#6B74A9",
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
    ...(theme === "light"
      ? {
          PERSON: lightColors.primary,
          ORGANIZATION: lightColors.secondary,
          LOCATION: lightColors.warning,
          CASE: lightColors.accent,
        }
      : {}),
  };
  const selectedSeverityColors = {
    ...severityColors,
    ...(theme === "light"
      ? {
          CRITICAL: lightColors.danger,
          HIGH: "#C8791D",
          MEDIUM: lightColors.warning,
          LOW: lightColors.success,
        }
      : {}),
  };
  const selectedStatusColors = {
    ...statusColors,
    ...(theme === "light"
      ? {
          ACTIVE: lightColors.success,
          VERIFIED: lightColors.success,
          REVIEW: lightColors.warning,
          REVIEW_REQUIRED: lightColors.warning,
          CRITICAL: lightColors.danger,
          OCR_PROCESSED: lightColors.primary,
          INACTIVE: lightColors.textMuted,
        }
      : {}),
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