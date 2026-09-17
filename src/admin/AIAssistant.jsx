import { useState } from "react";
import {
  Activity,
  ArrowUpRight,
  Bot,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Phone,
  Search,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

import "./AIAssistant.css";

const initialMessages = [
  {
    id: 1,
    type: "ai",
    text: "Good morning. I'm MOTORA AI. I can help you monitor leads, customer enquiries, inventory and appointments.",
    time: "10:42 AM",
  },
  {
    id: 2,
    type: "user",
    text: "Which leads should my sales team follow up with today?",
    time: "10:43 AM",
  },
  {
    id: 3,
    type: "ai",
    text: "I found 4 high-priority leads. Rahul Sharma is interested in the BMW X5 and has a potential value of ₹85,00,000. Aman Verma is also ready for a follow-up regarding the Porsche Cayenne.",
    time: "10:43 AM",
  },
];

const quickActions = [
  "Show today's priorities",
  "Analyze my leads",
  "Check inventory",
  "Upcoming test drives",
];

const AIAssistant = () => {
  const [messages, setMessages] =
    useState(initialMessages);

  const [input, setInput] =
    useState("");

  const [isThinking, setIsThinking] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const sendMessage = (messageText) => {
    const text =
      messageText.trim();

    if (!text || isThinking) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      type: "user",
      text,
      time: new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setInput("");
    setIsThinking(true);

    setTimeout(() => {
      const response = generateResponse(
        text
      );

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "ai",
          text: response,
          time: new Date().toLocaleTimeString(
            [],
            {
              hour: "2-digit",
              minute: "2-digit",
            }
          ),
        },
      ]);

      setIsThinking(false);
    }, 900);
  };

  const generateResponse = (text) => {
    const lowerText =
      text.toLowerCase();

    if (
      lowerText.includes("lead")
    ) {
      return "You currently have 6 active leads. Rahul Sharma and Aman Verma are the strongest immediate follow-up opportunities based on vehicle interest and lead value.";
    }

    if (
      lowerText.includes("inventory") ||
      lowerText.includes("car")
    ) {
      return "Your current inventory contains premium vehicles including BMW X5, Mercedes-Benz GLE, Porsche Cayenne, Audi Q8 and Range Rover Velar.";
    }

    if (
      lowerText.includes("test") ||
      lowerText.includes("appointment")
    ) {
      return "There are upcoming test drives scheduled for the BMW X5, Mercedes-Benz GLE, Porsche Cayenne and Audi Q8. Two appointments are scheduled for today.";
    }

    if (
      lowerText.includes("priority") ||
      lowerText.includes("today")
    ) {
      return "Today's priorities: follow up with new leads, confirm the pending Porsche Cayenne test drive and review the latest vehicle sell request.";
    }

    return "I've noted that. Based on the current MOTORA data, I can help you analyze leads, inventory, customer activity and test drive appointments.";
  };

  const filteredMessages =
    messages.filter((message) =>
      message.text
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
    );

  return (
    <div className="aiassistant-page">

      {/* HEADER */}

      <header className="aiassistant-header">

        <div>

          <span className="aiassistant-eyebrow">
            MOTORA / INTELLIGENCE
          </span>

          <h1>
            AI assistant
          </h1>

          <p>
            Your intelligent command center
            for sales, customers and inventory.
          </p>

        </div>


        <div className="ai-live-status">

          <span className="ai-live-dot" />

          AI ONLINE

        </div>

      </header>


      {/* AI OVERVIEW */}

      <section className="ai-overview">

        <div className="ai-overview-main">

          <div className="ai-orb">

            <div className="ai-orb-inner">
              <Sparkles size={25} />
            </div>

          </div>


          <div className="ai-overview-content">

            <span>
              MOTORA INTELLIGENCE
            </span>

            <h2>
              Your dealership,
              <br />
              understood.
            </h2>

            <p>
              AI continuously helps your team
              identify opportunities, prioritize
              customers and understand dealership
              activity.
            </p>

          </div>

        </div>


        <div className="ai-overview-stats">

          <div>
            <span>
              AI INTERACTIONS
            </span>

            <strong>
              1,284
            </strong>

            <small>
              +18.4% this month
            </small>
          </div>


          <div>
            <span>
              LEADS PRIORITIZED
            </span>

            <strong>
              86
            </strong>

            <small>
              14 high priority
            </small>
          </div>


          <div>
            <span>
              RESPONSE TIME
            </span>

            <strong>
              1.8s
            </strong>

            <small>
              Average AI response
            </small>
          </div>

        </div>

      </section>


      {/* MAIN GRID */}

      <section className="ai-main-grid">


        {/* CHAT */}

        <div className="ai-chat-panel">

          <div className="ai-chat-header">

            <div className="ai-chat-title">

              <div className="ai-chat-icon">
                <Bot size={17} />
              </div>

              <div>

                <strong>
                  MOTORA AI
                </strong>

                <span>
                  Intelligent dealership assistant
                </span>

              </div>

            </div>


            <div className="ai-chat-online">
              <span />
              Online
            </div>

          </div>


          {/* SEARCH */}

          <div className="ai-message-search">

            <Search size={14} />

            <input
              type="text"
              placeholder="Search conversation..."
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
            />

          </div>


          {/* MESSAGES */}

          <div className="ai-messages">

            {filteredMessages.map(
              (message) => (

                <div
                  className={
                    message.type === "ai"
                      ? "ai-message-row"
                      : "ai-message-row user"
                  }
                  key={message.id}
                >

                  <div
                    className={
                      message.type === "ai"
                        ? "ai-message-avatar"
                        : "ai-message-avatar user"
                    }
                  >
                    {message.type === "ai" ? (
                      <Bot size={14} />
                    ) : (
                      <UserRound size={14} />
                    )}
                  </div>


                  <div className="ai-message-content">

                    <div className="ai-message-meta">

                      <strong>
                        {message.type === "ai"
                          ? "MOTORA AI"
                          : "You"}
                      </strong>

                      <span>
                        {message.time}
                      </span>

                    </div>


                    <div
                      className={
                        message.type === "ai"
                          ? "ai-message-bubble"
                          : "ai-message-bubble user"
                      }
                    >
                      {message.text}
                    </div>

                  </div>

                </div>

              )
            )}


            {isThinking && (

              <div className="ai-message-row">

                <div className="ai-message-avatar">
                  <Bot size={14} />
                </div>

                <div className="ai-message-content">

                  <div className="ai-message-meta">

                    <strong>
                      MOTORA AI
                    </strong>

                    <span>
                      thinking...
                    </span>

                  </div>

                  <div className="ai-thinking">

                    <span />
                    <span />
                    <span />

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* QUICK ACTIONS */}

          <div className="ai-quick-actions">

            <span>
              QUICK ACTIONS
            </span>

            <div>

              {quickActions.map(
                (action) => (

                  <button
                    key={action}
                    onClick={() =>
                      sendMessage(action)
                    }
                  >
                    {action}
                  </button>

                )
              )}

            </div>

          </div>


          {/* INPUT */}

          <div className="ai-input-area">

            <input
              type="text"
              placeholder="Ask MOTORA AI anything..."
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }
              onKeyDown={(e) => {
                if (
                  e.key === "Enter"
                ) {
                  sendMessage(input);
                }
              }}
            />

            <button
              onClick={() =>
                sendMessage(input)
              }
              disabled={
                !input.trim() ||
                isThinking
              }
            >
              <Send size={16} />
            </button>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <aside className="ai-side-panel">


          {/* PRIORITIES */}

          <div className="ai-side-card">

            <div className="ai-side-card-header">

              <div>

                <span>
                  AI RECOMMENDATIONS
                </span>

                <h3>
                  Today's priorities
                </h3>

              </div>

              <Activity size={16} />

            </div>


            <div className="ai-priority-list">

              <div className="ai-priority">

                <div className="priority-number">
                  01
                </div>

                <div>

                  <strong>
                    Follow up Rahul Sharma
                  </strong>

                  <span>
                    BMW X5 · ₹85L opportunity
                  </span>

                </div>

                <ArrowUpRight size={14} />

              </div>


              <div className="ai-priority">

                <div className="priority-number">
                  02
                </div>

                <div>

                  <strong>
                    Confirm Porsche test drive
                  </strong>

                  <span>
                    Appointment at 03:30 PM
                  </span>

                </div>

                <ArrowUpRight size={14} />

              </div>


              <div className="ai-priority">

                <div className="priority-number">
                  03
                </div>

                <div>

                  <strong>
                    Review new sell request
                  </strong>

                  <span>
                    BMW 3 Series · New request
                  </span>

                </div>

                <ArrowUpRight size={14} />

              </div>

            </div>

          </div>


          {/* ACTIVITY */}

          <div className="ai-side-card">

            <div className="ai-side-card-header">

              <div>

                <span>
                  LIVE ACTIVITY
                </span>

                <h3>
                  AI activity
                </h3>

              </div>

              <Clock3 size={16} />

            </div>


            <div className="ai-activity-list">

              <div className="ai-activity">

                <div className="activity-icon">
                  <MessageSquare size={13} />
                </div>

                <div>

                  <strong>
                    Lead analyzed
                  </strong>

                  <span>
                    Rahul Sharma
                  </span>

                </div>

                <small>
                  2m
                </small>

              </div>


              <div className="ai-activity">

                <div className="activity-icon">
                  <Phone size={13} />
                </div>

                <div>

                  <strong>
                    Call recommendation
                  </strong>

                  <span>
                    Aman Verma
                  </span>

                </div>

                <small>
                  8m
                </small>

              </div>


              <div className="ai-activity">

                <div className="activity-icon">
                  <CheckCircle2 size={13} />
                </div>

                <div>

                  <strong>
                    Appointment confirmed
                  </strong>

                  <span>
                    Mercedes-Benz GLE
                  </span>

                </div>

                <small>
                  14m
                </small>

              </div>

            </div>

          </div>


          {/* AI CAPABILITIES */}

          <div className="ai-capabilities">

            <span>
              AI CAPABILITIES
            </span>

            <div>

              <span>
                Lead scoring
              </span>

              <span>
                Customer insights
              </span>

              <span>
                Inventory analysis
              </span>

              <span>
                Appointment intelligence
              </span>

              <span>
                Sales recommendations
              </span>

            </div>

          </div>

        </aside>

      </section>

    </div>
  );
};

export default AIAssistant;