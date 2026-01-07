import Button from "@/components/common/Button";
import GuideLabel from "@/components/common/GuideLabel";
import Input from "@/components/common/Input";
import { useState } from "react";

export default function SignUpPage() {
  const [idValue, setIdValue] = useState("");
  const [verifyValue, setVerifyValue] = useState("");

  // const idRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isEmailValid = emailRegex.test(verifyValue);
  // if (verifyValue === "success") {
  //   setIsActive(true);
  // } else {
  //   setIsActive(false);
  // }

  return (
    <>
      <main className="relative flex flex-col items-center w-full h-full px-3">
        <div className="flex flex-col items-center justify-center w-full gap-4 mt-20 mb-24">
          <h1 className="text-left text-[40px] font-normal text-[#EAEAEA]">
            모니핏 회원가입
          </h1>
          <div className="w-full text-base font-medium text-[#D9D9D9]">
            아이디와 이메일로 간편하게 모니핏을 시작하세요!
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <Input
            type="email"
            placeholder="아이디"
            value={idValue}
            onChange={(e) => setIdValue(e.target.value)}
          />

          <GuideLabel
            intent={
              idValue === ""
                ? "guide"
                : emailRegex.test(idValue)
                  ? "success"
                  : "error"
            }
          >
            {idValue === ""
              ? "이메일을 입력하세요."
              : emailRegex.test(idValue)
                ? "이메일 형식이 올바릅니다."
                : "이메일 형식이 올바르지 않습니다."}
          </GuideLabel>
          <Input placeholder="비밀번호" className="mb-4" />
          <Input placeholder="비밀번호 확인" />

          <span className="mt-2 mb-4 w-full text-[13px] font-medium text-[#757575]">
            영문 소문자 또는 영문 소문자, 숫자 조합 8~16 자리
          </span>
          <div className="flex gap-2">
            <div>
              <Input
                width="md"
                placeholder="이메일"
                type="email"
                value={verifyValue}
                onChange={(e) => setVerifyValue(e.target.value)}
              />
              <GuideLabel
                intent={
                  verifyValue === ""
                    ? "guide"
                    : emailRegex.test(verifyValue)
                      ? "success"
                      : "error"
                }
              >
                {verifyValue === ""
                  ? ""
                  : emailRegex.test(verifyValue)
                    ? "이메일 형식이 올바릅니다."
                    : "이메일 형식이 올바르지 않습니다."}
              </GuideLabel>
            </div>
            <Button width="xs" fontSize="sm" disabled={!isEmailValid}>
              인증번호 전송
            </Button>
          </div>
          <Button width="md" className="absolute bottom-6">
            가입하기
          </Button>
        </div>
      </main>
    </>
  );
}
