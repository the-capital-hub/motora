import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const redirectTo = location.state?.from || "/cars";

  const update = (field) => (event) => {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await register(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Unable to create account.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-container auth-register-page">
        {/* LEFT VISUAL */}
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
              WELCOME TO MOTORA
            </span>

            <h2>
              Start your
              <br />
              <span>car journey.</span>
            </h2>

            <p>
              Create your Motora account and discover premium cars,
              save your favourites and manage your requests with ease.
            </p>

            <div className="auth-visual-meta">
              <div className="auth-meta-item">
                <ShieldCheck size={17} />

                <div>
                  <strong>Trusted Collection</strong>
                  <span>Premium cars in one place</span>
                </div>
              </div>

              <div className="auth-meta-item">
                <Sparkles size={17} />

                <div>
                  <strong>Personalised Journey</strong>
                  <span>Your cars, your preferences</span>
                </div>
              </div>
            </div>
          </div>

          <div className="auth-image-caption">
            <span>Discover something exceptional.</span>
            <span>Motora</span>
          </div>
        </div>

        {/* RIGHT REGISTER PANEL */}
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
                JOIN MOTORA
              </span>

              <h1>Create your account.</h1>

              <p>
                Build your collection, save favourite cars and manage
                your Motora requests from one place.
              </p>
            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >
              {/* NAME */}
              <div className="auth-field">
                <label htmlFor="register-name">
                  Full name
                </label>

                <div className="auth-input">
                  <UserRound size={18} />

                  <input
                    id="register-name"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div className="auth-field">
                <label htmlFor="register-email">
                  Email address
                </label>

                <div className="auth-input">
                  <Mail size={18} />

                  <input
                    id="register-email"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              {/* PHONE */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="register-phone">
                    Phone number
                  </label>

                  <span className="auth-secure-label">
                    Optional
                  </span>
                </div>

                <div className="auth-input">
                  <Phone size={18} />

                  <input
                    id="register-phone"
                    type="tel"
                    value={form.phone}
                    onChange={update("phone")}
                    placeholder="Your phone number"
                    autoComplete="tel"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label htmlFor="register-password">
                    Password
                  </label>

                  <span className="auth-secure-label">
                    Minimum 6 characters
                  </span>
                </div>

                <div className="auth-input">
                  <LockKeyhole size={18} />

                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={update("password")}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    minLength={6}
                    required
                  />

                  <button
                    type="button"
                    className="auth-password-toggle"
                    onClick={() =>
                      setShowPassword((current) => !current)
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

              {/* ERROR */}
              {error && (
                <div className="auth-error" role="alert">
                  <span />
                  <p>{error}</p>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="auth-submit"
                disabled={submitting}
              >
                <span>
                  {submitting
                    ? "Creating account..."
                    : "Create account"}
                </span>

                {!submitting && (
                  <ArrowUpRight size={18} />
                )}
              </button>
            </form>

            <div className="auth-separator">
              <span>ALREADY A MEMBER</span>
            </div>

            <div className="auth-register">
              <p>
                Already have a Motora account?
              </p>

              <Link to="/login">
                Sign in
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

export default Register;