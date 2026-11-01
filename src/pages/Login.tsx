
import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Redirect authenticated users to Dashboard.
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Validate empty fields.
    if (!trimmedEmail || !trimmedPassword) {
      setError("Please enter your email and password.");
      return;
    }

    // Validate email format.
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Login using AuthContext.
    const success = login(trimmedEmail, trimmedPassword);

    if (!success) {
      setError("Login failed. Please check your details.");
    }
  }

  return (
    <main style={styles.page}>
      <section style={styles.card}>
        <div style={styles.logo}>
          <CheckSquare size={30} />
        </div>

        <h1 style={styles.title}>
          Welcome to TaskFlow
        </h1>

        <p style={styles.subtitle}>
          Sign in to manage your productivity.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label style={styles.label} htmlFor="email">
            Email address
          </label>

          <div style={styles.inputWrapper}>
            <Mail size={18} />

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              aria-invalid={Boolean(error)}
              style={styles.input}
            />
          </div>

          <label style={styles.label} htmlFor="password">
            Password
          </label>

          <div style={styles.inputWrapper}>
            <Lock size={18} />

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              required
              style={styles.input}
            />
          </div>

          {error && (
            <p role="alert" style={styles.error}>
              {error}
            </p>
          )}

          <button type="submit" style={styles.button}>
            Sign In
          </button>
        </form>

        <p style={styles.note}>
          Demo login: enter any valid email and a password.
        </p>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f4f6fb",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    background: "#ffffff",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 35px rgba(0,0,0,0.08)"
  },

  logo: {
    width: "58px",
    height: "58px",
    borderRadius: "14px",
    background: "#2563eb",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "24px"
  },

  title: {
    fontSize: "26px",
    margin: "0 0 8px",
    color: "#172033"
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "30px"
  },

  label: {
    display: "block",
    fontWeight: 600,
    marginBottom: "8px",
    marginTop: "18px",
    color: "#334155"
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    border: "1px solid #dbe1ea",
    borderRadius: "8px",
    padding: "0 12px",
    color: "#64748b"
  },

  input: {
    width: "100%",
    padding: "13px 0",
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent"
  },

  button: {
    width: "100%",
    padding: "14px",
    marginTop: "25px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: 600,
    cursor: "pointer"
  },

  error: {
    color: "#dc2626",
    fontSize: "14px",
    marginTop: "12px"
  },

  note: {
    marginTop: "22px",
    fontSize: "12px",
    color: "#64748b",
    textAlign: "center" as const
  }
};
