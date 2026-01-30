import { Header } from "@/components";
import { Outlet, useLocation } from "react-router-dom";

export default function MobileLayout() {

  const location = useLocation();
  const isMyPageRoute = location.pathname.startsWith("/mypage");

  return (
    <main className="flex h-full w-full items-center justify-center bg-[#1f1f1f]">
      <div className="flex h-203 w-93.75 flex-col border border-white px-4 py-6">
       {!isMyPageRoute && (
        <Header
          onStampClick={() => {}}
          onImgClick={() => {}}
          showButton={true}
        />
       )}
        <Outlet />
      </div>
    </main>
  );
}
