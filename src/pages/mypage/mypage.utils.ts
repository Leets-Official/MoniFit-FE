export function addDays(date: Date, days: number) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function formatYMD(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function formatDotYMD(ymd: string) {
  const [y, m, d] = ymd.split("-");
  if (!y || !m || !d) return ymd;
  return `${y}.${m}.${d}`;
}

export function usageText(years?: number, months?: number) {
  const y = years ?? 0;
  const mo = months ?? 0;
  if (y > 0 && mo > 0) return `${y}년 ${mo}개월`;
  if (y > 0) return `${y}년`;
  return `${mo}개월`;
}
