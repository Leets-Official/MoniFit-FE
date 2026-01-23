import type { DonutItem } from "./utils";
import { buildSlices, clamp, donutArcPath, formatWon, polarToCartesian } from "./utils";

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

  className?: string;

  centerBg?: string;
  centerTextColor?: string;
  budgetTextColor?: string;
};

function guessIconFilter(labelColor?: string) {
  if (!labelColor) return undefined;
  if (labelColor.includes("gray-10")) return "grayscale(1) brightness(2.2) contrast(1.1)";
  if (labelColor.includes("gray-80")) return "grayscale(1) brightness(0.18) contrast(1.2)";
  return "grayscale(1) brightness(1) contrast(1)";
}

export default function DonutChart({
  items,
  totalValue,
  budgetValue,

  size = 360,
  innerRadius = 110,

  minThickness = 70,
  maxThickness = 200,

  gapDeg = 2,
  gapStrokeWidth = 2,
  gapStrokeColor = "var(--color-surface-background)",

  iconSize = 34,
  labelFontSize = 14,
  labelGap = 2,

  className,

  centerBg = "var(--color-gray-0)",
  centerTextColor = "var(--color-gray-80)",
  budgetTextColor = "var(--color-gray-40)",
}: Props) {
  const cx = size / 2;
  const cy = size / 2;

  const pad = Math.max(gapStrokeWidth, 2) + 2;
  const maxAllowedThickness = Math.max(0, size / 2 - pad - innerRadius);
  const maxT = Math.min(maxThickness, maxAllowedThickness);
  const minT = Math.min(minThickness, maxT);

  const { slices } = buildSlices(items, gapDeg);

  const maxRatio = Math.max(...slices.map((s) => s.ratio), 0.000001);

  const centerCircleR = Math.max(0, innerRadius - 12);

  return (
    <div className={className ?? ""} style={{ width: size, height: size, position: "relative" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id="donutMedicalGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-gray-60)" />
            <stop offset="100%" stopColor="var(--color-gray-70)" />
          </linearGradient>
        </defs>

        {slices.map((s) => {
          const it = s.item;

          const tNorm = clamp(s.ratio / maxRatio, 0, 1);
          const thickness = minT + (maxT - minT) * tNorm;
          const outerRadius = innerRadius + thickness;

          const fill = it.color === "linear" ? "url(#donutMedicalGradient)" : it.color;

          const path = donutArcPath(cx, cy, outerRadius, innerRadius, s.startRad, s.endRad);

          const contentR = innerRadius + thickness / 2;
          const p = polarToCartesian(cx, cy, contentR, s.midRad);

          const labelColor = it.labelColor ?? "var(--color-gray-80)";
          const Icon = it.icon;

          const iconCy = p.y - (labelFontSize / 2 + labelGap / 2);
          const labelCy = p.y + (iconSize / 2 + labelGap / 2);

          const iconFilter = guessIconFilter(labelColor);

          return (
            <g key={it.id}>
              <path
                d={path}
                fill={fill}
                stroke={gapStrokeColor}
                strokeWidth={gapStrokeWidth}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />

              {Icon && (
                <g
                  transform={`translate(${p.x - iconSize / 2}, ${iconCy - iconSize / 2})`}
                  style={{ filter: iconFilter }}
                >
                  <Icon width={iconSize} height={iconSize} />
                </g>
              )}

              <text
                x={p.x}
                y={labelCy}
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

        <circle cx={cx} cy={cy} r={centerCircleR} fill={centerBg} />
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
          <div className="text-h2" style={{ color: centerTextColor }}>
            ₩{formatWon(totalValue)}
          </div>
          {typeof budgetValue === "number" && (
            <div className="text-body1" style={{ color: budgetTextColor }}>
              예산 ₩{formatWon(budgetValue)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
