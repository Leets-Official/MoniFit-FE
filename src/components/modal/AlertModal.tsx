import React, { useEffect, useState } from "react";
import {
  CloseIcon,
  ColoredFoodIcon,
  ColoredHomeIcon,
  ColoredHospitalIcon,
  ColoredShopingIcon,
  ColoredStarIcon,
} from "@/assets/icons";
import clsx from "clsx";

interface CategoryIconItem {
  value: string;
  icon: React.ReactNode;
}

interface AlertModalProps {
  type: "지출" | "스탬프";
  value?: "식비" | "쇼핑" | "의료" | "생활" | "기타";
  expense?: number;
  onClose: () => void;
}

const categoryIcons: CategoryIconItem[] = [
  { value: "식비", icon: <ColoredFoodIcon className="h-8 w-8" /> },
  { value: "쇼핑", icon: <ColoredShopingIcon className="h-8 w-8" /> },
  { value: "의료", icon: <ColoredHospitalIcon className="h-8 w-8" /> },
  { value: "생활", icon: <ColoredHomeIcon className="h-8 w-8" /> },
  { value: "기타", icon: <ColoredStarIcon className="h-8 w-8" /> },
];

export const AlertModal = ({
  type = "지출",
  value,
  expense = 0,
  onClose,
}: AlertModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const selectedCategory = categoryIcons.find((item) => item.value === value);

  // 오늘 날짜 포맷팅 (YY.MM.DD 요일)
  const formatDate = () => {
    const now = new Date();
    const year = String(now.getFullYear()).slice(2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    const weekday = weekdays[now.getDay()];
    return `${year}.${month}.${day} ${weekday}`;
  };

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setIsOpen(true);
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <section
      onClick={(e) => e.stopPropagation()}
      className={clsx(
        "bg-gray-80 relative z-50 flex h-fit min-h-27.5 w-87.5 transform flex-col rounded-[13px] p-4 shadow-[14px_0_20px_rgba(255,255,255,0.2),-14px_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 ease-out",
        isOpen && !isClosing
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-2 scale-95 opacity-0",
      )}
    >
      <button onClick={handleClose} className="absolute top-3 right-3 z-10">
        <CloseIcon />
      </button>
      <div className="relative flex h-5 w-81 items-center">
        <img src={"/src/public/logo.png"} className="absolute left-1 h-5 w-5" />
        <img src={"/src/public/appname.png"} className="h-6 w-25 object-fill" />
      </div>
      <div className="text-gray-0 text-body1 mt-1">
        <div className="ml-1.5">{formatDate()}</div>
        <div className="flex items-center">
          {<span>{selectedCategory?.icon}</span>}
          {type === "지출" ? (
            <div>{`${value} ${expense.toLocaleString()}원 지출 입력되었습니다`}</div>
          ) : (
            <div className="w-full text-center">
              오늘 기록 완료! 스탬프가 찍혔어요 🎉
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
