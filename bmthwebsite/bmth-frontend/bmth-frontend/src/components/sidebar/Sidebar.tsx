import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import type { NavItems } from "./types";

export const Sidebar = () => {
  const navItems: NavItems[] = [
    { id: 1, label: "Home", path: "/" },
    { id: 2, label: "Store", path: "/store" },
  ];

    const location = useLocation();

    return (
        <aside className="sidebar">
            <nav>
                <ul>
                    {navItems.map((item) => (
                    <li
                        key={item.id}
                        className={
                            location.pathname.startsWith(item.path) ? "active" : ""
                        }
                        >
                            <Link to={item.path}>{item.label}</Link>
                    </li> 
                    ))}
                </ul>
            </nav>
        </aside>
    );
};