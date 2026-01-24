// src/components/report/DonutChartLegend.tsx
import type { DonutItem } from "./utils";
import { buildSlices, clamp, donutArcPath, polarToCartesian, sumValue } from "./utils";

type Props = {
  items: DonutItem[];

  size?: number;
  innerRadius?: number;

  minThickness?: number;
  maxThickness?: number;

  gapDeg?: number;
  gapStrokeWidth?: number;
  gapStrokeColor?: string;

  iconSize?: number;
  labelFontSize?: number;
  labelGap?: number;

  className?: string;
};

export default function DonutChartLegend({
  items,

  size = 320,
  innerRadius = 92,

  minThickness = 50,
  maxThickness = 200,

  gapDeg = 6,
  gapStrokeWidth = 0,
  gapStrokeColor = "var(--color-gray-90)",

  iconSize = 28,
  labelFontSize = 12,
  labelGap = 2,

  className,
}: Props) {
  const cx = size / 2;
  const cy = size / 2;

  const { slices, boundaries } = buildSlices(items, gapDeg);

  const total = sumValue(items);
  const safeTotal = total > 0 ? total : 1;

  // 비율에 따라 두께를 다르게 주는 로직 유지
  const ratios = items.map((it) => clamp((it.value ?? 0) / safeTotal, 0, 1));
  const thicknessByIndex = ratios.map((r) =>
    clamp(minThickness + (maxThickness - minThickness) * r, minThickness, maxThickness)
  );

  const hasLinear = items.some((it) => it.color === "linear");
  const linearId = "donutMedicalGradient";

  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="donut chart legend"
    >
      {hasLinear && (
        <defs>
          <linearGradient id={linearId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-gray-60)" />
            <stop offset="100%" stopColor="var(--color-gray-90)" />
          </linearGradient>
        </defs>
      )}

      {slices.map((s) => {
        const it = s.item;
        const idx = items.findIndex((x) => x.id === it.id);

        const thickness = idx >= 0 ? thicknessByIndex[idx] : minThickness;
        const outerRadius = innerRadius + thickness;

        const fill = it.color === "linear" ? `url(#${linearId})` : it.color;
        const path = donutArcPath(cx, cy, outerRadius, innerRadius, s.startRad, s.endRad);

        // 면적 기준 중앙에 가까운 반지름 (RMS)
        const contentR = Math.sqrt(
          (innerRadius * innerRadius + outerRadius * outerRadius) / 2
        );

        const p = polarToCartesian(cx, cy, contentR, s.midRad);

        const Icon = it.icon;
        const labelColor = it.labelColor ?? "var(--color-gray-80)";

        const iconCenterY = p.y - (labelGap / 2 + labelFontSize / 2);
        const labelY = iconCenterY + iconSize / 2 + labelGap + labelFontSize / 2;

        return (
          <g key={it.id}>
            <path d={path} fill={fill} />

            {Icon && (
              <g transform={`translate(${p.x - iconSize / 2}, ${iconCenterY - iconSize / 2})`}>
                <Icon width={iconSize} height={iconSize} style={{ color: labelColor }} />
              </g>
            )}

            <text
              x={p.x}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: labelFontSize,
                fontWeight: 700,
                fill: labelColor,
              }}
            >
              {it.label}
            </text>
          </g>
        );
      })}

      {gapStrokeWidth > 0 &&
        boundaries.map((a, i) => {
          const n = items.length;
          const prev = (i - 1 + n) % n;
          const next = i % n;

          const rPrev = innerRadius + thicknessByIndex[prev];
          const rNext = innerRadius + thicknessByIndex[next];
          const rLine = Math.min(rPrev, rNext);

          const p1 = polarToCartesian(cx, cy, innerRadius, a);
          const p2 = polarToCartesian(cx, cy, rLine, a);

          return (
            <line
              key={`gap-${i}`}
              x1={p1.x}
              y1={p1.y}
              x2={p2.x}
              y2={p2.y}
              stroke={gapStrokeColor}
              strokeWidth={gapStrokeWidth}
              strokeLinecap="round"
            />
          );
        })}
    </svg>
  );
}
