import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Check,
  Heart,
  MessageCircle,
  Gauge,
  Fuel,
  Settings2,
  CalendarDays,
} from "lucide-react";
import gsap from "gsap";

import "./CarDetails.css";

const car = {
  brand: "BMW",
  model: "X5",
  year: "2024",
  price: "₹85,00,000",
  mileage: "18,000 KM",
  fuel: "Petrol",
  transmission: "Automatic",
  power: "340 HP",
  image:
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2000&q=90",
};

const CarDetails = () => {
  const sectionRef = useRef(null);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".details-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".details-title-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      });

      gsap.from(".details-image-wrapper", {
        scrollTrigger: {
          trigger: ".details-main",
          start: "top 75%",
        },
        scale: 0.94,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".detail-item", {
        scrollTrigger: {
          trigger: ".details-specs",
          start: "top 80%",
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".details-actions", {
        scrollTrigger: {
          trigger: ".details-actions",
          start: "top 85%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="car-details"
      id="car-details"
    >
      <div className="car-details-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="details-header">

          <div className="details-heading">

            <div className="details-eyebrow">
              <span />
              FEATURED AUTOMOBILE
            </div>

            <h2 className="details-title">

              <span className="details-title-mask">
                <span className="details-title-line">
                  BMW
                </span>
              </span>

              <span className="details-title-mask">
                <span className="details-title-line details-title-bold">
                  X5.
                </span>
              </span>

            </h2>

          </div>

          <div className="details-header-copy">

            <p>
              Designed for those who expect
              effortless performance, refined
              comfort and unmistakable presence.
            </p>

            <span>
              {car.year} / {car.brand}
            </span>

          </div>

        </div>


        {/* =================================
            MAIN IMAGE
        ================================= */}

        <div className="details-main">

          <div className="details-image-wrapper">

            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="details-image"
            />

            <div className="details-image-overlay" />

            <span className="details-image-label">
              MOTORA / 01
            </span>

            <button
              className={
                saved
                  ? "save-car saved"
                  : "save-car"
              }
              onClick={() =>
                setSaved(!saved)
              }
              aria-label="Save car"
            >
              <Heart
                size={17}
                fill={
                  saved
                    ? "currentColor"
                    : "none"
                }
              />
            </button>

          </div>


          {/* =================================
              INFO
          ================================= */}

          <div className="details-info">

            <div className="details-price-block">

              <span>
                ASKING PRICE
              </span>

              <strong>
                {car.price}
              </strong>

            </div>


            <div className="details-specs">

              <div className="detail-item">

                <div className="detail-icon">
                  <CalendarDays size={17} />
                </div>

                <div>
                  <span>YEAR</span>
                  <strong>{car.year}</strong>
                </div>

              </div>


              <div className="detail-item">

                <div className="detail-icon">
                  <Gauge size={17} />
                </div>

                <div>
                  <span>MILEAGE</span>
                  <strong>{car.mileage}</strong>
                </div>

              </div>


              <div className="detail-item">

                <div className="detail-icon">
                  <Fuel size={17} />
                </div>

                <div>
                  <span>FUEL</span>
                  <strong>{car.fuel}</strong>
                </div>

              </div>


              <div className="detail-item">

                <div className="detail-icon">
                  <Settings2 size={17} />
                </div>

                <div>
                  <span>TRANSMISSION</span>
                  <strong>
                    {car.transmission}
                  </strong>
                </div>

              </div>

            </div>


            {/* =================================
                ACTIONS
            ================================= */}

            <div className="details-actions">

              <button className="details-primary">

                Book a Test Drive

                <ArrowUpRight size={18} />

              </button>

              <button className="details-secondary">

                <MessageCircle size={17} />

                Enquire Now

              </button>

            </div>


            {/* =================================
                AI CTA
            ================================= */}

            <button className="details-ai">

              <div className="details-ai-icon">
                ✦
              </div>

              <div className="details-ai-copy">

                <span>
                  MOTORA AI
                </span>

                <strong>
                  Ask AI about this car
                </strong>

              </div>

              <ArrowUpRight
                size={17}
                className="details-ai-arrow"
              />

            </button>

          </div>

        </div>


        {/* =================================
            BOTTOM STORY
        ================================= */}

        <div className="details-story">

          <div>
            <span>
              WHY THIS CAR
            </span>
          </div>

          <p>
            The BMW X5 combines commanding road
            presence with a refined interior and
            confident performance. A versatile
            luxury SUV built equally for long
            journeys and everyday city driving.
          </p>

          <div className="details-power">

            <strong>
              {car.power}
            </strong>

            <span>
              POWER
            </span>

          </div>

        </div>

      </div>
    </section>
  );
};

export default CarDetails;