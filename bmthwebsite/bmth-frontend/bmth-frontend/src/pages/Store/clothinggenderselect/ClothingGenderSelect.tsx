import { useNavigate } from "react-router-dom";

export default function StoreHome() {
  const navigate = useNavigate();

  const handleSelect = (gender: string) => {
    navigate(`/store/apparel/${gender.toLowerCase()}`);
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
        <button onClick={() => handleSelect("Female")} className="store-btn">
          Women’s Collection
        </button>
        <button onClick={() => handleSelect("Unisex")} className="store-btn">
          View All
        </button>
      </div>
    </div>
  );
}