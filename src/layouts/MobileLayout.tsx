import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <main className="flex h-full w-full items-center justify-center bg-[#1f1f1f]">
      <div className="flex h-203 w-93.75 flex-col border border-white px-4 py-6">
        <header className="flex h-8 w-full items-center justify-center bg-white">
          Header
        </header>
        <Outlet />
      </div>
    </main>
  );
}
