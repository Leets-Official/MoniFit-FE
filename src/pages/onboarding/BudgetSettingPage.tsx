import { useState } from "react";
import StepIndicator from "./StepIndicator";
import PeriodStep from "./PeriodStep"; 
import BudgetStep from "./BudgetStep";
import { useNavigate } from "react-router-dom";

const BudgetSettingPage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const handleFinalSubmit = (amount: number) => {
    console.log("최종 설정 금액:", amount);
    navigate("/");
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* 1. 상단 헤더 영역 */}
      <header>
        <StepIndicator step={step} />
      </header>

      {/* 2. 단계별 컨텐츠 영역 */}
      <main className="flex-1 flex flex-col">
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