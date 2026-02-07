import { cva } from "class-variance-authority";
import { clsx } from "clsx";

const dateCellVariants = cva(
  "row-start-1 col-start-1 transition-colors cursor-pointer select-none flex items-center justify-center w-full h-full font-bold",
  {
    variants: {
      status: {
        default: "text-white",     
        selected: "text-black",  
        inRange: "text-white",
        outsideBudget: "text-gray-20" // 예산 기간 외: 짙은 회색
      },
      isCurrentMonth: {
        true: "",          
        false: "text-[#CCCCCC]", 
      },
    },
    defaultVariants: {
      status: "default",
      isCurrentMonth: true,
    },
  },
);

type DateCellProps = {
    day: number;
    isSelected: boolean;
    isRangeStart?: boolean;
    isRangeEnd?: boolean;
    isBetween?: boolean;
    isRangeMode?: boolean;
    isCurrentMonth?: boolean;
    dayOfWeek?: number;
    onClick?: () => void;
    isInBudgetPeriod?: boolean; // 추가
};

export function DateCell({
  day,
  isSelected,
  isCurrentMonth = true,
  isRangeStart,
  isRangeEnd,
  isBetween,
  isRangeMode,
  onClick,
  isInBudgetPeriod = true // 추가
}: DateCellProps) {

  // 상태 결정 - 예산 기간 체크 추가
  const currentStatus = !isInBudgetPeriod 
    ? "outsideBudget"
    : (isSelected || isRangeStart || isRangeEnd)
      ? "selected" 
      : isBetween 
        ? "inRange" 
        : "default";

  return (
    <button 
      type="button" 
      className="w-[37.45px] h-[37.45px] relative" 
      onClick={onClick} 
      disabled={isRangeMode}
    > 
      <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full h-full">
        {/* 30일 범위 배경 */}
        {(isRangeStart || isRangeEnd || isBetween) && isRangeMode && (
          <div className={clsx(
            "absolute top-0 bottom-0 bg-[#A8A6FF]/25 z-0",
            isRangeStart && !isRangeEnd && "left-1/2 right-0",
            isRangeEnd && !isRangeStart && "left-0 right-1/2",
            isBetween && "left-0 right-0",
            isRangeStart && isRangeEnd && "left-1/2 right-1/2"
          )} />
        )}

        {/* 선택 시 보라색 원 배경 */}
        {(isRangeStart || isRangeEnd || (!isRangeMode && isSelected)) && (
          <div className="z-10 col-start-1 row-start-1 h-[37.45px] w-[37.45px] rounded-full bg-[#A8A6FF] shadow-sm" />
        )}

        {/* 날짜 텍스트 */}
        <div className={clsx(
          dateCellVariants({ 
            status: currentStatus, 
            isCurrentMonth: isInBudgetPeriod ? isCurrentMonth : true // 예산 외 날짜는 흐릿하게 처리 안함
          }),
          "z-20"
        )}>
          {day}
        </div>
      </div>
    </button>
  );
}
