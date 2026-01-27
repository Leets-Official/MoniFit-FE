const BudgetStep = ({ onNext }: { onNext: (val: number) => void }) => {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold mt-10">얼마를 목표로 할까요?</h1>
      <div className="flex-1 flex items-center justify-center text-gray-500">
        [예산 선택 UI 배치 예정]
      </div>
      <button onClick={() => onNext(0)} className="w-full py-4 bg-[#A8A6FF] text-black rounded-xl mb-10">
        확인
      </button>
    </div>
  );
};

export default BudgetStep;