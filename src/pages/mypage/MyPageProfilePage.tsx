import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import MyPageTopBar from "./_components/MyPageTopBar";
import MyPageSubHeader from "./_components/MyPageSubHeader";
import ConfirmAlert from "./_components/ConfirmAlert";

import { AvartarIcon } from "@/assets/icons";
import { Input } from "@/components";
import { getMemberMe, patchMemberName } from "@/api/members";

type ModalType = "logout" | null;

export default function MyPageProfilePage() {
  const navigate = useNavigate();

  const [initialName, setInitialName] = useState("");
  const [name, setName] = useState("");
  const [modal, setModal] = useState<ModalType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      try {
        setIsFetching(true);
        const response = await getMemberMe();

        if (response.success && response.data) {
          const memberName = response.data.name || "";
          setInitialName(memberName);
          setName(memberName);
        }
      } catch (error) {
        console.error("사용자 정보 조회 실패:", error);
        setInitialName("");
        setName("");
      } finally {
        setIsFetching(false);
      }
    };

    fetchMemberInfo();
  }, []);

  const isDirty = useMemo(() => name.trim() !== initialName, [name, initialName]);

  const handleSave = async () => {
    const nextName = name.trim();
    if (!nextName) return;

    try {
      setIsLoading(true);
      const res = await patchMemberName(nextName);

      if (!res.success) {
        alert(res.error?.message ?? "이름 수정에 실패했습니다.");
        return;
      }

      setInitialName(res.data?.name ?? nextName);
      navigate("/mypage");
    } catch (error) {
      console.error("이름 수정 실패:", error);
      alert("이름 수정에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const modalInfo = useMemo(() => {
    if (modal === "logout") return { title: "로그아웃", desc: "로그아웃 할까요?" };
    return null;
  }, [modal]);

  const handleConfirm = async () => {
    localStorage.clear();
    sessionStorage.clear();
    setModal(null);
    navigate("/login", { replace: true });
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
            disabled={!isDirty || isFetching || isLoading}
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
            disabled={isFetching || isLoading}
            className="border-gray-10 text-sub1-size text-gray-0 placeholder:text-sub1-size mt-3 h-11 w-58.75 rounded border-[0.5px] px-4 leading-5.5 font-normal placeholder:leading-5.5 placeholder:font-normal placeholder:text-gray-50"
          />
        </div>

        <div className="mt-20 flex w-full items-center justify-center text-[15px] font-semibold text-gray-50">
          <button type="button" onClick={() => setModal("logout")} disabled={isLoading}>
            로그아웃
          </button>
        </div>
      </section>

      {modalInfo ? (
        <ConfirmAlert
          title={modalInfo.title}
          desc={modalInfo.desc}
          onClose={() => !isLoading && setModal(null)}
          onConfirm={handleConfirm}
        />
      ) : null}
    </main>
  );
}
