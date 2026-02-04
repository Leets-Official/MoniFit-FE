import type { DonutItem } from "./utils";
import {
  buildSlices,
  clamp,
  donutArcPath,
  formatWon,
  polarToCartesian,
  sumValue,
} from "./utils";

type Props = {
  items: DonutItem[];
  totalValue: number;
  budgetValue?: number;

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

  totalFontSize?: number;
  totalFontWeight?: number;
  budgetFontSize?: number;
  budgetFontWeight?: number;

  className?: string;

  centerBg?: string;
  centerTextColor?: string;
  budgetTextColor?: string;
};

export default function DonutChart({
  items,
  totalValue,
  budgetValue,

  size = 320,
  innerRadius = 92,

  minThickness = 50,
  maxThickness = 200,

  gapDeg = 6,
  gapStrokeWidth = 0,
  gapStrokeColor = "var(--color-gray-90)",

  iconSize = 34,
  labelFontSize = 14,
  labelGap = 2,

  totalFontSize = 36,
  totalFontWeight = 700,
  budgetFontSize = 16,
  budgetFontWeight = 400,

  className,

  centerBg = "var(--color-gray-0)",
  centerTextColor = "var(--color-gray-80)",
  budgetTextColor = "var(--color-gray-60)",
}: Props) {
  const cx = size / 2;
  const cy = size / 2;

  const { slices, boundaries } = buildSlices(items, gapDeg);

  const total = sumValue(items);
  const safeTotal = total > 0 ? total : 1;

  const ratios = items.map((it) => clamp((it.value ?? 0) / safeTotal, 0, 1));
  const thicknessByIndex = ratios.map((r) =>
    clamp(
      minThickness + (maxThickness - minThickness) * r,
      minThickness,
      maxThickness,
    ),
  );

  const hasLinear = items.some((it) => it.color === "linear");
  const linearId = "donutLinearFill";

  return (
    <div
      className={className ?? ""}
      style={{ width: size, height: size, position: "relative" }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
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
          const rOuter = innerRadius + thickness;

          const path = donutArcPath(
            cx,
            cy,
            rOuter,
            innerRadius,
            s.startRad,
            s.endRad,
          );

          const contentR = innerRadius + thickness * 0.58;
          const p = polarToCartesian(cx, cy, contentR, s.midRad);

          const Icon = it.icon;
          const labelColor = it.labelColor ?? "var(--color-gray-80)";
          const fill = it.color === "linear" ? `url(#${linearId})` : it.color;

          const iconCenterY = p.y - (labelGap / 2 + labelFontSize / 2);
          const labelY =
            iconCenterY + iconSize / 2 + labelGap + labelFontSize / 2;

          return (
            <g key={it.id}>
              <path d={path} fill={fill} />

              {Icon && (
                <g
                  transform={`translate(${p.x - iconSize / 2}, ${iconCenterY - iconSize / 2})`}
                >
                  <Icon width={iconSize} height={iconSize} color={labelColor} />
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

        <circle cx={cx} cy={cy} r={innerRadius} fill={centerBg} />
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div className="flex flex-col items-center text-center">
          <div
            style={{
              color: centerTextColor,
              fontSize: totalFontSize,
              fontWeight: totalFontWeight,
              lineHeight: 1.1,
            }}
          >
            ₩{formatWon(totalValue)}
          </div>

          {typeof budgetValue === "number" && (
            <div
              style={{
                marginTop: 6,
                color: budgetTextColor,
                fontSize: budgetFontSize,
                fontWeight: budgetFontWeight,
                lineHeight: 1.1,
              }}
            >
              예산 ₩{formatWon(budgetValue)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
