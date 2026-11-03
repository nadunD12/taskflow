
import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
  description: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
  description,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <span>{title}</span>

        <div className={`stat-icon ${color}`}>
          {icon}
        </div>
      </div>

      <h2>{value}</h2>
      <p>{description}</p>
    </div>
  );
}
