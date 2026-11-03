
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

function TestComponent() {
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      <p data-testid="status">
        {isAuthenticated ? "Logged In" : "Logged Out"}
      </p>

      <button onClick={() => login("test@example.com", "password123")}>
        Login
      </button>

      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it("should start as logged out when no token exists", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status").textContent).toBe("Logged Out");
  });

  it("should save a token when login succeeds", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Login"));

    expect(localStorage.getItem("taskflow-token")).toMatch(
      /^taskflow-demo-/
    );
    expect(screen.getByTestId("status").textContent).toBe("Logged In");
  });

  it("should remove the token when logging out", () => {
    localStorage.setItem("taskflow-token", "test-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(localStorage.getItem("taskflow-token")).toBeNull();
    expect(screen.getByTestId("status").textContent).toBe("Logged Out");
  });

  it("should restore authentication from a saved token", () => {
    localStorage.setItem("taskflow-token", "saved-token");

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("status").textContent).toBe("Logged In");
  });
});
