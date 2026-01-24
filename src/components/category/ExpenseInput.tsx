const ExpenseInput = () => {
  return (
    <div className="flex items-center justify-between gap-2">
      {/* 입력 영역 */}
      <div className="flex items-center justify-between w-[128px] h-[23px] px-[11px] bg-transparent border-[0.7px] border-white/30 rounded-[4px]">
        <input 
          type="text"
          className="bg-transparent outline-none text-[8px] font-semibold text-gray-10 w-full"
          placeholder="금액을 입력하세요"
        />
        <span className="text-[8px] font-semibold text-gray-30 ml-1">
          원
        </span>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3 text-[12px] font-medium whitespace-nowrap text-gray-10">
        <button className="hover:text-gray-200">취소</button>
        <button>추가</button>
      </div>
    </div>
  );
};

export default ExpenseInput;