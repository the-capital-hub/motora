import { useState } from "react";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Arjun Mehta",
    role: "BMW X5 Owner",
    location: "Mumbai",
    rating: "5.0",
    text: "Motora completely changed the way I looked for a car. I could compare everything in one place and the whole process felt effortless.",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=90",
    car: "BMW X5",
  },
  {
    id: 2,
    name: "Riya Kapoor",
    role: "Audi Q7 Owner",
    location: "Delhi",
    rating: "5.0",
    text: "I did not know exactly what I wanted when I started. The recommendations helped me narrow everything down without feeling pressured.",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=90",
    car: "Audi Q7",
  },
  {
    id: 3,
    name: "Kabir Sharma",
    role: "Mercedes Benz Owner",
    location: "Bangalore",
    rating: "4.9",
    text: "The showroom experience was just as good as the digital experience. Everything was organised, transparent and genuinely premium.",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=90",
    car: "Mercedes Benz GLE",
  },
  {
    id: 4,
    name: "Ananya Singh",
    role: "Porsche Owner",
    location: "Pune",
    rating: "5.0",
    text: "The comparison feature saved me so much time. I could actually understand the differences instead of jumping between multiple websites.",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=90",
    car: "Porsche Cayenne",
  },
];

const stats = [
  {
    value: "4.9",
    suffix: "/5",
    label: "Average Rating",
  },
  {
    value: "12K",
    suffix: "+",
    label: "Happy Owners",
  },
  {
    value: "96",
    suffix: "%",
    label: "Would Recommend",
  },
  {
    value: "4.8K",
    suffix: "+",
    label: "Reviews",
  },
];

const journey = [
  {
    number: "01",
    title: "Discover",
    text: "Find cars that match your taste and requirements.",
  },
  {
    number: "02",
    title: "Compare",
    text: "Understand your options without endless searching.",
  },
  {
    number: "03",
    title: "Experience",
    text: "Meet the car and experience it in person.",
  },
  {
    number: "04",
    title: "Drive",
    text: "Take the wheel and begin your next chapter.",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);

  const current = testimonials[active];

  const nextTestimonial = () => {
    setActive((active + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setActive(
      (active - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <main className="testimonials-page">

      {/* HERO */}

      <section className="testimonials-hero">
        <div className="testimonials-hero-content">
          <span className="testimonials-eyebrow">
            THE MOTORA EXPERIENCE
          </span>

          <h1>
            Real people.
            <br />
            <em>Real stories.</em>
          </h1>

          <p>
            Thousands of drivers have discovered a simpler and more thoughtful
            way to find their next car.
          </p>

          <Link
            to="/cars"
            className="testimonials-primary-button"
          >
            Find your car
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="testimonials-hero-rating">
          <div className="testimonial-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={15}
                fill="currentColor"
              />
            ))}
          </div>

          <strong>4.9</strong>

          <span>FROM 4,800+ REVIEWS</span>
        </div>
      </section>

      {/* STATS */}

      <section className="testimonial-stats">
        {stats.map((stat) => (
          <div className="testimonial-stat" key={stat.label}>
            <strong>
              {stat.value}
              <small>{stat.suffix}</small>
            </strong>

            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* FEATURED STORY */}

      <section className="featured-testimonial">
        <div className="featured-image">
          <img
            src={current.image}
            alt={`${current.name} testimonial`}
          />

          <div className="featured-image-overlay" />

          <div className="featured-car-name">
            {current.car}
          </div>

          <div className="featured-image-label">
            MOTORA OWNER STORY
          </div>
        </div>

        <div className="featured-content">
          <div className="featured-top">
            <span>FEATURED EXPERIENCE</span>

            <div className="featured-quote-icon">
              <Quote size={22} />
            </div>
          </div>

          <blockquote>
            “{current.text}”
          </blockquote>

          <div className="featured-author">
            <div className="featured-author-info">
              <strong>{current.name}</strong>

              <span>
                {current.role} · {current.location}
              </span>
            </div>

            <div className="featured-rating">
              <Star
                size={13}
                fill="currentColor"
              />

              <span>{current.rating}</span>
            </div>
          </div>

          <div className="testimonial-controls">
            <button
              type="button"
              onClick={previousTestimonial}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>

            <span>
              {String(active + 1).padStart(2, "0")}
              {" / "}
              {String(testimonials.length).padStart(2, "0")}
            </span>

            <button
              type="button"
              onClick={nextTestimonial}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}

      <section className="reviews-section">
        <div className="reviews-heading">
          <div>
            <span>REAL PEOPLE. REAL CARS.</span>

            <h2>
              More stories
              <br />
              <em>from the road.</em>
            </h2>
          </div>

          <p>
            Every journey is different. Here are some of the experiences
            shared by our Motora community.
          </p>
        </div>

        <div className="reviews-grid">
          {testimonials.map((item, index) => (
            <article
              className={`review-card ${
                index === 0 ? "review-card-large" : ""
              }`}
              key={item.id}
            >
              <div className="review-card-image">
                <img
                  src={item.image}
                  alt={item.name}
                />

                <span>{item.car}</span>
              </div>

              <div className="review-card-content">
                <div className="review-card-top">
                  <div className="review-stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={11}
                        fill="currentColor"
                      />
                    ))}
                  </div>

                  <span>{item.rating}</span>
                </div>

                <Quote
                  className="review-quote"
                  size={21}
                />

                <p>“{item.text}”</p>

                <div className="review-author">
                  <div>
                    <strong>{item.name}</strong>

                    <span>
                      {item.role} · {item.location}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* JOURNEY */}

      <section className="testimonial-journey">
        <div className="testimonial-journey-image">
          <img
            src="https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2200&q=90"
            alt="Luxury car on the road"
          />

          <div className="testimonial-journey-overlay" />

          <div className="testimonial-journey-image-text">
            <span>YOUR STORY STARTS HERE</span>

            <strong>THE NEXT DRIVE</strong>
          </div>
        </div>

        <div className="testimonial-journey-content">
          <span>THE MOTORA JOURNEY</span>

          <h2>
            From search
            <br />
            to <em>drive.</em>
          </h2>

          <div className="testimonial-journey-list">
            {journey.map((item) => (
              <div
                className="testimonial-journey-item"
                key={item.number}
              >
                <span>{item.number}</span>

                <div>
                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>

                <ArrowUpRight size={18} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY */}

      <section className="community-section">
        <div className="community-copy">
          <span>THE MOTORA COMMUNITY</span>

          <h2>
            More than
            <br />
            <em>just a car.</em>
          </h2>

          <p>
            Motora is built around the people behind the wheel. Every customer
            brings a different reason, a different destination and a different
            story.
          </p>

          <Link
            to="/cars"
            className="community-button"
          >
            Find your car
            <ArrowUpRight size={17} />
          </Link>
        </div>

        <div className="community-visual">
          <img
            src="https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1800&q=90"
            alt="Premium performance car"
          />

          <div className="community-visual-overlay" />

          <div className="community-number">
            <strong>12K+</strong>
            <span>OWNERS</span>
          </div>

          <div className="community-circle">
            <Star
              size={18}
              fill="currentColor"
            />

            <strong>4.9</strong>

            <span>
              AVERAGE
              <br />
              EXPERIENCE
            </span>
          </div>
        </div>
      </section>

      {/* SHARE EXPERIENCE */}

      <section className="share-experience">
        <div>
          <span>YOUR TURN</span>

          <h2>
            Have a Motora
            <br />
            <em>story to share?</em>
          </h2>
        </div>

        <Link
          to="/contact"
          className="share-experience-button"
        >
          Share your experience
          <ArrowUpRight size={17} />
        </Link>
      </section>

      {/* FINAL CTA */}

      <section className="testimonials-cta">
        <div>
          <span>READY TO START YOUR STORY?</span>

          <h2>
            Your next
            <br />
            <em>chapter starts here.</em>
          </h2>
        </div>

        <div className="testimonials-cta-actions">
          <Link
            to="/cars"
            className="testimonials-primary-button"
          >
            Explore cars
            <ArrowUpRight size={17} />
          </Link>

          <Link
            to="/test-drive"
            className="testimonials-cta-secondary"
          >
            Book a test drive
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

    </main>
  );
}

export default Testimonials;