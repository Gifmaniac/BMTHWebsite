import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import "./HomeLanding.css";

const navItems = [
  { index: "INDX.01", label: "Home", path: "/" },
  { index: "INDX.02", label: "Login", path: "/login"},
  { index: "INDX.03", label: "Store", path: "/store" },
  { index: "INDX.04", label: "Tour", path: "/Tour"}
];

export default function HomeLanding() {
  return (
    <div className="home-landing">
      <div className="home-landing__grain" aria-hidden="true" />
      <div className="home-landing__grid">
        <nav className="home-landing__menu" aria-label="Primary">
          <ul>
            {navItems.map((item, idx) => (
              <li key={item.index} style={{ "--i": idx } as CSSProperties}>
                <span className="home-landing__index">{item.index}</span>
                <Link className="home-landing__link" to={item.path}>
                  <span className="home-landing__label">{item.label}</span>
                  <span className="home-landing__arrow">-&gt;</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="home-landing__emblem" aria-hidden="true">
          <svg viewBox="0 0 400 400" role="presentation">
            <circle cx="200" cy="200" r="170" />
            <path d="M200 42 L240 182 L358 182 L262 250 L300 362 L200 290 L100 362 L138 250 L42 182 L160 182 Z" />
            <path d="M200 70 L200 330" />
            <path d="M70 200 L330 200" />
            <path d="M110 110 L290 290" />
            <path d="M290 110 L110 290" />
          </svg>
        </div>

        <div className="home-landing__caption">
          <span>BRING ME THE HORIZON</span>
          <span>INDEX OF THE TOURING ARCHIVE</span>
        </div>
      </div>
    </div>
  );
}
