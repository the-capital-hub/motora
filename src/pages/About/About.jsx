import {
  ArrowUpRight,
  CarFront,
  CheckCircle2,
  Gauge,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";

const aboutImages = {
  hero:
    "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=2400&q=95",

  story:
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=95",

  interior:
    "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1800&q=95",

  showroom:
    "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2200&q=95",

  road:
    "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2200&q=95",

  final:
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2400&q=95",
};

const principles = [
  {
    icon: CarFront,
    title: "Exceptional Cars",
    text: "A carefully selected collection of cars chosen for quality, character and performance.",
  },
  {
    icon: ShieldCheck,
    title: "Complete Trust",
    text: "Clear information and a transparent experience that helps you buy with confidence.",
  },
  {
    icon: Users,
    title: "Human Expertise",
    text: "Automotive specialists who understand your requirements and help you choose better.",
  },
  {
    icon: Sparkles,
    title: "Premium Experience",
    text: "A considered experience from the first search to the moment you drive away.",
  },
];

const numbers = [
  ["5K+", "Cars Delivered"],
  ["40+", "Premium Brands"],
  ["1200+", "Happy Customers"],
  ["98%", "Customer Satisfaction"],
];

const journey = [
  {
    number: "01",
    title: "Discover",
    text: "Explore a collection created around modern automotive enthusiasts.",
  },
  {
    number: "02",
    title: "Explore",
    text: "Understand the car, its story, features and ownership experience.",
  },
  {
    number: "03",
    title: "Experience",
    text: "See the car in person and discover how it feels behind the wheel.",
  },
  {
    number: "04",
    title: "Drive",
    text: "Complete your journey and take home something you genuinely love.",
  },
];

function About() {
  return (
    <main className="motora-about-page">

      {/* HERO */}

      <section
        className="motora-about-hero"
        style={{
          backgroundImage: `url(${aboutImages.hero})`,
        }}
      >
        <div className="motora-about-hero-overlay" />

        <div className="motora-about-hero-top">
          <span>THE MOTORA STORY</span>

          <span>01 / 06</span>
        </div>

        <div className="motora-about-hero-content">
          <div className="motora-about-eyebrow">
            <span />
            MORE THAN A CAR
          </div>

          <h1>
            Drive
            <br />
            <em>different.</em>
          </h1>

          <p>
            Motora is a modern automotive experience built around exceptional
            cars, trusted expertise and people who genuinely love driving.
          </p>

          <div className="motora-about-hero-actions">
            <Link to="/cars" className="motora-about-primary">
              Explore Cars
              <ArrowUpRight size={18} />
            </Link>

            <Link to="/showroom" className="motora-about-secondary">
              Visit Showroom
            </Link>
          </div>
        </div>

        <div className="motora-about-scroll">
          <span />
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* INTRODUCTION */}

      <section className="motora-about-introduction">
        <div className="motora-about-intro-number">
          02
        </div>

        <div className="motora-about-intro-main">
          <span className="motora-about-label">
            WHY MOTORA
          </span>

          <div className="motora-about-intro-grid">
            <h2>
              Cars are more
              <br />
              than <em>machines.</em>
            </h2>

            <div className="motora-about-intro-copy">
              <p>
                They become part of our everyday lives. They take us to work,
                away for weekends and towards experiences we remember for years.
              </p>

              <p>
                Motora was created to make finding that car easier, clearer and
                more enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LARGE STORY IMAGE */}

      <section className="motora-about-story">
        <img
          src={aboutImages.story}
          alt="Premium automobile"
        />

        <div className="motora-about-story-overlay" />

        <div className="motora-about-story-content">
          <span>THE RIGHT CAR FEELS DIFFERENT</span>

          <h2>
            Find something
            <br />
            <em>worth driving.</em>
          </h2>
        </div>

        <div className="motora-about-story-bottom">
          <span>CURATED AUTOMOTIVE EXPERIENCE</span>

          <span>MOTORA</span>
        </div>
      </section>

      {/* PHILOSOPHY */}

      <section className="motora-about-philosophy">
        <div className="motora-about-philosophy-image">
          <img
            src={aboutImages.interior}
            alt="Premium car interior"
          />

          <div className="motora-about-image-tag">
            PRECISION
          </div>
        </div>

        <div className="motora-about-philosophy-content">
          <span className="motora-about-label">
            OUR PHILOSOPHY
          </span>

          <h2>
            Less noise.
            <br />
            More <em>confidence.</em>
          </h2>

          <p>
            Buying a premium car should feel exciting, not complicated.
            Motora brings together carefully selected vehicles, useful
            information and automotive expertise in one seamless experience.
          </p>

          <div className="motora-about-philosophy-list">
            <div>
              <CheckCircle2 size={18} />
              <span>Carefully selected inventory</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Clear vehicle information</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Expert automotive guidance</span>
            </div>

            <div>
              <CheckCircle2 size={18} />
              <span>Premium ownership experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS */}

      <section className="motora-about-numbers">
        <div className="motora-about-numbers-header">
          <span>03</span>

          <p>THE MOTORA STANDARD</p>
        </div>

        <div className="motora-about-number-grid">
          {numbers.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>

              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* WHY MOTORA */}

      <section className="motora-about-principles">
        <div className="motora-about-principles-heading">
          <span className="motora-about-label">
            WHAT DRIVES US
          </span>

          <h2>
            Built around
            <br />
            <em>what matters.</em>
          </h2>
        </div>

        <div className="motora-about-principles-grid">
          {principles.map((item) => {
            const Icon = item.icon;

            return (
              <article
                className="motora-about-principle"
                key={item.title}
              >
                <div className="motora-about-principle-top">
                  <Icon size={27} strokeWidth={1.5} />

                  <ArrowUpRight size={18} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* SHOWROOM */}

      <section className="motora-about-showroom">
        <div className="motora-about-showroom-content">
          <span className="motora-about-label">
            THE MOTORA EXPERIENCE
          </span>

          <h2>
            See it.
            <br />
            Feel it.
            <br />
            <em>Drive it.</em>
          </h2>

          <p>
            The relationship with your next car should begin before you own
            it. Visit a Motora showroom and experience the difference in
            person.
          </p>

          <Link
            to="/showroom"
            className="motora-about-text-button"
          >
            Explore Showroom
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="motora-about-showroom-image">
          <img
            src={aboutImages.showroom}
            alt="Motora showroom"
          />

          <div className="motora-about-showroom-card">
            <GaugeIcon />
            <span>PREMIUM AUTOMOTIVE EXPERIENCE</span>
          </div>
        </div>
      </section>

      {/* JOURNEY */}

      <section className="motora-about-journey">
        <div className="motora-about-journey-image">
          <img
            src={aboutImages.road}
            alt="Luxury car on road"
          />

          <div className="motora-about-journey-image-overlay" />
        </div>

        <div className="motora-about-journey-content">
          <span className="motora-about-label">
            YOUR JOURNEY
          </span>

          <h2>
            From discovery
            <br />
            to <em>drive.</em>
          </h2>

          <div className="motora-about-journey-list">
            {journey.map((item) => (
              <div
                className="motora-about-journey-item"
                key={item.number}
              >
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>

                <ArrowUpRight size={19} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}

      <section className="motora-about-final">
        <img
          src={aboutImages.final}
          alt="Luxury Motora automobile"
        />

        <div className="motora-about-final-overlay" />

        <div className="motora-about-final-content">
          <span>YOUR NEXT MOVE</span>

          <h2>
            Ready for your
            <br />
            <em>next drive?</em>
          </h2>

          <div className="motora-about-final-actions">
            <Link
              to="/cars"
              className="motora-about-primary"
            >
              Explore Cars
              <ArrowUpRight size={18} />
            </Link>

            <Link
              to="/contact"
              className="motora-about-final-link"
            >
              Talk to Motora
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}

function GaugeIcon() {
  return (
    <div className="motora-about-gauge">
      <GaugeIconInner />
    </div>
  );
}

function GaugeIconInner() {
  return (
    <Gauge
      size={21}
      strokeWidth={1.5}
    />
  );
}

export default About;