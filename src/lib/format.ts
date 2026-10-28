/** Formatea una fecha ISO ("2026-03-15") como "marzo de 2026". */
export function formatMonthYear(isoDate: string, locale: string): string {
  const [year, month] = isoDate.split("-").map(Number);
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(
    Date.UTC(year, month - 1, 1),
  );
}
