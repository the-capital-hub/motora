import { useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import "./Contact.css";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2200&q=90";

const CONTACT_IMAGE =
  "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=90";

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

    alert("Thank you! Your message has been received.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const goTo = (path) => {
    window.location.href = path;
  };

  return (
    <div className="contact-page">

      {/* HERO */}

      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className="contact-hero-overlay" />

        <div className="contact-hero-inner">
          <div className="contact-hero-copy">
            

            <h1>
              Let's talk
              <br />
              <strong>cars.</strong>
            </h1>

            <p>
              Whether you are looking for your next car,
              need some help or simply want to know more
              about Motora, we are here.
            </p>

            <div className="contact-hero-actions">
              <button onClick={() => goTo("/cars")}>
                Explore cars
                <ArrowUpRight size={16} />
              </button>

              <button
                className="contact-outline-button"
                onClick={() => goTo("/showroom")}
              >
                Visit showroom
              </button>
            </div>
          </div>

          <div className="contact-hero-mark">
            <MessageCircle size={30} strokeWidth={1.2} />

            <span>
              WE ARE
              <br />
              LISTENING
            </span>
          </div>
        </div>

        <div className="contact-hero-bottom">
          <span>PERSONAL SERVICE</span>
          <span>PREMIUM CARS</span>
          <span>REAL PEOPLE</span>
        </div>
      </section>


      {/* CONTACT INFO */}

      <section className="contact-info-section">
        <div className="contact-section-label">
          GET IN TOUCH
        </div>

        <div className="contact-info-heading">
          <h2>
            We are never
            <br />
            <strong>too far away.</strong>
          </h2>

          <p>
            Have a question about a car, a test drive,
            selling your vehicle or our showroom experience?
            Choose the easiest way to reach us.
          </p>
        </div>

        <div className="contact-info-grid">

          <a
            href="tel:+911800123456"
            className="contact-info-card"
          >
            <div className="contact-info-top">
              <div className="contact-info-icon">
                <Phone size={19} />
              </div>

              <ArrowUpRight size={17} />
            </div>

            <span>CALL US</span>

            <strong>
              +91 1800 123 456
            </strong>

            <p>
              Monday to Saturday
              <br />
              9:00 AM to 7:00 PM
            </p>
          </a>


          <a
            href="mailto:hello@motora.com"
            className="contact-info-card"
          >
            <div className="contact-info-top">
              <div className="contact-info-icon">
                <Mail size={19} />
              </div>

              <ArrowUpRight size={17} />
            </div>

            <span>EMAIL US</span>

            <strong>
              hello@motora.com
            </strong>

            <p>
              We usually reply
              <br />
              within 24 hours.
            </p>
          </a>


          <div className="contact-info-card">
            <div className="contact-info-top">
              <div className="contact-info-icon">
                <MapPin size={19} />
              </div>

              <ArrowUpRight size={17} />
            </div>

            <span>VISIT US</span>

            <strong>
              Experience Centres
            </strong>

            <p>
              Explore our premium
              <br />
              showroom locations.
            </p>

            <button
              onClick={() => goTo("/showroom")}
              className="contact-card-link"
            >
              Find a showroom
              <ArrowUpRight size={14} />
            </button>
          </div>

        </div>
      </section>


      {/* MESSAGE SECTION */}

      <section className="contact-form-section">

        <div className="contact-form-visual">
          <img
            src={CONTACT_IMAGE}
            alt="Premium Motora car"
          />

          <div className="contact-visual-overlay" />

          <div className="contact-visual-content">
            <span>
              THE MOTORA EXPERIENCE
            </span>

            <h2>
              Your question
              <br />
              <strong>matters.</strong>
            </h2>

            <p>
              Tell us what you need and our team
              will help you find the right direction.
            </p>
          </div>

          <div className="contact-visual-number">
            01
          </div>
        </div>


        <div className="contact-form-wrapper">
          <span className="contact-form-label">
            SEND US A MESSAGE
          </span>

          <h2>
            Tell us
            <br />
            <strong>what is on your mind.</strong>
          </h2>

          <p className="contact-form-intro">
            Fill in your details and our team will
            get back to you shortly.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-row">

              <label>
                <span>YOUR NAME</span>

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
                <span>EMAIL ADDRESS</span>

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
              <span>PHONE NUMBER</span>

              <input
                type="tel"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>


            <label>
              <span>HOW CAN WE HELP?</span>

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
              <ArrowUpRight size={16} />
            </button>

          </form>
        </div>

      </section>


      {/* AI CONCIERGE */}

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
            <strong>AI Concierge.</strong>
          </h2>

          <p>
            Tell us what kind of car you are looking
            for and get instant guidance from Ivy.
          </p>
        </div>

        <button
          onClick={() => goTo("/ai-concierge")}
        >
          Talk to AI Concierge
          <ArrowUpRight size={15} />
        </button>

      </section>


      {/* FAQ */}

      <section className="contact-faq">

        <div className="faq-heading">
          <span>
            FREQUENTLY ASKED
          </span>

          <h2>
            Questions,
            <br />
            <strong>answered.</strong>
          </h2>

          <p>
            Everything you may want to know
            before starting your Motora journey.
          </p>
        </div>


        <div className="faq-list">

          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;

            return (
              <div
                className={`faq-item ${
                  isOpen ? "faq-open" : ""
                }`}
                key={faq.question}
              >

                <button
                  type="button"
                  onClick={() =>
                    setOpenFaq(
                      isOpen ? null : index
                    )
                  }
                >
                  <span>
                    <small>
                      0{index + 1}
                    </small>

                    {faq.question}
                  </span>

                  <ChevronDown size={17} />
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


      {/* FINAL CTA */}

      <section className="contact-cta">

        <div className="contact-cta-copy">
          <span>
            STILL LOOKING?
          </span>

          <h2>
            Maybe your
            <br />
            <strong>next car is waiting.</strong>
          </h2>
        </div>


        <div className="contact-cta-actions">

          <button
            onClick={() => goTo("/cars")}
          >
            Explore cars
            <ArrowUpRight size={15} />
          </button>

          <button
            className="secondary"
            onClick={() => goTo("/test-drive")}
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