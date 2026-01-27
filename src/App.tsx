import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";
import BudgetSettingPage from "./pages/onboarding/BudgetSettingPage";
import CalendarTestPage from "@/pages/test/CalendarTestPage";
import CategoryTestPage from "@/pages/test/CategoryTestPage";
import DonutChartTestPage from "@/pages/DonutChartTestPage";

import {
  TestForButtonPage,
  TestForCategoryButtonPage,
  TestForExpenseRecordModalPage,
  TestForInputPage,
  TestForLiquidSpherePage,
  TestForSideSheetPage,
  TestForBudgetProgressCardPage,
  TestForCommonCardPage,
} from "./pages/test";

import { MainPage } from "./pages";
import CalendarPage from "./pages/CalendarPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          {/* 메인 페이지 */}
          <Route path="/" element={<MainPage />} />
          <Route path="/onboarding/budget-setting" element={<BudgetSettingPage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          {/* 테스트 페이지용 라우팅 (하나의 리스트로 병합) */}
          <Route path="/test/calendar" element={<CalendarTestPage />} />
          <Route path="/test/category" element={<CategoryTestPage />} />
          <Route path="/test/donut-chart" element={<DonutChartTestPage />} />
          <Route path="/test/button" element={<TestForButtonPage />} />
          <Route path="/test/input" element={<TestForInputPage />} />
          <Route
            path="/test/category-button"
            element={<TestForCategoryButtonPage />}
          />
          <Route
            path="/test/modal/expense-record"
            element={<TestForExpenseRecordModalPage />}
          />
          <Route
            path="/test/sphere/liquid-sphere"
            element={<TestForLiquidSpherePage />}
          />
          <Route path="/test/side-sheet" element={<TestForSideSheetPage />} />
          <Route
            path="/test/budget-progress-card"
            element={<TestForBudgetProgressCardPage />}
          />
          <Route
            path="/test/common-card"
            element={<TestForCommonCardPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}