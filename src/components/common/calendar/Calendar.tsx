import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";

export function Calendar() {
    return (
        <div>
            <WeekdayHeader />
            <DateGrid />
        </div>
    );
}