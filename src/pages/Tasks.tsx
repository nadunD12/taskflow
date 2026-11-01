
import { useMemo, useState } from "react";
import type { FormEvent } from "react";

import {
  Search,
  Pencil,
  Trash2,
  Check,
  X
} from "lucide-react";

import { useTaskStore } from "../store/taskStore";
import type { Task, TaskPriority } from "../types";

export default function Tasks() {
  const {
    tasks,
    updateTask,
    deleteTask
  } = useTaskStore();

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");

  // Search and filter
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = search.toLowerCase();

      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  // Open edit form
  function handleEdit(task: Task) {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setFormError("");
  }

  // Close edit form
  function handleCloseEdit() {
    setEditingTask(null);
    setFormError("");
  }

  // Save edited task
  function handleSaveEdit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingTask) return;

    if (title.trim().length < 3) {
      setFormError("Title must contain at least 3 characters.");
      return;
    }

    if (description.trim().length < 5) {
      setFormError("Description must contain at least 5 characters.");
      return;
    }

    if (!dueDate) {
      setFormError("Please select a due date.");
      return;
    }

    updateTask(editingTask.id, {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate
    });

    handleCloseEdit();
  }

  // Delete task
  function handleDelete(task: Task) {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${task.title}"?`
    );

    if (confirmed) {
      deleteTask(task.id);
    }
  }

  // Complete or undo task
  function handleToggleComplete(task: Task) {
    updateTask(task.id, {
      status:
        task.status === "Completed"
          ? "Pending"
          : "Completed"
    });
  }

  return (
    <>
      <section className="task-section">
        <div className="section-heading">
          <div>
            <h2>My Tasks</h2>
            <p>View and manage all your tasks.</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="task-toolbar">
          <div className="search-box">
            <Search size={19} />

            <input
              type="search"
              placeholder="Search tasks..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search tasks"
            />
          </div>

          <select
            className="filter-select"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            aria-label="Filter tasks by status"
          >
            <option value="All">All Tasks</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Task count */}
        <p className="message">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </p>

        {/* Task List */}
        <div className="task-list">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <h3>No tasks found</h3>
              <p>Try another search or change the status filter.</p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <article className="task-row" key={task.id}>
                <div className="task-main">
                  <button
                    type="button"
                    className={`complete-button ${
                      task.status === "Completed"
                        ? "is-complete"
                        : ""
                    }`}
                    onClick={() => handleToggleComplete(task)}
                    aria-label={`Toggle ${task.title}`}
                    aria-pressed={task.status === "Completed"}
                    title="Complete or undo task"
                  >
                    {task.status === "Completed" && (
                      <Check size={15} />
                    )}
                  </button>

                  <div className="task-details">
                    <h3
                      className={
                        task.status === "Completed"
                          ? "completed-title"
                          : ""
                      }
                    >
                      {task.title}
                    </h3>

                    <p>{task.description}</p>

                    <span className="task-category">
                      {task.category}
                    </span>
                  </div>
                </div>

                <div className="task-meta">
                  <span
                    className={`priority priority-${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>

                  <span
                    className={`status status-${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {task.status}
                  </span>

                  <span className="task-date">
                    {task.dueDate}
                  </span>

                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => handleEdit(task)}
                    aria-label={`Edit ${task.title}`}
                    title="Edit task"
                  >
                    <Pencil size={17} />
                  </button>

                  <button
                    type="button"
                    className="delete-button"
                    onClick={() => handleDelete(task)}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Edit Task Modal */}
      {editingTask && (
        <div
          className="modal-overlay"
          onClick={handleCloseEdit}
        >
          <div
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-task-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2 id="edit-task-title">Edit Task</h2>
                <p>Update your task details.</p>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={handleCloseEdit}
                aria-label="Close edit form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <label htmlFor="edit-title">Task title</label>

              <input
                id="edit-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                minLength={3}
                maxLength={80}
                required
              />

              <label htmlFor="edit-description">Description</label>

              <textarea
                id="edit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                minLength={5}
                maxLength={300}
                required
              />

              <div className="form-row">
                <div>
                  <label htmlFor="edit-priority">Priority</label>

                  <select
                    id="edit-priority"
                    value={priority}
                    onChange={(event) =>
                      setPriority(event.target.value as TaskPriority)
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="edit-category">Category</label>

                  <select
                    id="edit-category"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                  >
                    <option value="Personal">Personal</option>
                    <option value="University">University</option>
                    <option value="Learning">Learning</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <label htmlFor="edit-date">Due date</label>

              <input
                id="edit-date"
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                required
              />

              {formError && (
                <p className="error-message" role="alert">
                  {formError}
                </p>
              )}

              <button
                className="primary-button submit-button"
                type="submit"
              >
                <Check size={18} />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
