import { useState } from "react";
import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";
import { CalendarHeader } from "./CalendarHeader";

type CalendarProps = {
    isRangeMode?: boolean;
    budgetStart?: Date;
    budgetEnd?: Date;
    // 새로 추가되는 props
    dailySummaries?: Array<{
        date: Date;
        amount: number;
        withinPeriod: boolean;
    }>;
    onDateClick?: (date: Date) => void;
    onMonthChange?: (date: Date) => void;
    currentDate?: Date;
}

export function Calendar({ 
    isRangeMode = false, 
    budgetStart, 
    budgetEnd,
    dailySummaries = [],
    onDateClick,
    onMonthChange,
    currentDate
}: CalendarProps) {
    const now = currentDate || new Date();
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0~11

    // 온보딩 모드일 때만 30일 기간 계산
    const rangeStart = isRangeMode
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
        : null;
    const rangeEnd = isRangeMode
        ? new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30)
        : null;

    // 이전 달/다음 달로 이동하는 함수
    const handlePrevMonth = () => {
        let newYear = currentYear;
        let newMonth = currentMonth;
        
        if (currentMonth === 0) {
            newYear = currentYear - 1;
            newMonth = 11;
            setCurrentYear(newYear);
            setCurrentMonth(newMonth);
        } else {
            newMonth = currentMonth - 1;
            setCurrentMonth(newMonth);
        }
        
        // 부모에게 월 변경 알림
        onMonthChange?.(new Date(newYear, newMonth, 1));
    };

    const handleNextMonth = () => {
        let newYear = currentYear;
        let newMonth = currentMonth;
        
        if (currentMonth === 11) {
            newYear = currentYear + 1;
            newMonth = 0;
            setCurrentYear(newYear);
            setCurrentMonth(newMonth);
        } else {
            newMonth = currentMonth + 1;
            setCurrentMonth(newMonth);
        }
        
        // 부모에게 월 변경 알림
        onMonthChange?.(new Date(newYear, newMonth, 1));
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
                    rangeStart={rangeStart}
                    rangeEnd={rangeEnd}
                    isRangeMode={isRangeMode}
                    budgetStart={budgetStart}
                    budgetEnd={budgetEnd}
                    dailySummaries={dailySummaries}
                    onDateClick={onDateClick}
                />
            </div>
        </div>
    );
}