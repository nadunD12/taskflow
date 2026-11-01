
import { useTaskStore } from "../store/taskStore";

export default function Calendar() {
  const { tasks } = useTaskStore();

  const sortedTasks = [...tasks].sort((a, b) =>
    a.dueDate.localeCompare(b.dueDate)
  );

  return (
    <section className="task-section">
      <div className="section-heading">
        <div>
          <h2>Task Calendar</h2>
          <p>Tasks organised by due date.</p>
        </div>
      </div>

      <div className="task-list">
        {sortedTasks.length === 0 ? (
          <p>No scheduled tasks.</p>
        ) : (
          sortedTasks.map((task) => (
            <article className="task-row" key={task.id}>
              <div className="task-details">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>

              <div className="task-meta">
                <span>{task.dueDate}</span>
                <span>{task.status}</span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
