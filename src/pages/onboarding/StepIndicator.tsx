interface StepIndicatorProps {
  step: number;
}

const StepIndicator = ({ step }: StepIndicatorProps) => {
  return (
    <div className="flex w-full gap-3 px-6 py-8">
      {/* 1단계 선 */}
      <div
        className={`h-[6px] w-[140px] rounded-full transition-colors duration-300 ${
          step === 1 ? "bg-[#A8A6FF]" : "bg-[#333333]"
        }`}
      />
      {/* 2단계 선 */}
      <div
        className={`h-[6px] w-[140px] rounded-full transition-colors duration-300 ${
          step === 2 ? "bg-[#A8A6FF]" : "bg-[#333333]"
        }`}
      />
    </div>
  );
};

export default StepIndicator;
