import {cva} from "class-variance-authority";
import {clsx} from "clsx";

const dateCellVariants = cva(
  "row-start-1 col-start-1 transition-colors cursor-pointer select-none flex items-center justify-center w-full h-full",
  {
    variants: {
      status: {
        default: "text-white",     
        selected: "text-black",       
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
    dayOfWeek?: number; // 0~6 (일~토)
    onClick?: () => void;
};
export function DateCell({ 
  day, 
  isSelected, 
  isCurrentMonth = true, // 기본값을 true로 설정
  onClick 
}: DateCellProps & { isCurrentMonth?: boolean }) {

  // 1. 상태 결정
  const currentStatus = isSelected 
    ? "selected" 
    : "default";

  return (
    <button type="button" className="w-[37.45px] h-[37.45px]" onClick={onClick}>
      <div className="grid grid-cols-1 grid-rows-1 place-items-center w-full h-full">
        {/* 선택 시 보라색 배경 */}
        {isSelected && (
          <div className="w-[37.45px] h-[37.45px] rounded-full bg-[#A8A6FF] row-start-1 col-start-1" />
        )}
        
        {/* 날짜 텍스트 */}
        <div className={clsx(
          dateCellVariants({ 
            status: currentStatus, 
            // 선택된 상태가 아닐 때만 '현재 달 아님' 스타일 적용
            isCurrentMonth: isSelected ? true : isCurrentMonth 
          })
        )}>
          {day}
        </div>
      </div>
    </button>
  );
}