import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <main className="flex h-full max-h-[812px] w-full max-w-[376px] flex-col overflow-hidden">
      <Outlet />
    </main>
  );
}
