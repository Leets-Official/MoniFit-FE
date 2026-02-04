import { useState } from "react";
import { Calendar } from "@/components/common/calendar/Calendar";
import CategoryList from "@/components/category/CategoryList";
import { Button } from "@/components/common/Button";
import { HomeIcon, ReportIcon } from "@/assets/icons";
import { CalendarIcon } from "@/assets/icons/general/CalendarIcon";

interface CalendarPageProps {
  onClose?: () => void;
}

export const CalendarPage = ({ onClose }: CalendarPageProps) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  return (
    <div className="relative z-50 flex h-screen w-full flex-col items-center bg-transparent pt-[80px]">
      <section
        className="h-[812px] w-[375px] flex-shrink-0 bg-[#3A3A3C]"
        onClick={() => setIsDetailOpen(true)}
      >
        <Calendar />
      </section>

      {isDetailOpen && (
        <section className="h-[252px] w-[375px] flex-1 overflow-y-auto bg-[#121212] px-4 pb-20">
          <CategoryList />
        </section>
      )}

      <div className="fixed bottom-8 flex w-[375px] items-center justify-between px-6">
        <div className="bg-primary-opacity-50 flex rounded-full border-white/10 p-1">
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
        <div
          className="cursor-pointer"
          onClick={() => {
            onClose?.();
          }}
        >
          <HomeIcon className="h-[52px] w-[52px]" />
        </div>
      </div>
    </div>
  );
};
export default CalendarPage;
