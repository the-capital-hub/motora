import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
  ArrowUpRight,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    closeMenu();
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      } ${menuOpen ? "navbar-menu-active" : ""}`}
    >

      <div className="navbar-inner">

        {/* LOGO */}

        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-main">
            MOTORA
          </span>

          <span className="logo-dot">
            ®
          </span>
        </Link>


        {/* DESKTOP NAVIGATION */}

        <nav className="navbar-links">

          <Link
            to="/cars"
            className="nav-link"
            onClick={closeMenu}
          >
            Cars
          </Link>

          <Link
            to="/services"
            className="nav-link"
            onClick={closeMenu}
          >
            Services
          </Link>

          <Link
            to="/sell-car"
            className="nav-link"
            onClick={closeMenu}
          >
            Sell Your Car
          </Link>

          <Link
            to="/brands"
            className="nav-link"
            onClick={closeMenu}
          >
            Brands
          </Link>

          <Link
            to="/showroom"
            className="nav-link"
            onClick={closeMenu}
          >
            Showroom
          </Link>

          <Link
            to="/about"
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </Link>

          <Link
            to="/contact"
            className="nav-link"
            onClick={closeMenu}
          >
            Contact
          </Link>

        </nav>


        {/* DESKTOP ACTIONS */}

        <div className="navbar-actions">

          <Link
            to="/ai-concierge"
            className="ai-button"
            onClick={closeMenu}
          >
            <Sparkles
              size={15}
              strokeWidth={1.7}
            />

            <span>
              AI Concierge
            </span>
          </Link>


          <Link
            to="/smart-search"
            className="search-button"
            aria-label="Search cars"
            onClick={closeMenu}
          >
            <Search
              size={18}
              strokeWidth={1.6}
            />
          </Link>


          {isAuthenticated ? (
            <button
              type="button"
              className="navbar-auth-button"
              onClick={handleLogout}
            >
              Logout{" "}
              {user?.name
                ? user.name.split(" ")[0]
                : ""}
            </button>
          ) : (
            <Link
              to="/login"
              className="navbar-auth-button"
              onClick={closeMenu}
            >
              Sign in
            </Link>
          )}


          <Link
            to="/cars"
            className="navbar-cta"
            onClick={closeMenu}
          >
            <span>
              Explore Cars
            </span>

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
            />
          </Link>

        </div>


        {/* MOBILE BUTTON */}

        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setMenuOpen((current) => !current)}
          aria-label={
            menuOpen
              ? "Close menu"
              : "Open menu"
          }
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X
              size={23}
              strokeWidth={1.5}
            />
          ) : (
            <Menu
              size={23}
              strokeWidth={1.5}
            />
          )}
        </button>

      </div>


      {/* MOBILE MENU */}

      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <div className="mobile-menu-inner">

          <div className="mobile-menu-label">
            MOTORA
          </div>


          <nav className="mobile-nav">

            <Link
              to="/cars"
              onClick={closeMenu}
            >
              <span>Cars</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/services"
              onClick={closeMenu}
            >
              <span>Services</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/sell-car"
              onClick={closeMenu}
            >
              <span>Sell Your Car</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/brands"
              onClick={closeMenu}
            >
              <span>Brands</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/showroom"
              onClick={closeMenu}
            >
              <span>Showroom</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/about"
              onClick={closeMenu}
            >
              <span>About</span>
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/contact"
              onClick={closeMenu}
            >
              <span>Contact</span>
              <ArrowUpRight size={18} />
            </Link>

          </nav>


          {/* MOBILE ACTIONS */}

          <div className="mobile-menu-bottom">

            {isAuthenticated ? (
              <button
                type="button"
                className="mobile-action-button"
                onClick={handleLogout}
              >
                Logout{" "}
                {user?.name
                  ? user.name.split(" ")[0]
                  : ""}
              </button>
            ) : (
              <Link
                to="/login"
                className="mobile-action-button"
                onClick={closeMenu}
              >
                Sign in
              </Link>
            )}


            <Link
              to="/ai-concierge"
              className="mobile-action-button"
              onClick={closeMenu}
            >
              <Sparkles size={17} />
              AI Concierge
            </Link>


            <Link
              to="/cars"
              className="mobile-explore-button"
              onClick={closeMenu}
            >
              <span>
                Explore Cars
              </span>

              <ArrowUpRight size={18} />
            </Link>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;