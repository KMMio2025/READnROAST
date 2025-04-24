import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RootLayout from "../pages/RootLayout";
import AuthProvider from "../contexts/AuthContext";

test("renders navbar, banner, featured products and footer", () => {
  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument(); // z RootLayout
  expect(screen.getByRole("banner")).toBeInTheDocument(); // z HomePage
  expect(screen.getByText(/featured products/i)).toBeInTheDocument(); // z HomePage
  expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // np. stopka
});
