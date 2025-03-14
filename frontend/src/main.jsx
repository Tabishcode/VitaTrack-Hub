import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './App.jsx'

// Render the application with routing
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App/>
  </StrictMode>
);

