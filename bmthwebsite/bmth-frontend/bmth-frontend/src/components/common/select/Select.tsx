import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import type { SelectChangeEvent } from "@mui/material/Select";

interface BasicSelectProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (event: SelectChangeEvent) => void;
  width?: number | string;
}

export default function BasicSelect({
  label,
  value,
  options,
  onChange,
  width = 130,
}: Readonly<BasicSelectProps>) {
  const id = label.toLowerCase();

  return (
    <Box 
    sx={{width}}
    >
      <FormControl sx={{width}}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          labelId={`${id}-label`}
          id={`${id}-select`}
          value={value}
          label={label}
          onChange={onChange}
        >
          {options.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}