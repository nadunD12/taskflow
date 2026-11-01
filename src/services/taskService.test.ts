
import { describe, expect, it, vi, afterEach } from "vitest";
import { fetchTasks } from "./taskService";

describe("Task Service", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("fetches tasks successfully", async () => {
    const mockTasks = [
      {
        id: "1",
        title: "Complete coursework",
        description: "Finish the React coursework",
        priority: "High",
        status: "Pending",
        dueDate: "2026-12-10",
        category: "University",
      },
    ];

    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockTasks,
    });

    vi.stubGlobal("fetch", mockFetch);

    const result = await fetchTasks();

    expect(result).toEqual(mockTasks);
    expect(mockFetch).toHaveBeenCalledWith(
      `${import.meta.env.BASE_URL}data/tasks.json`
    );
  });

  it("throws an error when the request fails", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
    });

    vi.stubGlobal("fetch", mockFetch);

    await expect(fetchTasks()).rejects.toThrow(
      "Failed to load tasks"
    );
  });
});
