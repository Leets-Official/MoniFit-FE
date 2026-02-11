export function WeekdayHeader() {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="grid grid-cols-7 gap-[8px] mb-2">
      {weekdays.map((day) => (
        <div
          key={day}
          className="flex items-center justify-center w-[36px] h-[33.74px] text-base font-semibold text-[var(--primary-40)]"
        >
          {day}
        </div>
      ))}
    </div>
  );
}