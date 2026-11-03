
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  icon,
  className = "section-heading",
}: PageHeaderProps) {
  return (
    <div className={className}>
      <div>
        {icon && (
          <div className="calendar-title-icon">
            {icon}
          </div>
        )}

        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
