import { useState } from "react";
import { DateCell } from "./DateCell";

type DateGridProps = {
  year: number;
  month: number;
  isRangeMode?: boolean;
  rangeStart?: Date | null;
  rangeEnd?: Date | null;
  budgetStart?: Date;
  budgetEnd?: Date;
};

export function DateGrid({
  year,
  month,
  isRangeMode,
  rangeStart,
  rangeEnd,
  budgetStart,
  budgetEnd,
}: DateGridProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const firstdayIndex = new Date(year, month, 1).getDay();
  const prevMonthLastDate = new Date(year, month, 0).getDate();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // 예산 기간 내 날짜인지 확인
  const isInBudgetPeriod = (date: Date) => {
    if (!budgetStart || !budgetEnd) return true; // 예산 기간이 없으면 모두 활성

    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const start = new Date(
      budgetStart.getFullYear(),
      budgetStart.getMonth(),
      budgetStart.getDate(),
    );
    const end = new Date(budgetEnd.getFullYear(), budgetEnd.getMonth(), budgetEnd.getDate());

    return targetDate >= start && targetDate <= end;
  };

  const isRangeStartDate = (day: number) => {
    if (!isRangeMode || !rangeStart) return false;
    const currentTarget = new Date(year, month, day);
    return isSameDate(currentTarget, rangeStart);
  };

  const isRangeEndDate = (day: number) => {
    if (!isRangeMode || !rangeEnd) return false;
    const currentTarget = new Date(year, month, day);
    return isSameDate(currentTarget, rangeEnd);
  };

  const isBetweenRange = (day: number) => {
    if (!isRangeMode || !rangeStart || !rangeEnd) return false;

    const currentTarget = new Date(year, month, day);
    const start = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());
    const end = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate());

    return currentTarget > start && currentTarget < end;
  };

  const prevMonthDates = Array.from({ length: firstdayIndex }, (_, index) => ({
    day: prevMonthLastDate - firstdayIndex + index + 1,
    isCurrentMonth: false,
  }));

  const currentMonthDates = Array.from({ length: lastDate }, (_, index) => ({
    day: index + 1,
    isCurrentMonth: true,
  }));

  const totalFilled = prevMonthDates.length + currentMonthDates.length;
  const nextMonthLength = totalFilled > 35 ? 42 - totalFilled : 35 - totalFilled;

  const nextMonthDates = Array.from({ length: nextMonthLength }, (_, index) => ({
    day: index + 1,
    isCurrentMonth: false,
  }));

  return (
    <div className="grid grid-cols-7 gap-x-[2.34px] gap-y-[9.36px] w-[276.2px]">
      {/* 이전 달 날짜들 */}
      {prevMonthDates.map((item, index) => {
        const prevMonthYear = month === 0 ? year - 1 : year;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevDate = new Date(prevMonthYear, prevMonth, item.day);

        const isStart = rangeStart && isSameDate(prevDate, rangeStart);
        const isEnd = rangeEnd && isSameDate(prevDate, rangeEnd);
        const isBetween =
          rangeStart && rangeEnd && prevDate > rangeStart && prevDate < rangeEnd;

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
            isInBudgetPeriod={isInBudgetPeriod(prevDate)}
          />
        );
      })}

      {/* 이번 달 날짜들 */}
      {currentMonthDates.map((item, index) => {
        const dayOfWeek = (firstdayIndex + index) % 7;
        const currentDate = new Date(year, month, item.day);

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
              isInBudgetPeriod={isInBudgetPeriod(currentDate)}
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
              isInBudgetPeriod={isInBudgetPeriod(currentDate)}
            />
          );
        }
      })}

      {/* 다음 달 날짜들 */}
      {nextMonthDates.map((item, index) => {
        const dayOfWeek = (totalFilled + index) % 7;
        const nextMonthYear = month === 11 ? year + 1 : year;
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextDate = new Date(nextMonthYear, nextMonth, item.day);

        const isStart = rangeStart && isSameDate(nextDate, rangeStart);
        const isEnd = rangeEnd && isSameDate(nextDate, rangeEnd);
        const isBetween =
          rangeStart && rangeEnd && nextDate > rangeStart && nextDate < rangeEnd;

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
            isInBudgetPeriod={isInBudgetPeriod(nextDate)}
          />
        );
      })}
    </div>
  );
}
