import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva(
  clsx(
    "flex items-center justify-center",
    "font-medium text-base",
    "disabled:bg-[#757575] disabled:border disabled:border-[#D9D9D9]",
  ),
  {
    variants: {
      width: {
        xxl: "w-[452px]",
        xl: "w-[359px]",
        md: "w-[322px]",
        sm: "w-[305px]",
        xs: "w-[81px]",
      },
      height: {
        xl: "h-[79px]",
        md: "h-[70px]",
        sm: "h-[60px]",
        xs: "h-[45px]",
      },
      rounded: {
        md: "rounded-[13px]",
        sm: "rounded-[7px]",
      },
      fontSize: {
        md: "text-[16px]",
        sm: "text-[12px]",
      },
      fontColor: { default: "text-[#EAEAEA]" },
      bgColor: { default: "bg-[#6E76AD] active:bg-[#555C8E]" },
    },
    defaultVariants: {
      width: "xl",
      height: "xs",
      rounded: "sm",
      fontSize: "md",
      bgColor: "default",
      fontColor: "default",
    },
  },
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export default function Button({
  className,
  width,
  height,
  rounded,
  fontSize,
  bgColor,
  fontColor,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        buttonStyles({ width, height, rounded, fontSize, bgColor, fontColor }),
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
// width : 322px, 359px, 452px, 305px, 186px
// height: 45px, 60px, 79px, 70px
// rounded: 7px, 13px
// disabled-bgColor : #757575, #D9D9D9
// disabled-borderColor: #D9D9D9
// bgColor: #6E76AD,
// fontColor: #EAEAEA, #4C4B4B
