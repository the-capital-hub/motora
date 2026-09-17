import { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";

import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "BMW X5 Owner",
    location: "Mumbai",
    rating: "5.0",
    text:
      "Motora completely changed the way I looked for a car. I could compare everything in one place and the whole process felt effortless.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=85",
    car: "BMW X5",
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Audi Q7 Owner",
    location: "Delhi",
    rating: "5.0",
    text:
      "I didn't know exactly what I wanted when I started. The recommendations helped me narrow everything down without feeling pressured.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=85",
    car: "Audi Q7",
  },
  {
    id: 3,
    name: "Kabir Sharma",
    role: "Mercedes-Benz Owner",
    location: "Bangalore",
    rating: "4.9",
    text:
      "The showroom experience was just as good as the digital experience. Everything was organised, transparent and genuinely premium.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=85",
    car: "Mercedes-Benz GLE",
  },
  {
    id: 4,
    name: "Ananya Singh",
    role: "Porsche Owner",
    location: "Pune",
    rating: "5.0",
    text:
      "The comparison feature saved me so much time. I could actually understand the differences instead of jumping between multiple websites.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=85",
    car: "Porsche Cayenne",
  },
];

const stats = [
  {
    value: "4.9/5",
    label: "AVERAGE RATING",
  },
  {
    value: "12K+",
    label: "HAPPY OWNERS",
  },
  {
    value: "96%",
    label: "WOULD RECOMMEND",
  },
  {
    value: "4.8K+",
    label: "REVIEWS",
  },
];

const Testimonials = () => {
  const [active, setActive] = useState(0);

  const current = testimonials[active];

  const nextTestimonial = () => {
    setActive(
      (active + 1) % testimonials.length
    );
  };

  const previousTestimonial = () => {
    setActive(
      (active - 1 + testimonials.length) %
        testimonials.length
    );
  };

  return (
    <div className="testimonials-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="testimonials-hero">

        <div className="testimonials-hero-content">

          <span>
            THE MOTORA EXPERIENCE
          </span>

          <h1>
            Don't take
            <br />
            <strong>our word for it.</strong>
          </h1>

          <p>
            Thousands of drivers have already
            experienced a simpler, smarter way
            to find their next car.
          </p>

        </div>

        <div className="testimonials-hero-rating">

          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <Star
                  key={star}
                  size={14}
                  fill="currentColor"
                />
              )
            )}
          </div>

          <strong>
            4.9
          </strong>

          <span>
            FROM 4,800+ REVIEWS
          </span>

        </div>

      </section>


      {/* =================================
          STATS
      ================================= */}

      <section className="testimonial-stats">

        {stats.map((stat) => (

          <div
            className="testimonial-stat"
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

      </section>


      {/* =================================
          FEATURED STORY
      ================================= */}

      <section className="featured-testimonial">

        <div className="featured-image">

          <img
            src={current.image}
            alt={current.name}
          />

          <div className="featured-image-overlay" />

          <div className="featured-car">
            {current.car}
          </div>

        </div>


        <div className="featured-content">

          <div className="featured-quote-icon">
            <Quote size={22} />
          </div>

          <span>
            FEATURED EXPERIENCE
          </span>

          <blockquote>
            “{current.text}”
          </blockquote>

          <div className="featured-author">

            <div>

              <strong>
                {current.name}
              </strong>

              <span>
                {current.role} · {current.location}
              </span>

            </div>

            <div className="featured-rating">

              <Star
                size={12}
                fill="currentColor"
              />

              <span>
                {current.rating}
              </span>

            </div>

          </div>


          <div className="testimonial-controls">

            <button
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={17} />
            </button>

            <span>
              {String(active + 1).padStart(2, "0")}
              {" / "}
              {String(testimonials.length).padStart(
                2,
                "0"
              )}
            </span>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={17} />
            </button>

          </div>

        </div>

      </section>


      {/* =================================
          REVIEW GRID
      ================================= */}

      <section className="reviews-section">

        <div className="reviews-heading">

          <div>

            <span>
              REAL PEOPLE. REAL CARS.
            </span>

            <h2>
              More stories
              <br />
              from the road.
            </h2>

          </div>

          <p>
            Every journey is different.
            Here's what our community has
            to say about theirs.
          </p>

        </div>


        <div className="reviews-grid">

          {testimonials.map((item, index) => (

            <article
              className={`review-card ${
                index === 0
                  ? "review-card-large"
                  : ""
              }`}
              key={item.id}
            >

              <div className="review-card-top">

                <div className="review-stars">

                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <Star
                        key={star}
                        size={10}
                        fill="currentColor"
                      />
                    )
                  )}

                </div>

                <span>
                  {item.rating}
                </span>

              </div>


              <Quote
                className="review-quote"
                size={20}
              />


              <p>
                “{item.text}”
              </p>


              <div className="review-author">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <span>
                    {item.role}
                  </span>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =================================
          COMMUNITY
      ================================= */}

      <section className="community-section">

        <div className="community-copy">

          <span>
            THE MOTORA COMMUNITY
          </span>

          <h2>
            More than
            <br />
            just a car.
          </h2>

          <p>
            Motora is built around the people
            behind the wheel. From first-time
            buyers to lifelong enthusiasts,
            every story matters.
          </p>

          <button
            onClick={() =>
              (window.location.href =
                "/cars")
            }
          >
            Find your car
            <ArrowUpRight size={15} />
          </button>

        </div>


        <div className="community-visual">

          <div className="community-number">
            12K+
          </div>

          <span>
            OWNERS
          </span>

          <div className="community-circle">

            <div>
              <Star
                size={18}
                fill="currentColor"
              />

              <strong>
                4.9
              </strong>

              <span>
                AVERAGE
                <br />
                EXPERIENCE
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          SHARE EXPERIENCE
      ================================= */}

      <section className="share-experience">

        <div>

          <span>
            YOUR TURN
          </span>

          <h2>
            Have a Motora
            <br />
            story to share?
          </h2>

        </div>

        <button
          onClick={() =>
            (window.location.href =
              "/contact")
          }
        >
          Share your experience
          <ArrowUpRight size={15} />
        </button>

      </section>


      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="testimonials-cta">

        <div>

          <span>
            READY TO START YOUR STORY?
          </span>

          <h2>
            Your next
            <br />
            chapter starts here.
          </h2>

        </div>

        <div className="testimonials-cta-actions">

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

export default Testimonials;