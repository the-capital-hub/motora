import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CarSearch.css";

const bodyTypes = [
  "SUV",
  "Sedan",
  "Coupe",
  "Convertible",
  "Electric",
];

const purposes = [
  "Family",
  "Business",
  "Performance",
  "Daily Drive",
];

const brands = [
  "BMW",
  "Mercedes Benz",
  "Audi",
  "Porsche",
  "Range Rover",
];

const CarSearch = () => {
  const navigate = useNavigate();

  const [bodyType, setBodyType] = useState("SUV");
  const [purpose, setPurpose] = useState("Family");
  const [brand, setBrand] = useState("BMW");
  const [budget, setBudget] = useState(60);

  const handleFindCar = () => {
    const params = new URLSearchParams();

    if (bodyType) {
      params.set("type", bodyType);
    }

    if (brand) {
      params.set("brand", brand);
    }

    if (budget) {
      params.set("maxPrice", budget * 100000);
    }

    navigate(`/cars?${params.toString()}`);
  };

  const handleAiConcierge = () => {
    navigate("/ai-concierge");
  };

  return (
    <section className="car-search" id="cars">
      <div className="car-search-container">

        <div className="car-search-header">
          <div className="car-search-eyebrow">
            <span className="eyebrow-line" />
            <span>FIND YOUR CAR</span>
          </div>

          <div className="car-search-heading-row">
            <h2>
              Find a car that
              <br />
              fits your drive
            </h2>

            <p>
              Choose what matters to you and discover
              automobiles that match your lifestyle,
              preferences and budget.
            </p>
          </div>
        </div>

        <div className="car-search-panel">

          <div className="search-field search-field-body">
            <div className="search-field-label">
              BODY TYPE
            </div>

            <div className="search-options">
              {bodyTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  className={
                    bodyType === type
                      ? "search-option active"
                      : "search-option"
                  }
                  onClick={() => setBodyType(type)}
                  aria-pressed={bodyType === type}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="search-field search-field-budget">
            <div className="search-field-top">
              <span className="search-field-label">
                MAXIMUM BUDGET
              </span>

              <strong>
                ₹{budget}L
              </strong>
            </div>

            <input
              type="range"
              min="20"
              max="150"
              value={budget}
              onChange={(event) =>
                setBudget(Number(event.target.value))
              }
              className="budget-range"
              aria-label="Maximum budget"
            />

            <div className="range-values">
              <span>₹20L</span>
              <span>₹1.5Cr+</span>
            </div>
          </div>

          <div className="search-field search-field-select">
            <div className="search-field-label">
              PURPOSE
            </div>

            <div className="custom-select">
              <select
                value={purpose}
                onChange={(event) =>
                  setPurpose(event.target.value)
                }
                aria-label="Purpose"
              >
                {purposes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                strokeWidth={1.7}
              />
            </div>
          </div>

          <div className="search-field search-field-select">
            <div className="search-field-label">
              PREFERRED BRAND
            </div>

            <div className="custom-select">
              <select
                value={brand}
                onChange={(event) =>
                  setBrand(event.target.value)
                }
                aria-label="Preferred brand"
              >
                {brands.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={16}
                strokeWidth={1.7}
              />
            </div>
          </div>

          <button
            type="button"
            className="find-car-button"
            onClick={handleFindCar}
          >
            <span>EXPLORE MATCHING CARS</span>

            <span className="find-car-icon">
              <ArrowUpRight size={18} />
            </span>
          </button>
        </div>

        <div className="ai-discovery">

          <div className="ai-discovery-left">

            <div className="ai-discovery-icon">
              <Sparkles
                size={18}
                strokeWidth={1.6}
              />
            </div>

            <div className="ai-discovery-content">
              <span className="ai-discovery-label">
                MOTORA AI
              </span>

              <h3>
                Let AI find your perfect match
              </h3>

              <p>
                Share your requirements and get
                personalised car recommendations.
              </p>
            </div>

          </div>

          <button
            type="button"
            className="ai-discovery-button"
            onClick={handleAiConcierge}
          >
            <span>ASK MOTORA AI</span>

            <ArrowUpRight size={16} />
          </button>

        </div>

      </div>
    </section>
  );
};

export default CarSearch;