import { useState } from "react";
import { Menu } from "lucide-react";

import Sidebar from "./Sidebar";
import "./AdminLayout.css";

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
  );
};

export default AdminLayout;