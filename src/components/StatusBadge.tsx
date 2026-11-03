
import type { TaskStatus } from "../types";

interface StatusBadgeProps {
  status: TaskStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusClass = status.toLowerCase().replace(" ", "-");

  return (
    <span className={`status status-${statusClass}`}>
      {status}
    </span>
  );
}
