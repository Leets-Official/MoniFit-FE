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

export const MainPage = () => {
  const navigate = useNavigate();

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [percent] = useState(100);
  const [spent] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [alertQueue, setAlertQueue] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentAlert, setCurrentAlert] = useState<any>(null);
  const fillRatio = Math.min(1, Math.max(0, percent / 100));

  const mixColor = (from: string, to: string, t: number) => {
    const f = parseInt(from.replace("#", ""), 16);
    const tt = parseInt(to.replace("#", ""), 16);
    const r = Math.round(
      ((f >> 16) & 255) + (((tt >> 16) & 255) - ((f >> 16) & 255)) * t,
    );
    const g = Math.round(
      ((f >> 8) & 255) + (((tt >> 8) & 255) - ((f >> 8) & 255)) * t,
    );
    const b = Math.round((f & 255) + ((tt & 255) - (f & 255)) * t);
    return `rgb(${r} ${g} ${b})`;
  };

  const gradientCenter = mixColor("#7976FF", "#1F1F1F", 1 - fillRatio);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSaveExpense = (response: any) => {
    setShowModal(false);

    // 알림 큐 생성
    const alerts = [];

    // 1. 지출 입력 알림 (항상 표시)
    alerts.push({
      type: "지출" as const,
      value: response.expense?.categoryName,
      expense: response.expense?.amount,
    });

    // 2. 스탬프 알림 (showStamp가 true인 경우에만 추가)
    if (response.alerts?.expenseInput?.showStamp) {
      alerts.push({
        type: "스탬프" as const,
      });
    }

    // 알림 큐 설정 및 첫 번째 알림 표시
    setAlertQueue(alerts);
    setCurrentAlert(alerts[0]);

    // TODO: 메인 페이지 데이터 재조회
    // fetchMainPageData();

    console.log("지출 등록 완료:", response);
  };

  // 현재 알림 닫기 및 다음 알림 표시
  const handleCloseAlert = () => {
    const currentIndex = alertQueue.findIndex(
      (alert) => alert === currentAlert
    );
    const nextIndex = currentIndex + 1;

    if (nextIndex < alertQueue.length) {
      // 다음 알림 표시
      setCurrentAlert(alertQueue[nextIndex]);
    } else {
      // 모든 알림 표시 완료
      setCurrentAlert(null);
      setAlertQueue([]);
    }
  };

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return dateString.replace(/-/g, '.');
  };

  // 로딩 중
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <main className="relative flex h-full w-full flex-col items-center">
      <Header showStampButton={true} onStampClick={() => navigate("/stamp")} />

      {/* 알림 표시 */}
      {dashboardData?.alerts?.showWarning && dashboardData?.alerts?.warning && (
        <div className="mt-4 w-90 rounded-lg bg-yellow-500/20 p-4 text-center">
          <p className="text-body1 text-yellow-500">
            {dashboardData.alerts.warning.title}
          </p>
          <p className="text-body2 text-gray-300 mt-2">
            {dashboardData.alerts.warning.message}
          </p>
        </div>
      )}

      {dashboardData?.alerts?.showOverBudget && dashboardData?.alerts?.overBudget && (
        <div className="mt-4 w-90 rounded-lg bg-red-500/20 p-4 text-center">
          <p className="text-body1 text-red-500">
            {dashboardData.alerts.overBudget.title}
          </p>
          <p className="text-body2 text-gray-300 mt-2">
            {dashboardData.alerts.overBudget.message}
          </p>
        </div>
      )}

      {dashboardData?.alerts?.showPeriodComplete && dashboardData?.alerts?.periodComplete && (
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
            <directionalLight position={[1, 2, 3]} intensity={2.5} />
            <LiquidSphere percent={percent} />
          </Canvas>
        </div>

        <div className="absolute -bottom-30 left-1/2 flex -translate-x-1/2 flex-col items-center">
          <span className="text-body2 text-[#8A8A8A]">남은 금액</span>
          <span className="text-h1 text-gray-0 flex max-w-70 items-center gap-2 overflow-x-scroll">
            <span>₩</span>
            <span>{remainingBudget.toLocaleString()}</span>
          </span>
          <Button width="md" className="mt-3.5" onClick={() => setShowModal(true)}>
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
          <ExpenseRecordModal onClose={() => setShowModal(false)} onSave={handleSaveExpense} />
        </ModalWrapper>
      )}

      {currentAlert && (
        <div className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
          <AlertModal
            type={currentAlert.type}
            value={currentAlert.value}
            expense={currentAlert.expense}
            onClose={handleCloseAlert}
          />
        </div>
      )}
    </main>
  );
};