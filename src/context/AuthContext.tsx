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
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem("taskflow-auth") === "true"
  );

  function login(email: string, password: string) {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    localStorage.setItem("taskflow-auth", "true");
    setIsAuthenticated(true);
    return true;
  }

  function logout() {
    localStorage.removeItem("taskflow-auth");
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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