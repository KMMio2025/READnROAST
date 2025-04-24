import React from "react";
import { render, screen } from "@testing-library/react";
import CartPage from "../pages/CartPage";

const mockFetch = (data) => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => data,
  });
};

describe("Cart Page", () => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => data,
  });

  test("Shows info that cart is empty", async () => {
    mockFetch({ items: [], total: 0 });
    render(<CartPage />);
    expect(await screen.findByText(/Your cart is empty/)).toBeInTheDocument();
  });

  test("Shows cart products and total", async () => {
    const mockCartItems = [
      { id: 1, name: "Brazilian Paradise", category: "book", price: 40 },
      { id: 2, name: "Ugly Men", category: "book", price: 50 },
    ];
    mockFetch({ items: mockCartItems, total: 90 });

    render(<App />);

    expect(await screen.findByText(/Ugly men/)).toBeInTheDocument();
    expect(await screen.findByText(/Brazilian Paradise/)).toBeInTheDocument();
    expect(await screen.findByText(/Total: 90 zł/i)).toBeInTheDocument();
  });
});
