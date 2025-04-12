import React from "react";
import { render, screen } from "@testing-library/react";
import ProductListPage from "../pages/ProductListPage";

const mockFetch = (data) => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => data,
  });
};

describe("Product List Page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test("Renders products, prices", async () => {
    const mockProducts = [
      { id: 1, name: "Product 1", image: "product1.jpg", price: "10.00zl" },
      { id: 2, name: "Product 2", image: "product2.jpg", price: "20.00zl" },
    ];

    mockFetch({ products: mockProducts });
    render(<ProductListPage />);

    expect(await screen.findByAltText(/product 1/i)).toBeInTheDocument();
    expect(await screen.findByAltText(/product 2/i)).toBeInTheDocument();
    expect(await screen.findByText(/product 1/i)).toBeInTheDocument();
    expect(await screen.findByText(/product 2/i)).toBeInTheDocument();

    expect(await screen.findByText(/20.00zl/i)).toBeInTheDocument();
    expect(await screen.findByText(/10.00zl/i)).toBeInTheDocument();
  });

  test("Shows empty state when no products are available", async () => {
    mockFetch({ products: [] });

    render(<ProductListPage />);

    expect(
      await screen.findByText(/no products available/i)
    ).toBeInTheDocument();
  });
});
