export function WeekdayHeader() {
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    return (
        <div className="grid grid-cols-7 w-[276.74px] h-[33.74px]">
            {weekdays.map((day) => (
                <div
                    key={day}
                    className="flex items-center justify-center text-[12.48px] text-[#EAEAEA] font-semibold"
                >
                    {day}
                </div>                                                         
            ))}
        </div>
    );
}