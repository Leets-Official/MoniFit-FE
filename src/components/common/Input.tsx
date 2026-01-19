//* 26.01.04 작업 완료

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const InputStyles = cva(
  [
    "flex items-center justify-center",
    "placeholder:text-sub2 text-sub1 placeholder:text-gray-10 text-gray-0",
    "px-4",
  ],
  {
    variants: {
      rounded: {
        large: "rounded-lg",
        medium: "rounded-md",
        small: "rounded-sm",
      },
      width: {
        large: "w-84.75",
        medium: "w-58.75",
        small: "w-32",
      },

      borderColor: {
        "opacity-30": "border-opacity-30 border border-gray-0",
        "opacity-10": "border-opacity-10 border-[0.7px] border-gray-0",
        "opacity-100": "border border-gray-10",
      },
      // 53, 44, 23
      height: { large: "h-13.25", medium: "h-11", small: "h-5.75" },
    },
    compoundVariants: [
      {
        width: "large",
        height: "large",
        class: "text-sub1 placeholder:text-sub2",
      },
      {
        width: "medium",
        height: "medium",
        class: "text-sub1 placeholder:text-sub2",
      },
    ],
    defaultVariants: {
      width: "large",
      height: "large",
      rounded: "large",
      borderColor: "opacity-10",
    },
  },
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof InputStyles>;

export const Input = ({
  // fontColor,
  borderColor,
  width,
  height,
  rounded,
  className,
  children,
  ...props
}: InputProps) => (
  <input
    className={clsx(
      InputStyles({
        rounded,

        borderColor,
        width,
        height,
        // fontColor,
      }),
      className,
      "",
    )}
    {...props}
  >
    {children}
  </input>
);
