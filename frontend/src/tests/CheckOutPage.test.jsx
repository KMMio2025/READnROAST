import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutPage from "../pages/CheckoutPage";

describe("Checkout page", () => {
  test("shows cart summary, asks for payment method, displays form for order details, and place order button", async () => {
    render(<CheckoutPage />);

    expect(screen.getByText(/summary/i)).toBeInTheDocument();
    expect(screen.getByText(/payment method/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /place order/i })
    ).toBeInTheDocument();
  });
});
