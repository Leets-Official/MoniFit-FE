import { useState } from "react";
import { Calendar } from "@/components/common/calendar/Calendar";
import { Header } from "@/components";
import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon, ReportIcon } from "@/assets/icons";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";
import { useMonthlyCalendar, useDailyCalendar } from "@/api/calendar";

export const CalendarPage = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    
    const [budgetPeriod] = useState({
        start: new Date(2026, 0, 1),
        end: new Date(2026, 0, 31)
    });

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const { data: monthlyData, isLoading } = useMonthlyCalendar(year, month);
    const { data: dailyData } = useDailyCalendar(selectedDate);

    const handleDateClick = (date: Date) => {
        setSelectedDate(date.toISOString().split('T')[0]);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <Header />
            {/* 캘린더 섹션 */}
            <section className="w-full bg-gray-70/20 flex-shrink-0">
            <header />
                {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center text-white">
                        로딩 중...
                    </div>
                ) : (
                    <Calendar 
                        budgetStart={budgetPeriod.start}
                        budgetEnd={budgetPeriod.end}
                        dailySummaries={monthlyData?.dailySummaries.map(d => ({
                            date: new Date(d.date),
                            amount: d.totalAmount,
                            withinPeriod: d.withinPeriod
                        }))}
                        onDateClick={handleDateClick}
                        onMonthChange={setCurrentDate}
                        currentDate={currentDate}
                    />
                )}   
            </section>

            {/* 카테고리 리스트 섹션 - 항상 표시 */}
            <section className="w-full flex-1 overflow-y-auto px-4 min-h-0 bg-[#1F1F1F]">
                <CategoryList categories={dailyData?.categories} />
            </section>

            {/* 하단 네비게이션 */}
            <div className="w-full flex-shrink-0 bg-[#1F1F1F] py-4">
                <div className="max-w-md mx-auto w-full flex justify-between items-center px-6">
                    <div className="flex bg-primary-opacity-50 rounded-full p-1 border-white/10">
                        <Button 
                            borderColor={"outline"}
                            bgColor={"none"}
                            className="flex w-[108px] h-[52px] gap-2 bg-white"
                        >
                            <CalendarIcon />
                            달력
                        </Button>
                        <Button 
                            borderColor={"outline"}
                            bgColor={"none"}
                            className="flex gap-2 w-[122px] h-[52px]"
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