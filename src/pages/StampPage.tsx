import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Stamp, StampSkeleton } from "@/components";
import {
  BigChevronRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/icons";
import { getStamps } from "@/api/stamp";
import type { StampResponse } from "@/types/stamp";

export const StampPage = () => {
  const navigate = useNavigate();
  const [stampData, setStampData] = useState<StampResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStamps = async (periodId?: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getStamps(periodId);
      setStampData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "스탬프 조회 실패");
      console.error("스탬프 조회 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStamps();
  }, []);

  const handlePrevious = () => {
    if (stampData?.navigation.hasPrevious) {
      fetchStamps(stampData.navigation.previousPeriodId);
    }
  };

  const handleNext = () => {
    if (stampData?.navigation.hasNext) {
      fetchStamps(stampData.navigation.nextPeriodId);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const formatStampLabel = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex flex-col items-center">
          <header className="flex h-9.5 w-full items-center justify-between px-5">
            <button onClick={() => navigate("/main")}>
              <BigChevronRightIcon className="w-6" />
            </button>
            <span className="text-gray-10 text-sub1-size">스탬프</span>
            <span className="h-6 w-6"></span>
          </header>
          <StampSkeleton />
        </main>
      </>
    );
  }

  if (error || !stampData) {
    return (
      <>
        <Header />
        <main className="flex flex-col items-center">
          <header className="flex h-9.5 w-full items-center justify-between px-5">
            <button onClick={() => navigate("/main")}>
              <BigChevronRightIcon className="w-6" />
            </button>
            <span className="text-gray-10 text-sub1-size">스탬프</span>
            <span className="h-6 w-6"></span>
          </header>
          <div className="text-gray-0 mt-20 text-center">
            {error || "데이터를 불러올 수 없습니다"}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col items-center">
        <header className="flex h-9.5 w-full items-center justify-between px-5">
          <button onClick={() => navigate("/main")}>
            <BigChevronRightIcon className="w-6" />
          </button>
          <span className="text-gray-10 text-sub1-size">스탬프</span>
          <span className="h-6 w-6"></span>
        </header>
        <section className="border-primary-60 mt-12 flex min-h-122 w-75 flex-col rounded-[10px] border px-5 pt-6 pb-4">
          <div className="flex flex-col gap-2">
            <span className="text-gray-0 text-xl font-semibold">
              한달 지출 기록 스탬프
            </span>
            <div className="flex items-center gap-2">
              <span className="text-gray-0 text-[11px]">
                <span>{formatDate(stampData.period.startDate)}</span> ~{" "}
                <span>{formatDate(stampData.period.endDate)}</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrevious}
                  disabled={!stampData.navigation.hasPrevious}
                  className="disabled:opacity-30"
                >
                  <ChevronLeftIcon className="w-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={!stampData.navigation.hasNext}
                  className="disabled:opacity-30"
                >
                  <ChevronRightIcon className="w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 w-full border border-gray-50"></div>
          </div>
          <div className="mt-7 grid w-full grid-cols-5 gap-3">
            {stampData.stamps.map((stamp) => (
              <Stamp
                key={stamp.date}
                label={formatStampLabel(stamp.date)}
                isRecorded={stamp.stamped}
              />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
