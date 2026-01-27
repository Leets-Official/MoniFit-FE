import { Button } from "@/components/common/Button";

const PeriodStep = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mt-10">
        오늘부터 30일 동안<br />
        예산을 관리해볼까요?
      </h1>
      <div className="flex-1 flex items-center justify-center text-gray-500">
        [달력 컴포넌트 배치 예정]
      </div>
      <Button width={"lg"} onClick={onNext} className="mb-10">
        다음
        </Button>
    </div>
  );
};

export default PeriodStep;