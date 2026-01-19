import { useState } from "react";
import {
  ColoredFoodIcon,
  ColoredHomeIcon,
  ColoredHospitalIcon,
  ColoredShopingIcon,
  ColoredStarIcon,
} from "@/assets/icons";
import { CategoryButton } from "@/components";

const CATEGORIES = [
  { key: "food", label: "식비", icon: <ColoredFoodIcon /> },
  { key: "shopping", label: "쇼핑", icon: <ColoredShopingIcon /> },
  { key: "medical", label: "의료", icon: <ColoredHospitalIcon /> },
  { key: "life", label: "생활", icon: <ColoredHomeIcon /> },
  { key: "etc", label: "기타", icon: <ColoredStarIcon /> },
] as const;

export const TestForCategoryButtonPage = () => {
  const [selected, setSelected] = useState<string>("food");

  return (
    <main className="flex h-full w-full items-center justify-center bg-black">
      <section className="to-[] flex h-132.5 w-93.75 flex-col items-center bg-linear-to-b from-[#1F1F1F] to-[#30304F]">
        <div className="mt-37 flex">
          {CATEGORIES.map(({ key, label, icon }) => (
            <CategoryButton
              key={key}
              label={label}
              isSelected={selected === key}
              onClick={() => setSelected(key)}
            >
              {icon}
            </CategoryButton>
          ))}
        </div>
      </section>
    </main>
  );
};
