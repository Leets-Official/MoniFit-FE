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
      const scrollPosition =
        index * ITEM_HEIGHT -
        (pickerRef.current.clientHeight / 2 - ITEM_HEIGHT / 2);
      pickerRef.current.scrollTop = scrollPosition;
      isInitialMount.current = false;
    }
  }, [isInputMode]);

  const handleScroll = () => {
    if (pickerRef.current) {
      const container = pickerRef.current;
      const containerCenter = container.scrollTop + container.clientHeight / 2;
      // 상단 패딩을 고려한 인덱스 계산
      const index =
        Math.round((containerCenter - ITEM_HEIGHT / 2) / ITEM_HEIGHT) - 2;
      const clampedIndex = Math.max(
        0,
        Math.min(index, BUDGET_OPTIONS.length - 1),
      );
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
    <div className="flex h-full flex-col px-6">
      <h1 className="mt-12 text-center text-[24px] font-semibold">
        {isInputted ? "목표 금액" : "얼마를 목표로 할까요?"}
      </h1>

      <div className="flex-col items-center justify-center py-5">
        {!isInputMode ? (
          <div className="relative flex h-[280px] items-center justify-center">
            {/* 선택 영역 하이라이트 */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 z-10 h-[56px] w-[250px] -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-[#363638]/30" />

            {/* 스크롤 가능한 피커 */}
            <div
              ref={pickerRef}
              onScroll={handleScroll}
              className="h-full w-full snap-y snap-mandatory overflow-y-scroll [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* 상단 패딩 */}
              <div style={{ height: ITEM_HEIGHT * 2 }} />

              {BUDGET_OPTIONS.map((amount) => {
                const isSelected = selectedAmount === amount;
                return (
                  <div
                    key={amount}
                    className="flex snap-center items-center justify-center transition-all duration-200"
                    style={{ height: ITEM_HEIGHT }}
                  >
                    <span
                      className={`text-[18px] transition-all duration-200 ${
                        isSelected
                          ? "scale-110 font-semibold text-white"
                          : "scale-100 text-gray-500"
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
          <div className="flex w-full flex-col items-center">
            <div className="flex items-end pb-2 text-[32px] font-bold">
              {!isInputted && <span className="mr-2 text-[#EAEAEA]">₩</span>}
              <input
                type="text"
                placeholder="0"
                value={customAmount}
                onChange={handleInputChange}
                className="w-48 bg-transparent text-center outline-none"
                autoFocus
              />
              {isInputted && <span className="ml-1 text-[24px]">원</span>}
            </div>

            <p className="mt-[170px] text-sm text-gray-400">
              {isInputted
                ? "맞으면 확인 버튼을 눌러주세요"
                : "원하는 금액을 입력해 주세요"}
            </p>
          </div>
        )}
      </div>

      <div className="mt-10 flex w-full flex-col items-center gap-6 pb-10">
        {!isInputMode && (
          <button
            onClick={() => setIsInputMode(true)}
            className="text-sm text-gray-400 underline"
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
          className="mt-10 h-[63px] w-[285px] gap-2 rounded-full bg-[#A8A6FF] px-3 py-2"
        >
          {isInputMode ? (isInputted ? "확인" : "다음") : "확인"}
        </Button>
      </div>
    </div>
  );
};

export default BudgetStep;
