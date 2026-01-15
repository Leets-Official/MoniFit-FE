import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";
import { CalendarHeader } from "./CalendarHeader";

export function Calendar() {
    return (
        <div>
            <CalendarHeader />
            <WeekdayHeader />
            <DateGrid />
        </div>
    );
}