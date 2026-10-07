import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Login = () => {
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

  const redirectTo = location.state?.from || "/client";

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

      // Admin should use the admin panel
      if (data.user?.role === "admin") {
        navigate("/admin", { replace: true });
        return;
      }

      // Normal customer goes to client panel
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container">

        {/* LEFT VISUAL PANEL */}
        <div className="auth-visual">
          <div className="auth-image" />

          <div className="auth-image-overlay" />

          <div className="auth-visual-top">
            <div className="auth-brand-mark">
              <span className="auth-brand-dot" />
              MOTORA
            </div>

            <span className="auth-collection">
              PRIVATE COLLECTION
            </span>
          </div>

          <div className="auth-visual-content">
            <span className="auth-small-label">
              PREMIUM AUTOMOTIVE
            </span>

            <h2>
              Your next
              <br />
              <span>drive awaits.</span>
            </h2>

            <p>
              Discover premium cars, save your favourites and manage
              your entire Motora experience from one place.
            </p>

            <div className="auth-visual-meta">
              <div className="auth-meta-item">
                <ShieldCheck size={17} />

                <div>
                  <strong>Verified Cars</strong>
                  <span>Quality checked inventory</span>
                </div>
              </div>

              <div className="auth-meta-item">
                <Sparkles size={17} />

                <div>
                  <strong>Premium Experience</strong>
                  <span>Built for car enthusiasts</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-image-caption">
            <span>Explore the exceptional.</span>
            <span>Motora</span>
          </div>
        </div>

        {/* RIGHT LOGIN PANEL */}
        <div className="auth-panel">
          <div className="auth-panel-inner">

            <div className="auth-mobile-brand">
              <div className="auth-brand-mark">
                <span className="auth-brand-dot" />
                MOTORA
              </div>
            </div>

            <div className="auth-header">
              <span className="auth-eyebrow">
                WELCOME BACK
              </span>

              <h1>Sign in to Motora.</h1>

              <p>
                Continue your journey and access your saved cars,
                requests and personalised experience.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              <div className="auth-field">
                <label htmlFor="login-email">
                  Email address
                </label>

                <div className="auth-input">
                  <Mail size={18} />

                  <input
                    id="login-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value
                      )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="login-password">
                    Password
                  </label>

                  <span className="auth-secure-label">
                    Secure login
                  </span>
                </div>

                <div className="auth-input">
                  <LockKeyhole size={18} />

                  <input
                    id="login-password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
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
                    className="auth-password-toggle"
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
                <div
                  className="auth-error"
                  role="alert"
                >
                  <span />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                className="auth-submit"
                disabled={submitting}
              >
                <span>
                  {submitting
                    ? "Signing in..."
                    : "Sign in"}
                </span>

                {!submitting && (
                  <ArrowUpRight size={18} />
                )}
              </button>
            </form>

            <div className="auth-separator">
              <span>NEW TO MOTORA</span>
            </div>

            <div className="auth-register">
              <p>
                Create your account to start exploring
                premium cars.
              </p>

              <Link to="/register">
                Create an account
                <ArrowUpRight size={15} />
              </Link>
            </div>

            <div className="auth-footer">
              <span>Private</span>
              <span>Secure</span>
              <span>Premium</span>
            </div>

          </div>
        </div>

      </section>
    </main>
  );
};

export default Login;