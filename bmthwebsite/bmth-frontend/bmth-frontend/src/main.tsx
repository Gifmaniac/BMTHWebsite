import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./context/store/CartContext.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "./context/store/user/AuthContext";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#725386" },
    background: { default: "#725959ff", paper: "#000000ff" },
    text: { primary: "#fff", secondary: "#aaa" },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#725386",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#725386",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#725386",
            boxShadow: "0 0 30px #725386",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderColor: "#725386",
          color: "#fff",
          "&:hover": {
            borderColor: "#725386",
            boxShadow: "0 0 30px #725386",
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
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
