import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage.jsx";
import AuthProvider from "../contexts/AuthContext.jsx";

beforeEach(() => {
  // Wyłącz fetch – test nie sprawdza połączenia z backendem
  global.fetch = jest.fn();
});

afterEach(() => {
  global.fetch.mockRestore?.();
});

const setup = () => {
  const user = userEvent.setup();

  render(
    <AuthProvider>
      <MemoryRouter initialEntries={["/register"]}>
        <RegisterPage />
      </MemoryRouter>
    </AuthProvider>
  );

  return {
    user,
    emailInput: screen.getByLabelText(/email/i),
    passwordInput: screen.getByLabelText(/password/i),
    registerButton: screen.getByRole("button", { name: /register/i }),
  };
};

describe("Register Page (basic interactions)", () => {
  test("renders all inputs and the register button", () => {
    setup();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i })
    ).toBeInTheDocument();
  });

  test("allows user to fill out the form", async () => {
    const { user, emailInput, passwordInput } = setup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });
});
