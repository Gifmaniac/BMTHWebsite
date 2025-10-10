import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import type { ProductOverview } from "../../../types/Product";
import { apiFetch } from "../../../services/api/helper";


type TShirt = {
  id : number;
  name : string;
  price : number;
}

  export default function StoreOverview() {
  const [tshirts, setTshirts] = useState<TShirt[]>([]);
  const { gender } = useParams<{ gender: string }>();

  useEffect(() => {
    
    if (!gender) return;

    const selectedGender = gender || "Unisex";

    apiFetch<ProductOverview[]>(`/api/store/apparel?genders=${selectedGender}`)
      .then(setTshirts)
      .catch((err: unknown) => console.error("API error:", err));
  }, [gender]);

 return (
    <div className="store-container">
      <h2 className="store-header">{gender ? `${gender}'s Collection` : "Our Collection"}</h2>

      {tshirts.length === 0 ? (
        <p>No shirts available</p>
      ) : (
        <ul className="store-grid">
          {tshirts.map((shirt) => (
            <li key={shirt.id} className="store-item">
              <Link to={`/store/tshirts/${shirt.id}`}>
                {shirt.name} - €{shirt.price}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}