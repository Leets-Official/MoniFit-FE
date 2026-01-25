import { useEffect } from "react";
import { createPortal } from "react-dom";

type SideSheetProps = {
  open: boolean;
  onClose: () => void;

  /** 시트 너비(px) */
  width?: number;

  side?: "left" | "right";

  /** 바깥 클릭(backdrop) 닫기 */
  closeOnBackdrop?: boolean;

  /** ESC 닫기 */
  closeOnEsc?: boolean;

  /** overlay z-index */
  zIndex?: number;

  children: React.ReactNode;

  ariaLabel?: string;
};

function lockBodyScroll(lock: boolean) {
  const body = document.body;
  if (lock) {
    const prev = body.style.overflow;
    body.dataset.prevOverflow = prev;
    body.style.overflow = "hidden";
  } else {
    body.style.overflow = body.dataset.prevOverflow ?? "";
    delete body.dataset.prevOverflow;
  }
}

export default function SideSheet({
  open,
  onClose,
  width = 158,
  side = "left", 
  closeOnBackdrop = true,
  closeOnEsc = true,
  zIndex = 50,
  children,
  ariaLabel = "side sheet",
}: SideSheetProps) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, closeOnEsc, onClose]);

  useEffect(() => {
    lockBodyScroll(open);
    return () => lockBodyScroll(false);
  }, [open]);

  if (!open) return null;

  const isLeft = side === "left";

  const ui = (
    <div
      className="fixed inset-0"
      style={{ zIndex }}
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      {/* backdrop */}
      <button
        type="button"
        aria-label="close side sheet backdrop"
        className="absolute inset-0 bg-black/40"
        onClick={() => {
          if (closeOnBackdrop) onClose();
        }}
      />

      {/* panel */}
      <aside
        className={[
          "absolute top-0 h-full",
          isLeft ? "left-0 rounded-r-[12px]" : "right-0 rounded-l-[12px]",
          "bg-[#262626]",
          "border border-[#6B5CFF]/40",
          "shadow-[0_10px_40px_rgba(0,0,0,0.45)]",
          "flex flex-col",
        ].join(" ")}
        style={{ width }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </aside>
    </div>
  );

  return createPortal(ui, document.body);
}
