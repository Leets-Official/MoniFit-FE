import "@/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MobileLayout from "@/layouts/MobileLayout";
import DonutChartTestPage from "@/pages/DonutChartTestPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />} />
        <Route path="/test/donut" element={<DonutChartTestPage />} />
      </Routes>
    </BrowserRouter>
  );
}
