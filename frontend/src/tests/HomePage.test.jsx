import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";

describe("Home Page", () => {
  test("Rendering banner, navbar, and featured products", () => {
    render(<HomePage />);

    expect(screen.getByLabelText(/navigation/i)).toBeInTheDocument();
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByText(/featured products/i)).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });
});
