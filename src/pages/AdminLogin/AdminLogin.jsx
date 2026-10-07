import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo = location.state?.from || "/admin";

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const data = await login(form);

      if (data.user?.role !== "admin") {
        setError("You do not have administrator access.");
        return;
      }

      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      <section className="admin-login-container">

        <div className="admin-login-visual">
          <div className="admin-login-overlay" />

          <div className="admin-login-top">
            <div className="admin-login-brand">
              <span />
              MOTORA
            </div>

            <span className="admin-login-badge">
              ADMINISTRATION
            </span>
          </div>

          <div className="admin-login-visual-content">
            <div className="admin-login-icon">
              <ShieldCheck size={26} />
            </div>

            <span className="admin-login-eyebrow">
              MOTORA MANAGEMENT
            </span>

            <h1>
              Everything
              <br />
              <em>under control.</em>
            </h1>

            <p>
              Manage inventory, customers, appointments,
              enquiries and the complete Motora operation
              from one secure workspace.
            </p>

            <div className="admin-login-points">
              <div>
                <ShieldCheck size={17} />
                <span>Secure administration</span>
              </div>

              <div>
                <ShieldCheck size={17} />
                <span>Complete inventory control</span>
              </div>

              <div>
                <ShieldCheck size={17} />
                <span>Real time business visibility</span>
              </div>
            </div>
          </div>

          <div className="admin-login-visual-footer">
            <span>PRIVATE MANAGEMENT SYSTEM</span>
            <span>MOTORA</span>
          </div>
        </div>

        <div className="admin-login-panel">
          <div className="admin-login-panel-inner">

            <div className="admin-login-mobile-brand">
              <div className="admin-login-brand">
                <span />
                MOTORA
              </div>
            </div>

            <div className="admin-login-header">
              <span>ADMIN ACCESS</span>

              <h2>
                Welcome back.
              </h2>

              <p>
                Sign in to access the Motora administration
                panel.
              </p>
            </div>

            <form
              className="admin-login-form"
              onSubmit={handleSubmit}
            >
              <div className="admin-login-field">
                <label htmlFor="admin-email">
                  Email address
                </label>

                <div className="admin-login-input">
                  <Mail size={18} />

                  <input
                    id="admin-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="admin@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="admin-login-field">
                <label htmlFor="admin-password">
                  Password
                </label>

                <div className="admin-login-input">
                  <LockKeyhole size={18} />

                  <input
                    id="admin-password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(event) =>
                      handleChange(
                        "password",
                        event.target.value
                      )
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="admin-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (current) => !current
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="admin-login-error">
                  <span />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="admin-login-submit"
                disabled={submitting}
              >
                <span>
                  {submitting
                    ? "Signing in..."
                    : "Access admin panel"}
                </span>

                {!submitting && (
                  <ArrowUpRight size={18} />
                )}
              </button>
            </form>

            <div className="admin-login-security">
              <ShieldCheck size={16} />

              <span>
                This area is restricted to authorised
                Motora administrators.
              </span>
            </div>

            <div className="admin-login-footer">
              <span>Motora</span>
              <span>Secure</span>
              <span>Administration</span>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default AdminLogin;