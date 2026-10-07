import { useState } from "react";
import {
  ArrowUpRight,
  Sparkles,
  Send,
  Check,
  RotateCcw,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./AIConcierge.css";

const recommendations = [
  {
    id: "bmw-x5",
    brand: "BMW",
    model: "X5",
    year: "2024",
    price: "₹85L",
    match: "96%",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "mercedes-gle",
    brand: "MERCEDES BENZ",
    model: "GLE",
    year: "2024",
    price: "₹92L",
    match: "93%",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: "audi-q8",
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
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (text = query) => {
    if (!text.trim() || isThinking) return;

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

  const handleViewCar = (car) => {
    navigate(`/cars?brand=${encodeURIComponent(car.brand)}`);
  };

  return (
    <section className="ai-concierge" id="ai">
      <div className="ai-concierge-container">

        <div className="ai-header">
          <div className="ai-eyebrow">
            <span className="ai-eyebrow-icon">
              <Sparkles size={14} />
            </span>

            MOTORA AI
          </div>

          <h2>
            Your personal
            <br />
            <strong>car concierge.</strong>
          </h2>

          <p>
            Tell us what you need. We will help you find
            the automobile that fits your life.
          </p>
        </div>

        <div className="ai-interface">

          <div className="ai-interface-top">
            <div className="ai-status">
              <span className="ai-status-dot" />
              MOTORA AI
            </div>

            <span className="ai-version">
              INTELLIGENCE 01
            </span>
          </div>

          <div className="ai-prompt-area">
            <span className="ai-prompt-label">
              WHAT ARE YOU LOOKING FOR?
            </span>

            <div className="ai-input-wrapper">
              <textarea
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey
                  ) {
                    event.preventDefault();
                    handleSearch();
                  }
                }}
                placeholder="Tell us about your ideal car..."
                rows={2}
              />

              <button
                type="button"
                className="ai-send"
                onClick={() => handleSearch()}
                aria-label="Ask MOTORA AI"
              >
                <Send size={17} />
              </button>
            </div>
          </div>

          {!showResults && !isThinking && (
            <div className="ai-quick-prompts">
              <span>TRY ASKING</span>

              <div>
                {quickPrompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() => handleSearch(prompt)}
                  >
                    <span>{prompt}</span>

                    <ArrowUpRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          )}

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

          {showResults && (
            <div className="ai-results">

              <div className="ai-query-result">
                <span>YOUR REQUEST</span>

                <strong>
                  {submittedQuery}
                </strong>
              </div>

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
                  type="button"
                  onClick={resetAI}
                  className="ai-reset"
                >
                  <RotateCcw size={14} />
                  <span>Start again</span>
                </button>
              </div>

              <div className="ai-car-results">
                {recommendations.map((car) => (
                  <article
                    className="ai-car-card"
                    key={car.id}
                  >
                    <div className="ai-car-image">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                        loading="lazy"
                      />

                      <div className="ai-image-overlay" />

                      <span className="match-score">
                        <Check size={12} />
                        {car.match} MATCH
                      </span>

                      <div className="ai-image-data">
                        <span>{car.brand}</span>
                        <strong>{car.model}</strong>
                      </div>
                    </div>

                    <div className="ai-car-info">
                      <div className="ai-car-meta">
                        <span>{car.year}</span>
                        <i />
                        <span>{car.price}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ai-view-car"
                      onClick={() => handleViewCar(car)}
                    >
                      <span>View Car</span>

                      <ArrowUpRight size={15} />
                    </button>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

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