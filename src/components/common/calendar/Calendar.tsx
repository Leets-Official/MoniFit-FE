import { DateCell } from "./DateCell";
export function Calendar() {
    return (
        <div>
            <DateCell isSelected={true} />
            <DateCell isSelected={false} />
        </div>
    );
}