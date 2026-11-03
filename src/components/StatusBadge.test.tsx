
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatusBadge from "./StatusBadge";

describe("StatusBadge Component", () => {
  it("displays Pending status", () => {
    const { container } = render(
      <StatusBadge status="Pending" />
    );

    expect(screen.getByText("Pending")).toBeInTheDocument();
    expect(container.querySelector(".status-pending")).toBeInTheDocument();
  });

  it("displays In Progress status", () => {
    const { container } = render(
      <StatusBadge status="In Progress" />
    );

    expect(screen.getByText("In Progress")).toBeInTheDocument();
    expect(container.querySelector(".status-in-progress")).toBeInTheDocument();
  });

  it("displays Completed status", () => {
    const { container } = render(
      <StatusBadge status="Completed" />
    );

    expect(screen.getByText("Completed")).toBeInTheDocument();
    expect(container.querySelector(".status-completed")).toBeInTheDocument();
  });
});
