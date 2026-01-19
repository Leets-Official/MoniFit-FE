import { CalendarIcon, ReportIcon } from "@/assets/icons";
import { Button } from "@/components/common/Button";

export const TestForButtonPage = () => {
  return (
    <>
      <main className="flex flex-col items-center justify-start w-full h-full gap-4 pt-10 bg-black opacity-70">
        <div className="flex justify-center w-full gap-1">
          <Button>다음</Button>
        </div>
        <div className="flex justify-center w-full gap-1">
          <Button width="md">지출 입력하기</Button>
        </div>
        <div className="flex justify-center w-full gap-2">
          <Button
            bgColor={"none"}
            width={"xs"}
            borderColor={"outline"}
            height={"sm"}
            fontColor={"white"}
          >
            지우기
          </Button>
          <Button width={"lg"} height={"sm"}>
            저장하기
          </Button>
        </div>
        <div className="flex justify-center w-full gap-2">
          <Button
            bgColor={"none"}
            fontColor={"white"}
            width={"xs"}
            borderColor={"outline"}
            height={"sm"}
            className="gap-1"
          >
            <CalendarIcon />
            <span>달력</span>
          </Button>
          <Button
            bgColor={"none"}
            fontColor={"white"}
            width={"xs"}
            borderColor={"outline"}
            height={"sm"}
            className="gap-1"
          >
            <ReportIcon />
            <span>리포트</span>
          </Button>
        </div>

        <Button bgColor={"grey"} rounded={"xs"} fontColor={"white"}>
          스탬프 보러가기
        </Button>
      </main>
    </>
  );
};
