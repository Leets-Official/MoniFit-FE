import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <div className="flex min-h-dvh justify-center bg-[#1f1f1f]">
      <main className="flex h-dvh max-h-[812px] w-[375px] flex-col overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
