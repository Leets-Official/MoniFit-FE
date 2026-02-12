import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { CalendarIcon, ReportIcon } from "@/assets/icons";
import {
  Button,
  ExpenseRecordModal,
  Header,
  LiquidSphere,
} from "@/components";
import { AlertModal } from "@/components/modal/AlertModal";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import ReportPage from "./ReportPage";
import { getDashboard } from "@/api/budgetPeriod";
import type { DashboardData } from "@/api/budgetPeriod";

/* -------------------- 타입 정의 -------------------- */

type ExpenseCategory =
  | "식비"
  | "쇼핑"
  | "의료"
  | "생활"
  | "기타";

type AlertType =
  | { type: "지출"; value?: ExpenseCategory; expense?: number }
  | { type: "스탬프" };

interface SaveExpenseResponse {
  expense?: {
    categoryName?: string;
    amount?: number;
  };
  alerts?: {
    expenseInput?: {
      showStamp?: boolean;
    };
  };
}

/* -------------------- 컴포넌트 -------------------- */

export const MainPage = () => {
  const navigate = useNavigate();

  /* -------------------- state -------------------- */
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);

  const [remainingBudget, setRemainingBudget] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [alertQueue, setAlertQueue] = useState<AlertType[]>([]);
  const [currentAlert, setCurrentAlert] =
    useState<AlertType | null>(null);

  /* -------------------- 데이터 조회 -------------------- */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();

        if (!data.hasPeriod || !data.period) {
          navigate("/onboarding/budget-setting");
          return;
        }

        setDashboardData(data);
        setRemainingBudget(data.period.remainingBudget);
        setStartDate(data.period.startDate);
        setEndDate(data.period.endDate);
      } catch (error) {
        console.error("대시보드 조회 실패:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  /* -------------------- 계산 -------------------- */
  const percent =
    dashboardData?.period
      ? (dashboardData.period.remainingBudget /
          dashboardData.period.budgetAmount) *
        100
      : 100;

  const fillRatio = Math.min(1, Math.max(0, percent / 100));

  const mixColor = (from: string, to: string, t: number) => {
    const f = parseInt(from.replace("#", ""), 16);
    const tt = parseInt(to.replace("#", ""), 16);
    const r = Math.round(
      ((f >> 16) & 255) +
        (((tt >> 16) & 255) - ((f >> 16) & 255)) * t
    );
    const g = Math.round(
      ((f >> 8) & 255) +
        (((tt >> 8) & 255) - ((f >> 8) & 255)) * t
    );
    const b = Math.round(
      (f & 255) + ((tt & 255) - (f & 255)) * t
    );
    return `rgb(${r} ${g} ${b})`;
  };

  const gradientCenter = mixColor(
    "#7976FF",
    "#1F1F1F",
    1 - fillRatio
  );

  /* -------------------- 지출 저장 -------------------- */
  const handleSaveExpense = async (
    response: SaveExpenseResponse
  ) => {
    setShowModal(false);

    const alerts: AlertType[] = [];

    // 1. 지출 입력 알림 (항상 표시)
    alerts.push({
      type: "지출",
      value:
        response.expense?.categoryName as
          | ExpenseCategory
          | undefined,
      expense: response.expense?.amount,
    });

    // 2. 스탬프 알림 (showStamp가 true인 경우에만 추가)
    if (response.alerts?.expenseInput?.showStamp) {
      alerts.push({ type: "스탬프" });
    }

    setAlertQueue(alerts);
    setCurrentAlert(alerts[0]);

    console.log("지출 등록 완료:", response);

    try {
    const data = await getDashboard();
    if (data.hasPeriod && data.period) {
      setDashboardData(data);
      setRemainingBudget(data.period.remainingBudget);
      setStartDate(data.period.startDate);
      setEndDate(data.period.endDate);
    }
  } catch (error) {
    console.error("대시보드 새로고침 실패:", error);
  }
  };

  const handleCloseAlert = () => {
    const currentIndex = alertQueue.findIndex(
      (alert) => alert === currentAlert
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < alertQueue.length) {
      setCurrentAlert(alertQueue[nextIndex]);
    } else {
      setCurrentAlert(null);
      setAlertQueue([]);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.replace(/-/g, ".");
  };

  /* -------------------- 로딩 처리 -------------------- */
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  /* -------------------- UI -------------------- */
  return (
    <main className="relative flex h-full w-full flex-col items-center">
      <Header
        showStampButton={true}
        onStampClick={() => navigate("/stamp")}
      />

      {/* 알림 표시 */}
      {dashboardData?.alerts?.showWarning &&
        dashboardData?.alerts?.warning && (
          <div className="mt-4 w-90 rounded-lg bg-yellow-500/20 p-4 text-center">
            <p className="text-body1 text-yellow-500">
              {dashboardData.alerts.warning.title}
            </p>
            <p className="text-body2 text-gray-300 mt-2">
              {dashboardData.alerts.warning.message}
            </p>
          </div>
        )}

      {dashboardData?.alerts?.showOverBudget &&
        dashboardData?.alerts?.overBudget && (
          <div className="mt-4 w-90 rounded-lg bg-red-500/20 p-4 text-center">
            <p className="text-body1 text-red-500">
              {dashboardData.alerts.overBudget.title}
            </p>
            <p className="text-body2 text-gray-300 mt-2">
              {dashboardData.alerts.overBudget.message}
            </p>
          </div>
        )}

      {dashboardData?.alerts?.showPeriodComplete &&
        dashboardData?.alerts?.periodComplete && (
          <div className="mt-4 w-90 rounded-lg bg-green-500/20 p-4 text-center">
            <p className="text-body1 text-green-500">
              {dashboardData.alerts.periodComplete.title}
            </p>
            <p className="text-body2 text-gray-300 mt-2">
              {dashboardData.alerts.periodComplete.message1}
            </p>
            <p className="text-body2 text-gray-300">
              {dashboardData.alerts.periodComplete.message2}
            </p>
          </div>
        )}

      <section className="mt-6.25 flex h-fit w-full justify-center">
        <div className="text-body2 flex h-8 w-fit items-center gap-1 rounded-[60px] bg-[#7976FF80] px-3 py-1.5 text-[#DCDCDC]">
          <span>{formatDate(startDate)}</span>
          <span>-</span>
          <span>{formatDate(endDate)}</span>
        </div>
      </section>

      <section className="relative">
        <div
          className="relative h-90 w-90"
          style={{
            background: `radial-gradient(circle at center, ${gradientCenter} 0%, #1F1F1F 49%)`,
          }}
        >
          <Canvas>
            <ambientLight intensity={1.2} />
            <directionalLight
              position={[1, 2, 3]}
              intensity={2.5}
            />
            <LiquidSphere percent={percent} />
          </Canvas>
        </div>

        <div className="absolute -bottom-30 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <span className="text-body2 text-[#8A8A8A]">
            남은 금액
          </span>
          <span className="text-h1 text-gray-0 flex max-w-70 items-center gap-2 overflow-x-scroll">
            <span>₩</span>
            <span>{remainingBudget.toLocaleString()}</span>
          </span>
          <Button
            width="md"
            className="mt-3.5"
            onClick={() => setShowModal(true)}
          >
            지출 입력하기
          </Button>
        </div>
      </section>

      <section className="absolute bottom-20 flex w-full items-center justify-center gap-3">
        <Button
          width="sm"
          borderColor="outline"
          bgColor="none"
          className="flex gap-2"
          fontColor="white"
          onClick={() => navigate("/calendar")}
        >
          <CalendarIcon />
          <span>달력</span>
        </Button>

        <Button
          width="md"
          borderColor="outline"
          bgColor="none"
          className="flex gap-2"
          fontColor="white"
          onClick={() => setIsReportOpen(true)}
        >
          <ReportIcon />
          <span>리포트</span>
        </Button>
      </section>

      {isReportOpen && (
        <div className="fixed inset-0 z-50 bg-transparent">
          <ReportPage onClose={() => setIsReportOpen(false)} />
        </div>
      )}

      {showModal && (
        <ModalWrapper onClose={() => setShowModal(false)}>
          <ExpenseRecordModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveExpense}
          />
        </ModalWrapper>
      )}

      {currentAlert && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
          <AlertModal
            type={currentAlert.type}
            value={
              currentAlert.type === "지출"
                ? currentAlert.value
                : undefined
            }
            expense={
              currentAlert.type === "지출"
                ? currentAlert.expense
                : undefined
            }
            onClose={handleCloseAlert}
          />
        </div>
      )}
    </main>
  );
};

export default MainPage;