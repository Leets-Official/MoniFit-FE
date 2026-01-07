import Input from "../../components/common/Input";

export default function SignUpPage() {
  return (
    <>
      <main className="flex flex-col items-center justify-center w-full mt-20">
        <h1 className="mb-4 text-[40px] font-normal text-[#EAEAEA]">
          모니핏 회원가입
        </h1>
        <span className="text-base font-medium text-[#D9D9D9]">
          아이디와 이메일로 간편하게 모니핏을 시작하세요!
        </span>
        <div className="">
          <Input placeholder="아이디" />
          <Input placeholder="비밀번호" />
          <Input placeholder="비밀번호 확인" />
          <div className="flex gap-2">
            <Input width="md" placeholder="이메일" />
          </div>
        </div>
      </main>
    </>
  );
}
