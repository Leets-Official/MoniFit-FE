import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyPageTopBar from "./_components/MyPageTopBar";
import MyPageSubHeader from "./_components/MyPageSubHeader";
import ConfirmAlert from "./_components/ConfirmAlert";

import { AvartarIcon } from "@/assets/icons";
import { Input } from "@/components";

type ModalType = "logout" | "withdraw" | null;

export default function MyPageProfilePage() {
  const navigate = useNavigate();

  const initialName = "홍길동";
  const [name, setName] = useState(initialName);
  const [modal, setModal] = useState<ModalType>(null);

  const isDirty = useMemo(() => name.trim() !== initialName, [name]);

  const handleSave = () => {
    navigate("/mypage");
  };

  const modalInfo = useMemo(() => {
    if (modal === "logout")
      return { title: "로그아웃", desc: "로그아웃 할까요?" };
    if (modal === "withdraw")
      return {
        title: "회원탈퇴",
        desc: "회원탈퇴 시 회원 정보는 복구 되지 않습니다.",
      };
    return null;
  }, [modal]);

  const handleConfirm = () => {
    setModal(null);
    navigate("/main");
  };

  return (
    <main className="relative flex h-full w-full flex-col">
      <MyPageTopBar />

      <MyPageSubHeader
        title="프로필"
        onBack={() => navigate(-1)}
        right={
          <button
            type="button"
            className="text-sub1 text-primary-50 disabled:text-gray-50"
            disabled={!isDirty}
            onClick={handleSave}
          >
            저장
          </button>
        }
      />

      <section className="mt-10 flex flex-col items-center px-4">
        <div className="flex h-24 w-24 items-center justify-center">
          <AvartarIcon className="h-24 w-24" />
        </div>

        <div className="mt-10 w-58.75">
          <p className="text-sub1 text-gray-10">이름</p>

          <Input
            width="medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
            className="border-gray-10 text-sub1-size text-gray-0 placeholder:text-sub1-size mt-3 h-11 w-58.75 rounded border-[0.5px] px-4 leading-5.5 font-normal placeholder:leading-5.5 placeholder:font-normal placeholder:text-gray-50"
          />
        </div>

        <div className="mt-20 flex w-full items-center justify-center gap-6 text-[15px] font-semibold text-gray-50">
          <button type="button" onClick={() => setModal("logout")}>
            로그아웃
          </button>
          <span className="text-gray-50">|</span>
          <button type="button" onClick={() => setModal("withdraw")}>
            회원탈퇴
          </button>
        </div>
      </section>

      {modalInfo ? (
        <ConfirmAlert
          title={modalInfo.title}
          desc={modalInfo.desc}
          onClose={() => setModal(null)}
          onConfirm={handleConfirm}
        />
      ) : null}
    </main>
  );
}
