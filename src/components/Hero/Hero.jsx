import { useEffect, useRef } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";

import "./Hero.css";

const HERO_IMAGE =
  "https://storage.googleapis.com/msgsndr/wdA5JInGTueX0FlIuj2R/media/6628b8e88381f23cc515dbe0.png";

const Hero = () => {
  const heroRef = useRef(null);

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
        .from(".hero-image", {
          scale: 1.14,
          duration: 1.8,
          ease: "power3.out",
        }, "-=0.2")
        .from(".hero-overlay", {
          opacity: 0,
          duration: 1,
        }, "-=1.2")
        .from(".hero-eyebrow", {
          y: 30,
          opacity: 0,
          duration: 0.7,
        }, "-=0.6")
        .from(".hero-title-line", {
          yPercent: 110,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
        }, "-=0.4")
        .from(".hero-description", {
          y: 25,
          opacity: 0,
          duration: 0.7,
        }, "-=0.5")
        .from(".hero-actions", {
          y: 25,
          opacity: 0,
          duration: 0.7,
        }, "-=0.4")
        .from(".hero-ai", {
          x: 50,
          opacity: 0,
          duration: 0.8,
        }, "-=0.5")
        .from(".hero-scroll", {
          opacity: 0,
          y: 15,
          duration: 0.6,
        }, "-=0.3");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="hero"
      id="home"
    >
      {/* =====================================
          LOADER
      ====================================== */}

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

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="hero-media">
        <img
          src={HERO_IMAGE}
          alt="Premium MOTORA automobile"
          className="hero-image"
        />

        <div className="hero-overlay" />
      </div>

      {/* =====================================
          HERO CONTENT
      ====================================== */}

      <div className="hero-container">

        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            PREMIUM AUTOMOTIVE
          </div>

          <h1 className="hero-title">

            <span className="hero-title-mask">
              <span className="hero-title-line">
                FIND YOUR NEXT
              </span>
            </span>

            <span className="hero-title-mask">
              <span className="hero-title-line hero-title-highlight">
                EXTRAORDINARY CAR.
              </span>
            </span>

          </h1>

          <p className="hero-description">
            A curated collection of exceptional
            automobiles, selected for those who
            expect more.
          </p>

          <div className="hero-actions">

            <a
              href="#cars"
              className="hero-primary-button"
            >
              Explore Cars

              <ArrowUpRight size={18} />
            </a>

            <a
              href="#sell"
              className="hero-secondary-button"
            >
              Sell Your Car
            </a>

          </div>

        </div>

        {/* =====================================
            AI CONCIERGE
        ====================================== */}

        <button className="hero-ai">

          <div className="hero-ai-glow" />

          <div className="hero-ai-icon">
            <Sparkles
              size={17}
              strokeWidth={1.5}
            />
          </div>

          <div className="hero-ai-content">

            <span className="hero-ai-label">
              MOTORA AI
            </span>

            <span className="hero-ai-text">
              Tell us what you're looking for
            </span>

          </div>

          <ArrowUpRight
            className="hero-ai-arrow"
            size={18}
          />

        </button>

      </div>

      {/* =====================================
          SCROLL
      ====================================== */}

      <div className="hero-scroll">

        <span>
          SCROLL TO EXPLORE
        </span>

        <div className="hero-scroll-line">
          <span />
        </div>

        <ArrowDown size={15} />

      </div>

      {/* =====================================
          META
      ====================================== */}

      <div className="hero-meta">

        <span>01</span>

        <span className="hero-meta-divider" />

        <span>01 — 08</span>

      </div>

      {/* =====================================
          DECORATIVE CORNERS
      ====================================== */}

      <span className="hero-corner hero-corner-tl" />
      <span className="hero-corner hero-corner-br" />

    </section>
  );
};

export default Hero;