import { ArrowForward } from "../icons/ArrowForward";
import { ArrowBack } from "../icons/ArrowBack";
type CalendarHeaderProps = {
    year: number;
    month: number; // 0~11
    onPrev: () => void;
    onNext: () => void; 
};

export function CalendarHeader({ year, month }: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between w-[276.74px]">
      
      {/* 년/월 */}
      <span className="font-semibold text-lg text-[#EAEAEA]">
        {year}년 {month + 1}월 {/* month는 0부터 시작하므로 +1 */}
      </span>

      {/* 화살표 영역 */}
      <div className="flex gap-3">
        <button className="w-8 h-8 flex items-center justify-center">
          <ArrowBack />
        </button>

        <button className="w-8 h-8 flex items-center justify-center">
          <ArrowForward />
        </button>
      </div>
    </div>
  );
}
