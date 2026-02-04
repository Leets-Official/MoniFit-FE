import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import MyPageTopBar from "./_components/MyPageTopBar";
import BudgetProgressCard from "@/components/BudgetProgressCard/BudgetProgressCard";
import HomeIcon from "@/assets/icons/general/home.svg";
import { CommonCard } from "@/components";
import { AvartarIcon, ChevronRightIcon } from "@/assets/icons";

type CurrentRecord = {
  startDate: string;
  endDate: string;
  targetBudget: number;
  spentAmount: number;
};

function EmptySmallCard({ message }: { message: string }) {
  return (
    <CommonCard className="h-33 px-5 py-5">
      <div className="flex h-full items-center justify-center">
        <p className="text-body2 text-gray-50">{message}</p>
      </div>
    </CommonCard>
  );
}

function SummaryCard({ saved, over }: { saved: number; over: number }) {
  return (
    <CommonCard title="예산 관리 기록 요약" className="h-33 px-5 py-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[15px] font-semibold">
            <span className="text-primary-50">절약</span>
            <span className="text-gray-10">한 기간</span>
          </p>
          <p className="mt-1 text-[15px] font-semibold text-gray-10">{saved}회</p>
        </div>

        <div className="text-right">
          <p className="text-[15px] font-semibold">
            <span className="text-primary-50">초과</span>
            <span className="text-gray-10">한 기간</span>
          </p>
          <p className="mt-1 text-[15px] font-semibold text-gray-10">{over}회</p>
        </div>
      </div>
    </CommonCard>
  );
}

function addDays(d: Date, days: number) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + days);
  return nd;
}

function formatYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export default function MyPageMainPage() {
  const navigate = useNavigate();

const currentRecord: CurrentRecord | null = useMemo(() => null, []);


  const summary: { saved: number; over: number } | null = useMemo(() => ({ saved: 6, over: 4 }), []);

  const user = {
    name: "길동",
    email: "gachonLeets@kakao.com",
    used: "2년 6개월",
    startText: "2026.01.26 시작",
  };

  const emptyPeriod = useMemo(() => {
    const start = new Date();
    const end = addDays(start, 29);
    return { startDate: formatYMD(start), endDate: formatYMD(end) };
  }, []);

  const progressProps: CurrentRecord = useMemo(() => {
    if (currentRecord) return currentRecord;
    return {
      startDate: emptyPeriod.startDate,
      endDate: emptyPeriod.endDate,
      targetBudget: 0,
      spentAmount: 0,
    };
  }, [currentRecord, emptyPeriod.endDate, emptyPeriod.startDate]);

  return (
    <main className="flex h-full w-full flex-col">
      <MyPageTopBar />

      <section className="mt-1 px-4">
        <div className="flex items-center gap-3">
          <div className="flex h-13 w-13 items-center justify-center rounded-full">
            <AvartarIcon />
          </div>

          <button
            type="button"
            className="flex flex-1 items-center justify-between"
            onClick={() => navigate("/mypage/profile")}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-1">
                <span className="text-sub1 text-gray-10">{user.name}</span>
                <ChevronRightIcon className="h-4 w-4" />
              </div>
              <span className="text-caption2 text-gray-50">{user.email}</span>
            </div>
          </button>
        </div>
      </section>

      <div className="mt-6 h-px w-[calc(100%+32px)] -ml-4 bg-gray-50" />

      <section className="mt-6 px-4">
        <p className="text-sub2 text-gray-10">
          {user.name}님은
          <br />
          <span className="text-primary-50">모니핏</span>을 {user.used} 사용했어요
        </p>
        <p className="mt-2 text-caption2 text-gray-60">{user.startText}</p>
      </section>

      <section className="mt-6 flex flex-col items-center gap-5 px-4">
        <BudgetProgressCard
          title="현재 진행 중인 지출 기록"
          startDate={progressProps.startDate}
          endDate={progressProps.endDate}
          targetBudget={progressProps.targetBudget}
          spentAmount={progressProps.spentAmount}
        />

        {summary ? <SummaryCard saved={summary.saved} over={summary.over} /> : <EmptySmallCard message="완료한 지출 기록이 없습니다" />}
      </section>

      <div className="mt-auto w-full">
        <div className="mt-6 h-px w-[calc(100%+32px)] -ml-4 bg-gray-50" />

        <div className="flex items-center justify-between px-4 py-5">
          <button
            type="button"
            className="text-[13px] font-semibold text-gray-50 underline decoration-1 underline-offset-4"
            onClick={() => navigate("/mypage/notice")}
          >
            모니핏 참고사항
          </button>

          <button type="button" onClick={() => navigate("/")}>
            <img src={HomeIcon} alt="home" className="h-12 w-12" />
          </button>
        </div>
      </div>
    </main>
  );
}
