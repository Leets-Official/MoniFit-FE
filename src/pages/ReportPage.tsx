import { useMemo, useState } from "react";

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

type PeriodOption = {
  id: string;
  primary: string;
  secondary: string;
};

interface ReportPageProps {
  onClose?: () => void;
}

export const ReportPage = ({ onClose }: ReportPageProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(true);
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [selectedPeriodId, setSelectedPeriodId] = useState("p1");

  const periodOptions: PeriodOption[] = useMemo(
    () => [
      { id: "p1", primary: "26.01.01 - 26.01.30", secondary: "이번 달" },
      { id: "p2", primary: "25.12.01 - 25.12.31", secondary: "지난 달" },
      { id: "p3", primary: "25.11.01 - 25.11.30", secondary: "2개월 전" },
    ],
    []
  );

  const donutItems: DonutItem[] = useMemo(
    () => [
      {
        id: "food",
        label: "식비",
        value: 135000,
        color: "var(--color-gray-20)",
        labelColor: "var(--color-gray-90)",
        icon: TintedFoodIcon,
      },
      {
        id: "shopping",
        label: "쇼핑",
        value: 135000,
        color: "var(--color-primary-50)",
        labelColor: "var(--color-gray-90)",
        icon: TintedShoppingIcon,
      },
      {
        id: "medical",
        label: "의료",
        value: 135000,
        color: "var(--color-gray-30)",
        labelColor: "var(--color-gray-90)",
        icon: TintedHospitalIcon,
      },
      {
        id: "living",
        label: "생활",
        value: 135000,
        color: "linear",
        labelColor: "var(--color-gray-90)",
        icon: TintedHomeIcon,
      },
      {
        id: "etc",
        label: "기타",
        value: 0,
        color: "var(--color-gray-40)",
        labelColor: "var(--color-gray-90)",
        icon: TintedStarIcon,
      },
    ],
    []
  );

  const totalValue = useMemo(
    () => donutItems.reduce((acc, it) => acc + (it.value ?? 0), 0),
    [donutItems]
  );

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

      <section
        className="flex h-73.75 w-93.75 shrink-0 items-center justify-center bg-transparent"
        onClick={() => setIsDetailOpen(true)}
      >
        <DonutChart
          items={donutItems}
          totalValue={totalValue}
          budgetValue={400000}
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

      {isDetailOpen && (
        <section className="w-93.75 flex-1 overflow-y-auto bg-[#121212] px-4 pb-20">
          <CategoryList />
        </section>
      )}

      <div className="fixed bottom-8 w-93.75 px-6">
        <div className="flex items-center justify-between">
          <div className="flex rounded-full border border-white/10 bg-primary-opacity-50 p-1">
            <Button
              width={"sm"}
              borderColor={"outline"}
              bgColor={"none"}
              className="flex gap-2"
              fontColor={"white"}
            >
              <CalendarIcon />
              달력
            </Button>

            <Button
              width={"md"}
              borderColor={"outline"}
              bgColor={"none"}
              className="flex gap-2 bg-white"
            >
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
