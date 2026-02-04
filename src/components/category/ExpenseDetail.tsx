import { useState } from "react";
import ExpenseInput from "./ExpenseInput";
import type { ExpenseItem } from "./types";

interface ExpenseDetailProps {
  items: ExpenseItem[];
  onAddItem?: (amount: number) => void;
  onDeleteItem?: (id: string) => void;
  onUpdateItem?: (id: string, newAmount: number) => void;
}

const ExpenseDetail = ({
  items,
  onAddItem,
  onDeleteItem,
  onUpdateItem,
}: ExpenseDetailProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);

  const handleAddItem = (amount: number) => {
    onAddItem?.(amount);
    setIsAdding(false);
  };

  return (
    <div className="mt-2 flex flex-col gap-4 pb-6">
      {/* 1. 저장된 금액 리스트 */}
      {items?.map((item) => (
        <div key={item.id}>
          {isEditingId === item.id ? (
            /* 수정 모드 */
            <ExpenseInput
              onCancel={() => setIsEditingId(null)}
              onAdd={(amount) => {
                onUpdateItem?.(item.id, amount);
                setIsEditingId(null);
              }}
            />
          ) : (
            /* 일반 모드 */
            <div className="text-gray-10 flex items-center justify-between">
              <span className="text-[14px] font-medium">
                {item.amount.toLocaleString()}원
              </span>
              <div className="flex gap-3 text-[12px]">
                <button
                  onClick={() => setIsEditingId(item.id)}
                  className="text-gray-400 hover:text-white"
                >
                  수정
                </button>
                <button
                  onClick={() => onDeleteItem?.(item.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  삭제
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* 2. 금액 추가하기 버튼 영역 */}
      {!isAdding ? (
        <div className="mt-2 flex justify-center">
          <button
            onClick={() => setIsAdding(true)}
            className="text-gray-10 w-fit px-4 py-2 text-[15px] hover:text-white"
          >
            + 금액 추가하기
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <ExpenseInput
            onCancel={() => setIsAdding(false)}
            onAdd={handleAddItem}
          />
        </div>
      )}
    </div>
  );
};
export default ExpenseDetail;
