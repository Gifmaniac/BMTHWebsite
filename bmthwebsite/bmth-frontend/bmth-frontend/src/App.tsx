import { Routes, Route } from "react-router-dom";
import "./App.css";
import StoreRoutes from "./pages/Store/storeroutes/StoreRoutes";
import StoreGenderSelect from "./pages/Store/storegenderselect/StoreGenderSelect";
import CartDetails from "./pages/Store/cart/Cart";
import Register from "./pages/User/register/register";
import Login from "./pages/User/login/Login";
import Logout from "./pages/User/logout/Logout";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/guards/AdminRoute";
import Account from "./pages/User/account/Account";
import HomeLanding from "./pages/Home/HomeLanding";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeLanding />} />

      {/* Routes without sidebar */}
      <Route path="/store/*" element={<StoreRoutes />}/>
      <Route path="apparel" element={<StoreGenderSelect />} />
      <Route path="cart" element={<CartDetails />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="logout" element={<Logout />} />
      <Route path="account" element={<Account />} />
      <Route
        path="admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />
    </Routes>
  );
}


export default App;

