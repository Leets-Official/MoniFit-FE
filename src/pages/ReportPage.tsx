import { useEffect, useMemo, useState } from "react";
import type { SVGProps } from "react";

import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon, ReportIcon } from "@/assets/icons";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";

import DonutChart from "@/components/report/DonutChart";
import type { DonutItem } from "@/components/report/utils";

import SideSheet from "@/components/SideSheet/SideSheet";

import TintedFoodIcon from "@/assets/icons/tinted/TintedFoodIcon";
import TintedShoppingIcon from "@/assets/icons/tinted/TintedShoppingIcon";
import TintedHospitalIcon from "@/assets/icons/tinted/TintedHospitalIcon";
import TintedHomeIcon from "@/assets/icons/tinted/TintedHomeIcon";
import TintedStarIcon from "@/assets/icons/tinted/TintedStarIcon";

import { getDashboard, getExpenses, type ExpenseItem } from "@/api/budgetPeriod";

type PeriodOption = {
  id: number;
  primary: string;
  secondary: string;
};

interface ReportPageProps {
  onClose?: () => void;
}

type CategoryKey = "food" | "shopping" | "medical" | "living" | "etc";

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

const CATEGORY_ORDER: Array<{ key: CategoryKey; label: string }> = [
  { key: "food", label: "식비" },
  { key: "shopping", label: "쇼핑" },
  { key: "medical", label: "의료" },
  { key: "living", label: "생활" },
  { key: "etc", label: "기타" },
];

const CATEGORY_META: Record<
  CategoryKey,
  { color: string; labelColor: string; icon: IconComponent }
> = {
  food: {
    color: "var(--color-gray-20)",
    labelColor: "var(--color-gray-90)",
    icon: TintedFoodIcon,
  },
  shopping: {
    color: "var(--color-primary-50)",
    labelColor: "var(--color-gray-90)",
    icon: TintedShoppingIcon,
  },
  medical: {
    color: "var(--color-gray-30)",
    labelColor: "var(--color-gray-90)",
    icon: TintedHospitalIcon,
  },
  living: {
    color: "linear",
    labelColor: "var(--color-gray-90)",
    icon: TintedHomeIcon,
  },
  etc: {
    color: "var(--color-gray-40)",
    labelColor: "var(--color-gray-90)",
    icon: TintedStarIcon,
  },
};

function formatPeriodLabel(dateStr: string) {
  if (!dateStr) return "";
  return dateStr.slice(2).replaceAll("-", ".");
}

function normalizeCategoryKey(categoryName: string, categoryCode: string): CategoryKey {
  const name = (categoryName || "").trim();

  if (name.includes("식")) return "food";
  if (name.includes("쇼")) return "shopping";
  if (name.includes("의")) return "medical";
  if (name.includes("생")) return "living";
  if (name.includes("기")) return "etc";

  const code = (categoryCode || "").toUpperCase();
  if (code.includes("FOOD")) return "food";
  if (code.includes("SHOP")) return "shopping";
  if (code.includes("MED")) return "medical";
  if (code.includes("LIFE") || code.includes("LIVING")) return "living";
  if (code.includes("ETC") || code.includes("OTHER")) return "etc";

  return "etc";
}

function buildDonutItems(expenses: ExpenseItem[]): DonutItem[] {
  const sumByKey: Record<CategoryKey, number> = {
    food: 0,
    shopping: 0,
    medical: 0,
    living: 0,
    etc: 0,
  };

  for (const e of expenses) {
    const key = normalizeCategoryKey(e.categoryName, e.category);
    sumByKey[key] += e.amount || 0;
  }

  return CATEGORY_ORDER.map(({ key, label }) => {
    const meta = CATEGORY_META[key];
    return {
      id: key,
      label,
      value: sumByKey[key],
      color: meta.color,
      labelColor: meta.labelColor,
      icon: meta.icon,
    };
  });
}

export const ReportPage = ({ onClose }: ReportPageProps) => {
  const [isDetailOpen] = useState(true);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [hasPeriod, setHasPeriod] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [periodOptions, setPeriodOptions] = useState<PeriodOption[]>([]);
  const [selectedPeriodId, setSelectedPeriodId] = useState<number | null>(null);

  const [budgetValue, setBudgetValue] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [savedAmount, setSavedAmount] = useState(0);
  const [exceededAmount, setExceededAmount] = useState(0);

  const [donutItems, setDonutItems] = useState<DonutItem[]>(() =>
    CATEGORY_ORDER.map(({ key, label }) => {
      const meta = CATEGORY_META[key];
      return {
        id: key,
        label,
        value: 0,
        color: meta.color,
        labelColor: meta.labelColor,
        icon: meta.icon,
      };
    }),
  );

  const computedTotal = useMemo(
    () => donutItems.reduce((acc, it) => acc + (it.value ?? 0), 0),
    [donutItems],
  );

  const resultText = useMemo(() => {
    if (exceededAmount > 0) return `${exceededAmount.toLocaleString()}원 초과 ⚠`;
    return `${savedAmount.toLocaleString()}원 절약 🎉`;
  }, [savedAmount, exceededAmount]);

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const dash = await getDashboard();

        if (!dash.hasPeriod || !dash.period) {
          setHasPeriod(false);
          setDonutItems(buildDonutItems([]));
          return;
        }

        setHasPeriod(true);

        const period = dash.period;
        const periodId = Number(period.id);

        setSelectedPeriodId(periodId);
        setBudgetValue(period.budgetAmount ?? 0);
        setTotalValue(period.totalExpense ?? 0);
        setSavedAmount((period.savedAmount ?? 0) as number);
        setExceededAmount((period.exceededAmount ?? 0) as number);

        const start = formatPeriodLabel(period.startDate);
        const end = formatPeriodLabel(period.endDate);

        setPeriodOptions((prev) => {
          if (prev.length > 0) return prev;
          return [
            {
              id: periodId,
              primary: `${start} - ${end}`,
              secondary: "현재 기간",
            },
          ];
        });

        const exp = await getExpenses(periodId);
        setDonutItems(buildDonutItems(exp.expenses ?? []));
      } catch (e: unknown) {
        setHasPeriod(false);
        setDonutItems(buildDonutItems([]));
        setErrorMessage(e instanceof Error ? e.message : "리포트 데이터를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  useEffect(() => {
    const refetch = async () => {
      if (!selectedPeriodId) return;

      try {
        setLoading(true);
        setErrorMessage(null);

        const exp = await getExpenses(selectedPeriodId);
        setDonutItems(buildDonutItems(exp.expenses ?? []));
      } catch (e: unknown) {
        setDonutItems(buildDonutItems([]));
        setErrorMessage(e instanceof Error ? e.message : "지출 데이터를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    };

    refetch();
  }, [selectedPeriodId]);

  return (
    <div className="relative z-50 flex h-screen w-full flex-col items-center bg-black pt-20">
      <SideSheet
        open={isPeriodOpen}
        onClose={() => setIsPeriodOpen(false)}
        width={158}
        side="left"
        ariaLabel="period select side sheet"
      >
        <div className="flex items-center justify-end px-3 pt-3">
          <button
            type="button"
            onClick={() => setIsPeriodOpen(false)}
            className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"
            aria-label="close"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="px-3 pt-2">
          <ul className="space-y-2">
            {periodOptions.map((opt) => {
              const active = opt.id === selectedPeriodId;

              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPeriodId(opt.id);
                      setIsPeriodOpen(false);
                    }}
                    className={[
                      "w-full rounded-[10px] p-3 text-left",
                      "flex items-start gap-2",
                      "transition-colors",
                      active ? "bg-[#5D57FF]/35" : "hover:bg-white/5",
                    ].join(" ")}
                  >
                    <div className="mt-0.5 shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="2" />
                        <path
                          d="M12 8v5l3 2"
                          stroke="#3B82F6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <div className="flex flex-col leading-tight">
                      <span className="text-[12px] text-white/90">{opt.primary}</span>
                      <span className="mt-1 text-[12px] text-white/70">{opt.secondary}</span>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex-1" />
      </SideSheet>

      <div className="w-93.75 px-5 pb-2">
        <button
          type="button"
          onClick={() => setIsPeriodOpen(true)}
          className="text-[14px] text-white/80 hover:text-white"
        >
          목록 &gt;
        </button>
      </div>

      <section className="flex h-73.75 w-93.75 shrink-0 items-center justify-center bg-transparent">
        <DonutChart
          items={donutItems}
          totalValue={totalValue || computedTotal}
          budgetValue={budgetValue || 0}
          size={260}
          innerRadius={78}
          minThickness={36}
          maxThickness={92}
          iconSize={28}
          labelFontSize={12}
          totalFontSize={30}
          budgetFontSize={14}
          className="select-none"
          centerBg="var(--color-gray-0)"
          centerTextColor="var(--color-gray-80)"
          budgetTextColor="var(--color-gray-60)"
        />
      </section>

      {loading && <div className="w-93.75 px-4 pt-3 text-[12px] text-white/60">불러오는 중...</div>}

      {!loading && !hasPeriod && (
        <div className="w-93.75 px-4 pt-3 text-[12px] text-white/60">표시할 리포트 기간이 없어요.</div>
      )}

      {!loading && hasPeriod && (
        <div className="w-93.75 px-4 pt-2 text-[14px] text-white/90">{resultText}</div>
      )}

      {errorMessage && <div className="w-93.75 px-4 pt-2 text-[12px] text-red-300">{errorMessage}</div>}

      {isDetailOpen && (
        <section className="w-93.75 flex-1 overflow-y-auto bg-[#121212] px-4 pb-20">
          <div className="space-y-3 pt-4">
            {donutItems.map((it) => {
              const Icon = it.icon as IconComponent | undefined;

              return (
                <div key={it.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="grid h-7 w-7 place-items-center rounded-full bg-white/5">
                      {Icon ? <Icon /> : null}
                    </div>
                    <div className="text-[14px] text-white/90">{it.label}</div>
                  </div>
                  <div className="text-[14px] text-white/80">
                    총 {Number(it.value ?? 0).toLocaleString()}원 지출
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-6">
            <CategoryList />
          </div>
        </section>
      )}

      <div className="fixed bottom-8 w-93.75 px-6">
        <div className="flex items-center justify-between">
          <div className="bg-primary-opacity-50 flex rounded-full border border-white/10 p-1">
            <Button width={"sm"} borderColor={"outline"} bgColor={"none"} className="flex gap-2" fontColor={"white"}>
              <CalendarIcon />
              달력
            </Button>

            <Button width={"md"} borderColor={"outline"} bgColor={"none"} className="flex gap-2 bg-white">
              <ReportIcon />
              리포트
            </Button>
          </div>

          <div className="cursor-pointer" onClick={() => onClose?.()}>
            <HomeIcon className="h-13 w-13" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
