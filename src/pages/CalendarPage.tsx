import {useState} from "react";
import { Calendar } from "@/components/common/calendar/Calendar";
import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon, ReportIcon } from "@/assets/icons";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";

export const CalendarPage = () => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    return (
        <div className="relative flex h-screen w-full flex-col items-center">
            <section 
            className="w-[375px] h-[295px] bg-[#3A3A3C]/20 flex-shrink-0"
            onClick={() => setIsDetailOpen(true)}
            >
                <Calendar />   
            </section>

            {isDetailOpen && (
                <section className="w-[375px] h-[252px] flex-1 overflow-y-auto mt-4 px-4 pb-20">
                    <CategoryList/>
                </section>
            )}

            <div className="fixed bottom-8 w-[375px] flex justify-between items-center px-6">
                 <div className="flex bg-primary-opacity-50 rounded-full p-1 border border-white/10">
                    <Button 
                        width="sm" 
                        height="sm" 
                        bgColor="none" 
                        fontColor="default"
                        className="bg-white text-black"
                    >
                    <CalendarIcon className="!text-gray-90"/>
                        달력
                    </Button>

                    <Button 
                        width="sm" 
                        height="sm" 
                        bgColor="none" 
                        fontColor="white"
                    >
                    <ReportIcon />
                        리포트
                    </Button>
                </div>
                 <div className="cursor-pointer">
                    <HomeIcon className="w-[52px] h-[52px]" />
                 </div>
            </div>
        </div>
    );
}
export default CalendarPage;
