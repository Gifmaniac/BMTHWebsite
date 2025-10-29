import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import type { ProductOverview } from "../../../types/Store/Product";
import { apiFetch } from "../../../services/api/helper";
import StoreItemCard from "../../../components/product/StoreItemCard";


  export default function StoreOverview() {
  const [tshirts, setTshirts] = useState<ProductOverview[]>([]);
  const { gender } = useParams<{ gender: string }>();
  
  const headerTextMap: Record<string, string> = {
  men: "Men's Collection",
  women: "Women's Collection",
  unisex: "All Clothing"
};

  useEffect(() => {
    
    if (!gender) return;

    const selectedGender = gender || "Unisex";

    apiFetch<ProductOverview[]>(`/api/store/apparel?genders=${selectedGender}`)
      .then(setTshirts)
      .catch((err: unknown) => console.error("API error:", err));
  }, [gender]);

 return (
    <div className="store-layout">
      <Typography
        variant="h5"
        align="center"
        className="store-header"
      >
        {gender
          ? headerTextMap[gender.toLowerCase()] || "Our Collection"
          : "Our Collection"}
      </Typography>

      {tshirts.length === 0 ? (
        <Typography color="white" align="center">
          No shirts available
        </Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {tshirts.map((shirt) => (
            <StoreItemCard key={shirt.id} product={shirt} />
          ))}
        </Grid>
      )}
    </div>
  );
}