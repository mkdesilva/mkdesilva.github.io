import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../desos-grove/styles/index.css";
import Tm47Form from "./Tm47Form";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Tm47Form />
  </StrictMode>
);
