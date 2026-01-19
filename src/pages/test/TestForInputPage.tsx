import { Input } from "@/components/common/Input";

export const TestForInputPage = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-start w-full h-full gap-4 pt-10 bg-black opacity-70">
        <div className="flex flex-col items-center justify-center w-full gap-2">
          <Input />
          <Input width="medium" height="medium" />
        </div>
      </main>
    </>
  );
};
