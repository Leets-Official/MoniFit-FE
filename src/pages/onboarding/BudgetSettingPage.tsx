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

  // 기간 선택 완료 시
  const handlePeriodNext = (selectedDate: string) => {
    setStartDate(selectedDate);
    setStep(2);
  };

  // 최종 제출
  const handleFinalSubmit = async (amount: number) => {
    try {
      // API 호출
      const result = await createBudgetPeriod(startDate, amount);
      
      console.log("예산 생성 성공:", result);
      alert("예산이 성공적으로 등록되었습니다!");
      
      // 홈으로 이동
      navigate("/");
    } catch (error) {
      console.error("예산 생성 실패:", error);
      alert("예산 등록에 실패했습니다. 다시 시도해주세요.");
    }
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
          <PeriodStep onNext={handlePeriodNext} />
        ) : (
          <BudgetStep onNext={handleFinalSubmit} />
        )}
      </main>
    </div>
  );
};

export default BudgetSettingPage;