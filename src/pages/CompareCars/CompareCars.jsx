import { useState } from "react";
import {
  ArrowLeftRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Gauge,
  Heart,
  Plus,
  Sparkles,
  X,
} from "lucide-react";

import "./CompareCars.css";

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "X5",
    variant: "xDrive40i M Sport",
    price: "₹95.00 L",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
    specs: {
      Engine: "2998 cc",
      Power: "335 bhp",
      Torque: "450 Nm",
      Mileage: "12 km/l",
      Fuel: "Petrol",
      Transmission: "Automatic",
      Drive: "AWD",
      Seats: "5",
    },
  },
  {
    id: 2,
    brand: "Audi",
    model: "Q7",
    variant: "45 TFSI Technology",
    price: "₹88.00 L",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    specs: {
      Engine: "2995 cc",
      Power: "335 bhp",
      Torque: "500 Nm",
      Mileage: "11.2 km/l",
      Fuel: "Petrol",
      Transmission: "Automatic",
      Drive: "AWD",
      Seats: "7",
    },
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "GLE",
    variant: "300d 4MATIC",
    price: "₹96.40 L",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
    specs: {
      Engine: "1993 cc",
      Power: "245 bhp",
      Torque: "550 Nm",
      Mileage: "14.5 km/l",
      Fuel: "Diesel",
      Transmission: "Automatic",
      Drive: "AWD",
      Seats: "5",
    },
  },
  {
    id: 4,
    brand: "Porsche",
    model: "Cayenne",
    variant: "3.0 Turbo",
    price: "₹1.42 Cr",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    specs: {
      Engine: "2995 cc",
      Power: "348 bhp",
      Torque: "500 Nm",
      Mileage: "10.8 km/l",
      Fuel: "Petrol",
      Transmission: "Automatic",
      Drive: "AWD",
      Seats: "5",
    },
  },
];

const comparisonRows = [
  {
    label: "Engine",
    key: "Engine",
  },
  {
    label: "Power",
    key: "Power",
  },
  {
    label: "Torque",
    key: "Torque",
  },
  {
    label: "Mileage",
    key: "Mileage",
  },
  {
    label: "Fuel",
    key: "Fuel",
  },
  {
    label: "Transmission",
    key: "Transmission",
  },
  {
    label: "Drive",
    key: "Drive",
  },
  {
    label: "Seats",
    key: "Seats",
  },
];

const CompareCars = () => {
  const [selectedCars, setSelectedCars] = useState([
    cars[0],
    cars[1],
  ]);

  const [selectorOpen, setSelectorOpen] =
    useState(false);

  const [selectorSlot, setSelectorSlot] =
    useState(null);

  const [showAllSpecs, setShowAllSpecs] =
    useState(false);

  const openSelector = (slot) => {
    setSelectorSlot(slot);
    setSelectorOpen(true);
  };

  const selectCar = (car) => {
    if (selectedCars.some((item) => item.id === car.id)) {
      setSelectorOpen(false);
      return;
    }

    setSelectedCars((current) => {
      const updated = [...current];
      updated[selectorSlot] = car;
      return updated;
    });

    setSelectorOpen(false);
  };

  const removeCar = (index) => {
    setSelectedCars((current) => {
      const updated = [...current];
      updated.splice(index, 1);
      return updated;
    });
  };

  const addCar = () => {
    if (selectedCars.length >= 3) return;

    setSelectorSlot(selectedCars.length);
    setSelectorOpen(true);
  };

  return (
    <div className="compare-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="compare-hero">

        <div>

          <span>
            MOTORA COMPARISON
          </span>

          <h1>
            Compare cars.
            <br />
            <strong>Choose smarter.</strong>
          </h1>

          <p>
            Put your favourites side by side.
            Compare the details that actually
            matter before making your decision.
          </p>

        </div>

        <div className="compare-hero-mark">
          <ArrowLeftRight size={30} />

          <span>
            SIDE
            <br />
            BY
            <br />
            SIDE
          </span>
        </div>

      </section>


      {/* =================================
          SELECT CARS
      ================================= */}

      <section className="compare-section">

        <div className="compare-heading">

          <div>

            <span>
              YOUR SHORTLIST
            </span>

            <h2>
              Choose your cars.
            </h2>

          </div>

          <span className="compare-count">
            {selectedCars.length} / 3 CARS
          </span>

        </div>


        <div className="compare-car-selector">

          {selectedCars.map((car, index) => (

            <article
              className="selected-compare-car"
              key={car.id}
            >

              <div className="selected-car-image">

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                />

                <button
                  className="remove-car"
                  onClick={() =>
                    removeCar(index)
                  }
                >
                  <X size={14} />
                </button>

              </div>

              <div className="selected-car-info">

                <span>
                  {car.brand}
                </span>

                <h3>
                  {car.model}
                </h3>

                <p>
                  {car.variant}
                </p>

                <strong>
                  {car.price}
                </strong>

              </div>

            </article>

          ))}


          {selectedCars.length < 3 && (

            <button
              className="add-compare-car"
              onClick={addCar}
            >

              <div>
                <Plus size={19} />
              </div>

              <span>
                ADD ANOTHER CAR
              </span>

              <p>
                Compare up to 3 cars
              </p>

            </button>

          )}

        </div>

      </section>


      {/* =================================
          COMPARISON TABLE
      ================================= */}

      {selectedCars.length >= 2 && (

        <section className="comparison-section">

          <div className="comparison-title">

            <div>

              <span>
                DETAILED COMPARISON
              </span>

              <h2>
                See the difference.
              </h2>

            </div>

            <button
              onClick={() =>
                setShowAllSpecs(
                  !showAllSpecs
                )
              }
            >
              {showAllSpecs
                ? "Show less"
                : "Show all specs"}

              <ChevronDown
                size={14}
                className={
                  showAllSpecs
                    ? "rotate"
                    : ""
                }
              />
            </button>

          </div>


          <div className="comparison-table">

            <div className="comparison-table-header">

              <div className="spec-label">
                SPECIFICATION
              </div>

              {selectedCars.map((car) => (

                <div
                  className="comparison-car-heading"
                  key={car.id}
                >

                  <span>
                    {car.brand}
                  </span>

                  <strong>
                    {car.model}
                  </strong>

                </div>

              ))}

            </div>


            {/* PRICE */}

            <div className="comparison-row price-row">

              <div className="spec-label">
                PRICE
              </div>

              {selectedCars.map((car) => (

                <div key={car.id}>
                  <strong>
                    {car.price}
                  </strong>
                </div>

              ))}

            </div>


            {comparisonRows
              .slice(
                0,
                showAllSpecs
                  ? comparisonRows.length
                  : 5
              )
              .map((row) => (

                <div
                  className="comparison-row"
                  key={row.key}
                >

                  <div className="spec-label">
                    {row.label}
                  </div>

                  {selectedCars.map(
                    (car) => (
                      <div
                        key={car.id}
                      >
                        {car.specs[row.key]}
                      </div>
                    )
                  )}

                </div>

              ))}

          </div>

        </section>
      )}


      {/* =================================
          AI VERDICT
      ================================= */}

      {selectedCars.length >= 2 && (

        <section className="compare-verdict">

          <div className="verdict-icon">
            <Sparkles size={19} />
          </div>

          <div className="verdict-content">

            <span>
              MOTORA AI VERDICT
            </span>

            <h2>
              Which one makes
              <br />
              more sense?
            </h2>

            <p>
              The BMW X5 stands out as the most
              balanced choice for buyers looking
              for performance, luxury and everyday
              usability. The Audi Q7 makes more
              sense if space and practicality are
              your priority.
            </p>

          </div>


          <div className="verdict-cards">

            <div className="verdict-card winner">

              <div>
                <span>
                  BEST OVERALL
                </span>

                <Check size={14} />
              </div>

              <strong>
                BMW X5
              </strong>

              <p>
                Best balance
              </p>

            </div>


            <div className="verdict-card">

              <div>
                <span>
                  BEST FOR SPACE
                </span>

                <Check size={14} />
              </div>

              <strong>
                Audi Q7
              </strong>

              <p>
                7-seat practicality
              </p>

            </div>

          </div>

        </section>
      )}


      {/* =================================
          QUICK INSIGHTS
      ================================= */}

      <section className="comparison-insights">

        <div className="insights-heading">

          <span>
            QUICK INSIGHTS
          </span>

          <h2>
            What matters
            <br />
            at a glance.
          </h2>

        </div>


        <div className="insights-grid">

          <div className="insight-card">

            <Gauge size={19} />

            <span>
              MOST POWERFUL
            </span>

            <strong>
              BMW X5
            </strong>

            <p>
              335 bhp
            </p>

          </div>


          <div className="insight-card">

            <Sparkles size={19} />

            <span>
              BEST VALUE
            </span>

            <strong>
              Audi Q7
            </strong>

            <p>
              Lower starting price
            </p>

          </div>


          <div className="insight-card">

            <ArrowLeftRight size={19} />

            <span>
              BEST EFFICIENCY
            </span>

            <strong>
              Mercedes GLE
            </strong>

            <p>
              14.5 km/l
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          CTA
      ================================= */}

      <section className="compare-cta">

        <div>

          <span>
            MADE YOUR DECISION?
          </span>

          <h2>
            Take the next
            <br />
            step.
          </h2>

        </div>

        <div className="compare-cta-actions">

          <button
            onClick={() =>
              (window.location.href =
                "/test-drive")
            }
          >
            Book a test drive
            <ArrowUpRight size={15} />
          </button>

          <button
            className="secondary"
            onClick={() =>
              (window.location.href =
                "/cars")
            }
          >
            Explore more cars
            <ArrowUpRight size={15} />
          </button>

        </div>

      </section>


      {/* =================================
          SELECTOR MODAL
      ================================= */}

      {selectorOpen && (

        <div
          className="compare-modal-backdrop"
          onClick={() =>
            setSelectorOpen(false)
          }
        >

          <div
            className="compare-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span>
                  SELECT A CAR
                </span>

                <h3>
                  Add to comparison.
                </h3>

              </div>

              <button
                onClick={() =>
                  setSelectorOpen(false)
                }
              >
                <X size={17} />
              </button>

            </div>


            <div className="modal-car-list">

              {cars.map((car) => {

                const alreadySelected =
                  selectedCars.some(
                    (item) =>
                      item.id === car.id
                  );

                return (
                  <button
                    className={
                      alreadySelected
                        ? "modal-car disabled"
                        : "modal-car"
                    }
                    key={car.id}
                    disabled={
                      alreadySelected
                    }
                    onClick={() =>
                      selectCar(car)
                    }
                  >

                    <img
                      src={car.image}
                      alt={car.model}
                    />

                    <div>

                      <span>
                        {car.brand}
                      </span>

                      <strong>
                        {car.model}
                      </strong>

                      <small>
                        {car.variant}
                      </small>

                    </div>

                    {alreadySelected ? (
                      <Check size={14} />
                    ) : (
                      <Plus size={16} />
                    )}

                  </button>
                );
              })}

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default CompareCars;