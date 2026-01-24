import { useMemo } from "react";
import ChevronDown from "@/assets/icons/general/chevron-down.svg";

import {
  calcBudgetState,
  calcMidDateCompact,
  calcTimeRatio,
  formatCurrencyKRW,
  formatDotDate,
} from "./budgetProgress.utils";

type BudgetProgressCardProps = {
  title?: string;
  startDate: string;
  endDate: string;
  currentDate?: string;
  targetBudget: number;
  spentAmount: number;
  rightBottomLabel?: string;
};

type BarProps = {
  ratio: number;
  fillFromRight?: boolean;
};

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v));
}

function ProgressBar({ ratio, fillFromRight }: BarProps) {
  const r = clamp01(ratio);

  return (
    <div className="relative h-2 w-68 overflow-hidden rounded-full bg-(--gray-20)">
      {!fillFromRight ? (
        <div className="h-full bg-(--primary-50)" style={{ width: `${r * 100}%` }} />
      ) : (
        <div
          className="absolute right-0 top-0 h-full bg-(--primary-50)"
          style={{ width: `${r * 100}%` }}
        />
      )}
    </div>
  );
}

export default function BudgetProgressCard({
  title = "현재 지출 진행 상황",
  startDate,
  endDate,
  currentDate,
  targetBudget,
  spentAmount,
  rightBottomLabel = "총 목표 예산",
}: BudgetProgressCardProps) {
  const timeRatio = useMemo(
    () => calcTimeRatio(startDate, endDate, currentDate),
    [startDate, endDate, currentDate]
  );

  const midDate = useMemo(() => calcMidDateCompact(startDate, endDate), [startDate, endDate]);

  const state = useMemo(
    () => calcBudgetState(targetBudget, spentAmount),
    [targetBudget, spentAmount]
  );

  const timeStartLabel = formatDotDate(startDate);
  const timeMidLabel = midDate
    ? `${midDate.slice(0, 4)}.${midDate.slice(4, 6)}.${midDate.slice(6, 8)}`
    : "";
  const timeEndLabel = formatDotDate(endDate);

  const keyword = state.isOver ? "초과" : "절약";
  const amount = state.isOver ? state.overAmount : state.savedAmount;

  return (
    <section className="h-51.75 w-77.25 overflow-hidden rounded-[14px] border-[0.5px] border-(--primary-60) bg-(--surface-background) px-5 py-5">
      <div className="flex flex-col gap-1">
        <h3 className="text-sub1 text-(--gray-10)">{title}</h3>
        <p className="text-caption2 text-(--gray-60)">
          {formatDotDate(startDate)} - {formatDotDate(endDate)}
        </p>
      </div>

      <div className="mt-4">
        <ProgressBar ratio={timeRatio} />

        <div className="mt-1 flex w-68 items-center justify-between text-[6px] text-(--gray-50)">
          <span>{timeStartLabel}</span>
          <span>{timeMidLabel}</span>
          <span>{timeEndLabel}</span>
        </div>
      </div>

      <div className="mt-5">
        <p className="text-sub1 text-(--gray-10)">
          지금까지 {formatCurrencyKRW(amount)}원을{" "}
          <span className="text-(--primary-50)">{keyword}</span>했어요
        </p>
        <p className="mt-1 text-caption2 text-(--gray-60)">
          목표 예산 {formatCurrencyKRW(targetBudget)}원에서 {formatCurrencyKRW(spentAmount)}원 사용
        </p>
      </div>

      <div className="mt-4">
        <div className="relative w-68">
          <ProgressBar
            ratio={state.isOver ? state.overRatio : state.savingRatio}
            fillFromRight={state.isOver}
          />

          <div
            className="absolute -top-7 flex -translate-x-1/2 flex-col items-center"
            style={{ left: `${state.indicatorLeftPercent}%` }}
          >
            <span className="text-[10px] text-(--primary-50)">{state.badgeText}</span>
            <img src={ChevronDown} alt="" className="mt-pt h-2.5 w-2.5" />
          </div>
        </div>

        <div className="mt-2 flex w-68 items-center justify-end">
          <span className="text-[6px] text-(--gray-30)">{rightBottomLabel}</span>
        </div>
      </div>
    </section>
  );
}
