import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";
import CalendarTestPage from "@/pages/test/CalendarTestPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}>
            <Route path="/test/calendar" element={<CalendarTestPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
