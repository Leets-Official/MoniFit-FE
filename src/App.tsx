import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";

import {
  TestForButtonPage,
  TestForCategoryButtonPage,
  TestForExpenseRecordModalPage,
  TestForInputPage,
  TestForLiquidSpherePage,
} from "./pages/test";

import { MainPage } from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}>
            <Route path="/" element={<MainPage />} />
            {/* 테스트 페이지용 라우팅 */}
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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
