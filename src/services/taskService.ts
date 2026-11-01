
import type { Task } from "../types";

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(
    `${import.meta.env.BASE_URL}data/tasks.json`
  );

  if (!response.ok) {
    throw new Error("Failed to load tasks");
  }

  const data: Task[] = await response.json();

  return data;
}

