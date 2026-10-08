import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./FeaturedCars.css";

gsap.registerPlugin(ScrollTrigger);

const cars = [
  {
    id: "01",
    brand: "BMW",
    model: "X5",
    year: "2024",
    mileage: "18,000 KM",
    fuel: "PETROL",
    price: "₹85,00,000",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "02",
    brand: "MERCEDES BENZ",
    model: "GLE",
    year: "2024",
    mileage: "12,500 KM",
    fuel: "PETROL",
    price: "₹92,00,000",
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "03",
    brand: "PORSCHE",
    model: "CAYENNE",
    year: "2023",
    mileage: "9,800 KM",
    fuel: "PETROL",
    price: "₹1,25,00,000",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: "04",
    brand: "RANGE ROVER",
    model: "SPORT",
    year: "2024",
    mileage: "15,200 KM",
    fuel: "PETROL",
    price: "₹1,15,00,000",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85",
  },
];

const FeaturedCars = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector(
        ".collection-eyebrow"
      );

      const titleLines = section.querySelectorAll(
        ".collection-title-line"
      );

      const cards = section.querySelectorAll(
        ".car-card"
      );

      if (eyebrow) {
        gsap.from(eyebrow, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });
      }

      if (titleLines.length) {
        gsap.from(titleLines, {
          yPercent: 70,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",

          scrollTrigger: {
            trigger: trackRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollCars = (direction) => {
    if (!trackRef.current) return;

    const amount =
      window.innerWidth > 900
        ? 520
        : window.innerWidth > 600
        ? 420
        : 300;

    trackRef.current.scrollBy({
      left:
        direction === "next"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  const handleViewAll = () => {
    const carsSection = document.querySelector(
      "#cars"
    );

    if (carsSection) {
      carsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else {
      window.location.hash = "cars";
    }
  };

  return (
    <section
      ref={sectionRef}
      className="featured-cars"
      id="collection"
    >
      <div className="featured-cars-container">

        {/* HEADER */}

        <div className="collection-header">

          <div className="collection-heading">

            <div className="collection-eyebrow">
              
              THE COLLECTION
            </div>

            <h2 className="collection-title">

              <span className="collection-title-mask">
                <span className="collection-title-line">
                  Exceptional cars
                </span>
              </span>

              <span className="collection-title-mask">
                <span
                  className="
                    collection-title-line
                    collection-title-bold
                  "
                >
                  carefully selected
                </span>
              </span>

            </h2>

          </div>


          {/* DESCRIPTION */}

          <div className="collection-description">

            <p>
              Explore a curated selection of
              premium automobiles chosen for
              performance, design and character.
            </p>

            <button
              type="button"
              className="view-all-cars"
              onClick={handleViewAll}
            >
              <span>
                VIEW ALL CARS
              </span>

              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
              />
            </button>

          </div>

        </div>


        {/* CAR TRACK */}

        <div
          ref={trackRef}
          className="cars-track"
        >

          {cars.map((car) => (

            <article
              className="car-card"
              key={car.id}
            >

              {/* IMAGE */}

              <div className="car-image-wrapper">

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="car-image"
                  loading="lazy"
                />

                <div
                  className="car-image-overlay"
                />


                {/* NUMBER */}

                <span className="car-number">
                  {car.id}
                </span>


                {/* VIEW */}

                <button
                  type="button"
                  className="car-view-button"
                  aria-label={`View ${car.brand} ${car.model}`}
                  onClick={() => {
                    handleViewAll();
                  }}
                >
                  <ArrowUpRight
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>

              </div>


              {/* CAR INFO */}

              <div className="car-info">

                <div className="car-name">

                  <span className="car-brand">
                    {car.brand}
                  </span>

                  <h3>
                    {car.model}
                  </h3>

                </div>

                <div className="car-price">
                  {car.price}
                </div>

              </div>


              {/* SPECS */}

              <div className="car-specs">

                <span>
                  {car.year}
                </span>

                <i aria-hidden="true" />

                <span>
                  {car.mileage}
                </span>

                <i aria-hidden="true" />

                <span>
                  {car.fuel}
                </span>

              </div>

            </article>

          ))}

        </div>


        {/* BOTTOM */}

        <div className="collection-bottom">

          <div className="collection-count">

            <strong>
              04
            </strong>

            <span>
              / 08
            </span>

          </div>


          <div className="collection-controls">

            <button
              type="button"
              onClick={() =>
                scrollCars("prev")
              }
              aria-label="Previous cars"
            >
              <ArrowLeft
                size={17}
                strokeWidth={1.8}
              />
            </button>

            <button
              type="button"
              onClick={() =>
                scrollCars("next")
              }
              aria-label="Next cars"
            >
              <ArrowRight
                size={17}
                strokeWidth={1.8}
              />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCars;