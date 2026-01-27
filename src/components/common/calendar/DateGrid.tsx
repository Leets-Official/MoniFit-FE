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

    // 날짜가 강조 범위(30일)에 포함되는지 확인하는 함수
    const isInRange = (day: number) => {
        if (!isRangeMode || !rangeStart || !rangeEnd) return false;
        
        const currentTarget = new Date(year, month, day);
        // 시간 정보를 제외하고 날짜만 비교하기 위해 복사본 생성
        const start = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), rangeStart.getDate());
        const end = new Date(rangeEnd.getFullYear(), rangeEnd.getMonth(), rangeEnd.getDate());
        
        return currentTarget >= start && currentTarget <= end;
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
    // 총 42칸(7열 x 6행) 혹은 35칸 기준에서 남은 칸을 계산합니다.
    const totalFilled = prevMonthDates.length + currentMonthDates.length;
    const nextMonthLength = totalFilled > 35 ? 42 - totalFilled : 35 - totalFilled;

    const nextMonthDates = Array.from({ length: nextMonthLength }, (_, index) => ({
        day: index + 1,
        isCurrentMonth: false,
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

                // 온보딩 모드면 30일 범위 포함 여부를, 아니면 클릭 선택 여부를 판단
                const isSelected = isRangeMode ? isInRange(item.day) : selectedDate === item.day;
                
                return (
                    <DateCell
                        key={`curr-${item.day}`}
                        day={item.day}
                        dayOfWeek={dayOfWeek}
                        isCurrentMonth={item.isCurrentMonth}
                        isSelected={isSelected}
                        onClick={() => !isRangeMode && setSelectedDate(item.day)}
                    />  
                );
            })}
            {/* 다음 달 */}
            {nextMonthDates.map((item, index) => {
                const dayOfWeek = (totalFilled + index) % 7;
                // 다음 달 날짜도 30일 기간에 포함된다면 강조 표시
                const isSelected = isRangeMode ? isInRange(item.day + lastDate) : false;
                return (
                    <DateCell
                        key={`next-${item.day}`}
                        day={item.day}
                        dayOfWeek={dayOfWeek}
                        isCurrentMonth={false}
                        isSelected={isSelected}
                    />
                );
            })}
        </div>
    );
}