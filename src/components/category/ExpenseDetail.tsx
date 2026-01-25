import { useState } from "react";
import ExpenseInput from "./ExpenseInput";
import type { ExpenseItem } from "./types";

interface ExpenseDetailProps {
    initialitems?: ExpenseItem[];
}

const ExpenseDetail = ({ initialitems }: ExpenseDetailProps) => {
  const [items, setItems] = useState<ExpenseItem[]>(initialitems || []); 
  const [isAdding, setIsAdding] = useState(false);

  const handleAddItem = (amount: number) => {
    const newItem: ExpenseItem = {
      id: Date.now().toString(), // 간단한 ID 생성 로직
      amount,
    };
    setItems([...items, newItem]); // 새로운 항목 추가
    setIsAdding(false); // 입력창 닫기
  };

  return (
    <div className="flex flex-col gap-4 pb-6 mt-2">
      {/* 1. 저장된 금액 리스트 */}
      {items?.map((item) => (
        <div key={item.id} className="flex justify-between items-center text-gray-10">
          <span className="text-[14px] font-medium">{item.amount.toLocaleString()}원</span>
          <div className="flex gap-3 text-[12px]">
            <button className="hover:text-white">수정</button>
            <button className="hover:text-white">삭제</button>
          </div>
        </div>
      ))}

      {/* 2. 금액 추가하기 버튼 (디자인에 따라 조건부 노출) */}
      {!isAdding ? (
        <div className="flex justify-center">
          <button 
            onClick={() => setIsAdding(true)} 
            className="text-gray-10 text-[15px] hover:text-white w-fit"
          >
            + 금액 추가하기
          </button>
        </div>
      ) : (
        <div className="mt-2">
          {/* 3. 입력창 영역 */}
          <ExpenseInput onCancel={() => setIsAdding(false)} onAdd={handleAddItem}/>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;