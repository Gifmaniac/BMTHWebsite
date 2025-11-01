import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
        <Button onClick={() => handleSelect("Men")} className="store-btn">
          Men’s Collection
        </Button>
        <Button onClick={() => handleSelect("Female")} className="store-btn">
          Women’s Collection
        </Button>
        <Button onClick={() => handleSelect("Unisex")} className="store-btn">
          View All
        </Button>
      </div>
    </div>
  );
}