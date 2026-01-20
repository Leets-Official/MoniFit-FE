import { LiquidSphere } from "@/components";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";

export function TestForLiquidSpherePage() {
  const TOTAL_AMOUNT = 10000000;
  const [amount, setAmount] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percent, setPercent] = useState(100);
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

  const handleAmountSubmit = () => {
    setSpent((prev) => prev + amount);
    setAmount(0);
    setPercent(
      Math.min(100, ((TOTAL_AMOUNT - (spent + amount)) / TOTAL_AMOUNT) * 100),
    );
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <div className="flex flex-col items-center">
        <div className="text-sub1-size font-semibold text-white">
          이번 달 예산 : {TOTAL_AMOUNT.toLocaleString()} 원
        </div>
        <span className="text-[14px] font-medium text-gray-300">
          사용한 금액 : {spent.toLocaleString()} 원
        </span>
        <span className="text-[14px] font-medium text-gray-600">
          남은 예산 : {percent.toFixed(2)}%
        </span>
        <div
          className="relative h-75 w-75"
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
      </div>

      <input
        type="text"
        placeholder="금액 입력 (원)"
        value={amount === 0 ? "" : amount.toLocaleString()}
        onChange={(e) =>
          setAmount(Number(e.target.value.replace(/[^0-9]/g, "")))
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") handleAmountSubmit();
        }}
        className="bg- h-10 rounded-md border border-gray-400 text-center text-white placeholder:text-white"
      />
    </div>
  );
}
