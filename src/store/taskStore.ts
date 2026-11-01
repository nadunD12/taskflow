
import { create } from "zustand";
import type { Task } from "../types";
import { fetchTasks } from "../services/taskService";

interface TaskStore {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  loadTasks: () => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
}

function saveTasks(tasks: Task[]) {
  localStorage.setItem("taskflow-tasks", JSON.stringify(tasks));
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  loading: false,
  error: null,

  loadTasks: async () => {
    set({ loading: true, error: null });

    try {
      const savedTasks = localStorage.getItem("taskflow-tasks");

      if (savedTasks) {
        set({
          tasks: JSON.parse(savedTasks) as Task[],
          loading: false
        });
        return;
      }

      const tasks = await fetchTasks();

      set({ tasks, loading: false });
      saveTasks(tasks);
    } catch {
      set({
        error: "Unable to load tasks. Please try again.",
        loading: false
      });
    }
  },

  addTask: (task) => {
    const tasks = [...get().tasks, task];
    set({ tasks });
    saveTasks(tasks);
  },

  updateTask: (id, updates) => {
    const tasks = get().tasks.map((task) =>
      task.id === id ? { ...task, ...updates } : task
    );

    set({ tasks });
    saveTasks(tasks);
  },

  deleteTask: (id) => {
    const tasks = get().tasks.filter((task) => task.id !== id);

    set({ tasks });
    saveTasks(tasks);
  }
}));
