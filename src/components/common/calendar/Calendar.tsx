import { DateGrid } from "./DateGrid";
import { WeekdayHeader } from "./WeekdayHeader";
import { CalendarHeader } from "./CalendarHeader";

export function Calendar() {
    return (
        <div className="flex flex-col items-center justify-center w-full py-10">
            <div className="flex flex-col w-[276.2px]"> 
                    <h2 className="font-semibold text-lg text-[#EAEAEA]">
                        날짜를 선택해주세요.
                    </h2>
                <CalendarHeader />
                <WeekdayHeader />
                <DateGrid />
            </div>
        </div>
    );
}