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
        outsideBudget: "text-gray-20"
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
    isInBudgetPeriod?: boolean;
    amount?: number; // 새로 추가
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
  isInBudgetPeriod = true,
  amount
}: DateCellProps) {

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

        {/* 날짜 텍스트 + 금액 */}
        <div className="z-20 flex flex-col items-center justify-center gap-0">
          <div className={clsx(
            dateCellVariants({ 
              status: currentStatus, 
              isCurrentMonth: isInBudgetPeriod ? isCurrentMonth : true
            }),
            "leading-none"
          )}>
            {day}
          </div>
          
          {/* 금액 표시: 예산 기간 내 + 현재 달 + 금액 있을 때만 */}
          {amount && isInBudgetPeriod && isCurrentMonth && (
            <div className={clsx(
              "text-[9px] leading-none mt-[2px] font-normal",
              (isSelected || isRangeStart || isRangeEnd) 
                ? "text-black/60" 
                : "text-white/50"
            )}>
              {amount >= 10000 
                ? `${(amount / 10000).toFixed(0)}만`
                : amount.toLocaleString()
              }
            </div>
          )}
        </div>
      </div>
    </button>
  );
}