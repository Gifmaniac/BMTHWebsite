import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/store/user/AuthContext";
import "./StoreLayout.css";


export default function StoreLayout() {
  const { auth } = useAuth();
  return (
    <div className="store-layout">
        <h1 className="store-title">BRING ME THE HORIZON MERCHANDISE</h1>
        
        <header className="store-header">
            <nav className="store-nav">
            <Link to="/">HOME</Link>
            <Link to="/store/music">MUSIC</Link>
            <Link to="/store/apparel">APPAREL</Link>
            <Link to="/store/cart">CART</Link>
            {!auth.loading && !auth.user && <Link to="/login">Login</Link>}
            {!auth.loading && auth.user && <Link to="/account">Account</Link>}            
            </nav>
        </header>

      <main className="store-main">
        <Outlet />
      </main>

      <footer className="store-footer">
        <p>© 2025 BMTH Store. All rights reserved.</p>
      </footer>
    </div>
  );
}