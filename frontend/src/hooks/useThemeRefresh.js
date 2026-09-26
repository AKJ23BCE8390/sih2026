import { useEffect, useState } from "react";

export default function useThemeRefresh() {
  const [, setRevision] = useState(0);

  useEffect(() => {
    const refresh = () => setRevision((revision) => revision + 1);
    window.addEventListener("veda-theme-change", refresh);
    return () => window.removeEventListener("veda-theme-change", refresh);
  }, []);
}

export function readThemeColor(token) {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--color-${token}`)
    .trim();
}
