import { useState } from "react";
import ExpenseInput from "./ExpenseInput";

const ExpenseDetail = () => {
  // 입력 모드인지 확인
  const [isAdding, setIsAdding] = useState(false);
  // 더미 데이터
  const dummyItems = [
    { id: '1', amount: '12,000원' },
    { id: '2', amount: '20,000원' },
  ];

  return (
    <div className="flex flex-col gap-4 pb-6 mt-2">
      {/* 1. 저장된 금액 리스트 */}
      {dummyItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center text-gray-10">
          <span className="text-[14px] font-medium">{item.amount}</span>
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
          <ExpenseInput onCancel={() => setIsAdding(false)} />
        </div>
      )}
    </div>
  );
};

export default ExpenseDetail;