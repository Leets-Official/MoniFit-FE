export function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

export function parseDateISO(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export function formatCurrencyKRW(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export function formatDotDate(iso: string) {
  const d = parseDateISO(iso);
  if (!d) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}.${m}.${day}`;
}

export function formatCompactDate(iso: string) {
  const d = parseDateISO(iso);
  if (!d) return iso;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

export function calcTimeRatio(
  startDate: string,
  endDate: string,
  currentDate?: string,
) {
  const s = parseDateISO(startDate)?.getTime();
  const e = parseDateISO(endDate)?.getTime();
  const c = parseDateISO(
    currentDate ?? new Date().toISOString().slice(0, 10),
  )?.getTime();
  if (!s || !e || !c || e <= s) return 0;
  return clamp01((c - s) / (e - s));
}

export function calcMidDateCompact(startDate: string, endDate: string) {
  const s = parseDateISO(startDate)?.getTime();
  const e = parseDateISO(endDate)?.getTime();
  if (!s || !e || e <= s) return "";
  const mid = new Date(s + (e - s) / 2);
  const y = mid.getFullYear();
  const m = String(mid.getMonth() + 1).padStart(2, "0");
  const day = String(mid.getDate()).padStart(2, "0");
  return `${y}${m}${day}`;
}

export function calcBudgetState(targetBudget: number, spentAmount: number) {
  const isOver = targetBudget > 0 && spentAmount > targetBudget;

  const savedAmount = Math.max(0, targetBudget - spentAmount);
  const overAmount = Math.max(0, spentAmount - targetBudget);

  const savingRatio =
    targetBudget > 0 ? clamp01(savedAmount / targetBudget) : 0;
  const overRatio = targetBudget > 0 ? clamp01(overAmount / targetBudget) : 0;

  const badgeText = isOver
    ? `${Math.round(overRatio * 100)}% 초과`
    : `${Math.round(savingRatio * 100)}% 절약`;

  const indicatorLeftPercent = isOver
    ? (1 - overRatio) * 100
    : savingRatio * 100;

  const barPurpleStyle = isOver
    ? ({ width: `${overRatio * 100}%`, right: 0, left: "auto" } as const)
    : ({ width: `${savingRatio * 100}%`, left: 0, right: "auto" } as const);

  return {
    isOver,
    savedAmount,
    overAmount,
    savingRatio,
    overRatio,
    badgeText,
    indicatorLeftPercent,
    barPurpleStyle,
  };
}
