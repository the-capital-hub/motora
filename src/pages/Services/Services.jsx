import {
  ArrowUpRight,
  CarFront,
  Check,
  ChevronRight,
  CircleDollarSign,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import "./Services.css";

const services = [
  {
    id: "01",
    title: "Vehicle Inspection",
    description:
      "A detailed multi-point inspection covering the mechanical, electrical and cosmetic condition of your car.",
    icon: FileCheck2,
    image:
      "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1400&q=85",
    features: [
      "200+ inspection points",
      "Digital inspection report",
      "Condition assessment",
      "Expert evaluation",
    ],
  },
  {
    id: "02",
    title: "Car Detailing",
    description:
      "Bring your car back to its best with premium interior and exterior detailing from trained specialists.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=1400&q=85",
    features: [
      "Interior deep cleaning",
      "Exterior detailing",
      "Paint protection",
      "Premium finish",
    ],
  },
  {
    id: "03",
    title: "Finance & Insurance",
    description:
      "Explore flexible financing and insurance solutions designed around the car you're buying.",
    icon: CircleDollarSign,
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85",
    features: [
      "Flexible finance options",
      "Quick eligibility check",
      "Insurance assistance",
      "Transparent process",
    ],
  },
  {
    id: "04",
    title: "Warranty & Protection",
    description:
      "Drive with confidence with protection plans designed to cover the things that matter.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=85",
    features: [
      "Extended warranty",
      "Roadside assistance",
      "Coverage options",
      "Dedicated support",
    ],
  },
];

const process = [
  {
    number: "01",
    title: "Tell us what you need",
    text: "Choose a service and share a few details about your vehicle.",
  },
  {
    number: "02",
    title: "Choose a time",
    text: "Pick a convenient date and visit a Motora experience centre.",
  },
  {
    number: "03",
    title: "We take care of it",
    text: "Our specialists handle the service while you stay informed.",
  },
];

const Services = () => {
  return (
    <div className="services-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="services-hero">

        <div className="services-hero-image">

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2200&q=90"
            alt="Premium Motora vehicle"
          />

          <div className="services-hero-image-overlay" />

        </div>


        <div className="services-hero-content">

          <span className="services-eyebrow">
            MOTORA SERVICES
          </span>

          <h1>
            Everything your
            <br />
            <strong>car needs.</strong>
          </h1>

          <p>
            From inspection to protection, Motora
            gives you everything you need to own,
            maintain and enjoy your car with confidence.
          </p>

        </div>


        <div className="services-hero-mark">

          <Wrench
            size={32}
            strokeWidth={1}
          />

          <span>
            CARE
            <br />
            WITHOUT
            <br />
            COMPROMISE
          </span>

        </div>

      </section>


      {/* =================================
          SERVICES
      ================================= */}

      <section className="services-section">

        <div className="services-heading">

          <div>

            <span>
              WHAT WE OFFER
            </span>

            <h2>
              Services built
              <br />
              around ownership.
            </h2>

          </div>

          <p>
            Buying the car is only the beginning.
            Our services are designed to make
            everything after that simpler.
          </p>

        </div>


        <div className="services-grid">

          {services.map((service) => {

            const Icon = service.icon;

            return (
              <article
                className="service-card"
                key={service.id}
              >

                {/* IMAGE */}

                <div className="service-card-image">

                  <img
                    src={service.image}
                    alt={service.title}
                  />

                  <div className="service-card-overlay" />

                </div>


                {/* TOP */}

                <div className="service-card-top">

                  <div className="service-icon">
                    <Icon
                      size={19}
                      strokeWidth={1.4}
                    />
                  </div>

                  <span>
                    {service.id}
                  </span>

                </div>


                {/* CONTENT */}

                <div className="service-card-content">

                  <h3>
                    {service.title}
                  </h3>

                  <p>
                    {service.description}
                  </p>


                  <div className="service-features">

                    {service.features.map(
                      (feature) => (
                        <div key={feature}>

                          <Check size={11} />

                          <span>
                            {feature}
                          </span>

                        </div>
                      )
                    )}

                  </div>


                  <button
                    onClick={() =>
                      (window.location.href =
                        "/test-drive")
                    }
                  >
                    Explore service

                    <ArrowUpRight
                      size={14}
                    />
                  </button>

                </div>

              </article>
            );
          })}

        </div>

      </section>


      {/* =================================
          FEATURED EXPERIENCE
      ================================= */}

      <section className="service-experience">

        <div className="experience-image">

          <img
            src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=1800&q=90"
            alt="Premium automotive service"
          />

          <div className="experience-overlay" />

          <div className="experience-label">
            THE MOTORA STANDARD
          </div>

        </div>


        <div className="experience-content">

          <span>
            MORE THAN A SERVICE
          </span>

          <h2>
            The same attention
            <br />
            we give every car.
          </h2>

          <p>
            We believe premium service isn't
            about doing more. It's about doing
            the right things properly, with
            transparency at every step.
          </p>


          <div className="experience-points">

            <div>
              <Check size={14} />
              <span>
                Trained specialists
              </span>
            </div>

            <div>
              <Check size={14} />
              <span>
                Transparent pricing
              </span>
            </div>

            <div>
              <Check size={14} />
              <span>
                Digital updates
              </span>
            </div>

            <div>
              <Check size={14} />
              <span>
                Premium experience
              </span>
            </div>

          </div>


          <button
            onClick={() =>
              (window.location.href =
                "/showroom")
            }
          >
            Visit a showroom

            <ArrowUpRight
              size={14}
            />
          </button>

        </div>

      </section>


      {/* =================================
          PROCESS
      ================================= */}

      <section className="service-process">

        <div className="process-heading">

          <span>
            HOW IT WORKS
          </span>

          <h2>
            Simple from
            <br />
            start to finish.
          </h2>

        </div>


        <div className="process-list">

          {process.map((item) => (

            <div
              className="process-item"
              key={item.number}
            >

              <div className="process-number">
                {item.number}
              </div>

              <div className="process-content">

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.text}
                </p>

              </div>

              <ChevronRight size={17} />

            </div>

          ))}

        </div>

      </section>


      {/* =================================
          TRUST
      ================================= */}

      <section className="service-trust">

        <div>

          <CarFront size={18} />

          <strong>
            EXPERT CARE
          </strong>

          <span>
            Specialists who understand premium cars.
          </span>

        </div>


        <div>

          <ShieldCheck size={18} />

          <strong>
            PEACE OF MIND
          </strong>

          <span>
            Transparent processes and trusted support.
          </span>

        </div>


        <div>

          <Sparkles size={18} />

          <strong>
            PREMIUM EXPERIENCE
          </strong>

          <span>
            Thoughtful service from start to finish.
          </span>

        </div>

      </section>


      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="services-cta">

        <div className="services-cta-image">

          <img
            src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=2000&q=90"
            alt="Luxury car"
          />

          <div className="services-cta-overlay" />

        </div>


        <div className="services-cta-content">

          <span>
            NEED SOME HELP?
          </span>

          <h2>
            Let's take care
            <br />
            of your car.
          </h2>

          <button
            onClick={() =>
              (window.location.href =
                "/test-drive")
            }
          >
            Book a service

            <ArrowUpRight
              size={15}
            />
          </button>

        </div>

      </section>

    </div>
  );
};

export default Services;