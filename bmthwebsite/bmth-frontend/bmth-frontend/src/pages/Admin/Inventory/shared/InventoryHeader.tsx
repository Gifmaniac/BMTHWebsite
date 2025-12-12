import { Stack, Typography } from "@mui/material";

type InventoryHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function InventoryHeader({ eyebrow = "Inventory", title, description }: InventoryHeaderProps) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems="flex-start" gap={2}>
      <div>
        <Typography variant="overline" color="primary" letterSpacing="0.2em">
          {eyebrow}
        </Typography>
        <Typography variant="h4" fontWeight={800}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </div>
    </Stack>
  );
}
