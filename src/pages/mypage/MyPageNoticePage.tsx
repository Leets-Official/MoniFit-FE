import { useNavigate } from "react-router-dom";
import MyPageTopBar from "./_components/MyPageTopBar";
import MyPageSubHeader from "./_components/MyPageSubHeader";

const NOTICE = [
  {
    q: "예산 기간은 어떻게 설정되나요?",
    a: "예산 기간은 오늘 날짜를 기준으로 자동으로 30일로 설정돼요. 예산을 설정한 날부터 30일 동안 지출을 관리할 수 있어요. 기간이 종료되면, 해당 기간의 지출 기록은 리포트에서 확인할 수 있어요.",
  },
  {
    q: "왜 예산 기간은 30일만 설정할 수 있나요?",
    a: "모니핏은 짧은 기간 안에서 소비 흐름을 점검하고 조정하는 데 집중한 서비스예요. 그래서 예산 기간을 1개월로 고정해, 지출을 더 명확하게 인식하고 부담 없이 다시 목표를 조정할 수 있도록 설계했어요. 복잡한 기간 설정 대신, 기록 → 점검 → 재설정의 흐름을 반복하는 데 집중할 수 있도록 했습니다.",
  },
  {
    q: "시작일은 어떤 기준으로 정해지나요?",
    a: "시작일은 지금까지 설정한 모든 예산 중, 가장 처음 설정한 예산의 시작일을 기준으로 표시돼요. 이전 기록과의 연속성을 유지하기 위해 시작일은 자동으로 관리됩니다.",
  },
  {
    q: "기간 중 예산을 초과하면 어떻게 되나요?",
    a: "예산을 초과하면 목표 재설정하기 화면으로 이동해 다시 예산을 설정해야 해요. 이 과정은 기록을 끊기 위한 것이 아니라, 현재 소비 흐름에 맞게 목표를 다시 맞추기 위한 단계예요. 예산을 재설정한 이후에도 지출 기록은 계속할 수 있고, 새로 설정한 예산 기준으로 사용 현황과 리포트가 다시 계산됩니다.",
  },
  {
    q: "이전 기간의 리포트도 다시 볼 수 있나요?",
    a: "네. 완료된 기간의 기록이 쌓이면 리포트에서 다시 확인할 수 있어요.",
  },
];

export default function MyPageNoticePage() {
  const navigate = useNavigate();

  return (
    <main className="flex h-full w-full flex-col">
      <MyPageTopBar />
      <MyPageSubHeader title="모니핏 참고사항" onBack={() => navigate(-1)} />

      <section className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-6">
        {NOTICE.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <p className="text-sub1 text-primary-40">
              {idx + 1}. {item.q}
            </p>
            <p className="text-body11 text-gray-0 whitespace-pre-line">{item.a}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
