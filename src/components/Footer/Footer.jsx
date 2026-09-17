import { ArrowUpRight } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="motora-footer">
      <div className="footer-container">

        {/* TOP */}
        <div className="footer-top">

          <div className="footer-brand">
            <button
              type="button"
              className="footer-logo"
              onClick={scrollToTop}
            >
              MOTORA
            </button>

            <p>
              Premium automobiles. Intelligent
              discovery. A better way to buy and
              sell exceptional cars.
            </p>
          </div>

          <button
            type="button"
            className="footer-back-top"
            onClick={scrollToTop}
          >
            BACK TO TOP
            <ArrowUpRight size={16} />
          </button>

        </div>


        {/* LINKS */}
        <div className="footer-links">

          {/* EXPLORE */}
          <div className="footer-column">

            <span className="footer-heading">
              EXPLORE
            </span>

            <a href="#collection">
              Cars
            </a>

            <a href="#categories">
              Categories
            </a>

            <a href="#brands">
              Brands
            </a>

            <a href="#ai">
              MOTORA AI
            </a>

          </div>


          {/* COMPANY */}
          <div className="footer-column">

            <span className="footer-heading">
              COMPANY
            </span>

            <a href="#why-motora">
              Why MOTORA
            </a>

            <a href="#showroom">
              Showroom
            </a>

            <a href="#sell">
              Sell Your Car
            </a>

            <a href="#contact">
              Contact
            </a>

          </div>


          {/* CONNECT */}
          <div className="footer-column">

            <span className="footer-heading">
              CONNECT
            </span>

            <a href="#">
              Instagram
            </a>

            <a href="#">
              Facebook
            </a>

            <a href="#">
              LinkedIn
            </a>

            <a href="#">
              WhatsApp
            </a>

          </div>


          {/* BUSINESS */}
          <div className="footer-column">

            <span className="footer-heading">
              BUSINESS
            </span>

            <a
              href="/admin/login"
              className="admin-link"
            >
              Admin Portal
              <ArrowUpRight size={13} />
            </a>

            <a href="#sell">
              Partner With Us
            </a>

            <a href="#showroom">
              Visit Showroom
            </a>

          </div>

        </div>


        {/* BIG LOGO */}
        <div className="footer-large-logo">
          MOTORA
        </div>


        {/* BOTTOM */}
        <div className="footer-bottom">

          <span>
            © 2026 MOTORA
          </span>

          <div className="footer-legal">

            <a href="#">
              Privacy
            </a>

            <a href="#">
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