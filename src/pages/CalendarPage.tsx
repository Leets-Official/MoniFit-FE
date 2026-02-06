import {useState} from "react";
import { Calendar } from "@/components/common/calendar/Calendar";
import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon, ReportIcon } from "@/assets/icons";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";

export const CalendarPage = () => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    // 예산 기간 state (나중에 사용자가 선택한 기간으로 업데이트)
    const [budgetPeriod] = useState({
        start: new Date(2026, 0, 1), // 2026년 1월 1일
        end: new Date(2026, 0, 31)    // 2026년 1월 31일
    });

    return (
        <div className="min-h-screen w-full flex flex-col bg-[#121212]">
            {/* 캘린더 섹션 */}
            <section 
                className="w-full bg-gray-70/20 flex-shrink-0"
                onClick={() => setIsDetailOpen(true)}
            >
                <Calendar 
                    budgetStart={budgetPeriod.start}
                    budgetEnd={budgetPeriod.end}
                />   
            </section>

            {/* 카테고리 리스트 섹션 */}
            {isDetailOpen && (
                <section className="w-full flex-1 overflow-y-auto px-4 pb-24 bg-[#1F1F1F]">
                    <CategoryList/>
                </section>
            )}

            {/* 하단 네비게이션 */}
            <div className="fixed bottom-0 left-0 right-0 bg-[#121212] border-t border-white/10 py-4">
                <div className="max-w-md mx-auto w-full flex justify-between items-center px-6">
                    <div className="flex bg-primary-opacity-50 rounded-full p-1 border-white/10">
                        <Button 
                            width={"sm"}
                            borderColor={"outline"}
                            bgColor={"none"}
                            className="flex gap-2 bg-white"
                        >
                            <CalendarIcon />
                            달력
                        </Button>

                        <Button 
                            width={"md"}
                            borderColor={"outline"}
                            bgColor={"none"}
                            className="flex gap-2"
                            fontColor={"white"}
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
        </div>
    );
}

export default CalendarPage;