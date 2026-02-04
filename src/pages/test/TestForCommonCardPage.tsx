import { CommonCard } from "@/components";

export default function CommonCardTestPage() {
  return (
    <div className="bg-surface-background min-h-screen p-6">
      <div className="mx-auto flex max-w-90 flex-col items-center gap-6">
        {/* 1) Empty State 카드 */}
        <CommonCard className="flex h-36.5 items-center justify-center">
          <p className="text-sub1-size font-medium text-gray-50">
            현재 진행 중인 지출 기록이 없습니다
          </p>
        </CommonCard>

        {/* 2) 예산 관리 기록 요약 카드 */}
        <CommonCard
          title="예산 관리 기록 요약"
          titleClassName="text-[18px] text-gray-10"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[15px] font-semibold">
                <span className="text-primary-50">절약</span>
                <span className="text-gray-10">한 기간</span>
              </p>

              <p className="text-gray-10 mt-1 text-[15px] font-semibold">6회</p>
            </div>

            <div className="text-right">
              <p className="text-[15px] font-semibold">
                <span className="text-primary-50">초과</span>
                <span className="text-gray-10">한 기간</span>
              </p>

              <p className="text-gray-10 mt-1 text-[15px] font-semibold">4회</p>
            </div>
          </div>
        </CommonCard>

        {/* 높이 조절 예시 */}
        <CommonCard
          title="높이 조절 예시"
          className="h-50"
          titleClassName="text-[18px] text-gray-10"
        >
          <p className="text-[15px] font-medium text-gray-50">
            className에 h-[200px] 같은 값으로 높이를 자유롭게 조절할 수 있어요.
          </p>
        </CommonCard>
      </div>
    </div>
  );
}
