import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/common/calendar/Calendar";
import { Header } from "@/components";
import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon, ReportIcon } from "@/assets/icons";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";
import { useMonthlyCalendar, useDailyCalendar } from "@/api/calendar";

// 날짜 문자열을 로컬 날짜로 안전하게 변환하는 헬퍼 함수
const parseLocalDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
};

export const CalendarPage = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState(new Date());
    
    // 오늘 날짜를 로컬 타임존 기준으로 YYYY-MM-DD 형식으로 변환
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const [selectedDate, setSelectedDate] = useState<string | null>(todayString);

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    const { data: monthlyData, isLoading, refetch: refetchMonthly } = useMonthlyCalendar(year, month);
    const { data: dailyData, refetch } = useDailyCalendar(selectedDate);

    // 🔍 디버깅 코드 추가
    console.log('=== 월별 데이터 디버깅 ===');
    console.log('monthlyData:', monthlyData);
    
    if (monthlyData?.dailySummaries) {
        console.log('dailySummaries 전체:', monthlyData.dailySummaries);
        
        // 12일과 13일 데이터만 필터링
        const feb12 = monthlyData.dailySummaries.find(d => d.date === '2026-02-12');
        const feb13 = monthlyData.dailySummaries.find(d => d.date === '2026-02-13');
        
        console.log('🔴 2월 12일:', feb12);
        console.log('🟢 2월 13일:', feb13);
        
        // parseLocalDate 적용 후 결과
        if (feb12) {
            const parsed12 = parseLocalDate(feb12.date);
            console.log('파싱된 12일:', parsed12, '| withinPeriod:', feb12.withinPeriod);
        }
        if (feb13) {
            const parsed13 = parseLocalDate(feb13.date);
            console.log('파싱된 13일:', parsed13, '| withinPeriod:', feb13.withinPeriod);
        }
    }

    const handleRefreshAll = async () => {
        await refetch();
        await refetchMonthly();
    };
    
    const handleDateClick = (date: Date) => {
        // 타임존 문제 방지: 로컬 날짜를 YYYY-MM-DD 형식으로 변환
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        setSelectedDate(`${year}-${month}-${day}`);
    };

    return (
        <div className="h-screen w-full flex flex-col">
            <Header />
            {/* 캘린더 섹션 */}
            <section className="w-[375px] h-[295px] bg-gray-70/20 flex-shrink-0">
                <header />
                {isLoading ? (
                    <div className="h-[400px] flex items-center justify-center text-white">
                        로딩 중...
                    </div>
                ) : (
                    <Calendar 
                        budgetStart={monthlyData?.period?.startDate ? parseLocalDate(monthlyData.period.startDate) : undefined}
                        budgetEnd={monthlyData?.period?.endDate ? parseLocalDate(monthlyData.period.endDate) : undefined}
                        dailyAmounts={monthlyData?.dailySummaries?.map(d => ({
                            date: parseLocalDate(d.date),
                            amount: d.totalAmount,
                            withinPeriod: d.withinPeriod
                        }))}
                        onDateClick={handleDateClick}
                        onMonthChange={setCurrentDate}
                        currentDate={currentDate}
                        selectedDate={selectedDate}
                    />
                )}   
            </section>

            {/* 카테고리 리스트 섹션 - 항상 표시 */}
            <section className="w-full flex-1 overflow-y-auto min-h-0 bg-[#1F1F1F] pt-4">
                <CategoryList
                    categories={dailyData?.categories}
                    spentDate={selectedDate || undefined}
                    onRefresh={handleRefreshAll}
                />
            </section>

            {/* 하단 네비게이션 */}
            <div className="w-full flex-shrink-0 bg-[#1F1F1F] py-4">
                <div className="max-w-md mx-auto w-full flex justify-between items-center px-6">
                    <div className="flex bg-primary-opacity-50 rounded-full gap-3 border-white/10">
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
                            onClick={() => navigate('/report')}
                        >
                            <ReportIcon />
                            리포트
                        </Button>
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate('/main')}>
                        <HomeIcon className="w-[52px] h-[52px]" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CalendarPage;