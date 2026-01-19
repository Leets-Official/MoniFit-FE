import React from "react";

import clsx from "clsx";

interface CategoryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  isSelected?: boolean;
  children?: React.ReactNode;
}

export const CategoryButton = ({
  label,
  isSelected = false,
  children,
  ...props
}: CategoryButtonProps) => {
  return (
    <button
      type="button"
      className={clsx(
        "flex h-fit w-17 flex-col items-center justify-between gap-2 rounded-xl p-2",
        isSelected && "bg-[#7976FF]/50",
      )}
      {...props}
    >
      <div className="rounded-lg bg-linear-to-b from-[#A8A6FF66] to-[#FFFFFF1A] p-px">
        <div
          className={clsx(
            "flex h-13 w-13 items-center justify-center rounded-lg bg-[#2a2a2a]",
            isSelected && "bg-[#565498]/80",
          )}
        >
          {children}
        </div>
      </div>
      <span className="text-gray-0 text-caption2">{label}</span>
    </button>
  );
};
