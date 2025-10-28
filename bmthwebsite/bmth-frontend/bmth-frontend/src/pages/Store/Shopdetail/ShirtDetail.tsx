import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Stack from '@mui/material/Stack';
import BasicSelect from "../../../components/common/select/Select.tsx";
import type { ProductDetail } from "../../../types/Product.ts";
import { apiFetch } from "../../../services/api/helper.ts";
import ShirtDetailImagePreview from "../../../components/product/ProductDetailImagePreview.tsx";
import {Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid"; 

function ShirtDetail() {
  const { id } = useParams<{ id: string }>(); // get "id" from URL
  const [tshirt, setTshirt] = useState<ProductDetail | null>(null);

  // State for the colors/ sizes dropdown/ img. preview
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    if (!id) return;
    apiFetch<ProductDetail>(`/api/store/apparel/${id}`)
      .then((data) => setTshirt(data))
      .catch((err: unknown) => console.error("API error:", err));
  }, [id]);

  if (!tshirt) {
    return <p>Loading...</p>;
  }

  // Maps a list for all available colors
    const colorOptions = Array.from(
      new Set(tshirt.variants.map((v) => v.color))
    ).map((color) => ({
      label: color,
      value: color,
    }));

    // Filters the sizes based on the color
    const sizeVariants = tshirt.variants.filter(
      (v) => v.color === selectedColor.toLowerCase()
    );
    
    // finds the tshirt imgs based on the color
    const activeVariant = tshirt.variants.find(
      (v) => v.color.toLowerCase() === selectedColor.toLowerCase());

    const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
    setSelectedSize("");
  };

    const handleSizeSelect = (size: string) => {
      setSelectedSize(size);
    };

return (
  <Grid container spacing={4} alignItems="flex-start">
    <Grid xs={12} md={6}>
      <Box
        sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
      }}
      >
      {/* Large image */}
      <Box
        sx={{
        width: "80%",
        display: "flex",
        justifyContent: "center",
        }}
      >
        {selectedColor && activeVariant?.imageUrlsList?.length > 0 ? (
          <ShirtDetailImagePreview
            imageUrls={activeVariant.imageUrlsList.slice(0)} // first image
            selectedColor={selectedColor}
          />
        ) : (
          <img
            src="/fallback-shirt.png"
            alt="Well, something went wrong, just imagine the shirt in your selected color!"
            style={{ width: "10%", height: "auto", objectFit: "contain" }}
          />
        )}
      </Box>

      {/* Smaller image */}
      <Box
        sx={{
        width: "40%",
        display: "flex",
        justifyContent: "center",
        }}
      >
        {selectedColor && activeVariant?.imageUrlsList?.length > 1 ? (
          <ShirtDetailImagePreview
            imageUrls={activeVariant.imageUrlsList.slice(1)}
            selectedColor={selectedColor}
          />
        ) : (
          <img
            src={
              activeVariant?.imageUrlsList?.[0] ?? "/fallback-shirt.png"
            }
            alt="Weird, something went wrong, just imagine the shirt in your selected color!"
            style={{ width: "50%", height: "auto", objectFit: "contain" }}
          />
        )}
      </Box>
    </Box>
  </Grid>


    {/* RIGHT SIDE Product info */}
    <Grid xs={12} md={6} alignItems="flex-end">
      <Box mb={2}>
        <h2>{tshirt.name}</h2>
        <p><strong>Price:</strong> €{tshirt.price}</p>
        <p><strong>Material:</strong> {tshirt.material}</p>
        <p><strong>In Stock:</strong> {tshirt.inStock ? "Yes" : "No"}</p>
      </Box>
    {/* Color Selector */}
      <h3>Selected color</h3>
      <Box className="store-color-select" mb={2}>
        <BasicSelect
          label="Color"
          value={selectedColor}
          options={colorOptions}
          onChange={handleColorChange}
        />
      </Box>
        {/* Size Selector */}
      <Stack direction="row" spacing={2} mb={3}>
        {sizeVariants.map((variant) => (
          <Button
            key={variant.size}
            variant={selectedSize === variant.size ? "contained" : "outlined"}
            disabled={variant.quantity === 0}
            onClick={() => handleSizeSelect(variant.size)}
          >
            {variant.size}
          </Button>
        ))}
      </Stack>

      <Link to="/">Back to Collection</Link>
    </Grid>
  </Grid>
);
}

export default ShirtDetail;