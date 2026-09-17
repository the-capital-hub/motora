import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import gsap from "gsap";

import "./Showroom.css";

const Showroom = () => {
  const sectionRef = useRef(null);

  const [showBooking, setShowBooking] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const handleBooking = (e) => {
    e.preventDefault();

    setSubmitted(true);
  };

  const closeBooking = () => {
    setShowBooking(false);
    setSubmitted(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".showroom-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".showroom-title-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });

      gsap.from(".showroom-image-wrapper", {
        scrollTrigger: {
          trigger: ".showroom-main",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
      });

      gsap.from(".showroom-info", {
        scrollTrigger: {
          trigger: ".showroom-info",
          start: "top 80%",
        },
        x: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="showroom"
        id="showroom"
      >
        <div className="showroom-container">

          {/* HEADER */}

          <div className="showroom-header">

            <div className="showroom-heading">

              <div className="showroom-eyebrow">
                <span />
                VISIT MOTORA
              </div>

              <h2 className="showroom-title">

                <span className="showroom-title-mask">
                  <span className="showroom-title-line">
                    Come see it.
                  </span>
                </span>

                <span className="showroom-title-mask">
                  <span className="showroom-title-line showroom-title-bold">
                    Feel the difference.
                  </span>
                </span>

              </h2>

            </div>

            <p className="showroom-intro">
              Some cars need to be experienced
              in person. Visit our showroom and
              explore our collection up close.
            </p>

          </div>


          {/* MAIN */}

          <div className="showroom-main">

            {/* IMAGE */}

            <div className="showroom-image-wrapper">

              <img
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1800&q=85"
                alt="Premium automotive showroom"
                className="showroom-image"
              />

              <div className="showroom-image-overlay" />

              <div className="showroom-image-label">
                MOTORA / SHOWROOM
              </div>

              <div className="showroom-image-number">
                01
              </div>

            </div>


            {/* INFO */}

            <div className="showroom-info">

              <div className="showroom-info-top">

                <span>
                  MOTORA SHOWROOM
                </span>

                <h3>
                  New Delhi
                </h3>

                <p>
                  Experience our carefully curated
                  collection of premium automobiles
                  in an environment designed for
                  enthusiasts.
                </p>

              </div>


              {/* DETAILS */}

              <div className="showroom-details">

                <div className="showroom-detail">

                  <MapPin size={17} />

                  <div>
                    <span>LOCATION</span>

                    <strong>
                      New Delhi, India
                    </strong>
                  </div>

                </div>


                <div className="showroom-detail">

                  <Clock3 size={17} />

                  <div>
                    <span>OPENING HOURS</span>

                    <strong>
                      Mon — Sat / 10:00 — 19:00
                    </strong>
                  </div>

                </div>


                <div className="showroom-detail">

                  <Phone size={17} />

                  <div>
                    <span>CONTACT</span>

                    <strong>
                      +91 98765 43210
                    </strong>
                  </div>

                </div>

              </div>


              {/* ACTIONS */}

              <div className="showroom-actions">

                <button
                  className="showroom-primary"
                  onClick={() =>
                    setShowBooking(true)
                  }
                >
                  Book a Visit
                  <ArrowUpRight size={17} />
                </button>

                <button className="showroom-secondary">
                  Get Directions
                  <MapPin size={15} />
                </button>

              </div>

            </div>

          </div>


          {/* FOOTER */}

          <div className="showroom-footer">

            <span>
              EXPERIENCE THE COLLECTION
            </span>

            <span>
              MOTORA / NEW DELHI
            </span>

          </div>

        </div>
      </section>


      {/* =================================
          BOOKING MODAL
      ================================= */}

      {showBooking && (
        <div
          className="booking-overlay"
          onClick={closeBooking}
        >

          <div
            className="booking-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="booking-close"
              onClick={closeBooking}
            >
              <X size={18} />
            </button>


            {!submitted ? (

              <>
                <div className="booking-header">

                  <span>
                    MOTORA / APPOINTMENT
                  </span>

                  <h3>
                    Book a visit.
                  </h3>

                  <p>
                    Choose a convenient time
                    and our team will get in
                    touch with you.
                  </p>

                </div>


                <form
                  className="booking-form"
                  onSubmit={handleBooking}
                >

                  <div className="booking-field">

                    <label>
                      YOUR NAME
                    </label>

                    <input
                      type="text"
                      placeholder="Enter your name"
                      required
                    />

                  </div>


                  <div className="booking-field">

                    <label>
                      PHONE NUMBER
                    </label>

                    <input
                      type="tel"
                      placeholder="+91"
                      required
                    />

                  </div>


                  <div className="booking-grid">

                    <div className="booking-field">

                      <label>
                        DATE
                      </label>

                      <div className="booking-input-icon">

                        <input
                          type="date"
                          required
                        />

                        <CalendarDays size={15} />

                      </div>

                    </div>


                    <div className="booking-field">

                      <label>
                        TIME
                      </label>

                      <div className="booking-input-icon">

                        <input
                          type="time"
                          required
                        />

                        <Clock3 size={15} />

                      </div>

                    </div>

                  </div>


                  <button
                    type="submit"
                    className="booking-submit"
                  >
                    Confirm Visit
                    <ArrowUpRight size={17} />
                  </button>

                </form>
              </>

            ) : (

              <div className="booking-success">

                <div className="booking-success-icon">
                  ✓
                </div>

                <span>
                  REQUEST RECEIVED
                </span>

                <h3>
                  We'll see you soon.
                </h3>

                <p>
                  Our team will contact you
                  shortly to confirm your
                  showroom appointment.
                </p>

                <button
                  onClick={closeBooking}
                >
                  Done
                </button>

              </div>

            )}

          </div>

        </div>
      )}
    </>
  );
};

export default Showroom;