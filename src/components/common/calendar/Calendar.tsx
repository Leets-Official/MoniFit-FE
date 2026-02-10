import { useState } from "react";
import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";
import { CalendarHeader } from "./CalendarHeader";

type CalendarProps = {
    isRangeMode?: boolean;
    budgetStart?: Date;
    budgetEnd?: Date;
}

export function Calendar({ isRangeMode = false, budgetStart, budgetEnd }: CalendarProps) {
    const now = new Date();
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0~11

  // 온보딩 모드일 때만 30일 기간 계산
  const rangeStart = isRangeMode
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
    : null;
  const rangeEnd = isRangeMode
    ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
    : null;

  // 에러 방지용: 이전 달/다음 달로 이동하는 함수
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div className="flex flex-col w-[276.2px]"> 
                <CalendarHeader 
                year={currentYear} 
                month={currentMonth}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
                />
                <WeekdayHeader />
                <DateGrid 
                year={currentYear} 
                month={currentMonth}
                // 온보딩 모드일 때만 범위 데이터를 넘겨줌
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                isRangeMode={isRangeMode}
                budgetStart={budgetStart}
                budgetEnd={budgetEnd}
                />
            </div>
        </div>
    );
}
