import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";
import { CalendarHeader } from "./CalendarHeader";

export function Calendar() {
    return (
        <div>
            <div>
                <h2 className="font-semibold text-[20.29px]">날짜를 선택해주세요.</h2>
            </div>
            <CalendarHeader />
            <WeekdayHeader />
            <DateGrid />
        </div>
    );
}