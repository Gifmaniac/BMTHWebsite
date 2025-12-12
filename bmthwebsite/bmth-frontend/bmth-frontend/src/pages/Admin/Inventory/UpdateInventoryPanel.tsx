import { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { updateProductStock } from "../../../services/api/products";
import { InventoryActionPanel } from "./shared/InventoryActionPanel";
import { useInventorySelection, variantKey } from "./shared/useInventorySelection";
import type { InventoryStatus } from "./shared/useInventorySelection";

type UpdateInventoryPanelProps = { onBack: () => void };

export default function UpdateInventoryPanel({ onBack }: UpdateInventoryPanelProps) {
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
    setProductDetail,
    detailLoading,
    colorFilter,
    setColorFilter,
    colorOptions,
    variantIndex,
    setVariantIndex,
    variantOptions,
    selectedVariant,
    categories,
  } = useInventorySelection();

  const [amount, setAmount] = useState<string>("1");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<InventoryStatus>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedProductId || variantIndex === "") {
      setStatus({ tone: "error", text: "Pick a product and variant first." });
      return;
    }

    const parsedAmount = Number(amount);
    if (Number.isNaN(parsedAmount)) {
      setStatus({ tone: "error", text: "Enter a valid amount (can be negative to reduce stock)." });
      return;
    }

    setSaving(true);
    setStatus(null);

    try {
      const updated = await updateProductStock(Number(selectedProductId), Number(variantIndex), parsedAmount);
      setProductDetail(updated);

      const updatedVariant = updated.variants.find((v, idx) => variantKey(v, idx) === Number(variantIndex));
      const newQty = updatedVariant ? updatedVariant.quantity : parsedAmount;
      setStatus({
        tone: "success",
        text: `Stock updated. Variant now has ${newQty} units.`,
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to update stock";
      setStatus({ tone: "error", text: message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InventoryActionPanel
        header={{
          title: "Update stock per variant",
          description: "Stay on this page while switching views. Select a product, pick the variant, and apply the stock change.",
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
            <TextField
              type="number"
              label="Amount to add/remove"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              helperText="Use negative numbers to subtract from stock"
              fullWidth
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} alignItems="center">
              <Button
                type="submit"
                variant="contained"
                disabled={saving || !productDetail || variantIndex === ""}
                fullWidth
              >
                {saving ? "Updating..." : "Apply stock update"}
              </Button>
              <Button variant="outlined" fullWidth onClick={onBack}>
                Back to dashboard
              </Button>
            </Stack>
          </Stack>
        }
      />
    </form>
  );
}
