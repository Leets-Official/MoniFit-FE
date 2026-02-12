import { useState } from "react";
import ExpenseInput from "./ExpenseInput";
import type { ExpenseItem } from "./types";
import { createExpense, updateExpense, deleteExpense } from "@/api/expense";

interface ExpenseDetailProps {
  items: ExpenseItem[];
  category: string;
  spentDate: string;
  onItemsChange?: () => void;
}

const ExpenseDetail = ({
  items,
  category,
  spentDate,
  onItemsChange,
}: ExpenseDetailProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddItem = async (amount: number): Promise<void> => {
    const requestData = {
      category,
      amount,
      spentDate,
    };
    
    try {
      setIsLoading(true);
      const result = await createExpense(requestData);
      console.log("지출 추가 성공:", result);
      setIsAdding(false);
      onItemsChange?.();
    } catch (error) {
      console.error("지출 추가 실패:", error);
      alert(error instanceof Error ? error.message : "지출 추가에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async (id: string, newAmount: number): Promise<void> => {
    console.log("지출 수정 요청:", { id, newAmount });
    
    try {
      setIsLoading(true);
      const result = await updateExpense(id, newAmount);
      console.log("지출 수정 성공:", result);
      setIsEditingId(null);
      onItemsChange?.();
    } catch (error) {
      console.error("지출 수정 실패:", error);
      alert(error instanceof Error ? error.message : "지출 수정에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteItem = async (id: string): Promise<void> => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    console.log("지출 삭제 요청:", { id });
    
    try {
      setIsLoading(true);
      await deleteExpense(id);
      console.log("지출 삭제 성공");
      onItemsChange?.();
    } catch (error) {
      console.error("지출 삭제 실패:", error);
      alert(error instanceof Error ? error.message : "지출 삭제에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-2 flex flex-col gap-4 pb-6">
      {/* 1. 저장된 금액 리스트 */}
      {items?.map((item) => (
        <div key={item.id}>
          {isEditingId === item.id ? (
            /* 수정 모드 */
            <ExpenseInput
              initialValue={item.amount}
              onCancel={() => setIsEditingId(null)}
              onAdd={(amount) => handleUpdateItem(item.id, amount)}
              isLoading={isLoading}
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
                  className="text-gray-400 hover:text-white disabled:opacity-50"
                  disabled={isLoading}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="text-gray-400 hover:text-red-400 disabled:opacity-50"
                  disabled={isLoading}
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
            className="text-gray-10 w-fit px-4 py-2 text-[15px] hover:text-white disabled:opacity-50"
            disabled={isLoading}
          >
            + 금액 추가하기
          </button>
        </div>
      ) : (
        <div className="mt-2">
          <ExpenseInput
            onCancel={() => setIsAdding(false)}
            onAdd={handleAddItem}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;