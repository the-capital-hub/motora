import { useState } from "react";
import {
  ArrowUpRight,
  Bot,
  CarFront,
  ChevronRight,
  CircleDollarSign,
  Fuel,
  Gauge,
  MapPin,
  Send,
  ShieldCheck,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { askCarAssistant } from "../../api/smartApi";
import "./AIConcierge.css";

const money = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

const suggestions = [
  {
    title: "Family SUV",
    text: "I need a family SUV under 15 lakh",
    icon: CarFront,
  },
  {
    title: "Performance",
    text: "Show me a performance car",
    icon: Gauge,
  },
  {
    title: "Electric",
    text: "I want an electric car",
    icon: Fuel,
  },
  {
    title: "Premium",
    text: "Find me a premium car under 50 lakh",
    icon: CircleDollarSign,
  },
];

const showcaseCars = [
  {
    name: "BMW X5",
    type: "Luxury SUV",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Porsche 911",
    type: "Performance",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=90",
  },
  {
    name: "Mercedes Benz",
    type: "Luxury",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1000&q=90",
  },
];

export default function AIConcierge() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const ask = async (event) => {
    event?.preventDefault();

    if (!message.trim() || loading) return;

    try {
      setLoading(true);
      setError("");
      setReply("");
      setItems([]);

      const data = await askCarAssistant(message);

      setReply(data.reply || "");

      setItems(
        (data.items || [])
          .map((item) => item.car)
          .filter(Boolean)
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect with the Motora concierge."
      );
    } finally {
      setLoading(false);
    }
  };

  const selectSuggestion = (text) => {
    setMessage(text);
  };

  return (
    <main className="ai-page">
      {/* =========================
          HERO
      ========================= */}

      <section className="ai-hero">
        <div className="ai-hero-main-image" />

        <div className="ai-hero-gradient" />

        <div className="ai-hero-content">
          <div className="ai-navbar">
            <div className="ai-logo">
              <span className="ai-logo-mark">
                <Bot size={19} />
              </span>

              <div>
                <strong>MOTORA</strong>
                <span>AI CONCIERGE</span>
              </div>
            </div>

            <div className="ai-live">
              <span />
              LIVE INVENTORY
            </div>
          </div>

          <div className="ai-hero-copy">
            <span className="ai-overline">
              YOUR PERSONAL AUTOMOTIVE ASSISTANT
            </span>

            <h1>
              Find the car
              <br />
              <span>that feels right.</span>
            </h1>

            <p>
              Tell Motora what you want to drive. Your budget,
              lifestyle, performance needs and preferences are
              all we need to find your match.
            </p>

            <div className="ai-hero-actions">
              <button
                onClick={() =>
                  document
                    .querySelector(".ai-search-section")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Start your search
                <ArrowUpRight size={16} />
              </button>

              <span>
                <ShieldCheck size={15} />
                Matched against live inventory
              </span>
            </div>
          </div>

          <div className="ai-hero-bottom">
            <div className="ai-hero-stat">
              <strong>01</strong>
              <span>Tell us what you need</span>
            </div>

            <div className="ai-hero-stat">
              <strong>02</strong>
              <span>We understand your needs</span>
            </div>

            <div className="ai-hero-stat">
              <strong>03</strong>
              <span>Explore your matches</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SHOWCASE
      ========================= */}

      <section className="ai-showcase">
        <div className="ai-showcase-heading">
          <div>
            <span>BUILT FOR CAR LOVERS</span>
            <h2>
              One conversation.
              <br />
              Many possibilities.
            </h2>
          </div>

          <p>
            Whether you are looking for a family SUV, a weekend
            performance car or something completely electric,
            Motora helps narrow down the collection.
          </p>
        </div>

        <div className="ai-showcase-grid">
          {showcaseCars.map((car, index) => (
            <article
              className={`ai-showcase-card card-${index + 1}`}
              key={car.name}
            >
              <img src={car.image} alt={car.name} />

              <div className="ai-showcase-overlay" />

              <div className="ai-showcase-info">
                <span>{car.type}</span>
                <h3>{car.name}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =========================
          AI SEARCH
      ========================= */}

      <section className="ai-search-section">
        <div className="ai-search-heading">
          <span>SMART CAR DISCOVERY</span>

          <h2>
            What are you
            <br />
            <span>looking for?</span>
          </h2>

          <p>
            You do not need to know the exact model. Just describe
            the kind of car you want in your own words.
          </p>
        </div>

        <div className="ai-search-layout">
          <div className="ai-search-card">
            <div className="ai-search-card-top">
              <div className="ai-assistant-avatar">
                <Sparkles size={19} />
              </div>

              <div>
                <strong>Motora AI</strong>
                <span>Your personal car concierge</span>
              </div>

              <div className="ai-online">
                <span />
                Online
              </div>
            </div>

            <div className="ai-conversation">
              <div className="ai-message ai-message-bot">
                <div className="ai-message-avatar">
                  <Bot size={15} />
                </div>

                <div>
                  <span>Motora AI</span>
                  <p>
                    Tell me what kind of car you have in mind.
                    You can mention your budget, body type,
                    fuel preference or even how you plan to use it.
                  </p>
                </div>
              </div>

              {message && (
                <div className="ai-message ai-message-user">
                  <p>{message}</p>
                </div>
              )}
            </div>

            <form
              className="ai-input-form"
              onSubmit={ask}
            >
              <div className="ai-main-input">
                <WandSparkles size={18} />

                <input
                  value={message}
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                  placeholder="Tell me what you want to drive..."
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading || !message.trim()}
              >
                {loading ? (
                  "Finding..."
                ) : (
                  <>
                    Ask Motora
                    <Send size={15} />
                  </>
                )}
              </button>
            </form>

            <div className="ai-quick-label">
              QUICK START
            </div>

            <div className="ai-quick-grid">
              {suggestions.map((item) => {
                const Icon = item.icon;

                return (
                  <button
                    type="button"
                    key={item.title}
                    onClick={() =>
                      selectSuggestion(item.text)
                    }
                  >
                    <Icon size={15} />

                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.text}</span>
                    </div>

                    <ChevronRight size={14} />
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ai-search-visual">
            <div className="ai-visual-image-large">
              <img
                src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=90"
                alt="Premium car"
              />

              <div className="ai-visual-image-overlay" />

              <div className="ai-visual-label">
                <Sparkles size={14} />
                <span>SMART MATCHING</span>
              </div>

              <div className="ai-visual-caption">
                <span>THE RIGHT CAR</span>
                <strong>Starts with the right question.</strong>
              </div>
            </div>

            <div className="ai-visual-mini">
              <img
                src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=700&q=90"
                alt="Luxury vehicle"
              />

              <div>
                <span>LIVE COLLECTION</span>
                <strong>Explore what fits you.</strong>
              </div>
            </div>
          </div>
        </div>

        {/* ERROR */}
        {error && (
          <div className="ai-error">
            <span />
            <p>{error}</p>
          </div>
        )}

        {/* THINKING */}
        {loading && (
          <div className="ai-thinking">
            <div className="ai-thinking-icon">
              <Sparkles size={18} />
            </div>

            <div>
              <strong>Motora is searching the collection</strong>

              <p>
                Finding cars that match your requirements.
              </p>
            </div>

            <div className="ai-thinking-dots">
              <span />
              <span />
              <span />
            </div>
          </div>
        )}

        {/* RESPONSE */}
        {!loading && reply && (
          <section className="ai-response">
            <div className="ai-response-top">
              <div className="ai-response-icon">
                <Bot size={18} />
              </div>

              <div>
                <span>MOTORA AI</span>
                <strong>Your personalised recommendation</strong>
              </div>
            </div>

            <p>{reply}</p>
          </section>
        )}

        {/* RESULTS */}
        {!loading && items.length > 0 && (
          <section className="ai-results">
            <div className="ai-results-heading">
              <div>
                <span>YOUR MATCHES</span>

                <h2>
                  Cars selected for you.
                </h2>
              </div>

              <strong>
                {String(items.length).padStart(2, "0")}
              </strong>
            </div>

            <div className="ai-results-grid">
              {items.map((car) => (
                <article
                  className="ai-car-card"
                  key={car._id}
                >
                  <div className="ai-car-image">
                    {car.images?.[0] ? (
                      <img
                        src={car.images[0]}
                        alt={`${car.brand} ${car.model}`}
                        loading="lazy"
                      />
                    ) : (
                      <div className="ai-image-empty">
                        <CarFront size={25} />
                        <span>Image unavailable</span>
                      </div>
                    )}

                    <div className="ai-car-gradient" />

                    <span className="ai-car-verified">
                      <ShieldCheck size={12} />
                      VERIFIED
                    </span>

                    <span className="ai-car-price">
                      {money(car.price)}
                    </span>
                  </div>

                  <div className="ai-car-info">
                    <span className="ai-car-brand">
                      {car.brand}
                    </span>

                    <div className="ai-car-title">
                      <h3>{car.model}</h3>

                      <span>
                        {car.year || "Year unavailable"}
                      </span>
                    </div>

                    <div className="ai-car-specs">
                      <span>
                        <Gauge size={13} />
                        {car.type || "Type unavailable"}
                      </span>

                      <span>
                        <Fuel size={13} />
                        {car.fuel || "Fuel unavailable"}
                      </span>

                      <span>
                        {car.transmission ||
                          "Transmission unavailable"}
                      </span>
                    </div>

                    <div className="ai-car-location">
                      <MapPin size={13} />

                      <span>
                        {car.location ||
                          "Location unavailable"}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/cars/${car._id}`)
                      }
                    >
                      View car
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </section>
    </main>
  );
}