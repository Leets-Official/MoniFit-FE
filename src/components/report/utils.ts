import type { ComponentType, SVGProps } from "react";

export type DonutIcon = ComponentType<SVGProps<SVGSVGElement> & { color?: string }>;

export type DonutItem = {
  id: string;
  label: string;
  value: number;
  color: string; // css color 또는 "linear"
  icon?: DonutIcon;
  labelColor?: string;
};

export type Slice = {
  item: DonutItem;
  ratio: number; // ✅ Legend/기존 코드에서 s.ratio를 쓰는 경우를 위해 반드시 유지
  startRad: number;
  endRad: number;
  midRad: number;
};

export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function sumValue(items: DonutItem[]) {
  return items.reduce((acc, it) => acc + (it.value ?? 0), 0);
}

export function formatWon(n: number) {
  return n.toLocaleString("ko-KR");
}

export function polarToCartesian(cx: number, cy: number, r: number, angleRad: number) {
  return {
    x: cx + r * Math.cos(angleRad),
    y: cy + r * Math.sin(angleRad),
  };
}

export function donutArcPath(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startRad: number,
  endRad: number
) {
  const startOuter = polarToCartesian(cx, cy, outerR, startRad);
  const endOuter = polarToCartesian(cx, cy, outerR, endRad);
  const startInner = polarToCartesian(cx, cy, innerR, startRad);
  const endInner = polarToCartesian(cx, cy, innerR, endRad);

  const delta = endRad - startRad;
  const largeArcFlag = delta > Math.PI ? 1 : 0;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outerR} ${outerR} 0 ${largeArcFlag} 1 ${endOuter.x} ${endOuter.y}`,
    `L ${endInner.x} ${endInner.y}`,
    `A ${innerR} ${innerR} 0 ${largeArcFlag} 0 ${startInner.x} ${startInner.y}`,
    "Z",
  ].join(" ");
}

export function buildSlices(items: DonutItem[], gapDeg: number) {
  const total = sumValue(items);
  const safeTotal = total > 0 ? total : 1;

  const gapRad = (gapDeg * Math.PI) / 180;

  let cursor = -Math.PI / 2; // 12시 시작
  const slices: Slice[] = [];
  const boundaries: number[] = [];

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    const ratio = clamp((it.value ?? 0) / safeTotal, 0, 1);

    const span = ratio * (Math.PI * 2);
    const startRad = cursor + gapRad / 2;
    const endRad = cursor + span - gapRad / 2;
    const midRad = (startRad + endRad) / 2;

    slices.push({ item: it, ratio, startRad, endRad, midRad });

    // 경계선 각도(조각 끝)
    boundaries.push(cursor + span);

    cursor += span;
  }

  return { slices, boundaries };
}
