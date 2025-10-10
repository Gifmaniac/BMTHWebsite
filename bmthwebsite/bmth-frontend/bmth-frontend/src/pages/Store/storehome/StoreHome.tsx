import { useNavigate } from "react-router-dom";
import "./Store.css";

export default function StoreHome() {
  const navigate = useNavigate();

  const handleSelect = (gender: string) => {
    navigate(`/store/${gender.toLowerCase()}`);
  };

  return (
    <div className="store-container">
      <p className="store-subtext">
        Choose your collection to start shopping.
      </p>

      <div className="store-gender-buttons">
        <button onClick={() => handleSelect("Men")} className="store-btn">
          Men’s Collection
        </button>
        <button onClick={() => handleSelect("Women")} className="store-btn">
          Women’s Collection
        </button>
        <button onClick={() => handleSelect("All")} className="store-btn">
          View All
        </button>
      </div>
    </div>
  );
}