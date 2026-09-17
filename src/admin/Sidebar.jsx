import {
  BarChart3,
  CalendarDays,
  CarFront,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Settings,
  Sparkles,
  UserRound,
  Users,
  X,
} from "lucide-react";

import "./Sidebar.css";

const navigation = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    label: "Inventory",
    icon: CarFront,
    path: "/admin/inventory",
  },
  {
    label: "Customers",
    icon: Users,
    path: "/admin/customers",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    path: "/admin/appointments",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    path: "/admin/analytics",
  },
];

const management = [
  {
    label: "Sell Requests",
    icon: CarFront,
    path: "/admin/sell-requests",
  },
  {
    label: "AI Assistant",
    icon: Sparkles,
    path: "/admin/ai-assistant",
  },
];

const Sidebar = ({
  activePath = "/admin",
  collapsed = false,
  mobileOpen = false,
  onToggle,
  onClose,
  onNavigate,
}) => {
  const handleNavigation = (path) => {
    if (onNavigate) {
      onNavigate(path);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* =================================
          MOBILE OVERLAY
      ================================= */}

      {mobileOpen && (
        <div
          className="sidebar-mobile-overlay"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "motora-sidebar",
          collapsed ? "sidebar-collapsed" : "",
          mobileOpen ? "sidebar-mobile-open" : "",
        ].join(" ")}
      >

        {/* =================================
            BRAND
        ================================= */}

        <div className="sidebar-brand">

          {/* MOTORA LOGO
              CLICK → PUBLIC HOME
          */}

          <button
            className="sidebar-brand-logo"
            onClick={() =>
              handleNavigation("/")
            }
            title="Go to Motora Home"
          >
            M
          </button>

          {!collapsed && (
            <div className="sidebar-brand-text">

              <strong>
                MOTORA
              </strong>

              <span>
                ADMIN CONSOLE
              </span>

            </div>
          )}

          {/* MOBILE CLOSE */}

          <button
            className="sidebar-mobile-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X size={17} />
          </button>

        </div>


        {/* =================================
            MAIN NAVIGATION
        ================================= */}

        <nav className="sidebar-navigation">

          <span className="sidebar-section-label">
            {!collapsed && "WORKSPACE"}
          </span>


          <div className="sidebar-nav-group">

            {navigation.map((item) => {

              const Icon = item.icon;

              const isActive =
                activePath === item.path;

              return (
                <button
                  key={item.path}
                  className={[
                    "sidebar-nav-item",
                    isActive ? "active" : "",
                  ].join(" ")}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                  title={
                    collapsed
                      ? item.label
                      : ""
                  }
                >

                  <span className="sidebar-nav-icon">
                    <Icon size={16} />
                  </span>

                  {!collapsed && (
                    <>
                      <span className="sidebar-nav-label">
                        {item.label}
                      </span>

                      {isActive && (
                        <span className="sidebar-active-dot" />
                      )}
                    </>
                  )}

                </button>
              );
            })}

          </div>


          {/* =================================
              MANAGEMENT
          ================================= */}

          <span className="sidebar-section-label management-label">
            {!collapsed && "MANAGEMENT"}
          </span>


          <div className="sidebar-nav-group">

            {management.map((item) => {

              const Icon = item.icon;

              const isActive =
                activePath === item.path;

              return (
                <button
                  key={item.path}
                  className={[
                    "sidebar-nav-item",
                    isActive ? "active" : "",
                  ].join(" ")}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                  title={
                    collapsed
                      ? item.label
                      : ""
                  }
                >

                  <span className="sidebar-nav-icon">
                    <Icon size={16} />
                  </span>

                  {!collapsed && (
                    <>
                      <span className="sidebar-nav-label">
                        {item.label}
                      </span>

                      {isActive && (
                        <span className="sidebar-active-dot" />
                      )}
                    </>
                  )}

                </button>
              );
            })}

          </div>

        </nav>


        {/* =================================
            BOTTOM
        ================================= */}

        <div className="sidebar-bottom">

          {/* =================================
              AI STATUS
          ================================= */}

          {!collapsed && (
            <div className="sidebar-ai-status">

              <div className="sidebar-ai-icon">
                <Sparkles size={14} />
              </div>

              <div>

                <strong>
                  Motora AI
                </strong>

                <span>
                  Systems operational
                </span>

              </div>

              <span className="sidebar-online-dot" />

            </div>
          )}


          {/* =================================
              HELP
          ================================= */}

          <button
            className="sidebar-bottom-item"
            title={
              collapsed
                ? "Help & Support"
                : ""
            }
          >

            <CircleHelp size={16} />

            {!collapsed && (
              <span>
                Help & Support
              </span>
            )}

          </button>


          {/* =================================
              SETTINGS
          ================================= */}

          <button
            className="sidebar-bottom-item"
            title={
              collapsed
                ? "Settings"
                : ""
            }
          >

            <Settings size={16} />

            {!collapsed && (
              <span>
                Settings
              </span>
            )}

          </button>


          {/* =================================
              USER
          ================================= */}

          <div className="sidebar-user">

            <div className="sidebar-user-avatar">
              JN
            </div>

            {!collapsed && (
              <div className="sidebar-user-info">

                <strong>
                  Admin
                </strong>

                <span>
                  Motora Management
                </span>

              </div>
            )}

          </div>


          {/* =================================
              LOGOUT
          ================================= */}

          <button
            className="sidebar-logout"
            title={
              collapsed
                ? "Logout"
                : ""
            }
          >

            <LogOut size={15} />

            {!collapsed && (
              <span>
                Logout
              </span>
            )}

          </button>


          {/* =================================
              COLLAPSE
          ================================= */}

          <button
            className="sidebar-collapse"
            onClick={onToggle}
            title={
              collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >

            {collapsed ? (
              <ChevronRight size={15} />
            ) : (
              <>
                <ChevronLeft size={15} />

                <span>
                  Collapse sidebar
                </span>
              </>
            )}

          </button>

        </div>

      </aside>
    </>
  );
};

export default Sidebar;