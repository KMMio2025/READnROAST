import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductPage from "../pages/ProductPage";

const mockFetch = (data) => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => data,
  });
};

const setup = () => {
  const product = {
    id: 1,
    name: "Brazilian Paradise",
    image: "blabla.jpg",
    description: "bla bla bla",
    reviews: "here should be a review",
  };

  mockFetch({ product });

  render(<ProductPage />);

  const user = userEvent.setup();

  return { product, user };
};

describe("Product Page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Shows product details (Image, Description, Reviews, etc.)", async () => {
    const { product } = setup();

    // Check product details
    expect(await screen.findByAltText(product.image)).toBeInTheDocument();
    expect(await screen.findByText(product.name)).toBeInTheDocument();
    expect(await screen.findByText(product.description)).toBeInTheDocument();
    expect(await screen.findByText(product.reviews)).toBeInTheDocument();
  });

  /* test("User can add product to cart", async () => {
    const { user } = setup();

    // Simulate adding product to cart
    await user.click(screen.getByRole("button", { name: /add to cart/i }));
    expect(screen.getByText(/product added to cart/i)).toBeInTheDocument();
  });*/
});
