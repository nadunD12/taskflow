
import type { ReactNode, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  UserRound,
  Plus,
  Search,
  Bell,
  Menu,
  Trash2,
  Check,
  Clock,
  CircleAlert,
  X,
  Pencil,
  LogOut,
} from "lucide-react";

import { useTaskStore } from "./store/taskStore";
import type { Task, TaskPriority } from "./types";

import StatCard from "./components/StatCard";
import StatusBadge from "./components/StatusBadge";

import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

import { AuthProvider, useAuth } from "./context/AuthContext";

// Protect application pages
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

// Main application content
function AppContent() {
  const {
    tasks,
    loading,
    error,
    loadTasks,
    addTask,
    deleteTask,
    updateTask,
  } = useTaskStore();

  const { logout } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  // Navigation state
  const [mobileMenu, setMobileMenu] = useState(false);

  // Search and filter state
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Task modal state
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  // Task form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Medium");
  const [category, setCategory] = useState("Personal");
  const [dueDate, setDueDate] = useState("");
  const [formError, setFormError] = useState("");

  const currentPage = location.pathname;

  // Load tasks when the application starts
  useEffect(() => {
    void loadTasks();
  }, [loadTasks]);

  // Search and filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query);

      const matchesFilter =
        filter === "All" || task.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  // Dashboard statistics
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgress = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  // Page title
  const pageTitle =
    currentPage === "/tasks"
      ? "My Tasks"
      : currentPage === "/calendar"
        ? "Calendar"
        : currentPage === "/profile"
          ? "My Profile"
          : "Dashboard";

  // Reset task form
  function resetForm() {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setCategory("Personal");
    setDueDate("");
    setEditingTaskId(null);
    setFormError("");
  }

  // Open create task form
  function handleOpenCreate() {
    resetForm();
    setShowForm(true);
  }

  // Open edit task form
  function handleEditClick(task: Task) {
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setCategory(task.category);
    setDueDate(task.dueDate);
    setFormError("");
    setShowForm(true);
  }

  // Close task form
  function handleCloseForm() {
    setShowForm(false);
    resetForm();
  }

  // Create or update task
  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

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

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate,
    };

    if (editingTaskId) {
      updateTask(editingTaskId, taskData);
    } else {
      const newTask: Task = {
        id: crypto.randomUUID(),
        ...taskData,
        status: "Pending",
      };

      addTask(newTask);
    }

    handleCloseForm();
  }

  // Delete task
  function handleDeleteTask(task: Task) {
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
          : "Completed",
    });
  }

  // Logout
  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <div className="app-shell">
      {/* Sidebar */}
      <aside
        className={`sidebar ${mobileMenu ? "sidebar-open" : ""}`}
      >
        <div className="brand">
          <div className="brand-icon">
            <CheckSquare size={23} />
          </div>

          <span>
            TaskFlow<span className="brand-dot">.</span>
          </span>

          <button
            type="button"
            className="mobile-close"
            onClick={() => setMobileMenu(false)}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <p className="nav-label">WORKSPACE</p>

        <nav className="navigation">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            onClick={() => setMobileMenu(false)}
          >
            <LayoutDashboard size={19} />
            Dashboard
          </NavLink>

          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            onClick={() => setMobileMenu(false)}
          >
            <CheckSquare size={19} />
            My Tasks
          </NavLink>

          <NavLink
            to="/calendar"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            onClick={() => setMobileMenu(false)}
          >
            <CalendarDays size={19} />
            Calendar
          </NavLink>
        </nav>

        <div className="sidebar-bottom">
          <p className="nav-label">ACCOUNT</p>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
            onClick={() => setMobileMenu(false)}
          >
            <UserRound size={19} />
            My Profile
          </NavLink>

          <div className="profile-mini">
            <div className="avatar">JD</div>

            <div>
              <strong>John Doe</strong>
              <span>Personal account</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        {/* Top navigation */}
        <header className="topbar">
          <button
            type="button"
            className="icon-button mobile-toggle"
            onClick={() => setMobileMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={22} />
          </button>

          <div className="breadcrumb">
            Workspace <span>/</span> {pageTitle}
          </div>

          <div className="topbar-actions">
            <button
              type="button"
              className="icon-button"
              aria-label="Notifications"
            >
              <Bell size={20} />
            </button>

            <button
              type="button"
              className="icon-button"
              onClick={handleLogout}
              aria-label="Logout"
              title="Logout"
            >
              <LogOut size={20} />
            </button>

            <div className="avatar top-avatar">JD</div>
          </div>
        </header>

        <div className="dashboard-content">
          <Routes>
            {/* Default route */}
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                <>
                  <section className="welcome-section">
                    <div>
                      <p className="date-label">
                        YOUR PRODUCTIVITY SPACE
                      </p>

                      <h1>Good morning, John 👋</h1>

                      <p className="welcome-subtitle">
                        Here's what's happening with your tasks today.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={handleOpenCreate}
                    >
                      <Plus size={19} />
                      Add New Task
                    </button>
                  </section>

                  {/* Dashboard statistics */}
                  <section className="stats-grid">
                    <StatCard
                      title="Total Tasks"
                      value={tasks.length}
                      icon={<CheckSquare size={21} />}
                      color="blue"
                      description="All your tasks"
                    />

                    <StatCard
                      title="Completed"
                      value={completed}
                      icon={<Check size={21} />}
                      color="green"
                      description="Successfully completed"
                    />

                    <StatCard
                      title="In Progress"
                      value={inProgress}
                      icon={<Clock size={21} />}
                      color="purple"
                      description="Currently working on"
                    />

                    <StatCard
                      title="Pending"
                      value={pending}
                      icon={<CircleAlert size={21} />}
                      color="orange"
                      description="Waiting to be started"
                    />
                  </section>

                  {/* Recent tasks */}
                  <section className="task-section">
                    <div className="section-heading">
                      <div>
                        <h2>Recent Tasks</h2>
                        <p>
                          Manage and track your daily activities.
                        </p>
                      </div>

                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => navigate("/tasks")}
                      >
                        View All Tasks
                      </button>
                    </div>

                    {/* Search and filter */}
                    <div className="task-toolbar">
                      <div className="search-box">
                        <Search size={19} />

                        <input
                          type="search"
                          placeholder="Search tasks..."
                          value={search}
                          onChange={(event) =>
                            setSearch(event.target.value)
                          }
                          aria-label="Search tasks"
                        />
                      </div>

                      <select
                        className="filter-select"
                        value={filter}
                        onChange={(event) =>
                          setFilter(event.target.value)
                        }
                        aria-label="Filter tasks"
                      >
                        <option value="All">All Tasks</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    {/* Loading state */}
                    {loading && (
                      <p className="message">
                        Loading your tasks...
                      </p>
                    )}

                    {/* Error state */}
                    {error && (
                      <p className="error-message">{error}</p>
                    )}

                    {/* Empty state */}
                    {!loading &&
                      !error &&
                      filteredTasks.length === 0 && (
                        <div className="empty-state">
                          <CheckSquare size={34} />

                          <h3>No tasks found</h3>

                          <p>
                            Try another search or create a new task.
                          </p>

                          <button
                            type="button"
                            className="primary-button"
                            onClick={handleOpenCreate}
                          >
                            <Plus size={17} />
                            Create Task
                          </button>
                        </div>
                      )}

                    {/* Task list */}
                    {!loading &&
                      !error &&
                      filteredTasks.length > 0 && (
                        <div className="task-list">
                          {filteredTasks.slice(0, 5).map((task) => (
                            <article
                              className="task-row"
                              key={task.id}
                            >
                              <div className="task-main">
                                <button
                                  type="button"
                                  className={`complete-button ${
                                    task.status === "Completed"
                                      ? "is-complete"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleToggleComplete(task)
                                  }
                                  aria-label={`Toggle ${task.title}`}
                                  aria-pressed={
                                    task.status === "Completed"
                                  }
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

                                <StatusBadge status={task.status} />

                                <span className="task-date">
                                  {task.dueDate}
                                </span>

                                <button
                                  type="button"
                                  className="edit-button"
                                  onClick={() =>
                                    handleEditClick(task)
                                  }
                                  aria-label={`Edit ${task.title}`}
                                  title="Edit task"
                                >
                                  <Pencil size={17} />
                                </button>

                                <button
                                  type="button"
                                  className="delete-button"
                                  onClick={() =>
                                    handleDeleteTask(task)
                                  }
                                  aria-label={`Delete ${task.title}`}
                                  title="Delete task"
                                >
                                  <Trash2 size={17} />
                                </button>
                              </div>
                            </article>
                          ))}
                        </div>
                      )}
                  </section>
                </>
              }
            />

            {/* My Tasks */}
            <Route
              path="/tasks"
              element={
                <>
                  <section className="welcome-section">
                    <div>
                      <p className="date-label">WORKSPACE</p>

                      <h1>My Tasks</h1>

                      <p className="welcome-subtitle">
                        View and manage all your tasks.
                      </p>
                    </div>

                    <button
                      type="button"
                      className="primary-button"
                      onClick={handleOpenCreate}
                    >
                      <Plus size={19} />
                      Add New Task
                    </button>
                  </section>

                  <Tasks />
                </>
              }
            />

            {/* Calendar */}
            <Route
              path="/calendar"
              element={<Calendar />}
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={<Profile />}
            />

            {/* Unknown route */}
            <Route
              path="*"
              element={<Navigate to="/dashboard" replace />}
            />
          </Routes>

          <footer className="footer">
            © 2026 TaskFlow. Stay organised, stay productive.
          </footer>
        </div>
      </main>

      {/* Create and Edit Task Modal */}
      {showForm && (
        <div
          className="modal-overlay"
          onClick={handleCloseForm}
        >
          <div
            className="task-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-heading">
              <div>
                <h2 id="modal-title">
                  {editingTaskId ? "Edit Task" : "Create New Task"}
                </h2>

                <p>
                  {editingTaskId
                    ? "Update your task details."
                    : "Add something to your productivity list."}
                </p>
              </div>

              <button
                type="button"
                className="icon-button"
                onClick={handleCloseForm}
                aria-label="Close form"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleAddTask}>
              <label htmlFor="task-title">Task title</label>

              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="Enter task title"
                minLength={3}
                maxLength={80}
                required
              />

              <label htmlFor="task-description">
                Description
              </label>

              <textarea
                id="task-description"
                value={description}
                onChange={(event) =>
                  setDescription(event.target.value)
                }
                placeholder="Describe your task"
                minLength={5}
                maxLength={300}
                required
              />

              <div className="form-row">
                <div>
                  <label htmlFor="task-priority">
                    Priority
                  </label>

                  <select
                    id="task-priority"
                    value={priority}
                    onChange={(event) =>
                      setPriority(
                        event.target.value as TaskPriority
                      )
                    }
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="task-category">
                    Category
                  </label>

                  <select
                    id="task-category"
                    value={category}
                    onChange={(event) =>
                      setCategory(event.target.value)
                    }
                  >
                    <option value="Personal">Personal</option>
                    <option value="University">University</option>
                    <option value="Learning">Learning</option>
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                  </select>
                </div>
              </div>

              <label htmlFor="task-date">Due date</label>

              <input
                id="task-date"
                type="date"
                value={dueDate}
                onChange={(event) =>
                  setDueDate(event.target.value)
                }
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
                {editingTaskId ? (
                  <>
                    <Check size={18} />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    Create Task
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Application entry point
function App() {
  return (
    <HashRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Routes>
          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AppContent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
