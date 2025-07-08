import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import NomisLanding from "./NomisLanding";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NomisLanding />
  </StrictMode>
);
