import { ArrowUpRight } from "lucide-react";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <footer className="motora-footer">
      <div className="footer-container">

        {/* =====================================================
            FOOTER TOP
        ===================================================== */}

        <div className="footer-top">

          <div className="footer-brand">

            <button
              type="button"
              className="footer-logo"
              onClick={() => goTo("/")}
            >
              MOTORA
            </button>

            <p>
              Premium automobiles. Intelligent discovery.
              A better way to buy and sell exceptional cars.
            </p>

            <div className="footer-brand-details">
              <span>PREMIUM AUTOMOTIVE</span>
              <span>INDIA</span>
            </div>

          </div>


          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
          >
            <span>BACK TO TOP</span>
            <ArrowUpRight size={16} />
          </button>

        </div>


        {/* =====================================================
            FOOTER NAVIGATION
        ===================================================== */}

        <div className="footer-navigation">

          {/* EXPLORE */}

          <div className="footer-column">

            <span className="footer-heading">
              EXPLORE
            </span>

            <a href="/cars">
              Cars
            </a>

            <a href="/categories">
              Categories
            </a>

            <a href="/brands">
              Brands
            </a>

            <a href="/ai-concierge">
              Motora AI
            </a>

            <a href="/compare">
              Compare Cars
            </a>

          </div>


          {/* COMPANY */}

          <div className="footer-column">

            <span className="footer-heading">
              COMPANY
            </span>

            <a href="/about">
              About Motora
            </a>

            <a href="/how-it-works">
              How It Works
            </a>

            <a href="/services">
              Services
            </a>

            <a href="/showroom">
              Showroom
            </a>

            <a href="/contact">
              Contact
            </a>

          </div>


          {/* OWNERSHIP */}

          <div className="footer-column">

            <span className="footer-heading">
              OWNERSHIP
            </span>

            <a href="/sell-car">
              Sell Your Car
            </a>

            <a href="/test-drive">
              Book a Test Drive
            </a>

            <a href="/wishlist">
              Wishlist
            </a>

            <a href="/compare">
              Compare Cars
            </a>

            <a href="/contact">
              Get Assistance
            </a>

          </div>


          {/* CONNECT */}

          <div className="footer-column">

            <span className="footer-heading">
              CONNECT
            </span>


            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
            >
              <span className="footer-social-icon">
                <FaInstagram />
              </span>

              <span>
                Instagram
              </span>
            </a>


            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
            >
              <span className="footer-social-icon">
                <FaFacebookF />
              </span>

              <span>
                Facebook
              </span>
            </a>


            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
            >
              <span className="footer-social-icon">
                <FaLinkedinIn />
              </span>

              <span>
                LinkedIn
              </span>
            </a>


            <a
              href="https://wa.me/911800123456"
              target="_blank"
              rel="noreferrer"
              className="footer-social-link"
            >
              <span className="footer-social-icon">
                <FaWhatsapp />
              </span>

              <span>
                WhatsApp
              </span>
            </a>

          </div>


          {/* BUSINESS */}

          <div className="footer-column footer-business">

            <span className="footer-heading">
              BUSINESS
            </span>

            <a
              href="/admin/login"
              className="footer-admin-link"
            >
              <span>
                Admin Portal
              </span>

              <ArrowUpRight size={14} />
            </a>

            <a href="/sell-car">
              Partner With Us
            </a>

            <a href="/showroom">
              Visit Showroom
            </a>

            <a href="/contact">
              Contact Team
            </a>

          </div>

        </div>


        {/* =====================================================
            LARGE BRAND MARK
        ===================================================== */}

        <div className="footer-large-logo">
          MOTORA
        </div>


        {/* =====================================================
            FOOTER BOTTOM
        ===================================================== */}

        <div className="footer-bottom">

          <span>
            © 2026 MOTORA
          </span>


          <div className="footer-legal">

            <a href="/privacy">
              Privacy
            </a>

            <a href="/terms">
              Terms
            </a>

          </div>


          <span>
            PREMIUM AUTOMOTIVE EXPERIENCE
          </span>

        </div>

      </div>
    </footer>
  );
};

export default Footer;