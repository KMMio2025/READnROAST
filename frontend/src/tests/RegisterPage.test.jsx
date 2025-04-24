import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RootLayout from "../pages/RootLayout.jsx";
import AuthProvider from "../contexts/AuthContext.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import {
  createMemoryRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

const routes = createRoutesFromElements(
  <Route element={<RootLayout />}>
    <Route path="/register" element={<RegisterPage />} />
  </Route>
);

const setup = () => {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/register"],
  });

  render(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );

  const user = userEvent.setup();
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
  const registerButton = screen.getByRole("button", { name: /register/i });

  return {
    user,
    emailInput,
    passwordInput,
    confirmPasswordInput,
    registerButton,
  };
};
