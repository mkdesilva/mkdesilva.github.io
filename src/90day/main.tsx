import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../desos-grove/styles/index.css";
import NinetyDayCalculator from "./NinetyDayCalculator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NinetyDayCalculator />
  </StrictMode>
);
