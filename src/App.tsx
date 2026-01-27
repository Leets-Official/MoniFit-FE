import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";
import CalendarTestPage from "@/pages/test/CalendarTestPage";
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
import { MyPageMainPage, MyPageNoticePage, MyPageProfilePage } from "./pages/mypage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route path="/" element={<MainPage />} />

          {/* MyPage */}
          <Route path="/mypage" element={<MyPageMainPage />} />
          <Route path="/mypage/profile" element={<MyPageProfilePage />} />
          <Route path="/mypage/notice" element={<MyPageNoticePage />} />

          {/* 테스트 페이지용 라우팅 */}
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
