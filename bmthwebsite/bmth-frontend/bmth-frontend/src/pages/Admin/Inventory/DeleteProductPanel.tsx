import { useState } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { deleteProduct, deleteProductVariant } from "../../../services/api/products";
import { InventoryActionPanel } from "./shared/InventoryActionPanel";
import { useInventorySelection } from "./shared/useInventorySelection";
import type { InventoryStatus } from "./shared/useInventorySelection";

type DeleteProductPanelProps = { onBack: () => void };

export default function DeleteProductPanel({ onBack }: DeleteProductPanelProps) {
  const {
    genderFilter,
    setGenderFilter,
    categoryFilter,
    setCategoryFilter,
    selectedProductId,
    setSelectedProductId,
    filteredProducts,
    productsLoading,
    productsError,
    productDetail,
    detailLoading,
    colorFilter,
    setColorFilter,
    colorOptions,
    variantIndex,
    setVariantIndex,
    variantOptions,
    selectedVariant,
    categories,
    reloadProducts,
    resetSelection,
  } = useInventorySelection();

  const [status, setStatus] = useState<InventoryStatus>(null);
  const [confirmProductText, setConfirmProductText] = useState("");
  const [confirmVariantText, setConfirmVariantText] = useState("");
  const [deleting, setDeleting] = useState<"product" | "variant" | null>(null);

  const handleDeleteProduct = async () => {
    if (!selectedProductId) {
      setStatus({ tone: "error", text: "Pick a product first." });
      return;
    }
    if (confirmProductText !== "DELETE") {
      setStatus({ tone: "error", text: 'Type "DELETE" to confirm product removal.' });
      return;
    }

    setDeleting("product");
    setStatus(null);

    try {
      await deleteProduct(Number(selectedProductId));
      setStatus({ tone: "success", text: "Product deleted." });
      resetSelection();
      reloadProducts();
      setConfirmProductText("");
      setConfirmVariantText("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to delete product";
      setStatus({ tone: "error", text: message });
    } finally {
      setDeleting(null);
    }
  };

  const handleDeleteVariant = async () => {
    if (!selectedProductId || !variantIndex) {
      setStatus({ tone: "error", text: "Pick a product and variant first." });
      return;
    }
    if (confirmVariantText !== "DELETE VARIANT") {
      setStatus({ tone: "error", text: 'Type "DELETE VARIANT" to confirm variant removal.' });
      return;
    }

    setDeleting("variant");
    setStatus(null);

    try {
      await deleteProductVariant(Number(selectedProductId), Number(variantIndex));
      setStatus({ tone: "success", text: "Variant deleted." });
      setConfirmVariantText("");
      // Refresh lists to reflect removal
      reloadProducts();
      resetSelection();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to delete variant";
      setStatus({ tone: "error", text: message });
    } finally {
      setDeleting(null);
    }
  };

  return (
    <InventoryActionPanel
      header={{
        title: "Delete product",
        description: "Select a product to remove it from the catalog. This action cannot be undone.",
      }}
      gender={genderFilter}
      onGenderChange={setGenderFilter}
      category={categoryFilter}
      onCategoryChange={setCategoryFilter}
      categories={categories}
      products={filteredProducts}
      productsLoading={productsLoading}
      productsError={productsError}
      productValue={selectedProductId}
      onProductChange={setSelectedProductId}
      productDetail={productDetail}
      detailLoading={detailLoading}
      color={colorFilter}
      onColorChange={setColorFilter}
      colorOptions={colorOptions}
      variantValue={variantIndex}
      onVariantChange={setVariantIndex}
      variantOptions={variantOptions}
      selectedVariant={selectedVariant}
      status={status}
      actionArea={
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              Delete entire product
            </Typography>
            <TextField
              label='Type "DELETE" to confirm'
              value={confirmProductText}
              onChange={(e) => setConfirmProductText(e.target.value)}
              fullWidth
            />
            <Typography variant="body2" color="text.secondary">
              Removes the product and all variants from the store. This cannot be undone.
            </Typography>
            <Button
              variant="contained"
              color="error"
              disabled={deleting !== null || !selectedProductId}
              onClick={handleDeleteProduct}
              fullWidth
            >
              {deleting === "product" ? "Deleting..." : "Delete product"}
            </Button>
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={700}>
              Delete selected variant
            </Typography>
            <TextField
              label='Type "DELETE VARIANT" to confirm'
              value={confirmVariantText}
              onChange={(e) => setConfirmVariantText(e.target.value)}
              fullWidth
              disabled={!variantIndex}
            />
            <Typography variant="body2" color="text.secondary">
              Removes only the chosen variant. Use this to clean up sizes or colors that should no longer exist.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              disabled={deleting !== null || !selectedProductId || !variantIndex}
              onClick={handleDeleteVariant}
              fullWidth
            >
              {deleting === "variant" ? "Deleting..." : "Delete variant"}
            </Button>
          </Stack>

          <Button variant="outlined" fullWidth onClick={onBack}>
            Back to dashboard
          </Button>
        </Stack>
      }
    />
  );
}
