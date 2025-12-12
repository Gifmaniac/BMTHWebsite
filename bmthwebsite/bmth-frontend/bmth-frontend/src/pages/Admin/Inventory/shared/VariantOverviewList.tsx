import { Chip, Stack, Typography } from "@mui/material";
import type { ProductDetail, Variant } from "../../../../types/Store/Product";
import { variantKey } from "./useInventorySelection";

type VariantOverviewListProps = {
  productDetail: ProductDetail;
  colorFilter: string;
  selectedVariant: Variant | null;
};

export function VariantOverviewList({ productDetail, colorFilter, selectedVariant }: VariantOverviewListProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" fontWeight={700}>
        Variant overview {colorFilter ? `/ ${colorFilter}` : ""}
      </Typography>
      {productDetail.variants
        .map((variant, index) => ({ variant, index }))
        .filter(({ variant }) => (colorFilter ? variant.color === colorFilter : true))
        .map(({ variant, index }) => {
          const key = variantKey(variant, index);
          return (
            <Stack
              key={`${variant.color}-${variant.size}-${key}`}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2, p: 1.25 }}
            >
              <Stack spacing={0.25}>
                <Typography variant="body1" fontWeight={700}>
                  {variant.color} / {variant.size}
                </Typography>
              </Stack>
              <Chip
                label={`${variant.quantity} in stock`}
                color={variant.quantity === 0 ? "error" : "primary"}
                variant={selectedVariant === variant ? "filled" : "outlined"}
              />
            </Stack>
          );
        })}
    </Stack>
  );
}
