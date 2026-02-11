import { cva } from "class-variance-authority";
import { clsx } from "clsx";

const dateCellVariants = cva(
  "transition-colors cursor-pointer select-none flex items-center justify-center font-bold leading-none",
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

// 날짜 텍스트 컴포넌트
const DateText = ({ 
  day, 
  currentStatus, 
  isInBudgetPeriod, 
  isCurrentMonth 
}: { 
  day: number; 
  currentStatus: "default" | "selected" | "inRange" | "outsideBudget";
  isInBudgetPeriod: boolean;
  isCurrentMonth: boolean;
}) => (
  <div 
    style={{ fontSize: '16px' }}
    className={dateCellVariants({ 
      status: currentStatus, 
      isCurrentMonth: isInBudgetPeriod ? isCurrentMonth : true
    })}
  >
    {day}
  </div>
);

// 금액 텍스트 컴포넌트 - 모든 스타일 인라인으로
const AmountText = ({ 
  amount, 
  isSelectedState 
}: { 
  amount: number; 
  isSelectedState: boolean;
}) => (
  <div 
    style={{ 
      fontSize: '7px',
      lineHeight: 'normal',
      marginTop: '2px',
      fontWeight: 'normal',
      color: isSelectedState ? 'rgba(0,0,0,0.6)' : '#ffffff'
    }}
  >
    {amount >= 10000 
      ? `${(amount / 10000).toFixed(0)}만`
      : amount.toLocaleString()
    }
  </div>
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
    amount?: number;
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

  const isSelectedState = isSelected || isRangeStart || isRangeEnd;

  return (
    <div
      className={clsx(
        "w-[37.45px] h-[37.45px] relative",
        !isRangeMode && "cursor-pointer"
      )}
      onClick={isRangeMode ? undefined : onClick}
    > 
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
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <div className="h-[37.45px] w-[37.45px] rounded-full bg-[#A8A6FF] shadow-sm" />
        </div>
      )}

      {/* 날짜 텍스트 + 금액 컨테이너 */}
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
        <div className="flex flex-col items-center justify-center gap-0">
          <DateText 
            day={day}
            currentStatus={currentStatus}
            isInBudgetPeriod={isInBudgetPeriod}
            isCurrentMonth={isCurrentMonth}
          />
          
          {amount && isInBudgetPeriod && isCurrentMonth && (
            <AmountText 
              amount={amount}
              isSelectedState={!!isSelectedState}
            />
          )}
        </div>
      </div>
    </div>
  );
}