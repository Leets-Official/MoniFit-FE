import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonStyles = cva("flex items-center font-medium text-base", {
  variants: {
    width: {
      xxl: "w-[452px]",
      xl: "w-[359px]",
      md: "w-[322px]",
      sm: "w-[305px]",
      xs: "w-[186px]",
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
    fontColor: {},
  },
  defaultVariants: {
    width: "xl",
    height: "xs",
    rounded: "sm",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles>;

export default function Button({
  className,
  width,
  height,
  rounded,
  children,
}: ButtonProps) {
  return (
    <button
      className={clsx(buttonStyles({ width, height, rounded }), className)}
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
