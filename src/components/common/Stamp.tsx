import { StampIcon } from "@/assets/icons";
import clsx from "clsx";

interface StampProps {
  isRecorded?: boolean;
  label?: string;
}

export const Stamp = ({ isRecorded, label }: StampProps) => {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div
        className={clsx(
          "flex h-10 w-10 items-center justify-center rounded-full border",
          isRecorded ? "border-primary-60" : "border-gray-40",
        )}
      >
        <div className="relative flex items-center justify-center">
          <span
            aria-hidden
            className={clsx(
              isRecorded
                ? "bg-primary-60 absolute h-4 w-4 rounded-full blur-md"
                : "",
            )}
          />
          <StampIcon
            className={clsx(
              "relative",
              isRecorded ? "text-primary-60" : "text-gray-40",
            )}
          />
        </div>
      </div>
      <span className="text-[8px] text-gray-50">{label}</span>
    </div>
  );
};
