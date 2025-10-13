import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/sidebar"
import StoreRoutes from "./pages/Store/storeroutes/StoreRoutes";
import StoreGenderSelect from "./pages/Store/storegenderselect/StoreGenderSelect";

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
      <Route path="/store/*" element={<StoreRoutes />}/>
      <Route path="apparel" element={<StoreGenderSelect />} />
    </Routes>
  );
}


export default App;