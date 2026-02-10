import { useState } from "react";
import StepIndicator from "./StepIndicator";
import PeriodStep from "./PeriodStep"; 
import BudgetStep from "./BudgetStep";
import { useNavigate } from "react-router-dom";
import { createBudgetPeriod } from "@/api/budgetPeriod";

const BudgetSettingPage = () => {
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<string>("");
  const navigate = useNavigate();

  const handlePeriodNext = (selectedDate: string) => {
    setStartDate(selectedDate);
    setStep(2);
  };

  const handleFinalSubmit = async (amount: number) => {
    try {
      const result = await createBudgetPeriod(startDate, amount);
      
      console.log("예산 생성 성공:", result);
      alert("예산이 성공적으로 등록되었습니다!");
      
      // 메인 화면으로 이동
      navigate("/");
    } catch (error) {
      console.error("예산 생성 실패:", error);
      alert("예산 등록에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      <header>
        <StepIndicator step={step} />
      </header>

      <main className="flex-1 flex flex-col">
        {step === 1 ? (
          <PeriodStep onNext={handlePeriodNext} />
        ) : (
          <BudgetStep onNext={handleFinalSubmit} />
        )}
      </main>
    </div>
  );
};

export default BudgetSettingPage;