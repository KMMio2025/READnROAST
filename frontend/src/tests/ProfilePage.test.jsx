import React from "react";
import { render, screen } from "@testing-library/react";
import ProfilePage from "../pages/ProfilePage";

describe("ProfilePage", () => {
  test("renders orders, preferences,  account details", async () => {
    render(<ProfilePage />);

    expect(screen.getByText(/preferences/i));
    expect(screen.getByText(/orders/i));
    expect(screen.getByText(/account details/));
  });
});
