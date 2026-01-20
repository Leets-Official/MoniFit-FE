import { useEffect } from "react";
import clsx from "clsx";
import { lockBodyScroll, unlockBodyScroll } from "@/lib";

type ModalWrapperProps = {
  children: React.ReactNode;
  className?: string;
  onClose: () => void;
};

export function ModalWrapper({
  children,
  className,
  onClose,
}: ModalWrapperProps) {
  useEffect(() => {
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, []);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className={clsx("absolute inset-0 z-50", className)}
    >
      {/* dim */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* modal content */}
      <div
        className="absolute bottom-0 z-10 h-fit w-fit"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
}
