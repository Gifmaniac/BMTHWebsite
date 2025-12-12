import { FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";

type InventoryFiltersProps = {
  gender: string;
  onGenderChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  disabled?: boolean;
};

export function InventoryFilters({
  gender,
  onGenderChange,
  category,
  onCategoryChange,
  categories,
  disabled,
}: InventoryFiltersProps) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1}>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="gender-filter-label">Gender</InputLabel>
        <Select
          labelId="gender-filter-label"
          label="Gender"
          value={gender}
          onChange={(e) => onGenderChange(e.target.value as string)}
        >
          {["Men", "Women", "Unisex"].map((g) => (
            <MenuItem key={g} value={g}>
              {g}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth disabled={disabled}>
        <InputLabel id="category-filter-label">Category</InputLabel>
        <Select
          labelId="category-filter-label"
          label="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as string)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
}
