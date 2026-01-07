import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

const guideLabelStyles = cva("mt-2 mb-4 w-full text-[13px] font-medium ", {
  variants: {
    intent: {
      guide: "text-[#757575]",
      error: "text-[#B7000F]",
      success: "text-green-500",
    },
  },
  defaultVariants: {
    intent: "guide",
  },
});

interface GuideLabelProps extends VariantProps<typeof guideLabelStyles> {
  children: React.ReactNode;
  className?: string;
}

export default function GuideLabel({
  children,
  intent,
  className,
}: GuideLabelProps) {
  const merged = twMerge(clsx(guideLabelStyles({ intent }), className));
  return <span className={merged}>{children}</span>;
}
