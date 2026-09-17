import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import "./SellCar.css";

const brands = [
  "BMW",
  "Mercedes-Benz",
  "Audi",
  "Porsche",
  "Range Rover",
];

const years = [
  "2026",
  "2025",
  "2024",
  "2023",
  "2022",
  "2021",
  "2020",
];

const SellCar = () => {
  const [brand, setBrand] = useState("");
  const [year, setYear] = useState("");
  const [model, setModel] = useState("");
  const [kilometres, setKilometres] = useState("");

  const [isValuating, setIsValuating] =
    useState(false);

  const [showResult, setShowResult] =
    useState(false);

  const startValuation = () => {
    if (!brand || !model || !year || !kilometres) {
      return;
    }

    setShowResult(false);
    setIsValuating(true);

    setTimeout(() => {
      setIsValuating(false);
      setShowResult(true);
    }, 1800);
  };

  const resetValuation = () => {
    setBrand("");
    setYear("");
    setModel("");
    setKilometres("");
    setShowResult(false);
    setIsValuating(false);
  };

  return (
    <section
      className="sell-car"
      id="sell"
    >
      <div className="sell-car-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="sell-header">

          <div className="sell-eyebrow">
            <span />
            SELL WITH MOTORA
          </div>

          <h2>
            Your car
            <br />
            <strong>deserves more.</strong>
          </h2>

          <p>
            Get a smarter valuation, a
            transparent selling experience
            and access to buyers who value
            exceptional automobiles.
          </p>

        </div>


        {/* =================================
            SELL FLOW
        ================================= */}

        <div className="sell-flow">

          <div className="sell-flow-item active">
            <span>01</span>
            TELL US
          </div>

          <div className="sell-flow-line" />

          <div className="sell-flow-item">
            <span>02</span>
            AI VALUE
          </div>

          <div className="sell-flow-line" />

          <div className="sell-flow-item">
            <span>03</span>
            INSPECTION
          </div>

          <div className="sell-flow-line" />

          <div className="sell-flow-item">
            <span>04</span>
            GET OFFER
          </div>

        </div>


        {/* =================================
            VALUATION CARD
        ================================= */}

        <div className="valuation-card">

          {/* =================================
              TOP
          ================================= */}

          <div className="valuation-top">

            <div className="valuation-title">

              <div className="valuation-icon">
                <Sparkles size={17} />
              </div>

              <div>
                <span>
                  MOTORA AI
                </span>

                <h3>
                  Intelligent valuation
                </h3>
              </div>

            </div>

            <span className="valuation-number">
              SELL / 01
            </span>

          </div>


          {/* =================================
              RESULT
          ================================= */}

          {showResult ? (

            <div className="valuation-result">

              <div className="valuation-success">

                <div className="success-icon">
                  <Check size={18} />
                </div>

                <div>
                  <span>
                    ESTIMATION COMPLETE
                  </span>

                  <h4>
                    Your car has strong
                    market demand.
                  </h4>
                </div>

              </div>


              <div className="estimated-value">

                <span>
                  ESTIMATED MARKET VALUE
                </span>

                <strong>
                  ₹62,50,000
                </strong>

                <p>
                  Based on vehicle details,
                  current market demand and
                  comparable listings.
                </p>

              </div>


              <div className="valuation-result-actions">

                <button className="valuation-primary">
                  Continue Selling
                  <ArrowUpRight size={17} />
                </button>

                <button
                  className="valuation-reset"
                  onClick={resetValuation}
                >
                  <RotateCcw size={14} />
                  Start Again
                </button>

              </div>

            </div>

          ) : isValuating ? (

            /* =================================
                AI THINKING
            ================================= */

            <div className="valuation-thinking">

              <div className="thinking-orb">
                <Sparkles size={24} />
              </div>

              <span>
                MOTORA AI
              </span>

              <h3>
                Analysing your car...
              </h3>

              <div className="valuation-checks">

                <div>
                  <Check size={13} />
                  MARKET DATA
                </div>

                <div>
                  <Check size={13} />
                  MODEL VALUE
                </div>

                <div>
                  <Check size={13} />
                  DEMAND
                </div>

              </div>

            </div>

          ) : (

            /* =================================
                FORM
            ================================= */

            <div className="valuation-form">

              <div className="valuation-form-heading">

                <span>
                  STEP 01
                </span>

                <h3>
                  What car are you selling?
                </h3>

                <p>
                  Enter a few details and let
                  MOTORA estimate its current
                  market value.
                </p>

              </div>


              <div className="valuation-fields">

                {/* BRAND */}

                <div className="valuation-field">

                  <label>
                    BRAND
                  </label>

                  <div className="valuation-select">

                    <select
                      value={brand}
                      onChange={(e) =>
                        setBrand(e.target.value)
                      }
                    >
                      <option value="">
                        Select brand
                      </option>

                      {brands.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={15} />

                  </div>

                </div>


                {/* MODEL */}

                <div className="valuation-field">

                  <label>
                    MODEL
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. X5"
                    value={model}
                    onChange={(e) =>
                      setModel(e.target.value)
                    }
                  />

                </div>


                {/* YEAR */}

                <div className="valuation-field">

                  <label>
                    YEAR
                  </label>

                  <div className="valuation-select">

                    <select
                      value={year}
                      onChange={(e) =>
                        setYear(e.target.value)
                      }
                    >
                      <option value="">
                        Select year
                      </option>

                      {years.map((item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ))}
                    </select>

                    <ChevronDown size={15} />

                  </div>

                </div>


                {/* KM */}

                <div className="valuation-field">

                  <label>
                    KILOMETRES
                  </label>

                  <input
                    type="number"
                    placeholder="e.g. 35000"
                    value={kilometres}
                    onChange={(e) =>
                      setKilometres(e.target.value)
                    }
                  />

                </div>

              </div>


              <button
                className="valuation-button"
                onClick={startValuation}
              >
                <span>
                  GET MY VALUATION
                </span>

                <ArrowUpRight size={18} />
              </button>

            </div>

          )}

        </div>


        {/* =================================
            FOOTER
        ================================= */}

        <div className="sell-footer">

          <span>
            AI-ASSISTED · HUMAN VERIFIED
          </span>

          <span>
            MOTORA / SELL
          </span>

        </div>

      </div>
    </section>
  );
};

export default SellCar;