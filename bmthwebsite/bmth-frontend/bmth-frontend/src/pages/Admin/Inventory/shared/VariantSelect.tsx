import { Chip, FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

type VariantSelectProps = {
  color: string;
  onColorChange: (value: string) => void;
  colorOptions: string[];
  variantValue: string;
  onVariantChange: (value: string) => void;
  variantOptions: { value: string; label: string; quantity: number }[];
  disabled?: boolean;
};

export function VariantSelect({
  color,
  onColorChange,
  colorOptions,
  variantValue,
  onVariantChange,
  variantOptions,
  disabled,
}: VariantSelectProps) {
  return (
    <>
      <FormControl fullWidth disabled={disabled || !variantOptions.length}>
        <InputLabel id="color-select-label">Color</InputLabel>
        <Select
          labelId="color-select-label"
          label="Color"
          value={color}
          onChange={(e) => onColorChange(e.target.value as string)}
        >
          {colorOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth disabled={disabled || !variantOptions.length}>
        <InputLabel id="variant-select-label">Variant size</InputLabel>
        <Select
          labelId="variant-select-label"
          label="Variant (color / size)"
          value={variantValue}
          onChange={(e) => onVariantChange(e.target.value as string)}
        >
          {variantOptions.map((variant) => (
            <MenuItem key={variant.value} value={variant.value}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
                <span>{variant.label}</span>
                <Chip label={`${variant.quantity} in stock`} size="small" color={variant.quantity === 0 ? "error" : "default"} />
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
