import {
  BarChart3,
  CarFront,
  ChevronRight,
  ClipboardList,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Settings,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./AdminSidebar.css";

const menuItems = [
  {
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Inventory",
    path: "/admin/inventory",
    icon: CarFront,
  },
  {
    label: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
  {
    label: "Leads",
    path: "/admin/leads",
    icon: MessageSquare,
  },
  {
    label: "Test Drives",
    path: "/admin/test-drives",
    icon: ClipboardList,
  },
  {
    label: "Sell Requests",
    path: "/admin/sell-requests",
    icon: CarFront,
  },
  {
    label: "AI Assistant",
    path: "/admin/ai",
    icon: Sparkles,
  },
  {
    label: "Analytics",
    path: "/admin/analytics",
    icon: BarChart3,
  },
];

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">

      {/* =================================
          BRAND
      ================================= */}

      <div className="admin-brand">

        <div className="admin-brand-mark">
          M
        </div>

        <div className="admin-brand-text">
          <strong>MOTORA</strong>
          <span>ADMIN SYSTEM</span>
        </div>

      </div>


      {/* =================================
          NAVIGATION
      ================================= */}

      <div className="admin-nav">

        <span className="admin-nav-label">
          MAIN MENU
        </span>

        <nav>

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive
                    ? "admin-nav-item active"
                    : "admin-nav-item"
                }
              >

                <span className="admin-nav-icon">
                  <Icon size={17} />
                </span>

                <span className="admin-nav-text">
                  {item.label}
                </span>

                <ChevronRight
                  size={14}
                  className="admin-nav-arrow"
                />

              </NavLink>
            );

          })}

        </nav>

      </div>


      {/* =================================
          BOTTOM
      ================================= */}

      <div className="admin-sidebar-bottom">

        <NavLink
          to="/admin/settings"
          className={({ isActive }) =>
            isActive
              ? "admin-nav-item active"
              : "admin-nav-item"
          }
        >

          <span className="admin-nav-icon">
            <Settings size={17} />
          </span>

          <span className="admin-nav-text">
            Settings
          </span>

          <ChevronRight
            size={14}
            className="admin-nav-arrow"
          />

        </NavLink>


        {/* ADMIN PROFILE */}

        <div className="admin-profile">

          <div className="admin-avatar">
            JN
          </div>

          <div className="admin-profile-info">

            <strong>
              Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

          <button
            type="button"
            className="admin-logout"
            title="Logout"
          >
            <LogOut size={16} />
          </button>

        </div>

      </div>

    </aside>
  );
};

export default AdminSidebar;