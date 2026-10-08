import { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  ArrowUpRight,
  X,
  Send,
  Car,
  Search,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./AIFloatingButton.css";

const quickActions = [
  {
    label: "Find a car",
    icon: Search,
    message: "Help me find the right car",
  },
  {
    label: "Explore luxury cars",
    icon: Car,
    message: "Show me premium luxury cars",
  },
  {
    label: "Cars near me",
    icon: MapPin,
    message: "Help me find cars near my location",
  },
];

const AIFloatingButton = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text: "Hi! I am Motora AI. I can help you find the right car, explore premium vehicles, or answer your questions.",
    },
  ]);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleSend = (customMessage = null) => {
    const text = (
      customMessage ?? message
    ).trim();

    if (!text) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: getDemoResponse(text),
        },
      ]);
    }, 600);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  const openFullConcierge = () => {
    closeChat();
    navigate("/ai-concierge");
  };

  return (
    <>
      {/* =================================================
          CHAT PANEL
      ================================================= */}

      <div
        className={`motora-ai-panel ${
          isOpen ? "is-open" : ""
        }`}
      >
        <div className="motora-ai-panel-header">

          <div className="motora-ai-panel-brand">

            <div className="motora-ai-panel-icon">
              <Sparkles
                size={18}
                strokeWidth={1.7}
              />
            </div>

            <div>
              <span className="motora-ai-panel-label">
                MOTORA AI
              </span>

              <strong>
                AI Concierge
              </strong>
            </div>

          </div>

          <button
            type="button"
            className="motora-ai-close"
            onClick={closeChat}
            aria-label="Close AI Concierge"
          >
            <X size={18} />
          </button>

        </div>


        {/* =================================================
            MESSAGES
        ================================================= */}

        <div className="motora-ai-messages">

          {messages.map((item) => (
            <div
              key={item.id}
              className={`motora-ai-message ${
                item.role === "user"
                  ? "user-message"
                  : "assistant-message"
              }`}
            >
              {item.text}
            </div>
          ))}

        </div>


        {/* =================================================
            QUICK ACTIONS
        ================================================= */}

        <div className="motora-ai-quick-actions">

          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                type="button"
                key={action.label}
                onClick={() =>
                  handleSend(action.message)
                }
              >
                <Icon
                  size={15}
                  strokeWidth={1.7}
                />

                <span>
                  {action.label}
                </span>
              </button>
            );
          })}

        </div>


        {/* =================================================
            INPUT
        ================================================= */}

        <div className="motora-ai-input-area">

          <input
            ref={inputRef}
            type="text"
            value={message}
            placeholder="Ask about cars..."
            onChange={(event) =>
              setMessage(event.target.value)
            }
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            onClick={() => handleSend()}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <Send
              size={17}
              strokeWidth={1.8}
            />
          </button>

        </div>


        {/* =================================================
            FULL CONCIERGE
        ================================================= */}

        <button
          type="button"
          className="motora-ai-full-button"
          onClick={openFullConcierge}
        >
          <MessageCircle
            size={15}
            strokeWidth={1.7}
          />

          <span>
            Open Full Concierge
          </span>

          <ArrowUpRight
            size={15}
            strokeWidth={1.7}
          />
        </button>

      </div>


      {/* =================================================
          FLOATING BUTTON
      ================================================= */}

      <button
        type="button"
        className={`motora-ai-button ${
          isOpen ? "is-active" : ""
        }`}
        onClick={() =>
          setIsOpen((prev) => !prev)
        }
        aria-label={
          isOpen
            ? "Close Motora AI"
            : "Open Motora AI"
        }
      >

        <span className="motora-ai-button-glow" />

        <span className="motora-ai-button-inner">

          <span className="motora-ai-icon">
            {isOpen ? (
              <X
                size={19}
                strokeWidth={1.8}
              />
            ) : (
              <Sparkles
                size={19}
                strokeWidth={1.7}
              />
            )}
          </span>

          <span className="motora-ai-content">

            <span className="motora-ai-label">
              MOTORA AI
            </span>

            <span className="motora-ai-title">
              {isOpen
                ? "Close Concierge"
                : "AI Concierge"}
            </span>

          </span>

          {!isOpen && (
            <span className="motora-ai-arrow">
              <ArrowUpRight
                size={16}
                strokeWidth={1.8}
              />
            </span>
          )}

        </span>

      </button>
    </>
  );
};


/* =========================================================
   DEMO RESPONSE
========================================================= */

function getDemoResponse(text) {
  const value = text.toLowerCase();

  if (
    value.includes("luxury") ||
    value.includes("premium")
  ) {
    return "Absolutely. Motora has premium vehicles from brands such as BMW, Mercedes Benz, Porsche and Range Rover. I can help you narrow down the right option.";
  }

  if (
    value.includes("location") ||
    value.includes("near")
  ) {
    return "Sure. Tell me your preferred city and I can help you explore suitable vehicles available there.";
  }

  if (
    value.includes("find") ||
    value.includes("car")
  ) {
    return "Great. Tell me your budget, preferred body type and fuel preference. I will help you narrow down the best options.";
  }

  return "I can help you discover cars, compare options, understand specifications and find the right vehicle for your needs.";
}

export default AIFloatingButton;