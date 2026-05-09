import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import QrPage from "./QrPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QrPage />
  </StrictMode>
);
