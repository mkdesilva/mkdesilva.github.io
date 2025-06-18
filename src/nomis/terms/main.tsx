import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../index.css";
import TermsOfService from "./TermsOfService";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TermsOfService />
  </StrictMode>
);
