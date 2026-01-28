import { useEffect } from "react";

type Props = {
  title: string;
  desc?: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function ConfirmAlert({ title, desc, onClose, onConfirm }: Props) {
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
        className="absolute left-1/2 top-1/2 h-32 w-67.5 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl"
        style={{ backgroundColor: "rgba(30, 30, 30)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex h-21 flex-col items-center justify-center px-5 text-center">
          <p className="text-[19px] font-semibold leading-tight text-gray-0">
            {title}
          </p>

          {desc ? (
            <p className="mt-2 text-[14px] font-bold leading-tight text-gray-0">
              {desc}
            </p>
          ) : null}
        </div>

        <div className="h-px w-full bg-white/20" />

        <div className="flex h-11">
          <button
            type="button"
            className="flex-1 text-[17px] font-normal leading-none text-[#007AFF]"
            onClick={onClose}
          >
            아니요
          </button>

          <div className="w-px bg-white/20" />

          <button
            type="button"
            className="flex-1 text-[17px] font-normal leading-none text-[#007AFF]"
            onClick={onConfirm}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
