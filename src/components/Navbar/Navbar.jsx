import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Menu,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* =========================================
     SCROLL EFFECT
  ========================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =========================================
     CLOSE MOBILE MENU
  ========================================= */

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${
        scrolled ? "navbar-scrolled" : ""
      }`}
    >

      <div className="navbar-inner">

        {/* =====================================
            LOGO
        ===================================== */}

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


        {/* =====================================
            DESKTOP NAVIGATION
        ===================================== */}

        <nav className="navbar-links">

          {/* CARS */}

          <Link
            to="/cars"
            className="nav-link"
            onClick={closeMenu}
          >
            Cars
          </Link>


          {/* SELL YOUR CAR */}

          <Link
            to="/sell"
            className="nav-link"
            onClick={closeMenu}
          >
            Sell Your Car
          </Link>


          {/* SERVICES */}

          <Link
            to="/services"
            className="nav-link"
            onClick={closeMenu}
          >
            Services
          </Link>


          {/* ABOUT */}

          <Link
            to="/about"
            className="nav-link"
            onClick={closeMenu}
          >
            About
          </Link>


          {/* CONNECT */}

          <Link
            to="/contact"
            className="nav-link"
            onClick={closeMenu}
          >
            Connect
          </Link>


          {/* ADMIN */}

          <Link
            to="/admin"
            className="nav-link"
            onClick={closeMenu}
          >
            Admin
          </Link>

        </nav>


        {/* =====================================
            RIGHT ACTIONS
        ===================================== */}

        <div className="navbar-actions">

          {/* AI CONCIERGE */}

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


          {/* SEARCH */}

          <button
            className="search-button"
            aria-label="Search"
          >
            <Search
              size={18}
              strokeWidth={1.6}
            />
          </button>


          {/* EXPLORE CARS */}

          <Link
            to="/cars"
            className="navbar-cta"
            onClick={closeMenu}
          >
            Explore Cars

            <ArrowUpRight
              size={16}
              strokeWidth={1.7}
            />
          </Link>

        </div>


        {/* =====================================
            MOBILE MENU BUTTON
        ===================================== */}

        <button
          className="mobile-menu-button"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle menu"
        >

          {menuOpen ? (
            <X
              size={24}
              strokeWidth={1.6}
            />
          ) : (
            <Menu
              size={24}
              strokeWidth={1.6}
            />
          )}

        </button>

      </div>


      {/* =========================================
          MOBILE MENU
      ========================================= */}

      <div
        className={`mobile-menu ${
          menuOpen
            ? "mobile-menu-open"
            : ""
        }`}
      >

        {/* MOBILE NAVIGATION */}

        <nav className="mobile-nav">

          {/* CARS */}

          <Link
            to="/cars"
            onClick={closeMenu}
          >
            Cars

            <ArrowUpRight
              size={18}
            />
          </Link>


          {/* SELL */}

          <Link
            to="/sell"
            onClick={closeMenu}
          >
            Sell Your Car

            <ArrowUpRight
              size={18}
            />
          </Link>


          {/* SERVICES */}

          <Link
            to="/services"
            onClick={closeMenu}
          >
            Services

            <ArrowUpRight
              size={18}
            />
          </Link>


          {/* ABOUT */}

          <Link
            to="/about"
            onClick={closeMenu}
          >
            About

            <ArrowUpRight
              size={18}
            />
          </Link>


          {/* CONNECT */}

          <Link
            to="/contact"
            onClick={closeMenu}
          >
            Connect

            <ArrowUpRight
              size={18}
            />
          </Link>


          {/* ADMIN */}

          <Link
            to="/admin"
            onClick={closeMenu}
          >
            Admin

            <ArrowUpRight
              size={18}
            />
          </Link>

        </nav>


        {/* =====================================
            MOBILE BOTTOM ACTIONS
        ===================================== */}

        <div className="mobile-menu-bottom">

          {/* AI CONCIERGE */}

          <Link
            to="/ai-concierge"
            className="mobile-ai-button"
            onClick={closeMenu}
          >
            <Sparkles
              size={17}
            />

            AI Concierge
          </Link>


          {/* EXPLORE CARS */}

          <Link
            to="/cars"
            className="mobile-explore-button"
            onClick={closeMenu}
          >
            Explore Cars

            <ArrowUpRight
              size={18}
            />
          </Link>

        </div>

      </div>

    </header>
  );
};

export default Navbar;