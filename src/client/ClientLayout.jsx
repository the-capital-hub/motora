import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  CalendarDays,
  CarFront,
  ChevronRight,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  UserRound,
  X,
  FileText,
  Bell,
  Activity,
} from "lucide-react";

import "./Client.css";

const navItems = [
  { label: "Dashboard", to: "/client", icon: LayoutDashboard, end: true },
  { label: "My Wishlist", to: "/client/wishlist", icon: Heart },
  { label: "Appointments", to: "/client/appointments", icon: CalendarDays },
  { label: "My Enquiries", to: "/client/enquiries", icon: MessageSquare },
  { label: "Sell Requests", to: "/client/sell-requests", icon: FileText },
  { label: "My Activity", to: "/client/activity", icon: Activity },
  { label: "Notifications", to: "/client/notifications", icon: Bell },
];

const ClientLayout = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout: authLogout } = useAuth();

  const displayName = user?.name || user?.fullName || "Motora Customer";
  const email = user?.email || "";
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "MC";

  const logout = () => {
    authLogout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="client-shell">
      {mobileOpen && (
        <button
          className="client-overlay"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`client-sidebar ${mobileOpen ? "open" : ""}`}>
        <div className="client-brand">
          <div className="client-brand-mark">M</div>
          <div>
            <strong>MOTORA</strong>
            <span>Customer space</span>
          </div>
        </div>

        <div className="client-profile-mini">
          <div className="client-avatar">{initials}</div>
          <div>
            <strong>{displayName}</strong>
            <span>{email || "Customer account"}</span>
          </div>
        </div>

        <nav className="client-nav">
          <span className="client-nav-label">ACCOUNT</span>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `client-nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setMobileOpen(false)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                <ChevronRight size={14} className="client-nav-arrow" />
              </NavLink>
            );
          })}

          <span className="client-nav-label client-nav-label-space">
            PROFILE
          </span>

          <NavLink
            to="/client/profile"
            className={({ isActive }) =>
              `client-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <UserRound size={17} />
            <span>My Profile</span>
            <ChevronRight size={14} className="client-nav-arrow" />
          </NavLink>

          <NavLink
            to="/client/settings"
            className={({ isActive }) =>
              `client-nav-link ${isActive ? "active" : ""}`
            }
            onClick={() => setMobileOpen(false)}
          >
            <Settings size={17} />
            <span>Settings</span>
            <ChevronRight size={14} className="client-nav-arrow" />
          </NavLink>
        </nav>

        <button className="client-logout" onClick={logout}>
          <LogOut size={17} />
          <span>Log out</span>
        </button>
      </aside>

      <main className="client-main">
        <header className="client-topbar">
          <button
            className="client-mobile-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="client-topbar-copy">
            <span>MY MOTORA</span>
            <strong>Customer workspace</strong>
          </div>

          <div className="client-topbar-actions">
            <NavLink to="/cars" className="client-browse-link">
              <CarFront size={16} />
              Browse cars
            </NavLink>

            <NavLink to="/client/profile" className="client-top-avatar">
              {initials}
            </NavLink>
          </div>
        </header>

        <section className="client-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default ClientLayout;
