import { Button } from "@/components/common/Button";
import { Calendar } from "@/components/common/calendar/Calendar";

interface PeriodStepProps {
  onNext: () => void;
  isFirstLogin?: boolean; // 최초 로그인 여부 판단
}

const PeriodStep = ({ onNext, isFirstLogin = true }: PeriodStepProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className=" mb-8 items-center justify-center text-center">
        {/* 최초 로그인일 때만 환영 문구 표시 */}
        {isFirstLogin && (
          <p className="text-[#EAEAEA] text-[24px] font-semibold"><span className="text-[#6E76AD]">모니핏</span>에 온 걸 환영해요!</p>
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
      <div className="py-10 items-center justify-center text-center">
      <Button width={"lg"} onClick={onNext} className="mb-10">
        다음
        </Button>
        </div>
    </div>
  );
};

export default PeriodStep;