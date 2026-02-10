import SideSheet from "./SideSheet";

export type PeriodOption = {
  id: string;
  primary: string;
  secondary: string;
};

type Props = {
  open: boolean;
  onClose: () => void;

  options: PeriodOption[];
  selectedId: string;
  onSelect: (id: string) => void;

  closeOnSelect?: boolean;
};

export default function PeriodSideSheet({
  open,
  onClose,
  options,
  selectedId,
  onSelect,
  closeOnSelect = true,
}: Props) {
  return (
    <SideSheet
      open={open}
      onClose={onClose}
      width={158}
      side="left"
      ariaLabel="period select side sheet"
    >
      {/* 상단 닫기 버튼: 왼쪽 시트니까 "오른쪽"에 두는 게 자연스러움 */}
      <div className="flex items-center justify-end px-3 pt-3">
        <button
          type="button"
          onClick={onClose}
          className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/5"
          aria-label="close"
        >
          {/* chevron-left (원하면 chevron-right로 바꿔도 됨) */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18l-6-6 6-6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className="px-3 pt-2">
        <ul className="space-y-2">
          {options.map((opt) => {
            const active = opt.id === selectedId;

            return (
              <li key={opt.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelect(opt.id);
                    if (closeOnSelect) onClose();
                  }}
                  className={[
                    "w-full rounded-[10px] p-3 text-left",
                    "flex items-start gap-2",
                    "transition-colors",
                    active ? "bg-[#5D57FF]/35" : "hover:bg-white/5",
                  ].join(" ")}
                >
                  {/* clock icon */}
                  <div className="mt-[2px] shrink-0">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="9"
                        stroke="#3B82F6"
                        strokeWidth="2"
                      />
                      <path
                        d="M12 8v5l3 2"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="flex flex-col leading-tight">
                    <span className="text-[12px] text-white/90">
                      {opt.primary}
                    </span>
                    <span className="mt-1 text-[12px] text-white/70">
                      {opt.secondary}
                    </span>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex-1" />
    </SideSheet>
  );
}
