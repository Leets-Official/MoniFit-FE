import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";
import BudgetSettingPage from "./pages/onboarding/BudgetSettingPage";
import CalendarTestPage from "@/pages/test/CalendarTestPage";
import DonutChartTestPage from "@/pages/DonutChartTestPage";

import SplashPage from "./pages/auth/SplashPage";
import LoginPage from "./pages/auth/LoginPage";
import CallbackPage from "./pages/auth/CallbackPage";
import CalendarPage from "./pages/CalendarPage";
import { MainPage } from "./pages";
import { MyPageMainPage, MyPageNoticePage, MyPageProfilePage } from "./pages/mypage";

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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route index element={<SplashPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/oauth/callback" element={<CallbackPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/onboarding/budget-setting" element={<BudgetSettingPage />} />
          <Route path="/calendar" element={<CalendarPage />} />

          <Route path="/mypage" element={<MyPageMainPage />} />
          <Route path="/mypage/profile" element={<MyPageProfilePage />} />
          <Route path="/mypage/notice" element={<MyPageNoticePage />} />

          <Route path="/test/calendar" element={<CalendarTestPage />} />
          <Route path="/test/donut-chart" element={<DonutChartTestPage />} />
          <Route path="/test/button" element={<TestForButtonPage />} />
          <Route path="/test/input" element={<TestForInputPage />} />
          <Route path="/test/category-button" element={<TestForCategoryButtonPage />} />
          <Route path="/test/modal/expense-record" element={<TestForExpenseRecordModalPage />} />
          <Route path="/test/sphere/liquid-sphere" element={<TestForLiquidSpherePage />} />
          <Route path="/test/side-sheet" element={<TestForSideSheetPage />} />
          <Route path="/test/budget-progress-card" element={<TestForBudgetProgressCardPage />} />
          <Route path="/test/common-card" element={<TestForCommonCardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
