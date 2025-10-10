import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#e91717" },
    background: { default: "#725959ff", paper: "#000000ff" },
    text: { primary: "#fff", secondary: "#aaa" },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#e91717",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff3333",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ff5555",
            boxShadow: "0 0 8px rgba(233, 23, 23, 0.6)",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: "#e917178a",
          color: "#fff",
          "&:hover": {
            borderColor: "#e91717",
            boxShadow: "0 0 8px rgba(255, 0, 0, 0.5)",
          },
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);