import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import CandlesPage from "./pages/CandlesPage.tsx";
import DirectionPage from "./pages/DirectionPage.tsx";
import EntryFrameworkPage from "./pages/EntryFrameworkPage.tsx";
import EventWeekPage from "./pages/EventWeekPage.tsx";
import InstitutionsPage from "./pages/InstitutionsPage.tsx";
import MarketHoursPage from "./pages/MarketHoursPage.tsx";
import MarketPricingPage from "./pages/MarketPricingPage.tsx";
import PatternsPage from "./pages/PatternsPage.tsx";
import RiskPage from "./pages/RiskPage.tsx";
import VolumePage from "./pages/VolumePage.tsx";

const rootEl = document.getElementById("root");
if (!rootEl) throw new Error("Root element not found");

createRoot(rootEl).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/entry" element={<EntryFrameworkPage />} />
        <Route path="/direction" element={<DirectionPage />} />
        <Route path="/pricing" element={<MarketPricingPage />} />
        <Route path="/hours" element={<MarketHoursPage />} />
        <Route path="/candles" element={<CandlesPage />} />
        <Route path="/patterns" element={<PatternsPage />} />
        <Route path="/event-week" element={<EventWeekPage />} />
        <Route path="/volume" element={<VolumePage />} />
        <Route path="/institutions" element={<InstitutionsPage />} />
        <Route path="/risk" element={<RiskPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
