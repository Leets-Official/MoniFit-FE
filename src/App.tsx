import "@/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "@/layouts/MobileLayout";
<<<<<<< HEAD

import SignUpPage from "./pages/auth/SignUpPage";
=======
>>>>>>> a80ba2e (setting:alias 관련 설정 추가:)

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MobileLayout />}>
            <Route path="sign-up" element={<SignUpPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
