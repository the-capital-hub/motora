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
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

import "./CarDetails.css";

const car = {
  id: "bmw-x5",
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
  const navigate = useNavigate();

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".details-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
        },
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      gsap.from(".details-title-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power4.out",
      });

      gsap.from(".details-image-wrapper", {
        scrollTrigger: {
          trigger: ".details-main",
          start: "top 78%",
        },
        scale: 0.96,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".detail-item", {
        scrollTrigger: {
          trigger: ".details-specs",
          start: "top 82%",
        },
        y: 18,
        opacity: 0,
        duration: 0.6,
        stagger: 0.07,
        ease: "power3.out",
      });

      gsap.from(".details-actions", {
        scrollTrigger: {
          trigger: ".details-actions",
          start: "top 88%",
        },
        y: 15,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleTestDrive = () => {
    navigate("/test-drive");
  };

  const handleEnquiry = () => {
    navigate("/contact");
  };

  const handleAskAI = () => {
    navigate("/ai-concierge");
  };

  const handleSave = () => {
    setSaved((previous) => !previous);
  };

  return (
    <section
      ref={sectionRef}
      className="car-details"
      id="car-details"
    >
      <div className="car-details-container">

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
              {car.year} <i /> {car.brand}
            </span>

          </div>

        </div>

        <div className="details-main">

          <div className="details-image-wrapper">

            <img
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              className="details-image"
              loading="lazy"
            />

            <div className="details-image-overlay" />

            <div className="details-image-top">

              <span className="details-image-label">
                MOTORA / 01
              </span>

              <button
                type="button"
                className={
                  saved
                    ? "save-car saved"
                    : "save-car"
                }
                onClick={handleSave}
                aria-label={
                  saved
                    ? "Remove car from saved cars"
                    : "Save car"
                }
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

            <div className="details-image-data">

              <span>
                {car.brand}
              </span>

              <strong>
                {car.model}
              </strong>

              <div>
                <span>{car.year}</span>
                <i />
                <span>{car.fuel}</span>
                <i />
                <span>{car.transmission}</span>
              </div>

            </div>

            <div className="details-image-badge">
              <Check size={13} />
              VERIFIED
            </div>

          </div>

          <div className="details-info">

            <div className="details-price-block">

              <span>
                ASKING PRICE
              </span>

              <strong>
                {car.price}
              </strong>

              <small>
                Ex showroom price
              </small>

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

            <div className="details-actions">

              <button
                type="button"
                className="details-primary"
                onClick={handleTestDrive}
              >
                <span>Book a Test Drive</span>
                <ArrowUpRight size={18} />
              </button>

              <button
                type="button"
                className="details-secondary"
                onClick={handleEnquiry}
              >
                <MessageCircle size={17} />
                <span>Enquire Now</span>
              </button>

            </div>

            <button
              type="button"
              className="details-ai"
              onClick={handleAskAI}
            >
              <div className="details-ai-icon">
                <Sparkles size={16} />
              </div>

              <div className="details-ai-copy">
                <span>MOTORA AI</span>

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

        <div className="details-story">

          <div className="details-story-label">
            <span>WHY THIS CAR</span>
          </div>

          <p>
            The BMW X5 combines commanding road
            presence with a refined interior and
            confident performance. A versatile
            luxury SUV built equally for long
            journeys and everyday city driving.
          </p>

          <div className="details-power">
            <strong>{car.power}</strong>
            <span>POWER</span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CarDetails;