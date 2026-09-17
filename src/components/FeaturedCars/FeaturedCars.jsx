import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";

import "./FeaturedCars.css";

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
    brand: "MERCEDES-BENZ",
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
    const ctx = gsap.context(() => {
      gsap.from(".collection-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".collection-title-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      });

      gsap.from(".car-card", {
        scrollTrigger: {
          trigger: ".cars-track",
          start: "top 80%",
        },
        y: 70,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollCars = (direction) => {
    if (!trackRef.current) return;

    const amount =
      window.innerWidth > 900 ? 600 : 320;

    trackRef.current.scrollBy({
      left:
        direction === "next"
          ? amount
          : -amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={sectionRef}
      className="featured-cars"
      id="collection"
    >
      <div className="featured-cars-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="collection-header">

          <div className="collection-heading">

            <div className="collection-eyebrow">
              <span />
              THE COLLECTION
            </div>

            <h2 className="collection-title">
              <span className="collection-title-mask">
                <span className="collection-title-line">
                  Exceptional cars,
                </span>
              </span>

              <span className="collection-title-mask">
                <span className="collection-title-line collection-title-bold">
                  carefully selected.
                </span>
              </span>
            </h2>

          </div>

          <div className="collection-description">

            <p>
              Explore a curated selection of
              premium automobiles chosen for
              performance, design and character.
            </p>

            <a href="#cars">
              View All Cars
              <ArrowUpRight size={16} />
            </a>

          </div>

        </div>


        {/* =================================
            CAR TRACK
        ================================= */}

        <div
          ref={trackRef}
          className="cars-track"
        >

          {cars.map((car) => (
            <article
              className="car-card"
              key={car.id}
            >

              <div className="car-image-wrapper">

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                  className="car-image"
                />

                <div className="car-image-overlay" />

                <span className="car-number">
                  {car.id}
                </span>

                <button className="car-view-button">
                  <ArrowUpRight size={20} />
                </button>

              </div>


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


              <div className="car-specs">

                <span>{car.year}</span>

                <i />

                <span>{car.mileage}</span>

                <i />

                <span>{car.fuel}</span>

              </div>

            </article>
          ))}

        </div>


        {/* =================================
            CONTROLS
        ================================= */}

        <div className="collection-bottom">

          <div className="collection-count">
            <strong>04</strong>
            <span>/ 08</span>
          </div>

          <div className="collection-controls">

            <button
              onClick={() =>
                scrollCars("prev")
              }
              aria-label="Previous cars"
            >
              <ArrowLeft size={18} />
            </button>

            <button
              onClick={() =>
                scrollCars("next")
              }
              aria-label="Next cars"
            >
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedCars;