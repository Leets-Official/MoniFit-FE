import { Header } from "@/components";
import { Outlet } from "react-router-dom";

export default function MobileLayout() {
  return (
    <main className="flex min-h-screen w-screen items-center justify-center bg-[#1f1f1f]">
      <div className="flex h-203 w-93.75 shrink-0 flex-col border-2 border-white">
        <Header
          onStampClick={() => {}}
          onImgClick={() => {}}
          showButton={true}
        />
        <Outlet />
      </div>
    </main>
  );
}
