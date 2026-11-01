
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useTaskStore } from "./taskStore";
import { fetchTasks } from "../services/taskService";
import type { Task } from "../types";

vi.mock("../services/taskService", () => ({
  fetchTasks: vi.fn(),
}));

const sampleTasks: Task[] = [
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

describe("Task Store", () => {
  beforeEach(() => {
    localStorage.clear();

    useTaskStore.setState({
      tasks: [],
      loading: false,
      error: null,
    });

    vi.clearAllMocks();
  });

  it("loads tasks from the JSON service", async () => {
    vi.mocked(fetchTasks).mockResolvedValue(sampleTasks);

    await useTaskStore.getState().loadTasks();

    expect(useTaskStore.getState().tasks).toEqual(sampleTasks);
    expect(useTaskStore.getState().loading).toBe(false);
    expect(localStorage.getItem("taskflow-tasks")).not.toBeNull();
  });

  it("loads saved tasks from localStorage", async () => {
    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(sampleTasks)
    );

    await useTaskStore.getState().loadTasks();

    expect(useTaskStore.getState().tasks).toEqual(sampleTasks);
    expect(fetchTasks).not.toHaveBeenCalled();
  });

  it("adds a new task", () => {
    useTaskStore.getState().addTask(sampleTasks[0]);

    expect(useTaskStore.getState().tasks).toHaveLength(1);
    expect(useTaskStore.getState().tasks[0].title).toBe(
      "Complete coursework"
    );
  });

  it("updates an existing task", () => {
    useTaskStore.setState({ tasks: sampleTasks });

    useTaskStore.getState().updateTask("1", {
      status: "Completed",
    });

    expect(useTaskStore.getState().tasks[0].status).toBe(
      "Completed"
    );
  });

  it("deletes a task", () => {
    useTaskStore.setState({ tasks: sampleTasks });

    useTaskStore.getState().deleteTask("1");

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it("sets an error when tasks cannot be loaded", async () => {
    vi.mocked(fetchTasks).mockRejectedValue(
      new Error("Network error")
    );

    await useTaskStore.getState().loadTasks();

    expect(useTaskStore.getState().error).toBe(
      "Unable to load tasks. Please try again."
    );
    expect(useTaskStore.getState().loading).toBe(false);
  });
});
