import { useEffect, useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import api, { TOKEN_KEY, LEGACY_TOKEN_KEY } from "../api/client";
import "./AdminAuthGate.css";

const AdminAuthGate = ({ children, onLogout }) => {
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const verifySession = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      setUser(null);
      setChecking(false);
      return;
    }

    try {
      const data = await api.get("/auth/me");

      if (data?.user?.role !== "admin") {
        localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
        setUser(null);
        setError("Admin access is required.");
      } else {
        setUser(data.user);
        setError("");
      }
    } catch (err) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      setUser(null);
      setError(err.message || "Your session has expired.");
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    verifySession();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Enter your admin email and password.");
      return;
    }

    try {
      setSubmitting(true);

      const data = await api.post("/auth/login", {
        email: email.trim(),
        password,
      });

      if (data?.user?.role !== "admin" || !data?.token) {
        throw new Error("This account does not have admin access.");
      }

      localStorage.setItem(TOKEN_KEY, data.token);
      setUser(data.user);
      setPassword("");
    } catch (err) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(LEGACY_TOKEN_KEY);
      setError(err.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(LEGACY_TOKEN_KEY);
    setUser(null);
    setEmail("");
    setPassword("");
    setError("");

    if (onLogout) {
      onLogout();
    }
  };

  if (checking) {
    return (
      <div className="admin-auth-loading">
        <div className="admin-auth-loading-mark">M</div>
        <span>Checking admin session...</span>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="admin-auth-page">
        <div className="admin-auth-card">
          <div className="admin-auth-brand">
            <div className="admin-auth-brand-mark">M</div>
            <div>
              <strong>MOTORA</strong>
              <span>ADMIN CONSOLE</span>
            </div>
          </div>

          <div className="admin-auth-heading">
            <div className="admin-auth-icon">
              <LockKeyhole size={18} />
            </div>
            <span>SECURE ACCESS</span>
            <h1>Welcome back.</h1>
            <p>Sign in to manage Motora inventory and customer activity.</p>
          </div>

          <form onSubmit={handleLogin} className="admin-auth-form">
            <label>
              <span>EMAIL</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@motora.com"
                autoComplete="email"
              />
            </label>

            <label>
              <span>PASSWORD</span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
            </label>

            {error && <p className="admin-auth-error">{error}</p>}

            <button type="submit" disabled={submitting}>
              {submitting ? "Signing in..." : "Sign in"}
              {!submitting && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return children({ user, logout: handleLogout });
};

export default AdminAuthGate;
