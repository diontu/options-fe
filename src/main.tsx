import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import { ScrollToTop } from "./components/ScrollToTop.tsx";
import DirectionPage from "./pages/DirectionPage.tsx";
import EntryFrameworkPage from "./pages/EntryFrameworkPage.tsx";

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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
