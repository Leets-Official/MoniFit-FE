import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const inputStyles = cva(
  "px-4 flex items-center h-[45px] rounded-[7px] font-medium text-base border border-[#D9D9D9] placeholder:text-[#4c4b4b] text-white",
  {
    variants: {
      width: {
        xl: "w-[322px]",
        md: "w-[232px]",
      },
    },
    defaultVariants: {
      width: "xl",
    },
  },
);

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputStyles>;

export default function Input({ className, width, ...props }: InputProps) {
  return (
    <input
      {...props}
      type={props.type}
      className={clsx(inputStyles({ width }), className)}
    />
  );
}
