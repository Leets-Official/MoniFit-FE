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
      className="fixed inset-0 z-9999 flex items-center justify-center"
    >
      {/* dim 오버레이 */}
      <div className="absolute inset-0 bg-black/20" />
      {/* modal  */}
      <div className="relative z-10 opacity-100">{children}</div>
      className=
      {clsx("fixed inset-0 z-50 flex items-center justify-center", className)}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
