import { Button } from "@/components/common/Button";
import { Calendar } from "@/components/common/calendar/Calendar";

interface PeriodStepProps {
  onNext: () => void;
  isFirstLogin?: boolean; // 최초 로그인 여부 판단
}

const PeriodStep = ({ onNext, isFirstLogin = true }: PeriodStepProps) => {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 items-center justify-center text-center">
        {/* 최초 로그인일 때만 환영 문구 표시 */}
        {isFirstLogin && (
          <p className="text-[24px] font-semibold text-[#EAEAEA]">
            <span className="text-[#6E76AD]">모니핏</span>에 온 걸 환영해요!
          </p>
        )}
        <h1 className="text-[20px] leading-snug font-semibold text-[#EAEAEA]">
          오늘부터 30일 동안
          <br />
          예산을 관리해볼까요?
        </h1>
        <div className="mt-15">
          <Calendar isRangeMode={true} />
        </div>
      </div>
      <div className="flex items-center justify-center text-[14px] text-[#9FA0A0]">
        <p>기간은 오늘 날짜부터 1개월로 자동 설정됩니다.</p>
      </div>
      <div className="mt-[45px] flex w-full justify-center">
        <Button
          width={"lg"}
          onClick={onNext}
          className="h-[63px] w-[285px] gap-2 rounded-full bg-[#A8A6FF] px-3 py-2"
        >
          다음
        </Button>
      </div>
    </div>
  );
};

export default PeriodStep;
