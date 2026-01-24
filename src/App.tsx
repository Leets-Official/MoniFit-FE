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
} from "./pages/test";

import { MainPage } from "./pages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
          <Route path="/" element={<MainPage />} />

          {/* 테스트 페이지용 라우팅 */}
          <Route path="/test/calendar" element={<CalendarTestPage />} />
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

          {/* SideSheet 테스트 페이지 */}
          <Route path="/test/side-sheet" element={<TestForSideSheetPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
