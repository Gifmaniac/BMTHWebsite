import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Button, Grid, Stack } from "@mui/material";
import BasicSelect from "../../../components/common/select/Select.tsx";
import ShirtDetailImagePreview from "../../../components/product/ProductDetailImagePreview.tsx";
import type { ProductDetail, CreatedProduct } from "../../../types/Store/Product.ts";
import { apiFetch } from "../../../services/api/helper.ts";
import { T } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

function ShirtDetail() {
  const { id } = useParams<{ id: string }>();

  const [tshirt, setTshirt] = useState<ProductDetail | null>(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImageIndex, setMainImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;
    apiFetch<ProductDetail>(`/api/store/apparel/${id}`)
      .then(setTshirt)
      .catch((err: unknown) => console.error("API error:", err));
  }, [id]);

  // Reset main image when color changes
  useEffect(() => {
    setMainImageIndex(0);
  }, [selectedColor]);

  // Default to first variant color so images show before selection
  useEffect(() => {
    if (tshirt && tshirt.variants.length > 0 && !selectedColor) {
      setSelectedColor(tshirt.variants[0].color);
    }
  }, [tshirt, selectedColor]);

  if (!tshirt) return <p>Loading...</p>;

  const colorOptions = Array.from(new Set(tshirt.variants.map(v => v.color)))
    .map(color => ({ label: color, value: color }));

  const sizeVariants = tshirt.variants.filter(
    v => v.color.toLowerCase() === selectedColor.toLowerCase()
  );

  const activeVariant =
    tshirt.variants.find(v => v.color.toLowerCase() === selectedColor.toLowerCase())
    ?? tshirt.variants[0];

  const handleColorChange = (event: any) => {
    setSelectedColor(event.target.value);
    setSelectedSize("");
  };

  const handleSizeSelect = (size: string) => setSelectedSize(size);

  return (
    <Grid container spacing={4} alignItems="flex-start">
      {/* LEFT: Images */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
          {/* Large image */}
          <Box sx={{
            width: "100%",
            maxWidth: 600,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& img": { width: "100%", height: "auto", maxHeight: 600, objectFit: "contain" }
          }}>
            {activeVariant?.imageUrlsList?.length ? (
              <ShirtDetailImagePreview
                imageUrls={[activeVariant.imageUrlsList[mainImageIndex]]}
                selectedColor={selectedColor}
              />
            ) : (
              <img src="/fallback-shirt.png" alt="something went wrong woooops"/>
            )}
          </Box>

          {/* Smaller image */}
          <Box sx={{
            width: "50%",
            maxWidth: 360,
            mx: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "& img": { width: "100%", height: "auto", maxHeight: 360, objectFit: "contain" }
          }}>
            {(() => {
              const urls = activeVariant?.imageUrlsList || [];
              const count = urls.length;
              const hasSecondary = count > 1;
              const secondaryIndex = hasSecondary ? (mainImageIndex + 1) % count : null;

              if (hasSecondary && secondaryIndex !== null) {
                return (
                  <button
                    type="button"
                    aria-label="Show next image"
                    style={{ all: "unset", cursor: "pointer", display: "flex", width: "100%", height: "100%" }}
                    onClick={() => setMainImageIndex(secondaryIndex)}
                  >
                    <img
                      src={urls[secondaryIndex]}
                      alt={`Secondary view of ${tshirt.name} in ${selectedColor}`}
                    />
                  </button>
                );
              }

              return (
                <img
                  src={activeVariant?.imageUrlsList?.[0] ?? "/fallback-shirt.png"}
                  alt={`Primary view of ${tshirt.name}`}
                />
              );
            })()}
          </Box>
        </Box>
      </Grid>

      {/* RIGHT SIDE Product info */}
      <Grid size={{ xs: 12, md: 2 }}>
        <Box sx={{ maxWidth: 500, mx: "auto" }}>
          <Box mb={2}>
            <h2>{tshirt.name}</h2>
            <p><strong>Price:</strong> €{tshirt.price}</p>
            <p><strong>Material:</strong> {tshirt.material}</p>
            <p><strong>In Stock:</strong> {tshirt.inStock ? "Yes" : "No"}</p>
          </Box>

          {/* Color Selector */}
          <Box mb={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3>Selected color</h3>
            <BasicSelect
              label="Color"
              value={selectedColor}
              options={colorOptions}
              onChange={handleColorChange}
            />
          </Box>


          {/* Size Selector */}
          <Box mb={2}>
            <h3>Available sizes</h3>
            <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" useFlexGap>
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
          </Box>


            <Box mb={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <Button
                variant="outlined" 
                disabled={!selectedSize && !selectedColor}>
                onClick{() => CreatedProduct(Tshirt, selectedColor, selectedSize)}
               <Link to ="/store/cart">Add to Cart</Link>
              </Button>
              <Button 
                variant="outlined"
                onClick={globalThis.history.length > 1 ? () => globalThis.history.back() : undefined}>
                Go Back To Collection
              </Button>
            </Box> 
        </Box>
      </Grid>
    </Grid>
  );
}

export default ShirtDetail;

