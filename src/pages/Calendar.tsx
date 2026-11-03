
import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { useTaskStore } from "../store/taskStore";
import PageHeader from "../components/page-header.tsx";


const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];

export default function Calendar() {
  const { tasks } = useTaskStore();

  const [currentDate, setCurrentDate] = useState(() => new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();
  const todayKey = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0")
  ].join("-");

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Convert Sunday-first JavaScript weekday to Monday-first.
    const startingDay = (firstDay.getDay() + 6) % 7;

    const cells: Array<{
      date: number | null;
      dateKey: string | null;
    }> = [];

    for (let i = 0; i < startingDay; i++) {
      cells.push({ date: null, dateKey: null });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = [
        year,
        String(month + 1).padStart(2, "0"),
        String(day).padStart(2, "0")
      ].join("-");

      cells.push({ date: day, dateKey });
    }

    return cells;
  }, [year, month]);

  const tasksByDate = useMemo(() => {
    const grouped: Record<string, typeof tasks> = {};

    tasks.forEach((task) => {
      if (!grouped[task.dueDate]) {
        grouped[task.dueDate] = [];
      }

      grouped[task.dueDate].push(task);
    });

    return grouped;
  }, [tasks]);

  function changeMonth(direction: number) {
    setCurrentDate(
      new Date(year, month + direction, 1)
    );
  }

  function goToToday() {
    setCurrentDate(new Date());
  }

  const monthTasks = tasks.filter((task) => {
    const [taskYear, taskMonth] = task.dueDate.split("-").map(Number);

    return taskYear === year && taskMonth === month + 1;
  });

  return (
    <section className="calendar-section">
        <PageHeader
          title="Task Calendar"
          description="Organise and track your tasks by due date."
          icon={<CalendarDays size={23} />}
          className="calendar-heading"
        />

      <div className="calendar-card">
        <div className="calendar-toolbar">
          <div>
            <h3>{monthName}</h3>
            <p>{monthTasks.length} tasks scheduled this month</p>
          </div>

          <div className="calendar-controls">
            <button
              type="button"
              className="calendar-today-button"
              onClick={goToToday}
            >
              Today
            </button>

            <button
              type="button"
              className="calendar-nav-button"
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              className="calendar-nav-button"
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="calendar-grid">
          {weekdays.map((day) => (
            <div className="calendar-weekday" key={day}>
              {day}
            </div>
          ))}

          {calendarDays.map((cell, index) => {
            const dayTasks = cell.dateKey
              ? tasksByDate[cell.dateKey] ?? []
              : [];

            const isToday = cell.dateKey === todayKey;

            return (
              <div
                className={`calendar-day ${
                  !cell.date ? "calendar-empty-day" : ""
                } ${isToday ? "calendar-current-day" : ""}`}
                key={cell.dateKey ?? `empty-${index}`}
              >
                {cell.date && (
                  <>
                    <span className="calendar-day-number">
                      {cell.date}
                    </span>

                    <div className="calendar-day-tasks">
                      {dayTasks.map((task) => (
                        <div
                          className={`calendar-task calendar-task-${task.status
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          key={task.id}
                          title={`${task.title} - ${task.status}`}
                        >
                          <span>{task.title}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="calendar-legend">
          <span>
            <i className="legend-dot pending-dot" />
            Pending
          </span>

          <span>
            <i className="legend-dot progress-dot" />
            In Progress
          </span>

          <span>
            <i className="legend-dot completed-dot" />
            Completed
          </span>
        </div>
      </div>
    </section>
  );
}
