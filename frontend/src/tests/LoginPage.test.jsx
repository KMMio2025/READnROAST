import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LogInPage from "../pages/LogInPage/LoginPage.jsx";
import { MemoryRouter } from "react-router-dom";

// MOCK FETCH
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ message: "login successful" }),
    })
  );
});

afterEach(() => {
  global.fetch.mockRestore();
});

const setup = () => {
  const user = userEvent.setup();

  render(
    <MemoryRouter initialEntries={["/login"]}>
      <LogInPage />
    </MemoryRouter>
  );

  return { user };
};

describe("Login Page", () => {
  test("renders login page with email and password inputs", () => {
    setup();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("user can type into inputs and submit form", async () => {
    const { user } = setup();

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByRole("button", { name: /log in/i });

    await user.type(emailInput, "test@example.com");
    await user.type(passwordInput, "password123");
    await user.click(loginButton);

    expect(global.fetch).toHaveBeenCalled();
    expect(loginButton).toBeInTheDocument();
  });
});
