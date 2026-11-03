
import {
  createContext,
  useContext,
  useState,
  type ReactNode
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Load an existing token when the application starts.
  const [token, setToken] = useState<string | null>(() => {
    const savedToken = localStorage.getItem("taskflow-token");

    if (savedToken) {
      return savedToken;
    }

    // Migrate an existing login from the previous version.
    if (localStorage.getItem("taskflow-auth") === "true") {
      const migratedToken = `taskflow-demo-${Date.now()}`;

      localStorage.setItem("taskflow-token", migratedToken);
      localStorage.removeItem("taskflow-auth");

      return migratedToken;
    }

    return null;
  });

  const isAuthenticated = Boolean(token);

  function login(email: string, password: string): boolean {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    // Create a simulated token for this coursework demo.
    const demoToken = `taskflow-demo-${Date.now()}`;

    localStorage.setItem("taskflow-token", demoToken);
    localStorage.setItem("taskflow-user-email", email.trim());
    setToken(demoToken);

    return true;
  }

  function logout() {
    localStorage.removeItem("taskflow-token");
    localStorage.removeItem("taskflow-auth");
    localStorage.removeItem("taskflow-user-email");
    setToken(null);
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
