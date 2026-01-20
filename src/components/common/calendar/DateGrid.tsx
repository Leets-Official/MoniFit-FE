import { useState } from "react";
import { DateCell } from "./DateCell";

type DateItem = {
  day: number;
  isSelected: boolean;
};
export function DateGrid() {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const firstdayIndex = new Date(2026, 9, 1).getDay();

    const emptyCells: DateItem[] = Array.from({ length: firstdayIndex }, () => ({
        day: 0,
        isSelected: false,
    }));
    const dates: DateItem[] = Array.from({ length: 31 }, (_, index) => ({
    day: index + 1,
    isSelected: index + 1 === 1 || index + 1 === 30, // 테스트용
    }));

    return (
        <div className="grid grid-cols-7 gap-x-[2.34px] gap-y-[9.36px] w-[276.2px]">
            {emptyCells.map((_, index) => (
                <div key={`empty-${index}`} className="w-[37.45px] h-[37.45px]"></div>
            ))}
            {dates.map((item, index) => {
                const dayOfWeek = (firstdayIndex + index) % 7;
                return (
                    <DateCell
                        key={item.day}
                        day={item.day}
                        dayOfWeek={dayOfWeek}
                        // 3. 현재 이 날짜가 내가 저장한 'selectedDay'와 같은지 확인
                        isSelected={selectedDate === item.day}
                        // 4. 클릭하면 이 날짜를 선택된 날짜로 업데이트하는 함수 전달
                        onClick={() => setSelectedDate(item.day)}
                    />  
                );
              })}
          </div>
    );
}   