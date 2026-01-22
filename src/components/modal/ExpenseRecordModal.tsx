import {
  ChevronDownIcon,
  ColoredFoodIcon,
  ColoredHomeIcon,
  ColoredHospitalIcon,
  ColoredShopingIcon,
  ColoredStarIcon,
} from "@/assets/icons";
import { useEffect, useState } from "react";
import { CategoryButton } from "../CategoryButton";
import { Input } from "../common/Input";
import { Button } from "../common/Button";
import clsx from "clsx";

const CATEGORIES = [
  { key: "food", label: "식비", icon: <ColoredFoodIcon /> },
  { key: "shopping", label: "쇼핑", icon: <ColoredShopingIcon /> },
  { key: "medical", label: "의료", icon: <ColoredHospitalIcon /> },
  { key: "life", label: "생활", icon: <ColoredHomeIcon /> },
  { key: "etc", label: "기타", icon: <ColoredStarIcon /> },
] as const;

interface ExpenseRecordModalProps {
  onClose: () => void;
  onSave: (expense: number, category: string) => void;
}

export const ExpenseRecordModal = ({
  onClose,
  onSave,
}: ExpenseRecordModalProps) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [expense, setExpense] = useState<number | "">("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 0);
  }, []);

  const handleClose = () => {
    setIsVisible(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleEaseClick = () => {
    setExpense("");
    setSelected(null);
  };

  const handleSave = () => {
    setIsSubmitted(true);

    if (!selected || expense === "") return;

    onSave(expense, selected);
  };

  return (
    <section
      className={clsx(
        "absolute -bottom-0.5",
        "flex h-132.5 w-93.75 flex-col rounded-t-[50px]",
        "bg-linear-to-b from-[#1F1F1F] to-[#30304F]",
        "px-4.5 pt-12",
        "transform transition-all duration-500 ease-out will-change-transform",
        isVisible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-4 scale-95 opacity-0",
      )}
    >
      <button onClick={handleClose}>
        <ChevronDownIcon
          className={"absolute top-3 left-1/2 -translate-x-1/2"}
        />
      </button>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className={"flex h-full w-full flex-col items-center"}
      >
        <span className={"text-h3 text-gray-10 w-full"}>지출 기록</span>
        <div className={"relative mt-15.5 flex w-full"}>
          {CATEGORIES.map(({ key, label, icon }) => (
            <CategoryButton
              type="button"
              key={key}
              label={label}
              isSelected={selected === key}
              onClick={() => setSelected(key)}
            >
              {icon}
            </CategoryButton>
          ))}
          {isSubmitted && !selected && (
            <span
              className={"text-body2 absolute -bottom-5 left-2 text-[#CA0111]"}
            >
              카테고리를 선택하세요
            </span>
          )}
        </div>
        <div className={"relative mt-7 w-full"}>
          <Input
            width={"large"}
            type={"number"}
            suffix={"원"}
            placeholder={"금액을 입력하세요"}
            value={expense}
            onChange={(e) =>
              setExpense(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
          {isSubmitted && expense === "" && (
            <span
              className={"text-body2 absolute -bottom-6 left-2 text-[#CA0111]"}
            >
              금액을 입력하세요
            </span>
          )}
        </div>
        <div className="relative mt-21.25 flex h-40 w-full gap-4.5">
          <Button
            type={"button"}
            width={"xs"}
            bgColor={"none"}
            borderColor={"outline"}
            fontColor={"white"}
            onClick={handleEaseClick}
          >
            지우기
          </Button>
          <Button type={"submit"} width={"lg"}>
            저장하기
          </Button>
        </div>
      </form>
    </section>
  );
};
