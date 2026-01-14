type DateCellProps = {
    day: number;
    isSelected: boolean;
};
export function DateCell({ day, isSelected }: DateCellProps) {
    return <div className="w-[37.45px] h-[37.45px]">
    <div className="grid grid-cols-1 grid-rows-1 place-items-center justify-center w-[37.45px] h-[37.45px]">
        {isSelected && <div className="w-[37.45px] h-[37.45px] rounded-full bg-[#A8A6FF] row-start-1 col-start-1"></div>}
        <div className="row-start-1 col-start-1">{day}</div>
        </div>
        </div>;
}