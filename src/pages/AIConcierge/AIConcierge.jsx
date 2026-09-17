import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  Check,
  ChevronRight,
  Clock3,
  Fuel,
  Gauge,
  Heart,
  MessageCircle,
  RotateCcw,
  Send,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

import "./AIConcierge.css";

const questions = [
  {
    id: "budget",
    title: "What's your budget?",
    subtitle: "We'll keep recommendations realistic.",
    options: [
      "Under ₹40 L",
      "₹40 L — ₹75 L",
      "₹75 L — ₹1.25 Cr",
      "₹1.25 Cr+",
    ],
  },
  {
    id: "priority",
    title: "What matters most?",
    subtitle: "Choose what you care about most.",
    options: [
      "Performance",
      "Luxury",
      "Comfort",
      "Practicality",
    ],
  },
  {
    id: "body",
    title: "What kind of car?",
    subtitle: "Pick the body style you prefer.",
    options: [
      "SUV",
      "Sedan",
      "Coupe",
      "Convertible",
    ],
  },
  {
    id: "fuel",
    title: "What's your preference?",
    subtitle: "We'll factor this into your shortlist.",
    options: [
      "Petrol",
      "Diesel",
      "Electric",
      "Hybrid",
    ],
  },
];

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "X5",
    variant: "xDrive40i M Sport",
    price: "₹95.00 L",
    score: 96,
    reason: "Strong match for performance and luxury.",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85",
    specs: [
      ["Power", "335 bhp"],
      ["Engine", "2998 cc"],
      ["Mileage", "12 km/l"],
      ["Fuel", "Petrol"],
    ],
    tags: ["Performance", "Luxury"],
  },
  {
    id: 2,
    brand: "Audi",
    model: "Q7",
    variant: "45 TFSI Technology",
    price: "₹88.00 L",
    score: 92,
    reason: "Excellent choice for comfort and practicality.",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85",
    specs: [
      ["Power", "335 bhp"],
      ["Engine", "2995 cc"],
      ["Mileage", "11.2 km/l"],
      ["Fuel", "Petrol"],
    ],
    tags: ["Comfort", "Practical"],
  },
  {
    id: 3,
    brand: "Mercedes-Benz",
    model: "GLE",
    variant: "300d 4MATIC",
    price: "₹96.40 L",
    score: 89,
    reason: "A refined option with excellent everyday comfort.",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85",
    specs: [
      ["Power", "245 bhp"],
      ["Engine", "1993 cc"],
      ["Mileage", "14.5 km/l"],
      ["Fuel", "Diesel"],
    ],
    tags: ["Luxury", "Comfort"],
  },
];

const AIConcierge = () => {
  const [step, setStep] = useState(0);

  const [answers, setAnswers] = useState({});

  const [showResults, setShowResults] =
    useState(false);

  const [message, setMessage] = useState("");

  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      text:
        "Hi. I'm Motora AI. Tell me what you're looking for and I'll help you narrow it down.",
    },
  ]);

  const currentQuestion = questions[step];

  const progress = useMemo(() => {
    return ((step + 1) / questions.length) * 100;
  }, [step]);

  const selectOption = (option) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: option,
    };

    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setTimeout(() => {
        setStep((current) => current + 1);
      }, 250);
    } else {
      setTimeout(() => {
        setShowResults(true);
      }, 300);
    }
  };

  const resetConcierge = () => {
    setStep(0);
    setAnswers({});
    setShowResults(false);
    setMessage("");

    setChatMessages([
      {
        type: "ai",
        text:
          "Hi. I'm Motora AI. Tell me what you're looking for and I'll help you narrow it down.",
      },
    ]);
  };

  const sendMessage = () => {
    const trimmed = message.trim();

    if (!trimmed) return;

    setChatMessages((current) => [
      ...current,
      {
        type: "user",
        text: trimmed,
      },
      {
        type: "ai",
        text:
          "Got it. Based on that, I'd focus on cars that balance your priorities with long-term comfort and value.",
      },
    ]);

    setMessage("");
  };

  return (
    <div className="concierge-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="concierge-hero">

        <div className="concierge-hero-glow" />

        <div className="concierge-hero-content">

          <div className="concierge-badge">
            <Sparkles size={13} />
            MOTORA AI
          </div>

          <h1>
            Your car search,
            <br />
            <strong>made intelligent.</strong>
          </h1>

          <p>
            Forget endless filters. Tell Motora what
            matters to you and let AI build a shortlist
            around your lifestyle.
          </p>

        </div>

        <div className="concierge-hero-note">
          <Sparkles size={15} />
          <span>
            PERSONALIZED
            <br />
            RECOMMENDATIONS
          </span>
        </div>

      </section>


      {/* =================================
          CONCIERGE WIZARD
      ================================= */}

      {!showResults && (
        <section className="concierge-workspace">

          <div className="workspace-header">

            <div>
              <span>
                STEP {String(step + 1).padStart(2, "0")} /
                {" "}
                {String(questions.length).padStart(2, "0")}
              </span>

              <h2>
                Let's find your car.
              </h2>
            </div>

            <button
              onClick={resetConcierge}
              title="Restart"
            >
              <RotateCcw size={14} />
            </button>

          </div>


          <div className="progress-bar">
            <div
              style={{
                width: `${progress}%`,
              }}
            />
          </div>


          <div className="question-area">

            <div className="question-copy">

              <span>
                {currentQuestion.id.toUpperCase()}
              </span>

              <h3>
                {currentQuestion.title}
              </h3>

              <p>
                {currentQuestion.subtitle}
              </p>

            </div>


            <div className="question-options">

              {currentQuestion.options.map(
                (option) => (

                  <button
                    key={option}
                    className={
                      answers[currentQuestion.id] ===
                      option
                        ? "question-option selected"
                        : "question-option"
                    }
                    onClick={() =>
                      selectOption(option)
                    }
                  >

                    <span>
                      {option}
                    </span>

                    {answers[
                      currentQuestion.id
                    ] === option ? (
                      <Check size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}

                  </button>

                )
              )}

            </div>

          </div>

        </section>
      )}


      {/* =================================
          RESULTS
      ================================= */}

      {showResults && (
        <section className="concierge-results">

          <div className="results-header">

            <div>

              <span>
                YOUR PERSONALIZED SHORTLIST
              </span>

              <h2>
                We found your
                <br />
                <strong>best matches.</strong>
              </h2>

              <p>
                Based on what you told us, these
                vehicles are the strongest matches
                for your preferences.
              </p>

            </div>

            <button
              onClick={resetConcierge}
              className="restart-button"
            >
              <RotateCcw size={14} />
              Start again
            </button>

          </div>


          <div className="results-grid">

            {cars.map((car, index) => (

              <article
                className={
                  index === 0
                    ? "ai-car-card best-match"
                    : "ai-car-card"
                }
                key={car.id}
              >

                <div className="ai-car-image">

                  <img
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                  />

                  <div />

                  {index === 0 && (
                    <span className="best-badge">
                      BEST MATCH
                    </span>
                  )}

                  <button>
                    <Heart size={16} />
                  </button>

                </div>


                <div className="ai-car-content">

                  <div className="ai-car-heading">

                    <div>

                      <span>
                        {car.brand}
                      </span>

                      <h3>
                        {car.model}
                      </h3>

                    </div>

                    <strong>
                      {car.price}
                    </strong>

                  </div>


                  <p className="ai-car-variant">
                    {car.variant}
                  </p>


                  <div className="match-score">

                    <div>
                      <span>
                        MATCH
                      </span>

                      <strong>
                        {car.score}%
                      </strong>
                    </div>

                    <div className="score-track">
                      <div
                        style={{
                          width: `${car.score}%`,
                        }}
                      />
                    </div>

                  </div>


                  <p className="ai-car-reason">
                    <Sparkles size={13} />
                    {car.reason}
                  </p>


                  <div className="ai-car-specs">

                    {car.specs.map(
                      ([label, value]) => (

                        <div key={label}>

                          <span>
                            {label}
                          </span>

                          <strong>
                            {value}
                          </strong>

                        </div>

                      )
                    )}

                  </div>


                  <button
                    className="ai-view-car"
                    onClick={() =>
                      (window.location.href =
                        "/cars")
                    }
                  >
                    Explore this car
                    <ArrowUpRight size={14} />
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>
      )}


      {/* =================================
          CHAT ASSISTANT
      ================================= */}

      <section className="concierge-chat-section">

        <div className="chat-intro">

          <div className="chat-icon">
            <Sparkles size={18} />
          </div>

          <span>
            STILL HAVE QUESTIONS?
          </span>

          <h2>
            Ask your
            <br />
            AI concierge.
          </h2>

          <p>
            Ask about a specific car, compare two
            models, or tell us what you're unsure
            about.
          </p>

        </div>


        <div className="chat-box">

          <div className="chat-header">

            <div>

              <div className="online-dot" />

              <div>
                <strong>
                  Motora AI
                </strong>

                <span>
                  Usually replies instantly
                </span>
              </div>

            </div>

            <Sparkles size={16} />

          </div>


          <div className="chat-messages">

            {chatMessages.map(
              (chat, index) => (

                <div
                  className={
                    chat.type === "ai"
                      ? "chat-message ai"
                      : "chat-message user"
                  }
                  key={index}
                >

                  {chat.type === "ai" && (
                    <div className="chat-avatar">
                      <Sparkles size={12} />
                    </div>
                  )}

                  <p>
                    {chat.text}
                  </p>

                </div>

              )
            )}

          </div>


          <div className="chat-input">

            <input
              type="text"
              placeholder="Ask me anything about cars..."
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              aria-label="Send message"
            >
              <Send size={15} />
            </button>

          </div>

        </div>

      </section>


      {/* =================================
          FEATURES
      ================================= */}

      <section className="concierge-features">

        <div className="features-heading">

          <span>
            WHAT YOUR CONCIERGE CAN DO
          </span>

          <h2>
            More than
            <br />
            recommendations.
          </h2>

        </div>


        <div className="features-grid">

          <div className="concierge-feature">

            <div>
              <Gauge size={18} />
            </div>

            <span>
              01
            </span>

            <h3>
              Understand your needs
            </h3>

            <p>
              Tell us your priorities and Motora
              translates them into meaningful
              recommendations.
            </p>

          </div>


          <div className="concierge-feature">

            <div>
              <CarFront size={18} />
            </div>

            <span>
              02
            </span>

            <h3>
              Compare intelligently
            </h3>

            <p>
              Go beyond specifications. Understand
              which car makes more sense for you.
            </p>

          </div>


          <div className="concierge-feature">

            <div>
              <Clock3 size={18} />
            </div>

            <span>
              03
            </span>

            <h3>
              Save you time
            </h3>

            <p>
              Skip hours of browsing and get a
              focused shortlist in minutes.
            </p>

          </div>


          <div className="concierge-feature">

            <div>
              <UserRound size={18} />
            </div>

            <span>
              04
            </span>

            <h3>
              Stay with you
            </h3>

            <p>
              Ask follow-up questions whenever
              you're ready. Your search doesn't
              have to end here.
            </p>

          </div>

        </div>

      </section>


      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="concierge-final-cta">

        <div>

          <span>
            READY WHEN YOU ARE
          </span>

          <h2>
            Your next car
            <br />
            starts with a question.
          </h2>

        </div>

        <button
          onClick={resetConcierge}
        >
          Start my search
          <ArrowUpRight size={15} />
        </button>

      </section>

    </div>
  );
};

export default AIConcierge;