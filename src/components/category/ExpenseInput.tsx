import { useState } from "react";

interface ExpenseInputProps {
  initialValue?: number; // 추가
  onCancel: () => void;
  onAdd: (amount: number) => Promise<void>;
  isLoading?: boolean; // 추가
}

const ExpenseInput = ({ 
  initialValue, 
  onCancel, 
  onAdd,
  isLoading = false,
}: ExpenseInputProps) => {
  const [inputValue, setInputValue] = useState(
    initialValue ? initialValue.toString() : ""
  );

  const handleAddClick = async () => {
    const numericAmount = Number(inputValue.replace(/[^0-9]/g, ""));
    if (numericAmount > 0) {
      await onAdd(numericAmount);
    } else {
      alert("금액을 입력해주세요.");
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
          disabled={isLoading}
          className="text-gray-10 w-full bg-transparent text-[8px] font-semibold outline-none disabled:opacity-50"
          placeholder="금액을 입력하세요"
        />
        <span className="text-gray-30 ml-1 text-[8px] font-semibold">원</span>
      </div>

      {/* 버튼 영역 */}
      <div className="text-gray-10 flex gap-3 text-[12px] font-medium whitespace-nowrap">
        <button 
          onClick={onCancel} 
          className="hover:text-gray-200 disabled:opacity-50"
          disabled={isLoading}
        >
          취소
        </button>
        <button 
          onClick={handleAddClick} 
          className="hover:text-white disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "처리중..." : initialValue ? "수정" : "추가"}
        </button>
      </div>
    </div>
  );
};

export default ExpenseInput;