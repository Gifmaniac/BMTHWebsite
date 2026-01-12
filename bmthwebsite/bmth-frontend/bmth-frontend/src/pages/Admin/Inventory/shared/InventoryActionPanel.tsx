import { Box, Chip, Divider, LinearProgress, Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";
import type { ProductDetail, Variant } from "../../../../types/Store/Product";
import { InventoryFilters } from "./InventoryFilters";
import { InventoryHeader } from "./InventoryHeader";
import { InventoryStatus } from "./InventoryStatus";
import { ProductSelect } from "./ProductSelect";
import { VariantOverviewList } from "./VariantOverviewList";
import { VariantSelect } from "./VariantSelect";
import type { InventoryStatus as StatusType } from "./useInventorySelection";

type InventoryActionPanelProps = {
  header: { eyebrow?: string; title: string; description: string };
  gender: string;
  onGenderChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
  products: { id: number; name: string; price: number; category: string}[];
  productsLoading: boolean;
  productsError: string | null;
  productValue: string;
  onProductChange: (value: string) => void;
  productDetail: ProductDetail | null;
  detailLoading: boolean;
  color: string;
  onColorChange: (value: string) => void;
  colorOptions: string[];
  variantValue: string;
  onVariantChange: (value: string) => void;
  variantOptions: { value: string; label: string; quantity: number }[];
  selectedVariant: Variant | null;
  status: StatusType;
  actionArea: ReactNode;
};

export function InventoryActionPanel({
  header,
  gender,
  onGenderChange,
  category,
  onCategoryChange,
  categories,
  products,
  productsLoading,
  productsError,
  productValue,
  onProductChange,
  productDetail,
  detailLoading,
  color,
  onColorChange,
  colorOptions,
  variantValue,
  onVariantChange,
  variantOptions,
  selectedVariant,
  status,
  actionArea,
}: InventoryActionPanelProps) {
  return (
    <Stack spacing={3}>
      <InventoryHeader {...header} />

      <InventoryStatus productsError={productsError} status={status} />

      <Stack spacing={2}>
        <InventoryFilters
          gender={gender}
          onGenderChange={onGenderChange}
          category={category}
          onCategoryChange={onCategoryChange}
          categories={categories}
          disabled={productsLoading}
        />

        <ProductSelect
          products={products}
          value={productValue}
          onChange={onProductChange}
          loading={productsLoading}
          disabled={productsLoading}
        />

        {productsLoading && <LinearProgress />}

        {productDetail && (
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
              <Typography variant="subtitle1" fontWeight={700}>{productDetail.name}</Typography>
              <Chip label={productDetail.gender} size="small" />
              <Chip
                label={productDetail.inStock ? "In stock" : "Out of stock"}
                color={productDetail.inStock ? "success" : "default"}
                size="small"
              />
              <Chip
                label={`Total qty: ${productDetail.totalQuantity}`}
                size="small"
                variant="outlined"
              />
            </Box>

            <VariantSelect
              color={color}
              onColorChange={onColorChange}
              colorOptions={colorOptions}
              variantValue={variantValue}
              onVariantChange={onVariantChange}
              variantOptions={variantOptions}
              disabled={detailLoading}
            />

            {actionArea}

            <Divider flexItem />

            <VariantOverviewList
              productDetail={productDetail}
              colorFilter={color}
              selectedVariant={selectedVariant}
            />
          </Stack>
        )}

        {detailLoading && <LinearProgress />}
      </Stack>
    </Stack>
  );
}
