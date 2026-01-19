//* 26.01.04 작업 완료

import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  [
    "flex items-center justify-center",
    "text-button1",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      rounded: {
        default: "rounded-[53px]",
        xs: "rounded-[13px]",
      },
      bgColor: {
        default: "bg-primary-50 hover:bg-primary-40 active:bg-primary-50",
        grey: "bg-primary-opacity-50 hover:bg-gray-50 active:bg-gray-90",
        none: "hover:bg-gray-70 active:bg-gray-80",
      },
      borderColor: {
        default: "",
        outline: "border border-gray-0 border-opacity-30",
      },
      fontColor: {
        default: "text-gray-90",
        white: "text-white",
      },
      width: {
        default: "w-71.25",
        lg: "w-55",
        md: "w-33.75",
        sm: "w-30.5",
        xs: "w-27",
      },
      height: { default: "h-15", sm: "h-13" },
    },
    defaultVariants: {
      width: "default",
      height: "default",
      rounded: "default",
      bgColor: "default",
      borderColor: "default",
      fontColor: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export const Button = ({
  fontColor,
  bgColor,
  borderColor,
  width,
  height,
  rounded,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    type="button"
    className={clsx(
      buttonStyles({ rounded, bgColor, borderColor, width, height, fontColor }),
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
