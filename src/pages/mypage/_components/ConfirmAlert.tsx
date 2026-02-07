import { useEffect } from "react";

type Props = {
  title: string;
  desc?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmAlert({
  title,
  desc,
  onClose,
  onConfirm,
}: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div className="absolute inset-0 z-50">
      <button
        type="button"
        aria-label="close"
        className="absolute inset-0 h-full w-full bg-black/40"
        onClick={onClose}
      />

      <div
        className="absolute top-1/2 left-1/2 h-32 w-67.5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl"
        style={{ backgroundColor: "rgba(30, 30, 30)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-21 flex-col items-center justify-center px-5 text-center">
          <p className="text-gray-0 text-[19px] leading-tight font-semibold">
            {title}
          </p>

          {desc ? (
            <p className="text-gray-0 mt-2 text-[14px] leading-tight font-bold">
              {desc}
            </p>
          ) : null}
        </div>

        <div className="h-px w-full bg-white/20" />

        <div className="flex h-11">
          <button
            type="button"
            className="flex-1 text-[17px] leading-none font-normal text-[#007AFF]"
            onClick={onClose}
          >
            아니요
          </button>

          <div className="w-px bg-white/20" />

          <button
            type="button"
            className="flex-1 text-[17px] leading-none font-normal text-[#007AFF]"
            onClick={onConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
