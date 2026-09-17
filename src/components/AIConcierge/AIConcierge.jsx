import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Send,
  Check,
  RotateCcw,
} from "lucide-react";

import "./AIConcierge.css";

const recommendations = [
  {
    brand: "BMW",
    model: "X5",
    year: "2024",
    price: "₹85L",
    match: "96%",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    brand: "MERCEDES-BENZ",
    model: "GLE",
    year: "2024",
    price: "₹92L",
    match: "93%",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    brand: "AUDI",
    model: "Q8",
    year: "2024",
    price: "₹98L",
    match: "89%",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
  },
];

const quickPrompts = [
  "Luxury SUV for my family",
  "Performance car under ₹1Cr",
  "Best premium EV",
  "Comfortable daily car",
];

const AIConcierge = () => {
  const [query, setQuery] = useState("");

  const [submittedQuery, setSubmittedQuery] =
    useState("");

  const [isThinking, setIsThinking] =
    useState(false);

  const [showResults, setShowResults] =
    useState(false);

  const handleSearch = (text = query) => {
    if (!text.trim()) return;

    setSubmittedQuery(text);
    setQuery(text);
    setShowResults(false);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      setShowResults(true);
    }, 1400);
  };

  const resetAI = () => {
    setQuery("");
    setSubmittedQuery("");
    setShowResults(false);
    setIsThinking(false);
  };

  return (
    <section
      className="ai-concierge"
      id="ai"
    >
      <div className="ai-concierge-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="ai-header">

          <div className="ai-eyebrow">
            <span className="ai-eyebrow-icon">
              <Sparkles size={13} />
            </span>

            MOTORA AI
          </div>

          <h2>
            Your personal
            <br />
            <strong>car concierge.</strong>
          </h2>

          <p>
            Tell us what you need.
            We'll help you find the
            automobile that fits your life.
          </p>

        </div>


        {/* =================================
            AI BOX
        ================================= */}

        <div className="ai-interface">

          <div className="ai-interface-top">

            <div className="ai-status">

              <span className="ai-status-dot" />

              MOTORA AI
            </div>

            <span className="ai-version">
              INTELLIGENCE / 01
            </span>

          </div>


          {/* =================================
              PROMPT
          ================================= */}

          <div className="ai-prompt-area">

            <span className="ai-prompt-label">
              WHAT ARE YOU LOOKING FOR?
            </span>

            <div className="ai-input-wrapper">

              <textarea
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Tell us about your ideal car..."
                rows={2}
              />

              <button
                className="ai-send"
                onClick={() =>
                  handleSearch()
                }
                aria-label="Ask MOTORA AI"
              >
                <Send size={17} />
              </button>

            </div>

          </div>


          {/* =================================
              QUICK PROMPTS
          ================================= */}

          {!showResults &&
            !isThinking && (
              <div className="ai-quick-prompts">

                <span>
                  TRY ASKING
                </span>

                <div>

                  {quickPrompts.map(
                    (prompt) => (
                      <button
                        key={prompt}
                        onClick={() =>
                          handleSearch(prompt)
                        }
                      >
                        {prompt}

                        <ArrowUpRight
                          size={13}
                        />
                      </button>
                    )
                  )}

                </div>

              </div>
            )}


          {/* =================================
              THINKING
          ================================= */}

          {isThinking && (
            <div className="ai-thinking">

              <div className="ai-thinking-icon">
                <Sparkles size={18} />
              </div>

              <div>

                <strong>
                  MOTORA AI is thinking
                </strong>

                <div className="thinking-dots">
                  <span />
                  <span />
                  <span />
                </div>

              </div>

            </div>
          )}


          {/* =================================
              RESULTS
          ================================= */}

          {showResults && (
            <div className="ai-results">

              <div className="ai-results-header">

                <div>

                  <span>
                    BASED ON YOUR REQUIREMENTS
                  </span>

                  <h3>
                    We found some strong matches.
                  </h3>

                </div>

                <button
                  onClick={resetAI}
                  className="ai-reset"
                >
                  <RotateCcw size={14} />
                  Start again
                </button>

              </div>


              <div className="ai-car-results">

                {recommendations.map(
                  (car) => (
                    <article
                      className="ai-car-card"
                      key={car.model}
                    >

                      <div className="ai-car-image">

                        <img
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                        />

                        <span className="match-score">
                          <Check size={11} />
                          {car.match} MATCH
                        </span>

                      </div>


                      <div className="ai-car-info">

                        <span>
                          {car.brand}
                        </span>

                        <h4>
                          {car.model}
                        </h4>

                        <div className="ai-car-meta">
                          {car.year}
                          <i />
                          {car.price}
                        </div>

                      </div>

                      <button className="ai-view-car">
                        View Car
                        <ArrowUpRight
                          size={15}
                        />
                      </button>

                    </article>
                  )
                )}

              </div>

            </div>
          )}

        </div>


        {/* =================================
            FOOTER
        ================================= */}

        <div className="ai-footer">

          <span>
            HUMAN INSIGHT + AI INTELLIGENCE
          </span>

          <span>
            MOTORA / AI
          </span>

        </div>

      </div>
    </section>
  );
};

export default AIConcierge;