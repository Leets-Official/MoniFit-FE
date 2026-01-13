import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";
import { Calendar } from "./components/common/calendar/Calendar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}></Route>
          <Route path="/calendar" element={<Calendar />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
