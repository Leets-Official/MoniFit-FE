import { useMemo, useState } from "react";
import { PeriodSideSheet, type PeriodOption } from "@/components/SideSheet";

export default function TestForSideSheetPage() {
  const options: PeriodOption[] = useMemo(
    () => [
      {
        id: "p1",
        primary: "26.01.01 - 26.01.30",
        secondary: "25.12.01 - 25.12.31",
      },
      {
        id: "p2",
        primary: "25.12.01 - 25.12.31",
        secondary: "25.09.15 - 25.10.15",
      },
      {
        id: "p3",
        primary: "25.09.15 - 25.10.15",
        secondary: "25.08.01 - 25.08.31",
      },
    ],
    [],
  );

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(options[0].id);
  const selected = options.find((o) => o.id === selectedId);

  return (
    <div className="min-h-screen bg-[#1f1f1f] px-5 py-6 text-white">
      <h1 className="text-lg font-semibold">SideSheet Test</h1>

      <div className="mt-4 rounded-[16px] bg-white/5 p-4">
        <div className="text-sm text-white/70">현재 선택</div>
        <div className="mt-2 text-sm leading-6 text-white/90">
          <div>{selected?.primary}</div>
          <div className="text-white/70">{selected?.secondary}</div>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 w-full rounded-[12px] bg-white/10 py-3 text-sm hover:bg-white/15"
        >
          목록 &gt; (사이드시트 열기)
        </button>
      </div>

      <div className="mt-6 text-xs text-white/50">
        * backdrop 클릭 / ESC로 닫힘 동작 확인 가능
      </div>

      <PeriodSideSheet
        open={open}
        onClose={() => setOpen(false)}
        options={options}
        selectedId={selectedId}
        onSelect={setSelectedId}
        closeOnSelect
      />
    </div>
  );
}
