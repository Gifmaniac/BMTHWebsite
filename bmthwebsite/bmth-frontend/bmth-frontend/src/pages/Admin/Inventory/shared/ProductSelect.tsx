import { FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import type { ProductOverview } from "../../../../types/Store/Product";
import { currencyFormatter } from "./useInventorySelection";

type ProductSelectProps = {
  products: ProductOverview[];
  value: string;
  onChange: (value: string) => void;
  loading?: boolean;
  disabled?: boolean;
};

export function ProductSelect({ products, value, onChange, loading, disabled }: ProductSelectProps) {
  return (
    <FormControl fullWidth disabled={disabled}>
      <InputLabel id="product-select-label">Product</InputLabel>
      <Select
        labelId="product-select-label"
        label="Product"
        value={value}
        onChange={(e) => onChange(e.target.value as string)}
      >
        <MenuItem value="">
          <em>Select a product</em>
        </MenuItem>
        {products.map((product) => (
          <MenuItem key={product.id} value={product.id.toString()} disabled={loading}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
              <span>{product.name}</span>
              <Typography variant="body2" color="text.secondary">
                {currencyFormatter.format(product.price ?? 0)}
              </Typography>
            </Stack>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
