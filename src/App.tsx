import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import MobileLayout from "./layouts/MobileLayout";
import LiquidSphereTestPage from "./pages/test/LiquidSphereTest";

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
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
