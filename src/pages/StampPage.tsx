import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Header, Stamp } from "@/components";
import {
  BigChevronRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@/assets/icons";

export const StampPage = () => {
  const navigate = useNavigate();
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
                <span>2026.06.12</span> ~ <span>2026.07.11</span>
              </span>
              <div className="flex items-center gap-1">
                <button>
                  <ChevronLeftIcon className="w-4" />
                </button>
                <button>
                  <ChevronRightIcon className="w-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 w-full border border-gray-50"></div>
          </div>
          <div className="mt-7 grid w-full grid-cols-5 gap-3">
            {useMemo(() => {
              const START = new Date(2026, 5, 12);
              const TOTAL = 30;

              const recordedIndexSet = new Set([
                0, 1, 2, 5, 6, 10, 11, 15, 18, 22, 23, 27, 30,
              ]);

              return Array.from({ length: TOTAL }, (_, i) => {
                const d = new Date(START);
                d.setDate(d.getDate() + i);

                const yy = String(d.getFullYear()).slice(2);
                const mm = String(d.getMonth() + 1).padStart(2, "0");
                const dd = String(d.getDate()).padStart(2, "0");

                return {
                  id: `${yy}/${mm}/${dd}`,
                  label: `${yy}/${mm}/${dd}`,
                  isRecorded: recordedIndexSet.has(i),
                };
              });
            }, []).map(({ id, label, isRecorded }) => (
              <Stamp key={id} label={label} isRecorded={isRecorded} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};
