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
  dayOfWeek?: number; // 0~6 (일~토)
  onClick?: () => void;
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
}: DateCellProps & { isCurrentMonth?: boolean }) {
  // 1. 상태 결정
  const currentStatus =
    isSelected || isRangeStart || isRangeEnd
      ? "selected"
      : isBetween
        ? "inRange"
        : "default";

  return (
    <button
      type="button"
      className="relative h-[37.45px] w-[37.45px]"
      onClick={onClick}
      disabled={isRangeMode}
    >
      <div className="grid h-full w-full grid-cols-1 grid-rows-1 place-items-center">
        {/* 30일 범위 배경 */}
        {(isRangeStart || isRangeEnd || isBetween) && isRangeMode && (
          <div
            className={clsx(
              "absolute top-0 bottom-0 z-0 bg-[#A8A6FF]/25",
              isRangeStart && !isRangeEnd && "right-0 left-1/2",
              isRangeEnd && !isRangeStart && "right-1/2 left-0",
              isBetween && "right-0 left-0",
              isRangeStart && isRangeEnd && "right-1/2 left-1/2", // 같은 날인 경우
            )}
          />
        )}

        {/* 선택 시 보라색 원 배경 */}
        {(isRangeStart || isRangeEnd || (!isRangeMode && isSelected)) && (
          <div className="z-10 col-start-1 row-start-1 h-[37.45px] w-[37.45px] rounded-full bg-[#A8A6FF] shadow-sm" />
        )}

        {/* 날짜 텍스트 */}
        <div
          className={clsx(
            dateCellVariants({
              status: currentStatus,
              isCurrentMonth:
                isRangeStart || isRangeEnd || isBetween ? true : isCurrentMonth,
            }),
            "z-20",
          )}
        >
          {day}
        </div>
      </div>
    </button>
  );
}
