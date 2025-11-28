import { Outlet } from "react-router-dom";
import NavHeader from "../../components/NavHeader";
import "./StoreLayout.css";

export default function StoreLayout() {
  return (
    <div className="store-layout">
      <NavHeader />

      <main className="store-main">
        <Outlet />
      </main>

      <footer className="store-footer">
        <p>© 2025 BMTH Store. All rights reserved.</p>
      </footer>
    </div>
  );
}
