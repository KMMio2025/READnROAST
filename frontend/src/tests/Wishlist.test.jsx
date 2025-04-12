import React from "react";
import { render, screen } from "@testing-library/react";
import WishlistPage from "../pages/WishlistPage";

const mockFetch = (data) => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => data,
  });
};

describe("Wishlist Page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Shows that wishlist is empty", async () => {
    mockFetch({ items: [], total: 0 });
    render(<WishlistPage />);
    expect(
      await screen.findByText(/Your wishlist is empty/)
    ).toBeInTheDocument();
  });

  test("Shows example of a wishlist", async () => {
    const mockWishlistItems = [
      { id: 1, name: "Brazilian Paradise", category: "book", price: 40 },
      { id: 2, name: "Ugly Men", category: "book", price: 50 },
    ];

    mockFetch({ items: mockWishlistItems });
    render(<WishlistPage />);

    expect(await screen.findByText(/Ugly men/)).toBeInTheDocument();
    expect(await screen.findByText(/Brazilian Paradise/)).toBeInTheDocument();
  });
});
