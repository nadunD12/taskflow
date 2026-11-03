
import { Link } from "react-router-dom";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <AlertCircle size={64} />

        <h1>404</h1>

        <h2>Page Not Found</h2>

        <p>
          Sorry, the page you are looking for does not exist
          or may have been moved.
        </p>

        <div className="not-found-actions">
          <button onClick={() => window.history.back()}>
            <ArrowLeft size={18} />
            Go Back
          </button>

          <Link to="/dashboard">
            <Home size={18} />
            Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
