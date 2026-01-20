import { useEffect } from "react";
import clsx from "clsx";
import { lockBodyScroll, unlockBodyScroll } from "@/lib";

type ModalWrapperProps = {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
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
      className={clsx(
        "fixed z-50 h-full w-full items-center justify-center",
        className,
      )}
      onClick={onClose}
    >
      {/* dim */}
      <div className="absolute inset-0 bg-green-700" />

      {/* modal content */}
      <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
