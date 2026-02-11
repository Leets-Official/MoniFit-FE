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
  dailySummaries?: Array<{
    date: Date;
    amount: number;
    withinPeriod: boolean;
  }>;
  onDateClick?: (date: Date) => void;
};

export function DateGrid({
  year,
  month,
  isRangeMode,
  rangeStart,
  rangeEnd,
  budgetStart,
  budgetEnd,
  dailySummaries = [],
  onDateClick,
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

  const getDailySummary = (date: Date) => {
    return dailySummaries.find(summary => isSameDate(summary.date, date));
  };

  const isInBudgetPeriod = (date: Date) => {
    if (!budgetStart || !budgetEnd) return true;

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

  const handleDateClick = (day: number) => {
    setSelectedDate(day);
    const clickedDate = new Date(year, month, day);
    onDateClick?.(clickedDate);
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
    <div className="grid grid-cols-7 gap-[8px]">
      {/* 이전 달 날짜들 */}
      {prevMonthDates.map((item, index) => {
        const prevMonthYear = month === 0 ? year - 1 : year;
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevDate = new Date(prevMonthYear, prevMonth, item.day);
        const summary = getDailySummary(prevDate);

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
            amount={summary?.amount}
          />
        );
      })}

      {/* 이번 달 날짜들 */}
      {currentMonthDates.map((item, index) => {
        const dayOfWeek = (firstdayIndex + index) % 7;
        const currentDate = new Date(year, month, item.day);
        const summary = getDailySummary(currentDate);

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
              amount={summary?.amount}
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
              onClick={() => handleDateClick(item.day)}
              isInBudgetPeriod={isInBudgetPeriod(currentDate)}
              amount={summary?.amount}
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
        const summary = getDailySummary(nextDate);

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
            amount={summary?.amount}
          />
        );
      })}
    </div>
  );
}