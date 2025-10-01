import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProductDetail } from "../../types/Product";
import { apiFetch } from "../../services/api/helper.ts";

function ShirtDetail() {
  const { id } = useParams<{ id: string }>(); // 👈 get "id" from URL
  const [tshirt, setTshirt] = useState<ProductDetail | null>(null);


     useEffect(() => {
    apiFetch<ProductDetail>(`/store/tshirts/${id}`)
      .then(setTshirt)
      .catch((err: unknown) => console.error("API error:", err));
    }, [id]);

  if (!tshirt) return <p>Loading...</p>;

  return(
    <div>
        <h2>{tshirt.name}</h2>
        <p><strong>Price:</strong> €{tshirt.price}</p>
        <p><strong>Meterial: </strong> {tshirt.meterial}</p>
        <p><strong>In Stock: </strong> {tshirt.inStock ? "Yes" : "No"}</p>

      <h3>Variants</h3>
      <ul>
        {tshirt.variants.map((variant, index) => (
          <li key={index}>
            {variant.color} - {variant.size} ({variant.quantity} left)
          </li>
        ))}
      </ul>

      <Link to="/">Back to Collection</Link>
    </div>
  );
}

export default ShirtDetail;