import { LogOut, Settings, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ClientSettings = () => {
  const navigate = useNavigate();
  const { logout: authLogout } = useAuth();

  const logout = () => {
    authLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="client-page">
      <div className="client-page-header">
        <div><span className="client-eyebrow">ACCOUNT</span><h1>Settings</h1><p>Manage your Motora account preferences.</p></div>
        <div className="client-page-mark"><Settings size={20} /></div>
      </div>

      <div className="client-settings-grid">
        <div className="client-panel">
          <div className="client-setting-row"><ShieldCheck size={19} /><div><strong>Account security</strong><span>Your account is protected by authenticated API access.</span></div></div>
          <div className="client-setting-row"><Settings size={19} /><div><strong>Profile information</strong><span>Update your name and phone number from My Profile.</span></div></div>
        </div>

        <div className="client-panel client-danger-panel">
          <div className="client-setting-row"><LogOut size={19} /><div><strong>Sign out</strong><span>End your current Motora customer session on this device.</span></div></div>
          <button className="client-danger-btn" onClick={logout}><LogOut size={16} /> Log out</button>
        </div>
      </div>
    </div>
  );
};

export default ClientSettings;
