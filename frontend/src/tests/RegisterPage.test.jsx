import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterPage from "../pages/RegisterPage";

const setup = () => {
  render(<RegisterPage />);
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

describe("Register Page", () => {
  test("renders registration form", () => {
    const { emailInput, passwordInput, confirmPasswordInput, registerButton } =
      setup();

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(registerButton).toBeInTheDocument();
  });

  test("user can fill and submit the register form", async () => {
    const {
      user,
      emailInput,
      passwordInput,
      confirmPasswordInput,
      registerButton,
    } = setup();

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "secret123");
    await user.type(confirmPasswordInput, "secret123");
    await user.click(registerButton);

    expect(
      await screen.findByText(/registration successful/i)
    ).toBeInTheDocument();
  });

  test("shows validation errors if fields are empty", async () => {
    const { user, registerButton } = setup();

    await user.click(registerButton);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  test("shows error if passwords do not match", async () => {
    const { user, passwordInput, confirmPasswordInput, registerButton } =
      setup();

    await user.type(passwordInput, "password123");
    await user.type(confirmPasswordInput, "password321");
    await user.click(registerButton);

    expect(
      await screen.findByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });
});
