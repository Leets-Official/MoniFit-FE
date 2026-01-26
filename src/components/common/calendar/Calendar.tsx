import { useState } from "react";
import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";
import { CalendarHeader } from "./CalendarHeader";

export function Calendar() {
    const now = new Date();
    const [currentYear, setCurrentYear] = useState(now.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0~11

    // 에러 방지용: 이전 달/다음 달로 이동하는 함수
    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentYear(prev => prev - 1);
            setCurrentMonth(11);
        } else {
            setCurrentMonth(prev => prev - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentYear(prev => prev + 1);
            setCurrentMonth(0);
        } else {
            setCurrentMonth(prev => prev + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full py-10">
            <div className="flex flex-col w-[276.2px]"> 
                <CalendarHeader 
                year={currentYear} 
                month={currentMonth}
                onPrev={handlePrevMonth}
                onNext={handleNextMonth}
                />
                <WeekdayHeader />
                <DateGrid year={currentYear} month={currentMonth} />
            </div>
        </div>
    );
}