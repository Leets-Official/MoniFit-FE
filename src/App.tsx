import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "./layouts/MobileLayout";
import LiquidSphereTestPage from "./pages/test/LiquidSphereTest";

import { TestForButtonPage, TestForInputPage } from "./pages/test";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}>
            <Route
              path="/test/liquid-sphere"
              element={<LiquidSphereTestPage />}
            />
            {/* 테스트 페이지용 라우팅 */}
            <Route path="/test/button" element={<TestForButtonPage />}></Route>
            <Route path="/test/input" element={<TestForInputPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
