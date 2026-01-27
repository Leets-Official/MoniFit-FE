import { useState } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/common/Button";

interface BudgetStepProps {
  onNext: (amount: number) => void;
}

const BudgetStep = ({ onNext }: BudgetStepProps) => {
  const [customAmount, setCustomAmount] = useState<string>("");

  // 천 단위 콤마 포맷팅 함수
  const formatNumber = (num: string) => {
    const value = num.replace(/,/g, "");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(formatNumber(rawValue));
  };

  // 금액 입력 여부에 따른 상태 분기
  const isInputted = customAmount.length > 0;

  return (
    <div className="flex flex-col h-full px-6 text-white">
      {/* 타이틀: 입력 전후에 따라 문구 변경 */}
      <h1 className="text-[20px] font-semibold mt-12 mb-20 text-center">
        {isInputted ? "목표 금액" : "얼마를 목표로 할까요?"}
      </h1>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full flex flex-col items-center">
          <div className="flex items-end text-[32px] font-bold pb-2 border-b-2 border-[#A8A6FF]">
            {/* 입력 전에는 ₩ 기호 표시, 입력 후에는 뒤에 '원' 표시 */}
            {!isInputted && <span className="mr-2 text-[#A8A6FF]">₩</span>}
            <input
              type="text"
              placeholder="0"
              value={customAmount}
              onChange={handleInputChange}
              className="bg-transparent outline-none w-48 text-center"
              autoFocus
            />
            {isInputted && <span className="ml-1 text-[24px]">원</span>}
          </div>
          
          {/* 하단 안내 문구 변경 */}
          <p className="mt-10 text-gray-400 text-sm">
            {isInputted ? "맞으면 확인 버튼을 눌러주세요" : "원하는 금액을 입력해 주세요"}
          </p>
        </div>
      </div>

      {/* 하단 버튼: 입력 전에는 '다음', 입력 후에는 '확인'으로 변경 */}
      <div className="mb-10 w-full">
        <Button
          width="lg"
          onClick={() => onNext(Number(customAmount.replace(/,/g, "")))}
          disabled={!isInputted} // 미입력 시 비활성화 가능
        >
          {isInputted ? "확인" : "다음"}
        </Button>
      </div>
    </div>
  );
};

export default BudgetStep;