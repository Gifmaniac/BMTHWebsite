import { useNavigate } from "react-router-dom";

export default function StoreGenderSelect() {
  const navigate = useNavigate();

  const handleSelect = (gender: string) => {
    navigate(`/store/apparel/${gender.toLowerCase()}`);
  };

  return (
    <div className="store-container">
      <h2 className="store-header-text">Choose Your Collection</h2>
      <p className="store-subtext">Select your gender to start shopping.</p>

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