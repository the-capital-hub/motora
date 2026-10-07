import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import "./Hero.css";

const HERO_IMAGE =
  "https://storage.googleapis.com/msgsndr/wdA5JInGTueX0FlIuj2R/media/6628b8e88381f23cc515dbe0.png";

const Hero = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power4.out",
        },
      });

      tl.to(".hero-loader", {
        opacity: 0,
        duration: 0.5,
        delay: 0.3,
        pointerEvents: "none",
      })
        .from(
          ".hero-image",
          {
            scale: 1.12,
            duration: 1.8,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".hero-overlay",
          {
            opacity: 0,
            duration: 0.9,
          },
          "-=1.25"
        )
        .from(
          ".hero-eyebrow",
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.55"
        )
        .from(
          ".hero-title-line",
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.9,
            stagger: 0.1,
          },
          "-=0.35"
        )
        .from(
          ".hero-description",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.45"
        )
        .from(
          ".hero-actions",
          {
            y: 20,
            opacity: 0,
            duration: 0.65,
          },
          "-=0.4"
        )
        .from(
          ".hero-ai",
          {
            x: 35,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.45"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
          },
          "-=0.25"
        )
        .from(
          ".hero-meta",
          {
            opacity: 0,
            y: 12,
            duration: 0.5,
          },
          "-=0.35"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleAiConcierge = () => {
    navigate("/ai-concierge");
  };

  const scrollToCars = () => {
    const carsSection = document.getElementById("cars");

    if (carsSection) {
      carsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/cars");
    }
  };

  const scrollToSell = () => {
    const sellSection = document.getElementById("sell");

    if (sellSection) {
      sellSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      navigate("/sell");
    }
  };

  return (
    <section
      ref={heroRef}
      className="hero"
      id="home"
    >
      {/* Loader */}

      <div className="hero-loader">
        <div className="hero-loader-logo">
          MOTORA
        </div>

        <div className="hero-loader-line">
          <span />
        </div>

        <div className="hero-loader-text">
          PREMIUM AUTOMOTIVE
        </div>
      </div>

      {/* Background */}

      <div className="hero-media">
        <img
          src={HERO_IMAGE}
          alt="Premium Motora automobile"
          className="hero-image"
        />

        <div className="hero-overlay" />
        <div className="hero-image-shine" />
      </div>

      {/* Main Content */}

      <div className="hero-container">
        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="eyebrow-line" />

            <span>
              PREMIUM AUTOMOTIVE
            </span>
          </div>

          <h1 className="hero-title">

            <span className="hero-title-mask">
              <span className="hero-title-line">
                FIND YOUR NEXT
              </span>
            </span>

            <span className="hero-title-mask">
              <span className="hero-title-line hero-title-highlight">
                EXTRAORDINARY CAR
              </span>
            </span>

          </h1>

          <p className="hero-description">
            A curated collection of exceptional automobiles
            selected for those who expect more.
          </p>

          <div className="hero-actions">

            <button
              type="button"
              className="hero-primary-button"
              onClick={scrollToCars}
            >
              <span>Explore Cars</span>

              <ArrowUpRight size={18} />
            </button>

            <button
              type="button"
              className="hero-secondary-button"
              onClick={scrollToSell}
            >
              Sell Your Car
            </button>

          </div>

        </div>

        {/* AI Concierge */}

        <button
          type="button"
          className="hero-ai"
          onClick={handleAiConcierge}
          aria-label="Open Motora AI Concierge"
        >
          <div className="hero-ai-glow" />

          <div className="hero-ai-icon">
            <Sparkles
              size={18}
              strokeWidth={1.6}
            />
          </div>

          <div className="hero-ai-content">

            <span className="hero-ai-label">
              MOTORA AI
            </span>

            <span className="hero-ai-text">
              Tell us what you are looking for
            </span>

          </div>

          <ArrowUpRight
            className="hero-ai-arrow"
            size={19}
          />
        </button>
      </div>

      {/* Scroll Indicator */}

      <button
        type="button"
        className="hero-scroll"
        onClick={scrollToCars}
        aria-label="Explore cars"
      >
        <span className="hero-scroll-label">
          EXPLORE
        </span>

        <span className="hero-scroll-line">
          <span />
        </span>

        <ArrowDown size={14} />
      </button>

      {/* Meta */}

      <div className="hero-meta">
        <span>01</span>

        <span className="hero-meta-divider" />

        <span>08</span>
      </div>

      {/* Decorative Corners */}

      <span className="hero-corner hero-corner-tl" />
      <span className="hero-corner hero-corner-br" />
    </section>
  );
};

export default Hero;