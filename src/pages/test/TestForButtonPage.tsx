import { Button } from "@/components/common/Button";

export const TestForButtonPage = () => {
  return (
    <>
      <main className="flex h-full w-full flex-col items-center justify-center gap-4 bg-black opacity-70">
        <Button>다음</Button>
        <Button bgColor={"grey"} rounded={"xs"} fontColor={"white"}>
          스탬프 보러가기
        </Button>
        <Button
          bgColor={"none"}
          fontColor={"white"}
          width={"xs"}
          borderColor={"outline"}
          height={"sm"}
        >
          지우기
        </Button>
      </main>
    </>
  );
};
