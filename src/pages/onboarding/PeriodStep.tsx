import { Button } from "@/components/common/Button";
import { Calendar } from "@/components/common/calendar/Calendar";

interface PeriodStepProps {
  onNext: () => void;
  isFirstLogin?: boolean;
}

const PeriodStep = ({ onNext, isFirstLogin = true }: PeriodStepProps) => {

  return (
    <div className="flex flex-col h-full">
      <div className="mb-8 items-center justify-center text-center">
        {isFirstLogin && (
          <p className="text-[#EAEAEA] text-[24px] font-semibold">
            <span className="text-[#6E76AD]">모니핏</span>에 온 걸 환영해요!
          </p>
        )}
        <h1 className="text-[#EAEAEA] font-semibold leading-snug text-[20px]">
          오늘부터 30일 동안<br />
          예산을 관리해볼까요?
        </h1>
        <div className="mt-15">
          <Calendar isRangeMode={true} />
        </div>
      </div>
      <div className="flex items-center justify-center text-[#9FA0A0] text-[14px]">
        <p>기간은 오늘 날짜부터 1개월로 자동 설정됩니다.</p>
      </div>
      <div className="mt-[45px] w-full flex justify-center">
        <Button 
          width={"lg"} 
          onClick={() => onNext()}  // 파라미터 없이 호출
          className="w-[285px] h-[63px] px-3 py-2 gap-2 rounded-full bg-[#A8A6FF]"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PeriodStep;