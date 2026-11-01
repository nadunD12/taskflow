
import { UserRound } from "lucide-react";

export default function Profile() {
  return (
    <section className="task-section">
      <div className="section-heading">
        <div>
          <h2>My Profile</h2>
          <p>Your account information.</p>
        </div>
      </div>

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
