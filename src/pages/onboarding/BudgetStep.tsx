import { useState, useRef, useEffect } from "react";
import type { ChangeEvent } from "react";
import { Button } from "@/components/common/Button";

interface BudgetStepProps {
  onNext: (amount: number) => void;
}

const BUDGET_OPTIONS = [10, 20, 30, 40, 50, 60, 70];
const ITEM_HEIGHT = 56;

const BudgetStep = ({ onNext }: BudgetStepProps) => {
  const [isInputMode, setIsInputMode] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(40);
  const [customAmount, setCustomAmount] = useState<string>("");
  
  const pickerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // 초기 마운트 시 40만원 위치로 스크롤
  useEffect(() => {
    if (pickerRef.current && isInitialMount.current && !isInputMode) {
      const index = BUDGET_OPTIONS.indexOf(40);
      // 중앙 정렬을 위한 정확한 스크롤 위치 계산
      const scrollPosition = index * ITEM_HEIGHT - (pickerRef.current.clientHeight / 2 - ITEM_HEIGHT / 2);
      pickerRef.current.scrollTop = scrollPosition;
      isInitialMount.current = false;
    }
  }, [isInputMode]);

  const handleScroll = () => {
    if (pickerRef.current) {
      const container = pickerRef.current;
      const containerCenter = container.scrollTop + container.clientHeight / 2;
      // 상단 패딩을 고려한 인덱스 계산
      const index = Math.round((containerCenter - ITEM_HEIGHT / 2) / ITEM_HEIGHT) - 2;
      const clampedIndex = Math.max(0, Math.min(index, BUDGET_OPTIONS.length - 1));
      setSelectedAmount(BUDGET_OPTIONS[clampedIndex]);
    }
  };

  const formatNumber = (num: string) => {
    const value = num.replace(/,/g, "");
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(formatNumber(rawValue));
  };

  const isInputted = customAmount.length > 0;

  return (
    <div className="flex flex-col h-full px-6">
      <h1 className="text-[24px] font-semibold mt-12 text-center">
        {isInputted ? "목표 금액" : "얼마를 목표로 할까요?"}
      </h1>

      <div className="flex-col items-center justify-center py-5">
        {!isInputMode ? (
          <div className="relative h-[280px] flex items-center justify-center">
            {/* 선택 영역 하이라이트 */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[56px] bg-[#363638]/30 rounded-xl pointer-events-none z-10" />
            
            {/* 스크롤 가능한 피커 */}
            <div
              ref={pickerRef}
              onScroll={handleScroll}
              className="overflow-y-scroll h-full w-full snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              {/* 상단 패딩 */}
              <div style={{ height: ITEM_HEIGHT * 2 }} />
              
              {BUDGET_OPTIONS.map((amount) => {
                const isSelected = selectedAmount === amount;
                return (
                  <div
                    key={amount}
                    className="snap-center flex items-center justify-center transition-all duration-200"
                    style={{ height: ITEM_HEIGHT }}
                  >
                    <span
                      className={`text-[18px] transition-all duration-200 ${
                        isSelected 
                          ? "text-white font-semibold scale-110" 
                          : "text-gray-500 scale-100"
                      }`}
                    >
                      {amount}만원
                    </span>
                  </div>
                );
              })}
            
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center">
            <div className="flex items-end text-[32px] font-bold pb-2">
              {!isInputted && <span className="mr-2 text-[#EAEAEA]">₩</span>}
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
            
            <p className="mt-[170px] text-gray-400 text-sm">
              {isInputted ? "맞으면 확인 버튼을 눌러주세요" : "원하는 금액을 입력해 주세요"}
            </p>
          </div>
        )}
      </div>

      <div className="pb-10 mt-10 w-full flex flex-col items-center gap-6">
        {!isInputMode && (
          <button 
            onClick={() => setIsInputMode(true)}
            className="text-gray-400 text-sm underline"
          >
            더 다양한 목표금액을 설정하고 싶어요
          </button>
        )}
        <Button
          width="lg"
          onClick={() => {
            if (!isInputMode) {
              onNext(selectedAmount * 10000);
            } else {
              onNext(Number(customAmount.replace(/,/g, "")));
            }
          }}
          className="w-[285px] h-[63px] px-3 py-2 gap-2 mt-10 rounded-full bg-[#A8A6FF]"
        >
          {isInputMode ? (isInputted ? "확인" : "다음") : "확인"}
        </Button>
      </div>
    </div>
  );
};

export default BudgetStep;