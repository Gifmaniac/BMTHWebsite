import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Sidebar } from "./components/sidebar"
import StoreRoutes from "./pages/Store/storeroutes/StoreRoutes";
import StoreGenderSelect from "./pages/Store/storegenderselect/StoreGenderSelect";
import CartDetails from "./pages/Store/cart/Cart";
import Register from "./pages/User/register/register";
import Login from "./pages/User/login/Login";
import Logout from "./pages/User/logout/Logout";

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
      <Route path="cart" element={<CartDetails />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
    </Routes>
  );
}


export default App;

