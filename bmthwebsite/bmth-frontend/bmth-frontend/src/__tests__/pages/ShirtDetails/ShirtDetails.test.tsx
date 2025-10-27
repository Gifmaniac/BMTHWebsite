import ShirtDetail from "../../../pages/Store/Shopdetail/ShirtDetail";
import { ProductDetail } from "../../../types/Product.ts";
import "@testing-library/jest-dom";

describe("Variant", () => {
  const variants = [
    { color: "Red", size: "M" },
    { color: "Red", size: "L" },
    { color: "Blue", size: "S" },
  ];

  it("returns only sizes for the selected color", () => {
    expect(ProductDetail.variants(variants, "Red")).toEqual([
      { color: "Red", size: "M" },
      { color: "Red", size: "L" },
    ]);
  });
});