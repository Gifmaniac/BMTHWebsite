import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack';
import BasicSelect from "../../../components/common/select/Select.tsx";
import type { ProductDetail } from "../../../types/Product.ts";
import { apiFetch } from "../../../services/api/helper.ts";
import Box from "@mui/material/Box";

function ShirtDetail() {
  const { id } = useParams<{ id: string }>(); // get "id" from URL
  const [tshirt, setTshirt] = useState<ProductDetail | null>(null);

  // State for the colors/ sizes dropdown
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");


  useEffect(() => {
    if (!id) return;
    apiFetch<ProductDetail>(`/api/store/apparel/${id}`)
      .then(setTshirt)
      .catch((err: unknown) => console.error("API error:", err));
  }, [id]);

  if (!tshirt) return <p>Loading...</p>;

  // Maps a list for all available colors
    const colorOptions = Array.from(
      new Set(tshirt.variants.map((v) => v.color))
    ).map((color) => ({
      label: color,
      value: color,
    }));

    // Filters the sizes based on the color
    const sizeVariants = tshirt.variants.filter(
      (v) => v.color === selectedColor
    );

    const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
    setSelectedSize("");
  };

    const handleSizeSelect = (size: string) => {
      setSelectedSize(size);
    };

  return(
    <div>
        <h2>{tshirt.name}</h2>
        <p><strong>Price:</strong> €{tshirt.price}</p>
        <p><strong>Material:</strong> {tshirt.material}</p>
        <p><strong>In Stock:</strong> {tshirt.inStock ? "Yes" : "No"}</p>

      <h3>Selected color</h3>

      <Box display="flex" justifyContent="center" alignItems="center" sx={{ my: 2 }}>
        <BasicSelect
          label="Color"
          value={selectedColor}
          options={colorOptions}
          onChange={handleColorChange}
        />
      </Box>

      {selectedColor && (
        <>
          <h3>Select Size</h3>
          <Stack 
            direction="row" 
            spacing={2} 
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            >
            {sizeVariants.map((variant) => (
              <Button
                key={variant.size}
                variant={
                  selectedSize === variant.size ? "contained" : "outlined"
                }
                disabled={variant.quantity === 0}
                onClick={() => handleSizeSelect(variant.size)}
              >
                {variant.size}
              </Button>
            ))}
          </Stack>
          </>
      )}

      <Link to="/">Back to Collection</Link>
    </div>
  );
}

export default ShirtDetail;