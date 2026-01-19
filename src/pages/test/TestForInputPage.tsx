import { Input } from "@/components/common/Input";

export const TestForInputPage = () => {
  return (
    <>
      <main className="flex h-full w-full flex-col items-center justify-start gap-4 bg-black pt-10 opacity-70">
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <Input width="large" placeholder="금액을 입력하세요" suffix="원" />
          <Input width="large" type="number" placeholder="금액을 입력하세요" />
          <Input width="medium" placeholder="홍길동" />
          <Input width="small" type="number" placeholder="홍길동" suffix="원" />
          <Input width="small" placeholder="홍길동" suffix="원" />
        </div>
      </main>
    </>
  );
};
