import { useState } from "react";
import FoodIcon from "@/assets/icons/colored/colored_food.svg";
import HospitalIcon from "@/assets/icons/colored/colored_hospital.svg";
import ShopIcon from "@/assets/icons/colored/colored_shoping.svg";
import HomeIcon from "@/assets/icons/colored/colored-home.svg";
import StarIcon from "@/assets/icons/colored/colored-star.svg";
import VerticalIndicator from "../common/icons/VerticalIndicator";
import ChevronRightIcon from "@/assets/icons/general/chevron-right.svg?react";
import ExpenseDetail from "./ExpenseDetail";
import type { CategoryData } from "./types";

interface CategoryItemProps {
  data: CategoryData;
  showExpandButton?: boolean;
  spentDate: string;
  onRefresh?: () => void;
}

const categoryIcons: Record<string, string> = {
  food: FoodIcon,
  hospital: HospitalIcon,
  shop: ShopIcon,
  home: HomeIcon,
  etc: StarIcon,
};

const categoryNames: Record<string, string> = {
  food: "식비",
  hospital: "의료",
  shop: "쇼핑",
  home: "생활",
  etc: "기타",
};

// 카테고리 타입을 API 형식으로 변환
const categoryTypeToApi: Record<string, string> = {
  food: "FOOD",
  hospital: "MEDICAL",
  shop: "SHOPPING",
  home: "LIVING",
  etc: "ETC",
};

const CategoryItem = ({ 
  data, 
  showExpandButton = true,
  spentDate,
  onRefresh,
}: CategoryItemProps) => {
  const { type, items } = data;
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);
  const totalAmount = items.reduce((acc, cur) => acc + cur.amount, 0);

  // API 형식의 카테고리 값
const apiCategory = categoryTypeToApi[type] || "ETC";
  
  const currentIcon = categoryIcons[type] || StarIcon;
  const currentName = categoryNames[type] || "기타";
  
  const handleItemsChange = () => {
    onRefresh?.();
  };

  return (
    <div className="flex w-full gap-[18px] px-[18px]">
      <div className="flex flex-col items-center self-stretch">
        <div
          className="bg-primary-40 w-[5px] rounded-[20px] transition-all duration-300"
          style={{
            minHeight: "45px",
            height: "100%",
          }}
        >
          <VerticalIndicator />
        </div>
      </div>

      <div className="flex-1">
        <div
          className={`flex items-center justify-between py-2 ${showExpandButton ? 'cursor-pointer' : ''}`}
          onClick={showExpandButton ? toggleAccordion : undefined}
        >
          <div className="flex items-center gap-[7px]">
            <img src={currentIcon} alt="icon" />
            <span className="text-gray-10 text-[15px] font-medium">
              {currentName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-10 text-[14px] font-medium">
              {showExpandButton ? `${totalAmount.toLocaleString()}원` : `총 ${totalAmount.toLocaleString()}원 지출`}
            </span>
            {showExpandButton && (
              <ChevronRightIcon className={`w-6 h-6 text-primary-40 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
/>

            )}
          </div>
        </div>
        {isOpen && showExpandButton && (
          <div>
            <ExpenseDetail
              items={items}
              category={apiCategory}
              spentDate={spentDate}
              onItemsChange={handleItemsChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;