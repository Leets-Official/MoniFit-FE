import {cva} from "class-variance-authority";
import {clsx} from "clsx";

const dateCellVariants = cva(
    "grid grid-cols-1 grid-rows-1 place-items-center justify-center w-[37.45px] h-[37.45px] font-bold",
    {
    variants: {
      status: {
        default: "text-[#A0A0A0]",         // 평일
        weekend: "text-[#EAEAEA]",    // 주말
        selected: "text-black",        // 선택됨
      },
    },
    defaultVariants: {
      status: "default",
    },
  }
);

type DateCellProps = {
    day: number;
    isSelected: boolean;
    dayOfWeek?: number; // 0~6 (일~토)
    onClick?: () => void;
};
export function DateCell({ day, isSelected, dayOfWeek, onClick }: DateCellProps) {

    const currentStatus = isSelected 
        ? "selected" 
        : (dayOfWeek === 0 || dayOfWeek === 6 ? "weekend" : "default");

    return <div className="w-[37.45px] h-[37.45px]" onClick={onClick}>
    <div className="grid grid-cols-1 grid-rows-1 place-items-center justify-center w-[37.45px] h-[37.45px]">
        {isSelected && <div className="w-[37.45px] h-[37.45px] rounded-full bg-[#A8A6FF] row-start-1 col-start-1"></div>}
        <div className={clsx(
            "row-start-1 col-start-1 transition-colors", // 항상 들어가는 기본 스타일
            dateCellVariants({ status: currentStatus }),  // cva로 결정된 요일별 색상
            "cursor-pointer select-none"                 // 추가하고 싶은 스타일들
        )}>
            {day}
        </div>
    </div>
</div>;
}