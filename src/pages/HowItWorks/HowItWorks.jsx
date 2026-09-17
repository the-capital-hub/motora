import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  CarFront,
  Check,
  CircleCheck,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  TestTube2,
} from "lucide-react";

import "./HowItWorks.css";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Tell us what you want",
    text:
      "Start with your needs, lifestyle and preferences. Tell Motora what kind of car you're looking for.",
    tags: ["Budget", "Body type", "Fuel", "Usage"],
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Discover your matches",
    text:
      "Our intelligent discovery experience helps you find cars that actually fit your requirements.",
    tags: ["Smart matches", "Curated cars", "AI guidance"],
  },
  {
    number: "03",
    icon: ArrowRight,
    title: "Compare & shortlist",
    text:
      "Save your favourites and compare the details that matter before making a decision.",
    tags: ["Compare", "Wishlist", "Specifications"],
  },
  {
    number: "04",
    icon: TestTube2,
    title: "Experience the car",
    text:
      "Book a test drive and experience your shortlisted cars before taking the next step.",
    tags: ["Test drive", "Showroom", "Expert help"],
  },
  {
    number: "05",
    icon: CircleCheck,
    title: "Make your decision",
    text:
      "Get transparent information and personalised guidance so you can buy with confidence.",
    tags: ["Pricing", "Finance", "Guidance"],
  },
  {
    number: "06",
    icon: ShieldCheck,
    title: "Own with confidence",
    text:
      "Our relationship doesn't end after the purchase. Get access to services and ongoing support.",
    tags: ["Warranty", "Service", "Support"],
  },
];

const journey = [
  {
    icon: Search,
    title: "Discover",
    text: "Find cars that match your world.",
  },
  {
    icon: Heart,
    title: "Shortlist",
    text: "Save the ones you love.",
  },
  {
    icon: TestTube2,
    title: "Experience",
    text: "See and drive them in person.",
  },
  {
    icon: CarFront,
    title: "Drive",
    text: "Take home the right one.",
  },
];

const HowItWorks = () => {
  return (
    <div className="how-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="how-hero">

        <div className="how-hero-content">

          <span className="how-eyebrow">
            THE MOTORA WAY
          </span>

          <h1>
            Your car journey,
            <br />
            <strong>simplified.</strong>
          </h1>

          <p>
            From the first search to the moment
            you drive away, Motora brings everything
            together in one seamless experience.
          </p>

          <div className="how-hero-actions">

            <button
              onClick={() =>
                (window.location.href = "/cars")
              }
            >
              Start exploring
              <ArrowUpRight size={15} />
            </button>

            <button
              className="how-secondary-button"
              onClick={() =>
                (window.location.href =
                  "/ai-concierge")
              }
            >
              <Sparkles size={14} />
              Ask AI Concierge
            </button>

          </div>

        </div>

        <div className="how-hero-visual">

          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-orbit orbit-three" />

          <div className="hero-car-icon">
            <CarFront
              size={44}
              strokeWidth={1}
            />
          </div>

          <span>
            DISCOVER
            <br />
            DRIVE
            <br />
            OWN
          </span>

        </div>

      </section>


      {/* =================================
          INTRO
      ================================= */}

      <section className="how-intro">

        <div className="how-intro-label">

          <span>
            ONE SIMPLE JOURNEY
          </span>

          <div>
            01
          </div>

        </div>

        <div className="how-intro-content">

          <h2>
            Everything you need,
            <br />
            <strong>in one place.</strong>
          </h2>

          <div>

            <p>
              Buying a car shouldn't feel like
              navigating ten different websites,
              talking to multiple people and
              constantly second-guessing your choice.
            </p>

            <p>
              Motora connects discovery, comparison,
              test drives, buying assistance and
              aftercare into one continuous journey.
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          JOURNEY STRIP
      ================================= */}

      <section className="how-journey">

        <div className="journey-progress" />

        {journey.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              className="journey-card"
              key={item.title}
            >

              <div className="journey-icon">
                <Icon
                  size={18}
                  strokeWidth={1.4}
                />
              </div>

              <span>
                0{index + 1}
              </span>

              <h3>
                {item.title}
              </h3>

              <p>
                {item.text}
              </p>

            </div>
          );
        })}

      </section>


      {/* =================================
          STEPS
      ================================= */}

      <section className="how-steps">

        <div className="how-steps-heading">

          <span>
            THE JOURNEY
          </span>

          <h2>
            Six steps.
            <br />
            Zero confusion.
          </h2>

          <p>
            We've designed every stage around
            one simple idea: make finding the
            right car easier.
          </p>

        </div>


        <div className="steps-list">

          {steps.map((step) => {

            const Icon = step.icon;

            return (
              <article
                className="how-step"
                key={step.number}
              >

                <div className="step-number">
                  {step.number}
                </div>

                <div className="step-icon">
                  <Icon
                    size={19}
                    strokeWidth={1.4}
                  />
                </div>

                <div className="step-content">

                  <h3>
                    {step.title}
                  </h3>

                  <p>
                    {step.text}
                  </p>

                  <div className="step-tags">

                    {step.tags.map(
                      (tag) => (
                        <span key={tag}>
                          {tag}
                        </span>
                      )
                    )}

                  </div>

                </div>

                <ArrowUpRight
                  className="step-arrow"
                  size={17}
                />

              </article>
            );
          })}

        </div>

      </section>


      {/* =================================
          AI SECTION
      ================================= */}

      <section className="how-ai">

        <div className="how-ai-visual">

          <div className="ai-ring ring-one" />
          <div className="ai-ring ring-two" />
          <div className="ai-ring ring-three" />

          <div className="ai-center">
            <Bot
              size={34}
              strokeWidth={1}
            />

            <span>
              IVY
            </span>

          </div>

        </div>


        <div className="how-ai-content">

          <span>
            YOUR PERSONAL CAR GUIDE
          </span>

          <h2>
            You don't have to
            <br />
            figure it out alone.
          </h2>

          <p>
            Meet Ivy, Motora's AI Concierge.
            She can help you understand your needs,
            discover suitable cars and guide you
            through the next step.
          </p>

          <div className="ai-benefits">

            <div>
              <Check size={13} />
              <span>
                Personalised recommendations
              </span>
            </div>

            <div>
              <Check size={13} />
              <span>
                Instant answers
              </span>
            </div>

            <div>
              <Check size={13} />
              <span>
                Compare your options
              </span>
            </div>

          </div>

          <button
            onClick={() =>
              (window.location.href =
                "/ai-concierge")
            }
          >
            Meet Ivy
            <ArrowUpRight size={15} />
          </button>

        </div>

      </section>


      {/* =================================
          SHOWROOM EXPERIENCE
      ================================= */}

      <section className="how-experience">

        <div className="experience-content">

          <span>
            ONLINE TO OFFLINE
          </span>

          <h2>
            When you're ready,
            <br />
            experience it.
          </h2>

          <p>
            Digital discovery is only the beginning.
            Visit a Motora showroom, meet our experts
            and experience your shortlisted cars in
            the real world.
          </p>

          <div className="experience-points">

            <div>
              <Store size={15} />
              <span>
                Premium showrooms
              </span>
            </div>

            <div>
              <TestTube2 size={15} />
              <span>
                Easy test drives
              </span>
            </div>

            <div>
              <UsersIcon />
              <span>
                Expert assistance
              </span>
            </div>

          </div>

          <button
            onClick={() =>
              (window.location.href =
                "/showroom")
            }
          >
            Find a showroom
            <ArrowUpRight size={15} />
          </button>

        </div>


        <div className="experience-visual">

          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1600&q=85"
            alt="Premium automotive showroom"
          />

          <div />

          <span>
            EXPERIENCE IT IN PERSON
          </span>

        </div>

      </section>


      {/* =================================
          TRUST
      ================================= */}

      <section className="how-trust">

        <div className="trust-heading">

          <span>
            BUILT AROUND YOU
          </span>

          <h2>
            Simple decisions.
            <br />
            Better outcomes.
          </h2>

        </div>


        <div className="trust-grid">

          <div>

            <ShieldCheck size={18} />

            <strong>
              TRANSPARENT
            </strong>

            <p>
              Clear information without
              unnecessary complexity.
            </p>

          </div>

          <div>

            <Sparkles size={18} />

            <strong>
              INTELLIGENT
            </strong>

            <p>
              Technology that helps you make
              better decisions.
            </p>

          </div>

          <div>

            <Heart size={18} />

            <strong>
              HUMAN
            </strong>

            <p>
              Real people are here whenever
              you need them.
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="how-cta">

        <div>

          <span>
            READY WHEN YOU ARE
          </span>

          <h2>
            Your next car
            <br />
            starts here.
          </h2>

        </div>

        <div className="how-cta-actions">

          <button
            onClick={() =>
              (window.location.href =
                "/cars")
            }
          >
            Explore cars
            <ArrowUpRight size={15} />
          </button>

          <button
            className="secondary"
            onClick={() =>
              (window.location.href =
                "/test-drive")
            }
          >
            Book a test drive
            <ArrowUpRight size={15} />
          </button>

        </div>

      </section>

    </div>
  );
};


/* Small reusable icon for the experience section */

const UsersIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export default HowItWorks;