import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { SVGProps } from "react";

import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon } from "@/assets/icons";
import { ReportIcon } from "@/assets/icons/general/ReportIcon";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";
import { Header } from "@/components";

import DonutChart from "@/components/report/DonutChart";
import type { DonutItem } from "@/components/report/utils";

import TintedFoodIcon from "@/assets/icons/tinted/TintedFoodIcon";
import TintedShoppingIcon from "@/assets/icons/tinted/TintedShoppingIcon";
import TintedHospitalIcon from "@/assets/icons/tinted/TintedHospitalIcon";
import TintedHomeIcon from "@/assets/icons/tinted/TintedHomeIcon";
import TintedStarIcon from "@/assets/icons/tinted/TintedStarIcon";
import { getDashboard, getExpenses, getCompletedBudgets, type ExpenseItem } from "@/api/budgetPeriod";

type PeriodOption = {
  id: number;
  primary: string;
  secondary: string;
};

interface ReportPageProps {
  refreshTrigger?: number;
}

type CategoryKey = "food" | "shopping" | "medical" | "living" | "etc";

type IconComponent = React.FC<SVGProps<SVGSVGElement>>;

// CategoryList용 타입 정의
type CategoryData = {
  category: string;
  categoryName: string;
  totalAmount: number;
  expenses: Array<{
    id: string;
    category: string;
    categoryName: string;
    amount: number;
    spentDate: string;
    createdAt: string;
  }>;
};

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

// CategoryList용 데이터 빌드 함수
function buildCategoryData(expenses: ExpenseItem[]): CategoryData[] {
  const categoryMap = new Map<string, CategoryData>();
  
  for (const expense of expenses) {
    const key = expense.category;
    
    if (!categoryMap.has(key)) {
      categoryMap.set(key, {
        category: expense.category,
        categoryName: expense.categoryName,
        totalAmount: 0,
        expenses: [],
      });
    }
    
    const cat = categoryMap.get(key)!;
    cat.totalAmount += expense.amount;
    cat.expenses.push(expense);
  }
  
  return Array.from(categoryMap.values());
}

export const ReportPage = ({ refreshTrigger }: ReportPageProps) => {
  const navigate = useNavigate();
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
  const [categories, setCategories] = useState<CategoryData[]>([]);

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

  // 초기 로드 - 완료된 기간만 표시
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const dash = await getDashboard();

        if (!dash.hasPeriod || !dash.period) {
          setHasPeriod(false);
          setDonutItems(buildDonutItems([]));
          setCategories([]);
          return;
        }

        setHasPeriod(true);

        // ✅ 완료된 기간 목록 조회
        const completedPeriods = await getCompletedBudgets();
        
        if (completedPeriods.length === 0) {
          // 완료된 기간이 없으면 안내 메시지
          setErrorMessage("완료된 기간이 없습니다. 첫 기간을 완료하면 리포트를 확인할 수 있습니다.");
          setDonutItems(buildDonutItems([]));
          setCategories([]);
          setPeriodOptions([]);
          setLoading(false);
          return;
        }

        // ✅ 가장 최근 완료된 기간을 기본 선택
        const latestPeriod = completedPeriods[0];
        const periodId = Number(latestPeriod.id);

        setSelectedPeriodId(periodId);
        setBudgetValue(latestPeriod.budgetAmount ?? 0);
        setTotalValue(latestPeriod.totalExpense ?? 0);
        setSavedAmount((latestPeriod.savedAmount ?? 0) as number);
        setExceededAmount((latestPeriod.exceededAmount ?? 0) as number);

        // ✅ 완료된 기간 목록을 periodOptions에 추가
        const options = completedPeriods.map((period) => {
          const start = formatPeriodLabel(period.startDate);
          const end = formatPeriodLabel(period.endDate);
          return {
            id: Number(period.id),
            primary: `${start} - ${end}`,
            secondary: "",
          };
        });
        setPeriodOptions(options);

        const exp = await getExpenses({ periodId });
        setDonutItems(buildDonutItems(exp.expenses ?? []));
        setCategories(buildCategoryData(exp.expenses ?? []));
      } catch (e: unknown) {
        setHasPeriod(false);
        setDonutItems(buildDonutItems([]));
        setCategories([]);
        setErrorMessage(e instanceof Error ? e.message : "리포트 데이터를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // refreshTrigger 감지 - 지출 입력 후 새로고침
  useEffect(() => {
    if (refreshTrigger === undefined || refreshTrigger === 0) return;

    const refresh = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const dash = await getDashboard();

        if (!dash.hasPeriod || !dash.period) {
          setHasPeriod(false);
          setDonutItems(buildDonutItems([]));
          setCategories([]); 
          return;
        }

        // ✅ 완료된 기간 목록 다시 조회
        const completedPeriods = await getCompletedBudgets();
        
        if (completedPeriods.length === 0) {
          setErrorMessage("완료된 기간이 없습니다. 첫 기간을 완료하면 리포트를 확인할 수 있습니다.");
          setDonutItems(buildDonutItems([]));
          setCategories([]);
          setPeriodOptions([]);
          setLoading(false);
          return;
        }

        // ✅ 현재 선택된 기간이 있으면 유지, 없으면 최신 기간 선택
        const currentPeriod = selectedPeriodId 
          ? completedPeriods.find(p => Number(p.id) === selectedPeriodId) || completedPeriods[0]
          : completedPeriods[0];
        
        const periodId = Number(currentPeriod.id);

        setSelectedPeriodId(periodId);
        setBudgetValue(currentPeriod.budgetAmount ?? 0);
        setTotalValue(currentPeriod.totalExpense ?? 0);
        setSavedAmount((currentPeriod.savedAmount ?? 0) as number);
        setExceededAmount((currentPeriod.exceededAmount ?? 0) as number);

        // periodOptions 업데이트
        const options = completedPeriods.map((period) => {
          const start = formatPeriodLabel(period.startDate);
          const end = formatPeriodLabel(period.endDate);
          return {
            id: Number(period.id),
            primary: `${start} - ${end}`,
            secondary: "",
          };
        });
        setPeriodOptions(options);

        const exp = await getExpenses({ periodId });
        setDonutItems(buildDonutItems(exp.expenses ?? []));
        setCategories(buildCategoryData(exp.expenses ?? [])); 
      } catch (e: unknown) {
        setErrorMessage(e instanceof Error ? e.message : "데이터를 새로고침하지 못했어요.");
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, [refreshTrigger, selectedPeriodId]);

  // selectedPeriodId 변경 감지
  useEffect(() => {
    const refetch = async () => {
      if (!selectedPeriodId) return;

      try {
        setLoading(true);
        setErrorMessage(null);

        // ✅ 선택된 기간의 상세 정보 조회
        const completedPeriods = await getCompletedBudgets();
        const selectedPeriod = completedPeriods.find(p => Number(p.id) === selectedPeriodId);
        
        if (selectedPeriod) {
          setBudgetValue(selectedPeriod.budgetAmount ?? 0);
          setTotalValue(selectedPeriod.totalExpense ?? 0);
          setSavedAmount((selectedPeriod.savedAmount ?? 0) as number);
          setExceededAmount((selectedPeriod.exceededAmount ?? 0) as number);
        }

        const exp = await getExpenses({ periodId: selectedPeriodId });
        setDonutItems(buildDonutItems(exp.expenses ?? []));
        setCategories(buildCategoryData(exp.expenses ?? []));
      } catch (e: unknown) {
        setDonutItems(buildDonutItems([]));
        setCategories([]); 
        setErrorMessage(e instanceof Error ? e.message : "지출 데이터를 불러오지 못했어요.");
      } finally {
        setLoading(false);
      }
    };

    refetch();
  }, [selectedPeriodId]);

  return (
    <div className="relative z-50 flex h-full w-full flex-col items-center bg-[#1F1F1F]">
      <Header />
      {/* 기간 선택 사이드 패널 */}
      {isPeriodOpen && (
        <div 
          className="absolute left-0 top-12 z-50"
          style={{
            width: '158px',
            height: '660px',
            borderRadius: '0 10px 10px 0',
            border: '0.5px solid #7976FF',
            background: '#1C1C1E',
            boxShadow: '0 0 30px 0 #1F1F1F'
          }}
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

          <div className="px-3 pt-2 pb-4">
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
                        {opt.secondary && (
                          <span className="mt-1 text-[12px] text-white/70">{opt.secondary}</span>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}

      {/* 완료된 기간이 없을 때 - 안내 화면만 표시 */}
      {!loading && (!hasPeriod || periodOptions.length === 0) ? (
        <section className="w-full flex-1 bg-[#1F1F1F] flex items-center justify-center pb-20">
          <div className="text-center px-6">
            <div className="text-[20px] font-semibold text-white/90 mb-3">
              기간 완료 후 소비 리포트가 생성됩니다
            </div>
            <div className="text-[14px] text-white/60 leading-relaxed whitespace-pre-line">
              {!hasPeriod 
                ? "예산 기간을 설정하면\n리포트를 확인할 수 있습니다."
                : "첫 기간을 완료하면\n소비 패턴을 분석한 리포트를 제공합니다."}
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* 리포트 차트 섹션 */}
          <section className="w-full bg-[#1F1F1F] flex-shrink-0">
            <div className="w-full px-5">
              <button
                type="button"
                onClick={() => setIsPeriodOpen(true)}
                className="text-[14px] text-white/80 hover:text-white"
              >
                목록 &gt;
              </button>
            </div>

            <div className="flex h-[295px] w-full items-center justify-center px-4">
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
            </div>

            {loading && <div className="w-full px-4 pt-3 text-[12px] text-white/60">불러오는 중...</div>}

            {!loading && periodOptions.length > 0 && (
              <div className="w-full px-4 text-center">
                <span className="text-[#E6E6E6] text-[18px] font-semibold leading-normal tracking-[-0.408px]">
                  {resultText}
                </span>
              </div>
            )}
            
            {errorMessage && <div className="w-full px-4 pt-2 text-[12px] text-red-300">{errorMessage}</div>}
          </section>

          {/* 카테고리 리스트 섹션 */}
          <section className="w-full flex-1 min-h-0 bg-[#1F1F1F] pb-20">
            <CategoryList categories={categories} showExpandButton={false}/>
          </section>
        </>
      )}

      {/* 하단 네비게이션 */}
      <div className="w-full flex-shrink-0 bg-[#1F1F1F] py-4">
        <div className="max-w-md mx-auto w-full flex justify-between items-center px-6">
          <div className="flex bg-primary-opacity-50 rounded-full gap-3 border-white/10">
            <Button 
              borderColor={"outline"}
              bgColor={"none"}
              className="flex w-[108px] h-[52px] gap-2"
              fontColor={"white"}
              onClick={() => navigate('/calendar')}
            >
              <CalendarIcon />
              달력
            </Button>
            <Button 
              borderColor={"outline"}
              bgColor={"none"}
              className="flex w-[122px] h-[52px] gap-2 bg-white"
            >
              <ReportIcon />
              리포트
            </Button>
          </div>
          <div className="cursor-pointer" onClick={() => navigate('/main')}>
            <HomeIcon className="w-[52px] h-[52px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;