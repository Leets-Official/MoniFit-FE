import { ArrowForward } from "../icons/ArrowForward";
import { ArrowBack } from "../icons/ArrowBack";

type CalendarHeaderProps = {
  year: number;
  month: number; // 0~11
  onPrev: () => void;
  onNext: () => void;
};

export function CalendarHeader({
  year,
  month,
  onPrev,
  onNext,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center mb-3">
      {/* 년/월 */}
      <span className="text-[18px] font-semibold text-white">
        {year}년 {month + 1}월
      </span>

      {/* 화살표 영역 */}
      <div className="flex gap-[3.53px] items-center ml-3">
        <button
          onClick={onPrev}
          className="flex items-center justify-center"
        >
          <div className="w-[15px] h-[15.47px] flex items-center justify-center">
            <ArrowBack />
          </div>
        </button>

        <button
          onClick={onNext}
          className="flex items-center justify-center"
        >
          <div className="w-[15px] h-[15.47px] flex items-center justify-center">
            <ArrowForward />
          </div>
        </button>
      </div>
    </div>
  );
}