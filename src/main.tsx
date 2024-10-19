import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { APIKeyConfirmation } from "./api-key/confirmation";
import "./index.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

if (!localStorage.getItem("TEMP")) {
  localStorage.setItem("TEMP", "0.2");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <APIKeyConfirmation />
    </ThemeProvider>
  </StrictMode>
);
