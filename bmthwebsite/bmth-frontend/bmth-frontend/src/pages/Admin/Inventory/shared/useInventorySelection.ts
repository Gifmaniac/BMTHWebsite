import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchProductDetail, fetchProducts } from "../../../../services/api/products";
import type { ProductDetail, ProductOverview, Variant } from "../../../../types/Store/Product";

export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "EUR",
});

export const variantKey = (variant: Variant | { variantId?: number; id?: number }, index: number) =>
  (variant as any).variantId ?? (variant as any).id ?? index;

export type InventoryStatus = { tone: "success" | "error"; text: string } | null;

type InventorySelection = {
  genderFilter: string;
  setGenderFilter: (value: string) => void;
  categoryFilter: string;
  setCategoryFilter: (value: string) => void;
  selectedProductId: string;
  setSelectedProductId: (value: string) => void;
  products: ProductOverview[];
  filteredProducts: ProductOverview[];
  productsLoading: boolean;
  productsError: string | null;
  categories: string[];
  productDetail: ProductDetail | null;
  setProductDetail: (detail: ProductDetail | null) => void;
  detailLoading: boolean;
  colorFilter: string;
  setColorFilter: (value: string) => void;
  colorOptions: string[];
  variantIndex: string;
  setVariantIndex: (value: string) => void;
  variantOptions: { value: string; label: string; quantity: number }[];
  selectedVariant: Variant | null;
  reloadProducts: () => void;
  resetSelection: () => void;
};

export function useInventorySelection(initialGender = "Men"): InventorySelection {
  const [products, setProducts] = useState<ProductOverview[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [genderFilter, setGenderFilter] = useState<string>(initialGender);
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [colorFilter, setColorFilter] = useState<string>("");
  const [variantIndex, setVariantIndex] = useState<string>("");
  const [detailLoading, setDetailLoading] = useState(false);

  const loadProducts = useCallback(() => {
    setProductsLoading(true);
    setProductsError(null);
    setSelectedProductId("");
    setProductDetail(null);
    setColorFilter("");
    setVariantIndex("");

    fetchProducts({ gender: genderFilter })
      .then((list) => setProducts(list))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unable to load products";
        setProductsError(message);
      })
      .finally(() => setProductsLoading(false));
  }, [genderFilter]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (!selectedProductId) {
      setProductDetail(null);
      setVariantIndex("");
      return;
    }

    setDetailLoading(true);
    fetchProductDetail(Number(selectedProductId))
      .then((detail) => {
        setProductDetail(detail);
        const defaultColor = detail.variants.length ? detail.variants[0].color : "";
        setColorFilter(defaultColor);
        setVariantIndex(detail.variants.length ? variantKey(detail.variants[0], 0).toString() : "");
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Unable to fetch product details";
        setProductsError(message);
        setProductDetail(null);
        setVariantIndex("");
        setColorFilter("");
      })
      .finally(() => setDetailLoading(false));
  }, [selectedProductId]);

  useEffect(() => {
    if (!productDetail || !colorFilter) return;
    const firstInColor = productDetail.variants.findIndex((v) => v.color === colorFilter);
    if (firstInColor >= 0) {
      setVariantIndex(variantKey(productDetail.variants[firstInColor], firstInColor).toString());
    } else {
      setVariantIndex("");
    }
  }, [colorFilter, productDetail]);

  const variantOptions = useMemo(
    () =>
      productDetail?.variants
        ?.map((variant, index) => ({ variant, index }))
        .filter(({ variant }) => (colorFilter ? variant.color === colorFilter : true))
        .map(({ variant, index }) => ({
          value: variantKey(variant, index).toString(),
          label: `${variant.color} / ${variant.size}`,
          quantity: variant.quantity,
        })) ?? [],
    [productDetail, colorFilter]
  );

  const selectedVariant = useMemo(() => {
    const targetId = Number(variantIndex);
    if (!productDetail || Number.isNaN(targetId)) return null;
    return productDetail.variants.find((v, idx) => variantKey(v, idx) === targetId) ?? null;
  }, [productDetail, variantIndex]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))).filter(Boolean),
    [products]
  );

  const colorOptions = useMemo(() => {
    if (!productDetail) return [];
    return Array.from(new Set(productDetail.variants.map((v) => v.color))).filter(Boolean);
  }, [productDetail]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = categoryFilter ? p.category === categoryFilter : true;
      return matchesCategory;
    });
  }, [products, categoryFilter]);

  const resetSelection = () => {
    setSelectedProductId("");
    setProductDetail(null);
    setColorFilter("");
    setVariantIndex("");
  };

  return {
    genderFilter,
    setGenderFilter,
    categoryFilter,
    setCategoryFilter,
    selectedProductId,
    setSelectedProductId,
    products,
    filteredProducts,
    productsLoading,
    productsError,
    categories,
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
    reloadProducts: loadProducts,
    resetSelection,
  };
}
