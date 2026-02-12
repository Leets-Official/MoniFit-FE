import { cva } from "class-variance-authority";
import { clsx } from "clsx";

const dateCellVariants = cva(
  "transition-colors select-none flex items-center justify-center font-bold leading-none",
  {
    variants: {
      status: {
        default: "text-white",     
        selected: "text-black",  
        inRange: "text-white",
        outsideBudget: "text-gray-400"  // ✅ 더 진한 회색으로 변경
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
  isCurrentMonth 
}: { 
  day: number; 
  currentStatus: "default" | "selected" | "inRange" | "outsideBudget";
  isCurrentMonth: boolean;  // ✅ isInBudgetPeriod 제거
}) => (
  <span 
    style={{ 
      fontSize: '16px',
      fontWeight: 'bold'
    }}
    className={dateCellVariants({ 
      status: currentStatus, 
      isCurrentMonth: isCurrentMonth
    })}
  >
    {day}
  </span>
);

// 금액 텍스트 컴포넌트
const AmountText = ({ 
  amount, 
  isSelectedState 
}: { 
  amount: number; 
  isSelectedState: boolean;
}) => (
  <span
    style={{ 
      display: 'block',
      fontSize: '7px',
      lineHeight: '0',
      fontWeight: '600',
      color: isSelectedState ? 'rgba(0, 0, 0, 0.6)' : '#ffffff'
    }}
  >
    ₩{amount.toLocaleString()}
  </span>
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

  // 다른 달의 날짜는 숨김 처리
  if (!isCurrentMonth) {
    return <div className="w-[36px] h-[36px]" />;
  }

  return (
    <div
      className={clsx(
        "w-[36px] h-[36px] relative",
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

      {/* 보라색 원 배경 - 날짜만 감쌈 */}
      {(isRangeStart || isRangeEnd || (!isRangeMode && isSelected)) && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-10">
          <div className="w-[36px] h-[36px] rounded-full bg-[#A8A6FF]" />
        </div>
      )}

      {/* 날짜 + 금액 컨테이너 */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* 날짜 텍스트 */}
        <DateText 
          day={day}
          currentStatus={currentStatus}
          isCurrentMonth={isCurrentMonth}
        />
        
        {/* 금액 영역 - 항상 동일한 높이 유지 */}
        <div className="mt-[2px]" style={{ height: '9px' }}>
          {amount !== undefined && amount > 0 && isInBudgetPeriod && (
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