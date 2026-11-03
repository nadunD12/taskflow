
import {
  ListTodo,
  Clock,
  CirclePlay,
  CircleCheck,
} from "lucide-react";

import { useTaskStore } from "../store/taskStore";
import StatCard from "../components/StatCard";
import PageHeader from "../components/page-header.tsx";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const { tasks } = useTaskStore();

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.dueDate).getTime() -
        new Date(a.dueDate).getTime()
    )
    .slice(0, 5);

  return (
    <section className="task-section">
      <PageHeader
        title="Dashboard"
        description="Track your productivity and manage your tasks."
      />

      <div className="stats-grid">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<ListTodo size={24} />}
          color="blue"
          description="All your tasks"
        />

        <StatCard
          title="Pending Tasks"
          value={pendingTasks}
          icon={<Clock size={24} />}
          color="orange"
          description="Waiting to be started"
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={<CirclePlay size={24} />}
          color="purple"
          description="Currently working on"
        />

        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CircleCheck size={24} />}
          color="green"
          description="Successfully completed"
        />
      </div>

      <div className="recent-tasks">
        <h2>Recent Tasks</h2>

        {recentTasks.length === 0 ? (
          <p>No tasks available yet.</p>
        ) : (
          <div className="task-list">
            {recentTasks.map((task) => (
              <article className="task-row" key={task.id}>
                <div className="task-details">
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <span className="task-category">
                    {task.category}
                  </span>
                </div>

                <div className="task-meta">
                  <StatusBadge status={task.status} />
                  <span className="task-date">
                    {task.dueDate}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
