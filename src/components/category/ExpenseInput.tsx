import { useState } from "react";

interface ExpenseInputProps {
  onCancel: () => void;
  onAdd: (amount: number) => void;
}

const ExpenseInput = ({ onCancel, onAdd }: ExpenseInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const handleAddClick = () => {
    const numericAmount = Number(inputValue.replace(/[^0-9]/g, "")); // 숫자 이외의 문자 제거
    if (numericAmount > 0) {
      onAdd(numericAmount);
      setInputValue("");
    }
  };
  return (
    <div className="flex items-center justify-between gap-2">
      {/* 입력 영역 */}
      <div className="flex h-[23px] w-[128px] items-center justify-between rounded-[4px] border-[0.7px] border-white/30 bg-transparent px-[11px]">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          autoFocus
          className="text-gray-10 w-full bg-transparent text-[8px] font-semibold outline-none"
          placeholder="금액을 입력하세요"
        />
        <span className="text-gray-30 ml-1 text-[8px] font-semibold">원</span>
      </div>

      {/* 버튼 영역 */}
      <div className="text-gray-10 flex gap-3 text-[12px] font-medium whitespace-nowrap">
        <button onClick={onCancel} className="hover:text-gray-200">
          취소
        </button>
        <button onClick={handleAddClick} className="hover:text-white">
          추가
        </button>
      </div>
    </div>
  );
};

export default ExpenseInput;
