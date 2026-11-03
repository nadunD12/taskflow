
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "./StatCard";

describe("StatCard Component", () => {
  it("displays title, value and description", () => {
    render(
      <StatCard
        title="Total Tasks"
        value={10}
        icon={<span>Icon</span>}
        color="blue"
        description="All your tasks"
      />
    );

    expect(screen.getByText("Total Tasks")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("All your tasks")).toBeInTheDocument();
  });

  it("applies the correct icon color class", () => {
    const { container } = render(
      <StatCard
        title="Completed"
        value={5}
        icon={<span>Icon</span>}
        color="green"
        description="Completed tasks"
      />
    );

    expect(container.querySelector(".stat-icon")).toHaveClass("green");
  });
});
