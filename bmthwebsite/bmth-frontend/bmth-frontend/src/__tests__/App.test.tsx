import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { describe, expect, it, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock the API fetch function
vi.mock("../services/api/helper", () => ({
  apiFetch: (endpoint: string) => {
    if (endpoint === "/store/tshirts?genders=Men") {
      return Promise.resolve([
        { id: 1, name: "Classic Tee", price: 19.99 },
        { id: 2, name: "BMTH Hoodie", price: 49.99 }
      ]);
    }
    if (endpoint === "/store/tshirts/1") {
      return Promise.resolve({
        id: 1,
        name: "Classic Tee",
        price: 19.99,
        meterial: "Cotton",
        inStock: true,
        totalQuantity: 30,
        gender: "Unisex",
        variants: [{ color: "Black", size: "M", quantity: 10 }]
      });
    }
    throw new Error("Unknown endpoint: " + endpoint);
  }
}));

describe("BMTH Shop", () => {
  it("renders overview and then detail", async () => {
    // Render overview
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    //Overview should load mock shirts
    expect(await screen.findByText(/Classic Tee/)).toBeInTheDocument();

    // Render detail page
    render(
      <MemoryRouter initialEntries={["/tshirts/1"]}>
        <App />
      </MemoryRouter>
    );

    //Detail page should show material info
    expect(await screen.findByText(/Meterial/i)).toBeInTheDocument();
  });
});