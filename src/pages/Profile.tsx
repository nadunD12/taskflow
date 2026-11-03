
import { UserRound, Mail, ShieldCheck } from "lucide-react";
import PageHeader from "../components/page-header.tsx";

export default function Profile() {
  const email = localStorage.getItem("taskflow-user-email") || "Not available";

  const displayName =
    email === "Not available"
      ? "TaskFlow User"
      : email.split("@")[0]
          .split(/[._-]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");

  return (
    <section className="task-section">
      <PageHeader
        title="My Profile"
        description="Your account information."
      />

      <div className="stat-card">
        <div className="stat-icon blue">
          <UserRound size={24} />
        </div>

        <h2>{displayName}</h2>

        <p>
          <Mail size={16} />
          {email}
        </p>

        <p>
          <ShieldCheck size={16} />
          Personal TaskFlow Account
        </p>
      </div>
    </section>
  );
}
