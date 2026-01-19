//* 26.01.04 작업 완료

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const InputStyles = cva(
  ["flex items-center justify-center", "placeholder:text-gray-50 text-gray-0"],
  {
    variants: {
      width: {
        large: "w-84.75",
        medium: "w-58.75",
        small: "w-32",
      },
    },
    compoundVariants: [
      {
        width: "large",
        class:
          "px-4 pr-10 h-13.25 rounded-lg border-opacity-30 border border-gray-0 text-sub1 placeholder:text-sub2",
      },
      {
        width: "medium",
        class:
          "px-4 h-11 rounded-md text-sub1 placeholder:text-sub2 border border-gray-0",
      },
      {
        width: "small",
        class:
          "pl-2 pr-6 h-5.75 border-[0.7px] border-opacity-30 rounded-sm text-[8px] font-semibold",
      },
    ],
    defaultVariants: {
      width: "large",
    },
  },
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputStyles>;

export const Input = ({ width, className, ...props }: InputProps) => (
  <div className="relative">
    <input
      className={clsx(
        InputStyles({
          width,
        }),
        className,
      )}
      {...props}
    />
    {width === "large" && props.type === "number" && (
      <span className="absolute top-4 right-3 text-gray-50">원</span>
    )}
    {width === "small" && props.type === "number" && (
      <span className="absolute text-xs top-1 right-2 text-gray-50">원</span>
    )}
  </div>
);
