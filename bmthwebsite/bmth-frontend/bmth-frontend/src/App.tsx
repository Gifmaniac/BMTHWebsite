import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/sidebar"
import StoreRoutes from "./pages/Store/storeroutes/StoreRoutes";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e91717", // BMTH red
    },
    background: {
      default: "#000", // page background
      paper: "#111",   // components background (cards, modals)
    },
    text: {
      primary: "#fff",
      secondary: "#aaa",
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <Routes>
      {/* Routes with side bar */}
      <Route
        path="/"
        element={
          <div className="app-layout">
            <Sidebar />
            <main>
            </main>
          </div>
        }
      />

      {/* Routes without sidebar */}
      <Route path="/store/*" element={<StoreRoutes />} />
    </Routes>
  );
}


export default App;