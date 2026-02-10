import DonutChart from "@/components/report/DonutChart";
import type { DonutItem } from "@/components/report/utils";

import {
  TintedFoodIcon,
  TintedHomeIcon,
  TintedStarIcon,
  TintedShoppingIcon,
  TintedHospitalIcon,
} from "@/assets/icons/tinted";

const items: DonutItem[] = [
  {
    id: "food",
    label: "식비",
    value: 140000,
    color: "var(--color-primary-40)",
    icon: TintedFoodIcon,
    labelColor: "var(--color-gray-80)",
  },
  {
    id: "life",
    label: "생활",
    value: 95000,
    color: "var(--color-primary-opacity-50)",
    icon: TintedHomeIcon,
    labelColor: "var(--color-gray-10)",
  },
  {
    id: "etc",
    label: "기타",
    value: 35000,
    color: "var(--color-primary-60)",
    icon: TintedStarIcon,
    labelColor: "var(--color-gray-10)",
  },
  {
    id: "shop",
    label: "쇼핑",
    value: 62000,
    color: "var(--color-primary-50)",
    icon: TintedShoppingIcon,
    labelColor: "var(--color-gray-80)",
  },
  {
    id: "med",
    label: "의료",
    value: 30000,
    color: "linear",
    icon: TintedHospitalIcon,
    labelColor: "var(--color-gray-10)",
  },
];

export default function DonutChartTestPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-black">
      <DonutChart
        items={items}
        totalValue={362000}
        budgetValue={400000}
        size={700}
        innerRadius={120}
        minThickness={60}
        maxThickness={200}
        gapDeg={1.2}
        gapStrokeWidth={4}
        iconSize={34}
        labelFontSize={14}
        labelGap={2}
        totalFontSize={40}
        totalFontWeight={750}
        budgetFontSize={18}
        budgetFontWeight={500}
      />
    </div>
  );
}
