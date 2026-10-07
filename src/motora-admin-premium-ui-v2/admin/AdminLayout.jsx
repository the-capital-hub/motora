import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import AdminAuthGate from "./AdminAuthGate";
import "./AdminLayout.css";
import "./MotoraAdminTheme.css";

const AdminLayout = ({
  children,
  activePath = "/admin",
  onNavigate,
}) => {
  const [collapsed, setCollapsed] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleNavigate = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }

    setMobileOpen(false);
  };

  return (
    <AdminAuthGate
      onLogout={() => {
        if (onNavigate) {
          onNavigate("/admin");
        }
      }}
    >
      {({ user, logout }) => (
        <div className="admin-layout">

      {/* SIDEBAR */}

      <Sidebar
        activePath={activePath}
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onToggle={() =>
          setCollapsed(!collapsed)
        }
        onClose={() =>
          setMobileOpen(false)
        }
        onNavigate={handleNavigate}
        onLogout={logout}
        adminUser={user}
      />


      {/* MAIN AREA */}

      <div
        className={
          collapsed
            ? "admin-main sidebar-is-collapsed"
            : "admin-main"
        }
      >

        {/* MOBILE TOPBAR */}

        <header className="admin-mobile-header">

          <button
            className="admin-mobile-menu"
            onClick={() =>
              setMobileOpen(true)
            }
          >
            <Menu size={19} />
          </button>


          <div className="admin-mobile-brand">

            <strong>
              MOTORA
            </strong>

            <span>
              ADMIN
            </span>

          </div>

        </header>


        {/* PAGE CONTENT */}

        <main className="admin-content">
          {children}
        </main>

      </div>

        </div>
      )}
    </AdminAuthGate>
  );
};

export default AdminLayout;