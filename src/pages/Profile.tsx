
import { UserRound } from "lucide-react";
import PageHeader from "../components/page-header.tsx";

export default function Profile() {
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

        <h2>John Doe</h2>
        <p>john@example.com</p>
        <p>Personal TaskFlow Account</p>
      </div>
    </section>
  );
}
