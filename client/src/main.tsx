import { createRoot } from "react-dom/client";
import App from "./App";
import { initLoremMode } from "./lib/loremMode";
import "./index.css";

// Optional lorem-ipsum copy variant: activated via ?lorem=1 or a build-time
// window.__LOREM__ flag (used by the standalone lorem export).
initLoremMode();

createRoot(document.getElementById("root")!).render(<App />);
