import { useState } from "react";
import { DateCell } from "./DateCell";

type DateGridProps = {
    year: number;
    month: number; // 0~11
    // 온보딩 모드를 위한 Props 추가
    isRangeMode?: boolean;
    rangeStart?: Date | null;
    rangeEnd?: Date | null;
};  

export function DateGrid({ year, month, isRangeMode, rangeStart, rangeEnd }: DateGridProps) {
    // 1. 현재 선택된 날짜 상태 관리
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    // 2. 이번 달 1일의 요일 계산 (0: 일, 1: 월, ..., 6: 토)
    const firstdayIndex = new Date(year, month, 1).getDay();

    // 3. 이전 달의 마지막 날짜 계산 (예: 9월 30일)
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    // 4. 이번 달의 마지막 날짜 계산 (28, 30, 31일 자동 계산)
    const lastDate = new Date(year, month + 1, 0).getDate();

    // 날짜 비교를 위한 헬퍼 함수
    const isSameDate = (date1: Date, date2: Date) => {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    };

    // 범위 시작일인지 확인
    const isRangeStartDate = (day: number) => {
        if (!isRangeMode || !rangeStart) return false;
        const currentTarget = new Date(year, month, day);
        return isSameDate(currentTarget, rangeStart);
    };

    // 범위 종료일인지 확인
    const isRangeEndDate = (day: number) => {
        if (!isRangeMode || !rangeEnd) return false;
        const currentTarget = new Date(year, month, day);
        return isSameDate(currentTarget, rangeEnd);
    };

    // 범위 중간에 있는지 확인
    const isBetweenRange = (day: number) => {
        if (!isRangeMode || !rangeStart || !rangeEnd) return false;
        
        const currentTarget = new Date(year, month, day);
        const start = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());
        const end = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate());
        
        return currentTarget > start && currentTarget < end;
    };

    // 5. 이전 달 날짜 데이터 생성 (isCurrentMonth: false)
    const prevMonthDates = Array.from({ length: firstdayIndex }, (_, index) => ({
        day: prevMonthLastDate - firstdayIndex + index + 1,
        isCurrentMonth: false,
    }));

    // 6. 이번 달 날짜 데이터 생성 (isCurrentMonth: true)
    const currentMonthDates = Array.from({ length: lastDate }, (_, index) => ({
        day: index + 1,
        isCurrentMonth: true,
    }));

    // 7. 다음 달 날짜 생성 (그리드 빈 칸 채우기)
    const totalFilled = prevMonthDates.length + currentMonthDates.length;
    const nextMonthLength = totalFilled > 35 ? 42 - totalFilled : 35 - totalFilled;

    const nextMonthDates = Array.from({ length: nextMonthLength }, (_, index) => ({
        day: index + 1,
        isCurrentMonth: false,
    }));

    return (
        <div className="grid grid-cols-7 gap-x-[2.34px] gap-y-[9.36px] w-[276.2px]">
            {/* 이전 달 날짜들: 회색으로 표시됨 */}
            {prevMonthDates.map((item, index) => {
                // 이전 달 날짜도 범위에 포함될 수 있음
                const prevMonthYear = month === 0 ? year - 1 : year;
                const prevMonth = month === 0 ? 11 : month - 1;
                const prevDate = new Date(prevMonthYear, prevMonth, item.day);
                
                const isStart = rangeStart && isSameDate(prevDate, rangeStart);
                const isEnd = rangeEnd && isSameDate(prevDate, rangeEnd);
                const isBetween = rangeStart && rangeEnd && prevDate > rangeStart && prevDate < rangeEnd;
                
                return (
                    <DateCell
                        key={`prev-${item.day}`}
                        day={item.day}
                        dayOfWeek={index}
                        isCurrentMonth={item.isCurrentMonth}
                        isSelected={false}
                        isRangeMode={isRangeMode}
                        isRangeStart={isStart || false}
                        isRangeEnd={isEnd || false}
                        isBetween={isBetween || false}
                    />
                );
            })}

            {/* 이번 달 날짜들 */}
            {currentMonthDates.map((item, index) => {
                const dayOfWeek = (firstdayIndex + index) % 7;
                
                if (isRangeMode) {
                    return (
                        <DateCell
                            key={`curr-${item.day}`}
                            day={item.day}
                            dayOfWeek={dayOfWeek}
                            isCurrentMonth={item.isCurrentMonth}
                            isSelected={false}
                            isRangeMode={isRangeMode}
                            isRangeStart={isRangeStartDate(item.day)}
                            isRangeEnd={isRangeEndDate(item.day)}
                            isBetween={isBetweenRange(item.day)}
                        />
                    );
                } else {
                    return (
                        <DateCell
                            key={`curr-${item.day}`}
                            day={item.day}
                            dayOfWeek={dayOfWeek}
                            isCurrentMonth={item.isCurrentMonth}
                            isSelected={selectedDate === item.day}
                            onClick={() => setSelectedDate(item.day)}
                        />
                    );
                }
            })}

            {/* 다음 달 날짜들 */}
            {nextMonthDates.map((item, index) => {
                const dayOfWeek = (totalFilled + index) % 7;
                
                // 다음 달 날짜도 범위에 포함될 수 있음
                const nextMonthYear = month === 11 ? year + 1 : year;
                const nextMonth = month === 11 ? 0 : month + 1;
                const nextDate = new Date(nextMonthYear, nextMonth, item.day);
                
                const isStart = rangeStart && isSameDate(nextDate, rangeStart);
                const isEnd = rangeEnd && isSameDate(nextDate, rangeEnd);
                const isBetween = rangeStart && rangeEnd && nextDate > rangeStart && nextDate < rangeEnd;
                
                return (
                    <DateCell
                        key={`next-${item.day}`}
                        day={item.day}
                        dayOfWeek={dayOfWeek}
                        isCurrentMonth={false}
                        isSelected={false}
                        isRangeMode={isRangeMode}
                        isRangeStart={isStart || false}
                        isRangeEnd={isEnd || false}
                        isBetween={isBetween || false}
                    />
                );
            })}
        </div>
    );
}