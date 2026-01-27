import {cva} from "class-variance-authority";
import {clsx} from "clsx";

const dateCellVariants = cva(
  "row-start-1 col-start-1 transition-colors cursor-pointer select-none flex items-center justify-center w-full h-full font-bold",
  {
    variants: {
      status: {
        default: "text-white",     
        selected: "text-black",  
        inRange: "text-gray-0"     
      },
      isCurrentMonth: {
        true: "",          
        false: "text-[#CCCCCC] opacity-40", 
      },
    },
    defaultVariants: {
      status: "default",
      isCurrentMonth: true,
    },
  }
);

type DateCellProps = {
    day: number;
    isSelected: boolean;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    isBetween?: boolean;
    isRangeMode?: boolean;
    isCurrentMonth?: boolean;
    dayOfWeek?: number; // 0~6 (일~토)
    onClick?: () => void;
};
export function DateCell({ 
  day, 
  isSelected, 
  isCurrentMonth = true, // 기본값을 true로 설정
  isRangeStart,
  isRangeEnd,
  isBetween,
  isRangeMode,
  onClick 
}: DateCellProps & { isCurrentMonth?: boolean }) {

  // 1. 상태 결정
  const currentStatus = (isSelected || isRangeStart || isRangeEnd)
    ? "selected" 
    : isBetween 
        ? "inRange" 
        : "default"
      ;

  return (
    <button type="button" className="w-[37.45px] h-[37.45px]" onClick={onClick} disabled={isRangeMode}> 
      <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full h-full">
        {(isRangeStart || isRangeEnd || isBetween) && isRangeMode && (
          // 30일 범위 배경
          <div className={clsx(
            "absolute inset-y-1 bg-[#A8A6FF]/25 z-0",
            isRangeStart && "left-[2px] right-0 rounded-l-full",
            isRangeEnd && "right-[2px] left-0 rounded-r-full",
            isBetween && "left-0 right-0"
          )} />
        )}
        {/* 선택 시 보라색 배경 */}
        {(isRangeStart || isRangeEnd || (!isRangeMode && isSelected)) && (
          <div className="w-[37.45px] h-[37.45px] rounded-full bg-[#A8A6FF] row-start-1 col-start-1 shadow-sm" />
        )}
        
        {/* 날짜 텍스트 */}
        <div className={clsx(
          dateCellVariants({ 
            status: currentStatus, 
            // 선택된 상태가 아닐 때만 '현재 달 아님' 스타일 적용
            isCurrentMonth: (isRangeStart || isRangeEnd || isBetween) ? true : isCurrentMonth
          })
        )}>
          {day}
        </div>
      </div>
    </button>
  );
}