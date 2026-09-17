import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";

import "./Contact.css";

const faqs = [
  {
    question: "How do I book a test drive?",
    answer:
      "Choose a car from our Cars section and select the test drive option. You can choose a convenient date and time.",
  },
  {
    question: "Can I sell my car through Motora?",
    answer:
      "Yes. Use our Sell Your Car experience to share your vehicle details and receive the next steps from our team.",
  },
  {
    question: "Can I visit a Motora showroom?",
    answer:
      "Absolutely. You can explore our showroom locations and choose the experience centre closest to you.",
  },
  {
    question: "Can AI Concierge help me find a car?",
    answer:
      "Yes. AI Concierge can understand your requirements and help you shortlist cars based on your preferences.",
  },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    alert(
      "Thank you! Your message has been received."
    );

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <span>
            CONTACT MOTORA
          </span>

          <h1>
            Let's talk
            <br />
            <strong>cars.</strong>
          </h1>

          <p>
            Whether you're looking for your next
            car, need some help or simply want to
            know more about Motora, we're here.
          </p>

        </div>

        <div className="contact-hero-mark">

          <MessageCircle
            size={30}
            strokeWidth={1}
          />

          <span>
            WE'RE
            <br />
            LISTENING
          </span>

        </div>

      </section>


      {/* =================================
          CONTACT INFO
      ================================= */}

      <section className="contact-info-section">

        <div className="contact-info-heading">

          <span>
            GET IN TOUCH
          </span>

          <h2>
            We're never
            <br />
            too far away.
          </h2>

        </div>


        <div className="contact-info-grid">

          <a
            href="tel:+911800123456"
            className="contact-info-card"
          >

            <div className="contact-info-icon">
              <Phone size={19} />
            </div>

            <span>
              CALL US
            </span>

            <strong>
              +91 1800 123 456
            </strong>

            <p>
              Mon – Sat · 9:00 AM – 7:00 PM
            </p>

            <ArrowUpRight size={16} />

          </a>


          <a
            href="mailto:hello@motora.com"
            className="contact-info-card"
          >

            <div className="contact-info-icon">
              <Mail size={19} />
            </div>

            <span>
              EMAIL US
            </span>

            <strong>
              hello@motora.com
            </strong>

            <p>
              We usually reply within 24 hours.
            </p>

            <ArrowUpRight size={16} />

          </a>


          <div className="contact-info-card">

            <div className="contact-info-icon">
              <MapPin size={19} />
            </div>

            <span>
              VISIT US
            </span>

            <strong>
              Experience Centres
            </strong>

            <p>
              Explore our premium showrooms.
            </p>

            <button
              onClick={() =>
                (window.location.href =
                  "/showroom")
              }
            >
              Find a showroom
              <ArrowUpRight size={14} />
            </button>

          </div>

        </div>

      </section>


      {/* =================================
          FORM + VISUAL
      ================================= */}

      <section className="contact-form-section">

        <div className="contact-form-visual">

          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85"
            alt="Premium car"
          />

          <div className="contact-visual-overlay" />

          <div className="contact-visual-content">

            <span>
              MOTORA EXPERIENCE
            </span>

            <h2>
              Have a question?
              <br />
              We're here.
            </h2>

          </div>

        </div>


        <div className="contact-form-wrapper">

          <span>
            SEND US A MESSAGE
          </span>

          <h2>
            Tell us
            <br />
            what's on your mind.
          </h2>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <label>
                <span>
                  YOUR NAME
                </span>

                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>


              <label>
                <span>
                  EMAIL ADDRESS
                </span>

                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

            </div>


            <label>
              <span>
                PHONE NUMBER
              </span>

              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>
                HOW CAN WE HELP?
              </span>

              <textarea
                name="message"
                rows="5"
                placeholder="Tell us how we can help..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>


            <button
              type="submit"
              className="contact-submit"
            >
              Send message
              <ArrowUpRight size={15} />
            </button>

          </form>

        </div>

      </section>


      {/* =================================
          AI CONCIERGE
      ================================= */}

      <section className="contact-ai">

        <div className="contact-ai-icon">
          <Sparkles size={20} />
        </div>

        <div className="contact-ai-content">

          <span>
            NEED AN INSTANT ANSWER?
          </span>

          <h2>
            Meet your
            <br />
            AI Concierge.
          </h2>

          <p>
            Tell us what kind of car you're looking
            for and get instant guidance without
            waiting for a response.
          </p>

        </div>

        <button
          onClick={() =>
            (window.location.href =
              "/ai-concierge")
          }
        >
          Talk to AI Concierge
          <ArrowUpRight size={15} />
        </button>

      </section>


      {/* =================================
          FAQ
      ================================= */}

      <section className="contact-faq">

        <div className="faq-heading">

          <span>
            FREQUENTLY ASKED
          </span>

          <h2>
            Questions,
            <br />
            answered.
          </h2>

        </div>


        <div className="faq-list">

          {faqs.map((faq, index) => {

            const isOpen =
              openFaq === index;

            return (
              <div
                className={`faq-item ${
                  isOpen ? "faq-open" : ""
                }`}
                key={faq.question}
              >

                <button
                  onClick={() =>
                    setOpenFaq(
                      isOpen ? null : index
                    )
                  }
                >

                  <span>
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={17}
                  />

                </button>

                <div className="faq-answer">

                  <p>
                    {faq.answer}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

      </section>


      {/* =================================
          FINAL CTA
      ================================= */}

      <section className="contact-cta">

        <div>

          <span>
            STILL LOOKING?
          </span>

          <h2>
            Maybe your
            <br />
            next car is waiting.
          </h2>

        </div>

        <div className="contact-cta-actions">

          <button
            onClick={() =>
              (window.location.href =
                "/cars")
            }
          >
            Explore cars
            <ArrowUpRight size={15} />
          </button>

          <button
            className="secondary"
            onClick={() =>
              (window.location.href =
                "/test-drive")
            }
          >
            Book a test drive
            <ArrowUpRight size={15} />
          </button>

        </div>

      </section>

    </div>
  );
};

export default Contact;