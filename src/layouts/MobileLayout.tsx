import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-[#1f1f1f]">
      <div className="flex h-203 w-93.75 flex-col border-2 border-white">
        <header className="bg-point-mint flex h-8 w-full items-center justify-center">
          Header
        </header>

        <Outlet />
      </div>
    </main>
  );
}
