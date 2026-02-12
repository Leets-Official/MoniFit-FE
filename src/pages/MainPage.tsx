import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { CalendarIcon, ReportIcon } from "@/assets/icons";
import { AlertModal, Button, ExpenseRecordModal, Header, LiquidSphere } from "@/components";
import { ModalWrapper } from "@/components/modal/ModalWrapper";
import { getDashboard, createExpense } from "@/api/budgetPeriod";
import type { DashboardData } from "@/api/budgetPeriod"; 

const CATEGORY_LABEL: Record<string, "식비" | "쇼핑" | "의료" | "생활" | "기타"> = {
  FOOD: "식비",
  SHOPPING: "쇼핑",
  MEDICAL: "의료",
  LIVING: "생활",
  ETC: "기타",
};

export const MainPage = () => {
  const navigate = useNavigate();

  /* -------------------- state -------------------- */
  const [loading, setLoading] = useState(true);
  const [expenseAlert, setExpenseAlert] = useState<{ category: string; amount: number } | null>(null);
  const [showStampAlert, setShowStampAlert] = useState(false);
  
  // API 데이터 state
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [showModal, setShowModal] = useState(false);

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

  const handleSaveExpense = async (expense: number, category: string) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const spentDate = `${year}-${month}-${day}`;

    try {
      const result = await createExpense(category, expense, spentDate);
      const data = await getDashboard();

      if (data.hasPeriod && data.period) {
        setDashboardData(data);
        setRemainingBudget(data.period.remainingBudget);
      }

      setShowModal(false);
      setExpenseAlert({ category, amount: expense });

      if (result.alerts.showStamp) {
        setShowStampAlert(true);
      }
    } catch (error) {
      console.error('지출 기록 실패:', error);
      throw error;
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.replace(/-/g, ".");
  };

  /* -------------------- 로딩 처리 -------------------- */
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
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

      {(expenseAlert || showStampAlert) && (
        <div className="absolute top-16 z-50 flex flex-col items-center gap-3">
          {expenseAlert && (
            <AlertModal
              type="지출"
              value={CATEGORY_LABEL[expenseAlert.category]}
              expense={expenseAlert.amount}
              onClose={() => setExpenseAlert(null)}
            />
          )}
          {showStampAlert && (
            <AlertModal
              type="스탬프"
              onClose={() => setShowStampAlert(false)}
              onNavigate={() => navigate("/stamp")}
            />
          )}
        </div>
      )}

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
          onClick={() => navigate('/report')}
        >
          <ReportIcon />
          <span>리포트</span>
        </Button>
      </section>

      {showModal && (
        <ModalWrapper onClose={() => setShowModal(false)}>
          <ExpenseRecordModal
            onClose={() => setShowModal(false)}
            onSave={handleSaveExpense}
          />
        </ModalWrapper>
      )}

    </main>
  );
};

export default MainPage;