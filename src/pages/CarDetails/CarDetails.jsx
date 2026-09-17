import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Heart,
  MapPin,
  Settings2,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import "./CarDetails.css";

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    price: 14800000,
    type: "Coupe",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "8,200 km",
    location: "Delhi",
    engine: "3.0L Twin-Turbo",
    power: "503 bhp",
    mileage: "10.4 km/l",
    owners: "1st Owner",
    color: "Isle of Man Green",
    description:
      "A beautifully maintained M4 Competition with exceptional performance, premium specification and a carefully documented ownership history.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1800&q=90",
    ],
    features: [
      "M Sport Package",
      "Adaptive M Suspension",
      "Harman Kardon Audio",
      "360° Camera",
      "Panoramic Glass Roof",
      "Wireless Apple CarPlay",
    ],
  },
  {
    id: 2,
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S",
    year: 2024,
    price: 28600000,
    type: "Coupe",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "5,400 km",
    location: "Mumbai",
    engine: "4.0L V8 Biturbo",
    power: "831 bhp",
    mileage: "8.8 km/l",
    owners: "1st Owner",
    color: "Obsidian Black",
    description:
      "A striking AMG GT 63 S combining grand touring comfort with serious performance and an unmistakable AMG character.",
    images: [
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1618843479625-4f9f8b4f7d9b?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1800&q=90",
    ],
    features: [
      "AMG Performance Package",
      "Burmester 3D Sound",
      "AMG Ride Control",
      "360° Camera",
      "Nappa Leather Interior",
      "Panoramic Sunroof",
    ],
  },
  {
    id: 3,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2023,
    price: 19500000,
    type: "Sports",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "11,800 km",
    location: "Bangalore",
    engine: "3.0L Twin-Turbo",
    power: "379 bhp",
    mileage: "9.6 km/l",
    owners: "1st Owner",
    color: "Guards Red",
    description:
      "A timeless 911 Carrera with a sharp driving character, immaculate presentation and the precision expected from Porsche.",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1800&q=90",
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=90",
    ],
    features: [
      "Sport Chrono Package",
      "Porsche Active Suspension",
      "Bose Surround Sound",
      "Rear Camera",
      "Sport Exhaust",
      "18-Way Adaptive Seats",
    ],
  },
];

const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  return `₹${(price / 100000).toFixed(1)} L`;
};

const CarDetails = () => {
  const { id } = useParams();

  const car = useMemo(
    () =>
      cars.find(
        (item) => String(item.id) === String(id)
      ) || cars[0],
    [id]
  );

  const [activeImage, setActiveImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showTestDrive, setShowTestDrive] = useState(false);
  const [showEnquiry, setShowEnquiry] = useState(false);

  const nextImage = () => {
    setActiveImage(
      (current) =>
        (current + 1) % car.images.length
    );
  };

  const previousImage = () => {
    setActiveImage(
      (current) =>
        (current - 1 + car.images.length) %
        car.images.length
    );
  };

  return (
    <div className="car-details-page">

      {/* =================================
          TOP BAR
      ================================= */}

      <div className="car-details-topbar">

        <button
          className="car-back-button"
          onClick={() => window.history.back()}
        >
          <ArrowLeft size={15} />
          Back to cars
        </button>

        <div className="car-details-top-meta">
          <ShieldCheck size={14} />
          Motora Verified Vehicle
        </div>

      </div>


      {/* =================================
          HERO / GALLERY
      ================================= */}

      <section className="car-details-hero">

        <div className="car-gallery">

          <div className="car-gallery-main">

            <img
              src={car.images[activeImage]}
              alt={`${car.brand} ${car.model}`}
            />

            <div className="car-gallery-overlay" />

            <div className="car-gallery-counter">
              {String(activeImage + 1).padStart(2, "0")}
              {" / "}
              {String(car.images.length).padStart(2, "0")}
            </div>

            <button
              className="gallery-arrow gallery-prev"
              onClick={previousImage}
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="gallery-arrow gallery-next"
              onClick={nextImage}
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>

            <button
              className={
                saved
                  ? "details-save active"
                  : "details-save"
              }
              onClick={() => setSaved(!saved)}
              aria-label="Save car"
            >
              <Heart
                size={17}
                fill={saved ? "currentColor" : "none"}
              />
            </button>

            <div className="gallery-main-label">
              <span>VERIFIED</span>
              <span>ONE OWNER</span>
            </div>

          </div>


          <div className="car-gallery-thumbnails">

            {car.images.map((image, index) => (
              <button
                key={image}
                className={
                  activeImage === index
                    ? "gallery-thumbnail active"
                    : "gallery-thumbnail"
                }
                onClick={() =>
                  setActiveImage(index)
                }
              >
                <img
                  src={image}
                  alt={`${car.model} view ${index + 1}`}
                />
              </button>
            ))}

          </div>

        </div>


        {/* =================================
            SUMMARY
        ================================= */}

        <div className="car-details-summary">

          <span className="details-eyebrow">
            {car.year} · {car.type}
          </span>

          <h1>
            {car.brand}
            <br />
            <strong>{car.model}</strong>
          </h1>

          <p className="details-description">
            {car.description}
          </p>


          <div className="details-location">
            <MapPin size={14} />
            {car.location}
          </div>


          <div className="details-price">
            <span>ASKING PRICE</span>

            <strong>
              {formatPrice(car.price)}
            </strong>
          </div>


          <div className="details-primary-actions">

            <button
              className="details-test-drive"
              onClick={() =>
                setShowTestDrive(true)
              }
            >
              <CalendarDays size={15} />
              Book a Test Drive
            </button>

            <button
              className="details-enquire"
              onClick={() =>
                setShowEnquiry(true)
              }
            >
              Enquire Now
              <ArrowUpRight size={15} />
            </button>

          </div>


          <div className="details-trust">

            <div>
              <ShieldCheck size={15} />

              <span>
                Verified vehicle
              </span>
            </div>

            <div>
              <Sparkles size={15} />

              <span>
                150+ point inspection
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          SPECIFICATIONS
      ================================= */}

      <section className="car-details-section">

        <div className="details-section-heading">

          <div>
            <span>THE DETAILS</span>

            <h2>
              Everything you need
              <br />
              to know.
            </h2>
          </div>

          <p>
            Carefully verified specifications,
            ownership details and essential
            information about this vehicle.
          </p>

        </div>


        <div className="details-spec-grid">

          <div className="details-spec-card">
            <Gauge size={17} />

            <span>ODOMETER</span>

            <strong>{car.km}</strong>
          </div>

          <div className="details-spec-card">
            <Fuel size={17} />

            <span>FUEL TYPE</span>

            <strong>{car.fuel}</strong>
          </div>

          <div className="details-spec-card">
            <Settings2 size={17} />

            <span>TRANSMISSION</span>

            <strong>{car.transmission}</strong>
          </div>

          <div className="details-spec-card">
            <Sparkles size={17} />

            <span>ENGINE</span>

            <strong>{car.engine}</strong>
          </div>

          <div className="details-spec-card">
            <span className="spec-power">
              HP
            </span>

            <span>POWER</span>

            <strong>{car.power}</strong>
          </div>

          <div className="details-spec-card">
            <span className="spec-mileage">
              KM
            </span>

            <span>MILEAGE</span>

            <strong>{car.mileage}</strong>
          </div>

        </div>

      </section>


      {/* =================================
          FEATURES + FINANCE
      ================================= */}

      <section className="details-features-section">

        <div className="details-features">

          <span className="details-small-label">
            FEATURES
          </span>

          <h2>
            Designed around
            <br />
            the drive.
          </h2>

          <div className="details-feature-list">

            {car.features.map((feature) => (
              <div
                className="details-feature"
                key={feature}
              >
                <Check size={14} />
                {feature}
              </div>
            ))}

          </div>

        </div>


        <div className="details-finance-card">

          <div className="finance-icon">
            <Sparkles size={17} />
          </div>

          <span>
            MOTORA FINANCE
          </span>

          <h3>
            Drive it your way.
          </h3>

          <p>
            Flexible financing options designed
            around your budget and lifestyle.
          </p>

          <div className="finance-estimate">
            <small>
              ESTIMATED MONTHLY
            </small>

            <strong>
              ₹2.14L / month
            </strong>

            <span>
              *Indicative estimate
            </span>
          </div>

          <button>
            Calculate your EMI
            <ArrowUpRight size={14} />
          </button>

        </div>

      </section>


      {/* =================================
          VEHICLE INFO
      ================================= */}

      <section className="vehicle-info-section">

        <div className="vehicle-info-item">
          <span>YEAR</span>
          <strong>{car.year}</strong>
        </div>

        <div className="vehicle-info-item">
          <span>OWNERS</span>
          <strong>{car.owners}</strong>
        </div>

        <div className="vehicle-info-item">
          <span>COLOUR</span>
          <strong>{car.color}</strong>
        </div>

        <div className="vehicle-info-item">
          <span>LOCATION</span>
          <strong>{car.location}</strong>
        </div>

      </section>


      {/* =================================
          CTA
      ================================= */}

      <section className="car-details-bottom-cta">

        <div>

          <span>
            READY WHEN YOU ARE
          </span>

          <h2>
            Your next drive
            <br />
            starts here.
          </h2>

        </div>

        <button
          onClick={() =>
            setShowTestDrive(true)
          }
        >
          Book a Test Drive
          <ArrowUpRight size={17} />
        </button>

      </section>


      {/* =================================
          TEST DRIVE MODAL
      ================================= */}

      {showTestDrive && (
        <div
          className="details-modal-overlay"
          onClick={() =>
            setShowTestDrive(false)
          }
        >

          <div
            className="details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="details-modal-close"
              onClick={() =>
                setShowTestDrive(false)
              }
            >
              <X size={17} />
            </button>

            <span>TEST DRIVE</span>

            <h2>
              Take it for a drive.
            </h2>

            <p>
              Choose a preferred date and our
              Motora team will confirm your visit.
            </p>

            <input
              type="text"
              placeholder="Your name"
            />

            <input
              type="tel"
              placeholder="Phone number"
            />

            <input
              type="date"
            />

            <button
              className="modal-submit"
              onClick={() =>
                setShowTestDrive(false)
              }
            >
              Request Test Drive
              <ArrowUpRight size={15} />
            </button>

          </div>

        </div>
      )}


      {/* =================================
          ENQUIRY MODAL
      ================================= */}

      {showEnquiry && (
        <div
          className="details-modal-overlay"
          onClick={() =>
            setShowEnquiry(false)
          }
        >

          <div
            className="details-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="details-modal-close"
              onClick={() =>
                setShowEnquiry(false)
              }
            >
              <X size={17} />
            </button>

            <span>ENQUIRE ABOUT THIS CAR</span>

            <h2>
              Let's talk cars.
            </h2>

            <p>
              Leave your details and a Motora
              specialist will get back to you.
            </p>

            <input
              type="text"
              placeholder="Your name"
            />

            <input
              type="tel"
              placeholder="Phone number"
            />

            <input
              type="email"
              placeholder="Email address"
            />

            <button
              className="modal-submit"
              onClick={() =>
                setShowEnquiry(false)
              }
            >
              Send Enquiry
              <ArrowUpRight size={15} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default CarDetails;