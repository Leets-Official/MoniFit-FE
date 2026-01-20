import { CalendarIcon, ReportIcon } from "@/assets/icons";
import { Button, ExpenseRecordModal, LiquidSphere } from "@/components";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

// TODO : MOCK_DATA
const TOTAL_AMOUNT = 1000000;

export const MainPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [percent, setPercent] = useState(100);
  const [spent, setSpent] = useState(0);
  const fillRatio = Math.min(1, Math.max(0, percent / 100));

  const mixColor = (from: string, to: string, t: number) => {
    const f = parseInt(from.replace("#", ""), 16);
    const tt = parseInt(to.replace("#", ""), 16);
    const r = Math.round(
      ((f >> 16) & 255) + (((tt >> 16) & 255) - ((f >> 16) & 255)) * t,
    );
    const g = Math.round(
      ((f >> 8) & 255) + (((tt >> 8) & 255) - ((f >> 8) & 255)) * t,
    );
    const b = Math.round((f & 255) + ((tt & 255) - (f & 255)) * t);
    return `rgb(${r} ${g} ${b})`;
  };

  const gradientCenter = mixColor("#7976FF", "#1F1F1F", 1 - fillRatio);

  const handleSaveExpense = (expense: number) => {
    setSpent((prev) => prev + expense);

    const nextSpent = spent + expense;
    const nextPercent = Math.min(
      100,
      ((TOTAL_AMOUNT - nextSpent) / TOTAL_AMOUNT) * 100,
    );

    setPercent(nextPercent);
    setShowModal(false);
  };

  return (
    <main className="relative flex h-full w-full flex-col items-center">
      <section className="mt-6.25 flex h-fit w-full justify-center">
        <div className="text-body2 flex h-8 w-fit items-center gap-1 rounded-[60px] bg-[#7976FF80] px-3 py-1.5 text-[#DCDCDC]">
          <span>2026.01.01</span>
          <span>-</span>
          <span>2026.01.31</span>
        </div>
      </section>
      <section className="relative">
        <div
          className="relative h-90 w-90"
          style={{
            background: `radial-gradient(circle at center, ${gradientCenter} 0%, #1F1F1F 49%)`,
          }}
        >
          <Canvas>
            <ambientLight intensity={1.2} />
            <directionalLight position={[1, 2, 3]} intensity={2.5} />
            <LiquidSphere percent={percent} />
          </Canvas>
        </div>
        <div className="absolute -bottom-30 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <span className="text-body2 text-[#8A8A8A]">남은 금액</span>
          <span className="text-h1 text-gray-0 flex items-center gap-2">
            <span>₩</span>
            <span>{(TOTAL_AMOUNT - spent).toLocaleString()}</span>
          </span>
          <Button
            width="md"
            className="mt-3.5"
            onClick={() => setShowModal(true)}
          >
            지출 입력하기
          </Button>
        </div>
      </section>
      <section className="absolute bottom-20 flex w-full items-center justify-center gap-3">
        <Button
          width={"sm"}
          borderColor={"outline"}
          bgColor={"none"}
          className="flex gap-2"
          fontColor={"white"}
        >
          <CalendarIcon />
          <span>달력</span>
        </Button>
        <Button
          width={"md"}
          borderColor={"outline"}
          bgColor={"none"}
          className="flex gap-2"
          fontColor={"white"}
        >
          <ReportIcon />
          <span>리포트</span>
        </Button>
      </section>
      {showModal && (
        <ExpenseRecordModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveExpense}
        />
      )}
    </main>
  );
};
