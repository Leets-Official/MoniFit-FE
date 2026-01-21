import { ArrowForward } from "../icons/ArrowForward";
import { ArrowBack } from "../icons/ArrowBack";

export function CalendarHeader() {
  return (
    <div className="flex items-center justify-between w-[276.74px]">
      
      {/* 년/월 */}
      <span className="font-semibold text-[12.48px] text-[#EAEAEA]">
        2026년 10월
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
