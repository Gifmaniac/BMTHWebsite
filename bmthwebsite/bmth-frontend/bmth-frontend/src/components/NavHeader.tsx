import { Link } from "react-router-dom";
import { useAuth } from "../context/store/user/AuthContext";
import "../layout/storelayout/StoreLayout.css";

export default function NavHeader() {
  const { auth } = useAuth();

  return (
    <>
      <h1 className="store-title">BRING ME THE HORIZON MERCHANDISE</h1>

      <header className="store-header">
        <nav className="store-nav">
          <Link to="/">HOME</Link>
          <Link to="/store/apparel">APPAREL</Link>
          <Link to="/store/cart">CART</Link>
          {!auth.loading && !auth.user && <Link to="/login">Login</Link>}
          {!auth.loading && auth.user && <Link to="/account">Account</Link>}
          {!auth.loading && auth.user?.role === "Admin" && <Link to="/admin">Admin</Link>}
          {!auth.loading && auth.user && <Link to="/logout">Logout</Link>}
        </nav>
      </header>
    </>
  );
}
