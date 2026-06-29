import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import DesosGrove from "./DesosGrove";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DesosGrove />
  </StrictMode>
);
