export function WeekdayHeader() {
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
  return (
    <div className="grid h-[33.74px] w-[276.74px] grid-cols-7">
      {weekdays.map((day) => (
        <div
          key={day}
          className="flex items-center justify-center text-base font-semibold text-[var(--primary-40)]"
        >
          {day}
        </div>
      ))}
    </div>
  );
}
