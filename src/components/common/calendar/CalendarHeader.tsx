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
    <div className="flex w-[248px] items-center justify-between">
      {/* 년/월 */}
      <span className="text-[18px] font-semibold text-[#EAEAEA]">
        {year}년 {month + 1}월 {/* month는 0부터 시작하므로 +1 */}
      </span>

      {/* 화살표 영역 */}
      <div className="flex gap-3">
        <button
          onClick={onPrev}
          className="flex h-8 w-8 items-center justify-center"
        >
          <ArrowBack />
        </button>

        <button
          onClick={onNext}
          className="flex h-8 w-8 items-center justify-center"
        >
          <ArrowForward />
        </button>
      </div>
    </div>
  );
}
