import { useState } from "react";
import { DateCell } from "./DateCell";

type DateGridProps = {
    year: number;
    month: number; // 0~11
};  

export function DateGrid({ year, month }: DateGridProps) {
    // 1. 현재 선택된 날짜 상태 관리
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    // 2. 이번 달 1일의 요일 계산 (0: 일, 1: 월, ..., 6: 토)
    const firstdayIndex = new Date(year, month, 1).getDay();

    // 3. 이전 달의 마지막 날짜 계산 (예: 9월 30일)
    const prevMonthLastDate = new Date(year, month, 0).getDate();

    // 4. 이번 달의 마지막 날짜 계산 (28, 30, 31일 자동 계산)
    const lastDate = new Date(year, month + 1, 0).getDate();

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

    return (
        <div className="grid grid-cols-7 gap-x-[2.34px] gap-y-[9.36px] w-[276.2px]">
            {/* 이전 달 날짜들: 회색으로 표시됨 */}
            {prevMonthDates.map((item, index) => (
                <DateCell
                    key={`prev-${item.day}`}
                    day={item.day}
                    dayOfWeek={index} // 그리드 첫 줄이므로 index가 곧 요일
                    isCurrentMonth={item.isCurrentMonth}
                    isSelected={false} // 이전 달은 선택 불가능
                />
            ))}

            {/* 이번 달 날짜들: 흰색/보라색으로 표시됨 */}
            {currentMonthDates.map((item, index) => {
                // 전체 그리드에서의 순서(이전달 칸 수 + 현재 인덱스)로 요일 계산
                const dayOfWeek = (firstdayIndex + index) % 7;
                
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
            })}
        </div>
    );
}