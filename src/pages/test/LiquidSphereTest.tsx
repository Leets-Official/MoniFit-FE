import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import LiquidSphere from "../../components/LiquidSphere";

export default function LiquidSphereTestPage() {
  const TOTAL_AMOUNT = 10000000;
  const [amount, setAmount] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percent, setPercent] = useState(100);

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
        <div className="text-[18px] font-semibold text-white">
          이번 달 예산 : {TOTAL_AMOUNT.toLocaleString()} 원
        </div>
        <span className="text-[14px] font-medium text-gray-300">
          사용한 금액 : {spent.toLocaleString()} 원
        </span>
        <span className="text-[14px] font-medium text-gray-600">
          남은 예산 : {percent.toFixed(2)}%
        </span>
        <div className="h-75 w-75">
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
