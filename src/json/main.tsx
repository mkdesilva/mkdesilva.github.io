import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import JsonPage from "./JsonPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <JsonPage />
  </StrictMode>
);
