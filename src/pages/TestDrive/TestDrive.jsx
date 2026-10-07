import { useEffect, useMemo, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  MapPin,
  Phone,
  UserRound,
  CarFront,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./TestDrive.css";
import api from "../../api/client";


const HERO_IMAGE =
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=2200&q=90";

const SHOWROOM_IMAGE =
  "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=90";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=90";


const locations = [
  {
    id: 1,
    name: "Motora Experience Centre",
    city: "New Delhi",
    address: "Aerocity, New Delhi",
    distance: "4.2 km",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 2,
    name: "Motora Premium Studio",
    city: "Gurugram",
    address: "Golf Course Road, Gurugram",
    distance: "11.8 km",
    image:
      "https://images.unsplash.com/photo-1562141961-bbc3f0f8b8f7?auto=format&fit=crop&w=1000&q=85",
  },
  {
    id: 3,
    name: "Motora Luxury Hub",
    city: "Noida",
    address: "Sector 62, Noida",
    distance: "18.4 km",
    image:
      "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?auto=format&fit=crop&w=1000&q=85",
  },
];


const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:30 PM",
  "04:00 PM",
  "05:30 PM",
];


const TestDrive = () => {
  const [step, setStep] = useState(1);

  const [cars, setCars] = useState([]);
  const [carsLoading, setCarsLoading] = useState(true);
  const [carsError, setCarsError] = useState("");

  const [selectedCar, setSelectedCar] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState(
    locations[0]
  );

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");


  useEffect(() => {
    let mounted = true;

    const loadCars = async () => {
      try {
        setCarsLoading(true);
        setCarsError("");

        const data = await api.get(
          "/cars?status=Available&limit=50&sort=-createdAt"
        );

        const items = Array.isArray(data)
          ? data
          : data?.items || [];

        if (!mounted) return;

        const mapped = items.map((car) => ({
          ...car,
          id: car._id,
          image:
            car.images?.[0] || FALLBACK_IMAGE,
          priceLabel:
            `₹${Number(
              car.price || 0
            ).toLocaleString("en-IN")}`,
        }));

        setCars(mapped);
        setSelectedCar(mapped[0] || null);
      } catch (error) {
        if (!mounted) return;

        setCars([]);
        setSelectedCar(null);

        setCarsError(
          error?.message ||
            "Unable to load available cars."
        );
      } finally {
        if (mounted) {
          setCarsLoading(false);
        }
      }
    };

    loadCars();

    return () => {
      mounted = false;
    };
  }, []);


  const selectedDateText = useMemo(() => {
    if (!date) {
      return "Select a date";
    }

    const parsedDate = new Date(
      `${date}T00:00:00`
    );

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  }, [date]);


  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };


  const nextStep = () => {
    if (step < 4) {
      setStep((current) => current + 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  const previousStep = () => {
    if (step > 1) {
      setStep((current) => current - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };


  const canContinue = () => {
    if (step === 1) {
      return !!selectedCar;
    }

    if (step === 2) {
      return !!selectedLocation;
    }

    if (step === 3) {
      return !!date && !!time;
    }

    return (
      form.name.trim() &&
      form.phone.trim() &&
      form.email.trim()
    );
  };


  const confirmBooking = async () => {
    if (
      !canContinue() ||
      submitting ||
      !selectedCar?._id
    ) {
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError("");

      await api.post(
        "/requests/test-drives",
        {
          carId: selectedCar._id,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          location: selectedLocation.name,
          date,
          time,
        }
      );

      setBookingConfirmed(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setSubmitError(
        error?.message ||
          "Unable to submit test drive request."
      );
    } finally {
      setSubmitting(false);
    }
  };


  const resetBooking = () => {
    setStep(1);
    setSelectedCar(cars[0] || null);
    setSelectedLocation(locations[0]);
    setDate("");
    setTime("");

    setForm({
      name: "",
      phone: "",
      email: "",
    });

    setBookingConfirmed(false);
    setSubmitError("");
  };


  if (bookingConfirmed) {
    return (
      <div className="test-drive-page">

        <section className="booking-success">

          <div className="success-image">
            <img
              src={
                selectedCar?.image ||
                HERO_IMAGE
              }
              alt={
                selectedCar?.model ||
                "Motora test drive"
              }
            />

            <div className="success-image-overlay" />
          </div>


          <div className="success-content">

            <div className="success-icon">
              <Check size={24} />
            </div>

            <span className="success-eyebrow">
              APPOINTMENT REQUESTED
            </span>

            <h1>
              Your drive is
              <strong> all set.</strong>
            </h1>

            <p>
              Your test drive request has been
              received. A Motora specialist will
              contact you shortly to confirm the
              appointment.
            </p>


            <div className="booking-summary">

              <div className="summary-car">

                <img
                  src={selectedCar?.image}
                  alt={
                    selectedCar?.model ||
                    "Selected car"
                  }
                />

                <div>
                  <span>
                    {selectedCar?.brand}
                  </span>

                  <h3>
                    {selectedCar?.model}
                  </h3>

                  <small>
                    {selectedCar?.variant ||
                      "Premium vehicle"}
                  </small>
                </div>

              </div>


              <div className="summary-line">

                <CalendarDays size={15} />

                <div>
                  <span>DATE</span>

                  <strong>
                    {selectedDateText}
                  </strong>
                </div>

              </div>


              <div className="summary-line">

                <Clock3 size={15} />

                <div>
                  <span>TIME</span>

                  <strong>
                    {time}
                  </strong>
                </div>

              </div>


              <div className="summary-line">

                <MapPin size={15} />

                <div>
                  <span>LOCATION</span>

                  <strong>
                    {selectedLocation.name}
                  </strong>

                  <small>
                    {selectedLocation.address}
                  </small>
                </div>

              </div>

            </div>


            <button
              className="new-booking-button"
              onClick={resetBooking}
            >
              Book another test drive
              <ArrowRight size={15} />
            </button>

          </div>

        </section>

      </div>
    );
  }


  return (
    <div className="test-drive-page">

      {/* HERO */}

      <section className="test-drive-hero">

        <img
          className="test-drive-hero-image"
          src={HERO_IMAGE}
          alt="Premium Motora vehicle"
        />

        <div className="test-drive-hero-overlay" />

        <div className="test-drive-hero-content">

          <div className="hero-eyebrow">
            <Sparkles size={14} />
            MOTORA EXPERIENCE
          </div>

          <h1>
            Drive it.
            <strong> Feel it.</strong>
          </h1>

          <p>
            Book a private test drive at a
            Motora experience centre. Take
            your time, ask questions and
            experience the car properly.
          </p>

          <div className="hero-trust-row">

            <div>
              <ShieldCheck size={15} />
              Verified vehicles
            </div>

            <div>
              <Clock3 size={15} />
              Private experience
            </div>

            <div>
              <MapPin size={15} />
              Premium locations
            </div>

          </div>

        </div>


        <div className="hero-drive-mark">
          <CarFront size={34} />
          <span>TEST DRIVE</span>
        </div>

      </section>


      {/* BOOKING */}

      <section className="booking-section">

        <div className="booking-header">

          <div>
            <span>TEST DRIVE</span>

            <h2>
              Book your experience.
            </h2>
          </div>

          <div className="booking-step-count">
            <strong>
              {String(step).padStart(2, "0")}
            </strong>

            <span>
              / 04
            </span>
          </div>

        </div>


        {/* PROGRESS */}

        <div className="booking-progress">

          {[1, 2, 3, 4].map((item) => (

            <div
              className={
                step >= item
                  ? "progress-step active"
                  : "progress-step"
              }
              key={item}
            >

              <div className="progress-number">

                {step > item ? (
                  <Check size={11} />
                ) : (
                  item
                )}

              </div>

              <span>
                {item === 1 && "Car"}
                {item === 2 && "Location"}
                {item === 3 && "Date and Time"}
                {item === 4 && "Details"}
              </span>

            </div>

          ))}

        </div>


        {/* STEP 1 */}

        {step === 1 && (

          <div className="booking-step-content">

            <div className="step-intro">

              <span>
                STEP 01
              </span>

              <h3>
                Which car would
                <br />
                you like to drive?
              </h3>

              <p>
                Choose the car you'd like to
                experience in person.
              </p>

            </div>


            {carsLoading ? (

              <div className="booking-inline-message">
                Loading available cars...
              </div>

            ) : carsError ? (

              <div className="booking-inline-message error">
                {carsError}
              </div>

            ) : cars.length === 0 ? (

              <div className="booking-inline-message">
                No available cars found right now.
              </div>

            ) : (

              <div className="drive-car-grid">

                {cars.map((car) => (

                  <button
                    type="button"
                    className={
                      selectedCar?.id === car.id
                        ? "drive-car selected"
                        : "drive-car"
                    }
                    key={car.id}
                    onClick={() =>
                      setSelectedCar(car)
                    }
                  >

                    <div className="drive-car-image">

                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.model}`}
                      />

                      <div className="drive-car-gradient" />

                      {selectedCar?.id === car.id && (
                        <div className="selected-check">
                          <Check size={13} />
                        </div>
                      )}

                      <div className="drive-car-badge">
                        <ShieldCheck size={12} />
                        Available
                      </div>

                    </div>


                    <div className="drive-car-info">

                      <span>
                        {car.brand}
                      </span>

                      <h4>
                        {car.model}
                      </h4>

                      <small>
                        {car.variant ||
                          "Premium vehicle"}
                      </small>

                      <strong>
                        {car.priceLabel ||
                          `₹${Number(
                            car.price || 0
                          ).toLocaleString(
                            "en-IN"
                          )}`}
                      </strong>

                    </div>

                  </button>

                ))}

              </div>

            )}

          </div>

        )}


        {/* STEP 2 */}

        {step === 2 && (

          <div className="booking-step-content">

            <div className="step-intro">

              <span>
                STEP 02
              </span>

              <h3>
                Choose your
                <br />
                experience centre.
              </h3>

              <p>
                Select the location that's most
                convenient for you.
              </p>

            </div>


            <div className="location-list">

              {locations.map((location) => (

                <button
                  type="button"
                  className={
                    selectedLocation.id ===
                    location.id
                      ? "location-card selected"
                      : "location-card"
                  }
                  key={location.id}
                  onClick={() =>
                    setSelectedLocation(location)
                  }
                >

                  <div className="location-image">

                    <img
                      src={location.image}
                      alt={location.name}
                    />

                    <div className="location-image-overlay" />

                    <div className="location-icon">
                      <MapPin size={17} />
                    </div>

                  </div>


                  <div className="location-info">

                    <span>
                      {location.city}
                    </span>

                    <h4>
                      {location.name}
                    </h4>

                    <p>
                      {location.address}
                    </p>

                  </div>


                  <div className="location-distance">

                    <strong>
                      {location.distance}
                    </strong>

                    {selectedLocation.id ===
                      location.id && (
                      <Check size={14} />
                    )}

                  </div>

                </button>

              ))}

            </div>

          </div>

        )}


        {/* STEP 3 */}

        {step === 3 && (

          <div className="booking-step-content">

            <div className="step-intro">

              <span>
                STEP 03
              </span>

              <h3>
                When would you
                <br />
                like to come?
              </h3>

              <p>
                Pick a date and a time that works
                best for you.
              </p>

            </div>


            <div className="date-time-area">

              <div className="date-picker">

                <label>
                  <CalendarDays size={14} />
                  SELECT DATE
                </label>

                <div className="date-input">

                  <input
                    type="date"
                    value={date}
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    onChange={(event) =>
                      setDate(
                        event.target.value
                      )
                    }
                  />

                  <ChevronDown size={14} />

                </div>

                <p>
                  {selectedDateText}
                </p>

              </div>


              <div className="time-picker">

                <label>
                  <Clock3 size={14} />
                  SELECT TIME
                </label>

                <div className="time-grid">

                  {timeSlots.map((slot) => (

                    <button
                      type="button"
                      className={
                        time === slot
                          ? "selected"
                          : ""
                      }
                      key={slot}
                      onClick={() =>
                        setTime(slot)
                      }
                    >
                      {slot}
                    </button>

                  ))}

                </div>

              </div>

            </div>

          </div>

        )}


        {/* STEP 4 */}

        {step === 4 && (

          <div className="booking-step-content">

            <div className="step-intro">

              <span>
                STEP 04
              </span>

              <h3>
                Almost there.
                <br />
                Tell us about you.
              </h3>

              <p>
                We'll use these details to confirm
                your appointment.
              </p>

            </div>


            <div className="details-area">

              <div className="input-field">

                <label>
                  <UserRound size={13} />
                  FULL NAME
                </label>

                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) =>
                    updateForm(
                      "name",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="input-field">

                <label>
                  <Phone size={13} />
                  PHONE NUMBER
                </label>

                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(event) =>
                    updateForm(
                      "phone",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="input-field">

                <label>
                  EMAIL ADDRESS
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(event) =>
                    updateForm(
                      "email",
                      event.target.value
                    )
                  }
                />

              </div>


              <div className="appointment-summary">

                <span>
                  YOUR APPOINTMENT
                </span>

                <div>

                  <strong>
                    {selectedCar?.brand}{" "}
                    {selectedCar?.model}
                  </strong>

                  <small>
                    {selectedDateText} · {time}
                  </small>

                  <small>
                    {selectedLocation.name}
                  </small>

                </div>

              </div>

            </div>

          </div>

        )}


        {submitError && (

          <div className="booking-inline-message error">
            {submitError}
          </div>

        )}


        {/* NAVIGATION */}

        <div className="booking-navigation">

          {step > 1 ? (

            <button
              type="button"
              className="back-button"
              onClick={previousStep}
            >
              <ArrowLeft size={14} />
              Back
            </button>

          ) : (

            <div />

          )}


          {step < 4 ? (

            <button
              type="button"
              className={
                canContinue()
                  ? "continue-button"
                  : "continue-button disabled"
              }
              disabled={!canContinue()}
              onClick={nextStep}
            >
              Continue
              <ArrowRight size={14} />
            </button>

          ) : (

            <button
              type="button"
              className={
                canContinue()
                  ? "continue-button"
                  : "continue-button disabled"
              }
              disabled={!canContinue()}
              onClick={confirmBooking}
            >
              {submitting
                ? "Submitting..."
                : "Confirm test drive"}

              {!submitting && (
                <Check size={14} />
              )}

            </button>

          )}

        </div>

      </section>


      {/* TRUST */}

      <section className="drive-trust">

        <div>

          <Check size={15} />

          <span>
            NO PRESSURE
          </span>

          <p>
            Take your time. There's never an
            obligation to buy.
          </p>

        </div>


        <div>

          <Clock3 size={15} />

          <span>
            45 MINUTES
          </span>

          <p>
            Enough time to properly experience
            the vehicle.
          </p>

        </div>


        <div>

          <MapPin size={15} />

          <span>
            PREMIUM LOCATIONS
          </span>

          <p>
            Comfortable, private experience
            centres.
          </p>

        </div>

      </section>

    </div>
  );
};


export default TestDrive;