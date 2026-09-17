import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Sparkles,
} from "lucide-react";

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
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Range Rover",
];

const CarSearch = () => {
  const [bodyType, setBodyType] = useState("SUV");
  const [purpose, setPurpose] = useState("Family");
  const [brand, setBrand] = useState("BMW");
  const [budget, setBudget] = useState(60);

  return (
    <section className="car-search" id="cars">

      {/* =================================
          TOP INTRO
      ================================= */}

      <div className="car-search-container">

        <div className="car-search-header">

          <div className="car-search-eyebrow">
            <span />
            FIND YOUR CAR
          </div>

          <h2>
            What are you
            <br />
            looking for?
          </h2>

          <p>
            Tell us what matters to you.
            MOTORA will help you discover
            the right automobile.
          </p>

        </div>


        {/* =================================
            SEARCH PANEL
        ================================= */}

        <div className="car-search-panel">

          {/* BODY TYPE */}

          <div className="search-field search-field-wide">

            <div className="search-field-label">
              BODY TYPE
            </div>

            <div className="search-options">

              {bodyTypes.map((type) => (
                <button
                  key={type}
                  className={
                    bodyType === type
                      ? "search-option active"
                      : "search-option"
                  }
                  onClick={() => setBodyType(type)}
                >
                  {type}
                </button>
              ))}

            </div>

          </div>


          {/* BUDGET */}

          <div className="search-field">

            <div className="search-field-top">

              <span className="search-field-label">
                BUDGET
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
              onChange={(e) =>
                setBudget(Number(e.target.value))
              }
              className="budget-range"
            />

            <div className="range-values">
              <span>₹20L</span>
              <span>₹1.5Cr+</span>
            </div>

          </div>


          {/* PURPOSE */}

          <div className="search-field">

            <div className="search-field-label">
              PURPOSE
            </div>

            <div className="custom-select">

              <select
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
              >
                {purposes.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />

            </div>

          </div>


          {/* BRAND */}

          <div className="search-field">

            <div className="search-field-label">
              PREFERRED BRAND
            </div>

            <div className="custom-select">

              <select
                value={brand}
                onChange={(e) =>
                  setBrand(e.target.value)
                }
              >
                {brands.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>

              <ChevronDown size={16} />

            </div>

          </div>


          {/* SEARCH CTA */}

          <button className="find-car-button">

            <span>
              FIND MY CAR
            </span>

            <ArrowUpRight size={19} />

          </button>

        </div>


        {/* =================================
            AI DISCOVERY
        ================================= */}

        <div className="ai-discovery">

          <div className="ai-discovery-left">

            <div className="ai-discovery-icon">
              <Sparkles
                size={19}
                strokeWidth={1.5}
              />
            </div>

            <div>

              <span className="ai-discovery-label">
                MOTORA AI
              </span>

              <h3>
                Not sure what to choose?
              </h3>

              <p>
                Tell us your requirements and
                let AI find the right car for you.
              </p>

            </div>

          </div>

          <button className="ai-discovery-button">

            Ask MOTORA AI

            <ArrowUpRight size={17} />

          </button>

        </div>

      </div>

    </section>
  );
};

export default CarSearch;