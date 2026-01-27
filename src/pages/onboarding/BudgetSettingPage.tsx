import { useState } from "react";
import StepIndicator from "./StepIndicator";
import PeriodStep from "./PeriodStep"; 
import BudgetStep from "./BudgetStep";

const BudgetSettingPage = () => {
  const [step, setStep] = useState(1);

  const handleFinalSubmit = (amount: number) => {
    console.log("최종 설정 금액:", amount);
    // 이후 메인 페이지로 이동하는 로직 추가
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* 1. 상단 헤더 영역 */}
      <header className="pt-6 px-6">
        <StepIndicator step={step} />
      </header>

      {/* 2. 단계별 컨텐츠 영역 */}
      <main className="flex-1 flex flex-col px-6">
        {step === 1 ? (
          <PeriodStep onNext={() => setStep(2)} />
        ) : (
          <BudgetStep onNext={handleFinalSubmit} />
        )}
      </main>
    </div>
  );
};

export default BudgetSettingPage;