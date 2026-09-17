import {
  ArrowUpRight,
  Award,
  CarFront,
  Check,
  Gauge,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

import "./About.css";

const values = [
  {
    number: "01",
    title: "Curated Cars",
    text: "Every car is selected with attention to condition, quality and long-term value.",
    icon: CarFront,
  },
  {
    number: "02",
    title: "Complete Trust",
    text: "Clear information, transparent processes and no unnecessary complications.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Human Expertise",
    text: "Real automotive specialists supported by technology that makes every decision easier.",
    icon: Users,
  },
  {
    number: "04",
    title: "Premium Experience",
    text: "From your first search to your next journey, every interaction is thoughtfully designed.",
    icon: Sparkles,
  },
];

const stats = [
  {
    value: "5K+",
    label: "CARS DELIVERED",
  },
  {
    value: "1200+",
    label: "HAPPY CUSTOMERS",
  },
  {
    value: "40+",
    label: "PREMIUM BRANDS",
  },
  {
    value: "98%",
    label: "CUSTOMER SATISFACTION",
  },
];

const journey = [
  {
    year: "01",
    title: "Discover",
    text: "Find cars that match your lifestyle, taste and budget.",
  },
  {
    year: "02",
    title: "Experience",
    text: "See the car, understand its story and experience it first-hand.",
  },
  {
    year: "03",
    title: "Decide",
    text: "Make confident decisions with transparent information and expert guidance.",
  },
  {
    year: "04",
    title: "Drive",
    text: "Complete your journey and get behind the wheel of something you love.",
  },
];

const About = () => {
  return (
    <div className="about-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="about-hero">

        <div className="about-hero-content">

          <span className="about-eyebrow">
            THE MOTORA STORY
          </span>

          <h1>
            A better way
            <br />
            <strong>to move.</strong>
          </h1>

          <p>
            Motora is building a simpler, more thoughtful
            way to discover, buy and experience cars.
          </p>

          <div className="about-hero-actions">

            <a href="/cars">
              Explore Cars
              <ArrowUpRight size={16} />
            </a>

            <a href="/contact" className="about-secondary-btn">
              Connect with us
              <ArrowUpRight size={16} />
            </a>

          </div>

        </div>

        <div className="about-hero-badge">

          <Gauge size={28} strokeWidth={1.2} />

          <span>
            MOVE
            <br />
            DIFFERENT
          </span>

        </div>

        <div className="about-hero-bottom">

          <span>SCROLL TO DISCOVER</span>

          <div className="about-scroll-line">
            <span />
          </div>

        </div>

      </section>


      {/* =================================================
          INTRO
      ================================================= */}

      <section className="about-intro">

        <div className="about-section-label">
          <span>01</span>
          <p>WHO WE ARE</p>
        </div>

        <div className="about-intro-content">

          <h2>
            Cars are more than
            <br />
            <strong>just machines.</strong>
          </h2>

          <p>
            They are freedom, ambition, memories and
            the places we're going next. Motora exists
            to make the journey of finding the right car
            feel as exciting as the journey itself.
          </p>

        </div>

      </section>


      {/* =================================================
          STORY
      ================================================= */}

      <section className="about-story">

        <div className="about-story-image">

          <img
            src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=90"
            alt="Luxury car"
          />

          <div className="about-image-number">
            01 / 03
          </div>

        </div>

        <div className="about-story-content">

          <span>OUR PHILOSOPHY</span>

          <h2>
            Less noise.
            <br />
            More confidence.
          </h2>

          <p>
            The automotive buying experience can be
            complicated. Too many choices. Too much
            information. Too little clarity.
          </p>

          <p>
            We believe buying a car should feel different.
            Calm. Personal. Transparent. And genuinely
            exciting.
          </p>

          <div className="about-story-line">
            <span />
          </div>

          <strong>
            That's the Motora way.
          </strong>

        </div>

      </section>


      {/* =================================================
          VALUES
      ================================================= */}

      <section className="about-values">

        <div className="about-values-heading">

          <div className="about-section-label">
            <span>02</span>
            <p>WHAT DRIVES US</p>
          </div>

          <h2>
            Built around
            <br />
            <strong>you.</strong>
          </h2>

        </div>


        <div className="about-values-grid">

          {values.map((item) => {

            const Icon = item.icon;

            return (
              <article
                className="about-value-card"
                key={item.number}
              >

                <div className="about-value-top">

                  <span>
                    {item.number}
                  </span>

                  <Icon
                    size={20}
                    strokeWidth={1.3}
                  />

                </div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

                <div className="about-value-arrow">
                  <ArrowUpRight size={17} />
                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =================================================
          STATS
      ================================================= */}

      <section className="about-stats">

        <div className="about-stats-heading">

          <span>THE NUMBERS</span>

          <h2>
            Growing with
            <br />
            every journey.
          </h2>

        </div>

        <div className="about-stats-grid">

          {stats.map((stat) => (
            <div
              className="about-stat"
              key={stat.label}
            >

              <strong>
                {stat.value}
              </strong>

              <span>
                {stat.label}
              </span>

            </div>
          ))}

        </div>

      </section>


      {/* =================================================
          EXPERIENCE
      ================================================= */}

      <section className="about-experience">

        <div className="about-experience-copy">

          <div className="about-section-label">
            <span>03</span>
            <p>THE EXPERIENCE</p>
          </div>

          <h2>
            Your car.
            <br />
            Your story.
            <br />
            <strong>Your journey.</strong>
          </h2>

          <p>
            From the moment you discover a car to the
            moment you drive it home, Motora brings
            technology and human expertise together
            to make every step feel effortless.
          </p>

          <a href="/services">
            Explore our services
            <ArrowUpRight size={16} />
          </a>

        </div>

        <div className="about-experience-image">

          <img
            src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1800&q=90"
            alt="Premium automobile"
          />

          <div className="about-image-overlay">

            <span>
              THE MOTORA STANDARD
            </span>

            <strong>
              PRECISION
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          JOURNEY
      ================================================= */}

      <section className="about-journey">

        <div className="about-journey-heading">

          <div className="about-section-label">
            <span>04</span>
            <p>HOW WE THINK</p>
          </div>

          <h2>
            From discovery
            <br />
            <strong>to drive.</strong>
          </h2>

        </div>


        <div className="about-journey-list">

          {journey.map((item) => (

            <div
              className="about-journey-item"
              key={item.year}
            >

              <div className="about-journey-number">
                {item.year}
              </div>

              <div>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>

              <Check
                className="about-journey-check"
                size={17}
              />

            </div>

          ))}

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="about-final">

        <div className="about-final-content">

          <span>
            READY FOR WHAT'S NEXT?
          </span>

          <h2>
            Your next journey
            <br />
            <strong>starts here.</strong>
          </h2>

          <div className="about-final-actions">

            <a href="/cars">
              Explore Cars
              <ArrowUpRight size={16} />
            </a>

            <a
              href="/contact"
              className="about-final-secondary"
            >
              Talk to Motora
              <ArrowUpRight size={16} />
            </a>

          </div>

        </div>

      </section>

    </div>
  );
};

export default About;