import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginPage from "../pages/LoginPage";

const setup = () => {
  render(<LoginPage />);
  const user = userEvent.setup();
  return { user };
};

describe("Login Page", () => {
  test("Rendering login page showing input boxes for e-mail, password ", async () => {
    setup();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("user can fill and submit the login form", async () => {
    const { user } = setup();

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "secret123");
    await user.click(loginButton);

    expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
  });

  test("shows error for invalid e-mail and password combination", async () => {
    const { user } = setup();

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const loginButton = screen.getByRole("button", { name: /login/i });

    await user.type(emailInput, "wrong@example.com");
    await user.type(passwordInput, "wrongpassword");
    await user.click(loginButton);

    expect(
      await screen.findByText(/invalid e-mail or password/i)
    ).toBeInTheDocument();
  });
});
