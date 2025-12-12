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
        <Button onClick={() => handleSelect("men")} className="store-btn"
          variant="contained">
          Men’s Collection
        </Button>
        <Button onClick={() => handleSelect("female")} className="store-btn"
          variant="contained">
          Female's Collection
        </Button>
      </div>
    </div>
  );
}