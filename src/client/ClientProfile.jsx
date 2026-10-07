import { useEffect, useState } from "react";
import { Mail, Phone, Save, UserRound } from "lucide-react";
import { clientApi } from "./clientApi";
import { useAuth } from "../context/AuthContext";

const ClientProfile = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { updateUser } = useAuth();

  useEffect(() => {
    clientApi.me()
      .then((user) => setForm({ name: user.name || "", phone: user.phone || "", email: user.email || "" }))
      .catch((err) => setError(err.message || "Unable to load profile."))
      .finally(() => setLoading(false));
  }, []);

  const save = async (event) => {
    event.preventDefault();
    try {
      setSaving(true);
      setMessage("");
      setError("");
      const user = await clientApi.updateProfile({ name: form.name, phone: form.phone });
      updateUser(user);
      setForm((current) => ({ ...current, ...user }));
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="client-page">
      <div className="client-page-header">
        <div><span className="client-eyebrow">ACCOUNT</span><h1>My profile</h1><p>Keep your personal information up to date.</p></div>
        <div className="client-page-mark"><UserRound size={20} /></div>
      </div>

      <div className="client-form-panel">
        {error && <div className="client-alert">{error}</div>}
        {message && <div className="client-success">{message}</div>}

        {loading ? <div className="client-empty">Loading profile...</div> : (
          <form onSubmit={save} className="client-form">
            <label><span>Full name</span><div className="client-input-wrap"><UserRound size={16} /><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></div></label>
            <label><span>Email address</span><div className="client-input-wrap"><Mail size={16} /><input value={form.email} disabled /></div><small>Email is managed by your account.</small></label>
            <label><span>Phone number</span><div className="client-input-wrap"><Phone size={16} /><input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div></label>
            <div><button className="client-primary-btn" disabled={saving}><Save size={16} />{saving ? "Saving..." : "Save changes"}</button></div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ClientProfile;
