import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Plus,
  Search,
  X,
} from "lucide-react";

import "./CompareCars.css";

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "X5",
    variant: "xDrive40i M Sport",
    year: "2024",
    price: "₹95.00 L",
    priceNumber: 95,
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
    body: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2998 cc",
    power: "335 bhp",
    torque: "450 Nm",
    mileage: "12 km/l",
    seats: "5",
    drive: "AWD",
    acceleration: "5.7 sec",
    color: "Black Sapphire",
  },
  {
    id: 2,
    brand: "Audi",
    model: "Q7",
    variant: "45 TFSI Technology",
    year: "2024",
    price: "₹88.00 L",
    priceNumber: 88,
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    body: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2995 cc",
    power: "335 bhp",
    torque: "500 Nm",
    mileage: "11.2 km/l",
    seats: "7",
    drive: "AWD",
    acceleration: "5.9 sec",
    color: "Glacier White",
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "GLE",
    variant: "300d 4MATIC",
    year: "2024",
    price: "₹96.40 L",
    priceNumber: 96.4,
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
    body: "SUV",
    fuel: "Diesel",
    transmission: "Automatic",
    engine: "1993 cc",
    power: "245 bhp",
    torque: "500 Nm",
    mileage: "14.5 km/l",
    seats: "5",
    drive: "AWD",
    acceleration: "7.2 sec",
    color: "Obsidian Black",
  },
  {
    id: 4,
    brand: "Porsche",
    model: "Cayenne",
    variant: "Base",
    year: "2024",
    price: "₹1.42 Cr",
    priceNumber: 142,
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    body: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "2995 cc",
    power: "348 bhp",
    torque: "500 Nm",
    mileage: "10.8 km/l",
    seats: "5",
    drive: "AWD",
    acceleration: "5.7 sec",
    color: "Jet Black",
  },
  {
    id: 5,
    brand: "Volvo",
    model: "XC90",
    variant: "B6 Ultimate",
    year: "2024",
    price: "₹1.05 Cr",
    priceNumber: 105,
    image:
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=85",
    body: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    engine: "1969 cc",
    power: "300 bhp",
    torque: "420 Nm",
    mileage: "11.04 km/l",
    seats: "7",
    drive: "AWD",
    acceleration: "6.7 sec",
    color: "Crystal White",
  },
];

const comparisonRows = [
  { label: "Price", key: "price" },
  { label: "Year", key: "year" },
  { label: "Body Type", key: "body" },
  { label: "Fuel", key: "fuel" },
  { label: "Transmission", key: "transmission" },
  { label: "Engine", key: "engine" },
  { label: "Power", key: "power" },
  { label: "Torque", key: "torque" },
  { label: "Mileage", key: "mileage" },
  { label: "Seats", key: "seats" },
  { label: "Drive", key: "drive" },
  { label: "0–100 km/h", key: "acceleration" },
  { label: "Exterior Color", key: "color" },
];

const CompareCars = () => {
  const [selectedCars, setSelectedCars] = useState([
    cars[0],
    cars[1],
  ]);

  const [search, setSearch] = useState("");
  const [selectorOpen, setSelectorOpen] = useState(false);

  const filteredCars = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return cars;

    return cars.filter((car) =>
      `${car.brand} ${car.model} ${car.variant}`
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  const addCar = (car) => {
    if (selectedCars.some((item) => item.id === car.id)) {
      return;
    }

    if (selectedCars.length >= 3) {
      return;
    }

    setSelectedCars((current) => [
      ...current,
      car,
    ]);

    setSearch("");
    setSelectorOpen(false);
  };

  const removeCar = (id) => {
    setSelectedCars((current) =>
      current.filter((car) => car.id !== id)
    );
  };

  const clearAll = () => {
    setSelectedCars([]);
  };

  return (
    <div className="compare-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="compare-hero">

        <div className="compare-hero-content">

          <span className="compare-eyebrow">
            MOTORA COMPARE
          </span>

          <h1>
            Compare.
            <br />
            <strong>Then decide.</strong>
          </h1>

          <p>
            Put your shortlisted cars side by side
            and see exactly how they stack up.
          </p>

        </div>

        <div className="compare-hero-count">

          <span>
            SELECTED
          </span>

          <strong>
            {String(selectedCars.length).padStart(
              2,
              "0"
            )}
          </strong>

          <small>
            of 03 cars
          </small>

        </div>

      </section>


      {/* =================================
          SELECTOR
      ================================= */}

      <section className="compare-selector-section">

        <div className="compare-selector-header">

          <div>
            <span>
              YOUR SHORTLIST
            </span>

            <h2>
              Choose your cars.
            </h2>
          </div>

          {selectedCars.length > 0 && (
            <button
              className="compare-clear"
              onClick={clearAll}
            >
              Clear all
            </button>
          )}

        </div>


        <div className="compare-selected-grid">

          {selectedCars.map((car) => (

            <div
              className="selected-car-card"
              key={car.id}
            >

              <div className="selected-car-image">

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                />

                <button
                  onClick={() =>
                    removeCar(car.id)
                  }
                  aria-label="Remove car"
                >
                  <X size={13} />
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

            </div>

          ))}


          {selectedCars.length < 3 && (
            <button
              className="add-car-card"
              onClick={() =>
                setSelectorOpen(true)
              }
            >
              <div>
                <Plus size={18} />
              </div>

              <span>
                Add another car
              </span>

              <small>
                Up to 3 cars
              </small>
            </button>
          )}

        </div>


        {/* ADD CAR PANEL */}

        {selectorOpen && (
          <div className="car-selector-panel">

            <div className="car-selector-top">

              <div className="car-selector-search">

                <Search size={15} />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search brand or model..."
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                />

              </div>

              <button
                onClick={() =>
                  setSelectorOpen(false)
                }
              >
                <X size={15} />
              </button>

            </div>


            <div className="selector-results">

              {filteredCars.map((car) => {

                const alreadySelected =
                  selectedCars.some(
                    (item) => item.id === car.id
                  );

                return (
                  <button
                    className={
                      alreadySelected
                        ? "selector-car disabled"
                        : "selector-car"
                    }
                    key={car.id}
                    disabled={alreadySelected}
                    onClick={() => addCar(car)}
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
                      <Check size={15} />
                    ) : (
                      <Plus size={15} />
                    )}

                  </button>
                );
              })}

            </div>

          </div>
        )}

      </section>


      {/* =================================
          COMPARISON
      ================================= */}

      {selectedCars.length >= 2 ? (

        <section className="comparison-section">

          <div className="comparison-heading">

            <div>
              <span>
                SIDE BY SIDE
              </span>

              <h2>
                See the difference.
              </h2>
            </div>

            <ChevronDown size={17} />

          </div>


          <div className="comparison-table-wrapper">

            <div className="comparison-table">

              {/* HEADER */}

              <div className="comparison-row comparison-header-row">

                <div className="comparison-label-cell">
                  <span>
                    SPECIFICATION
                  </span>
                </div>

                {selectedCars.map((car) => (

                  <div
                    className="comparison-car-header"
                    key={car.id}
                  >

                    <div className="comparison-car-image">

                      <img
                        src={car.image}
                        alt={car.model}
                      />

                    </div>

                    <span>
                      {car.brand}
                    </span>

                    <h3>
                      {car.model}
                    </h3>

                    <small>
                      {car.variant}
                    </small>

                  </div>

                ))}

              </div>


              {/* ROWS */}

              {comparisonRows.map((row) => (

                <div
                  className="comparison-row"
                  key={row.key}
                >

                  <div className="comparison-label-cell">
                    <span>
                      {row.label}
                    </span>
                  </div>

                  {selectedCars.map((car) => (

                    <div
                      className="comparison-value-cell"
                      key={`${car.id}-${row.key}`}
                    >
                      <strong>
                        {car[row.key]}
                      </strong>
                    </div>

                  ))}

                </div>

              ))}

            </div>

          </div>

        </section>

      ) : (

        <section className="comparison-empty">

          <div>
            <Plus size={20} />
          </div>

          <h2>
            Add one more car to compare.
          </h2>

          <p>
            Choose at least two vehicles to
            see the full comparison.
          </p>

          <button
            onClick={() =>
              setSelectorOpen(true)
            }
          >
            Add a car
            <ArrowRight size={14} />
          </button>

        </section>

      )}


      {/* =================================
          VERDICT
      ================================= */}

      {selectedCars.length >= 2 && (
        <section className="compare-verdict">

          <div className="verdict-content">

            <span>
              MOTORA QUICK TAKE
            </span>

            <h2>
              Which one makes
              <br />
              more sense?
            </h2>

            <p>
              Every car has its strengths. Compare
              the numbers, consider how you'll use
              the car and choose what fits your life.
            </p>

          </div>


          <div className="verdict-cards">

            {selectedCars.map((car) => (

              <div
                className="verdict-card"
                key={car.id}
              >

                <div className="verdict-number">
                  {car.id}
                </div>

                <div>
                  <span>
                    {car.brand}
                  </span>

                  <h3>
                    {car.model}
                  </h3>
                </div>

                <ArrowRight size={15} />

              </div>

            ))}

          </div>

        </section>
      )}

    </div>
  );
};

export default CompareCars;