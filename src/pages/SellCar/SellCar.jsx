import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ImagePlus,
  MapPin,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";

import "./SellCar.css";

const initialForm = {
  make: "",
  model: "",
  variant: "",
  year: "",
  kilometers: "",
  fuel: "",
  transmission: "",
  condition: "",
  expectedPrice: "",
  city: "",
  name: "",
  phone: "",
  email: "",
};

const steps = [
  "Vehicle",
  "Condition",
  "Photos",
  "Your Details",
];

const SellCar = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [photos, setPhotos] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePhotoUpload = (event) => {
    const files = Array.from(event.target.files || []);

    setPhotos((current) => [
      ...current,
      ...files.map((file) => ({
        name: file.name,
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const removePhoto = (index) => {
    setPhotos((current) =>
      current.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep((current) => current + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const previousStep = () => {
    if (step > 0) {
      setStep((current) => current - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="sell-car-page sell-success-page">

        <div className="sell-success-card">

          <div className="sell-success-icon">
            <CheckCircle2 size={28} />
          </div>

          <span className="sell-eyebrow">
            REQUEST RECEIVED
          </span>

          <h1>
            Your car is now
            <br />
            on our radar.
          </h1>

          <p>
            Thanks, {form.name || "there"}. Our Motora
            specialist will review your details and
            contact you shortly.
          </p>

          <div className="sell-success-details">

            <div>
              <span>VEHICLE</span>
              <strong>
                {form.make || "Your car"}{" "}
                {form.model}
              </strong>
            </div>

            <div>
              <span>LOCATION</span>
              <strong>
                {form.city || "Not provided"}
              </strong>
            </div>

          </div>

          <button
            className="sell-success-button"
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setForm(initialForm);
              setPhotos([]);
            }}
          >
            Sell another car
            <ArrowRight size={15} />
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="sell-car-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="sell-car-hero">

        <div className="sell-hero-content">

          <span className="sell-eyebrow">
            SELL WITH MOTORA
          </span>

          <h1>
            Your car.
            <br />
            <strong>Our network.</strong>
          </h1>

          <p>
            Get a fair valuation, reach serious
            buyers and sell your car with a
            premium experience from start to finish.
          </p>

        </div>

        <div className="sell-hero-trust">

          <div className="sell-trust-item">
            <ShieldCheck size={17} />
            <span>
              Verified buyers
            </span>
          </div>

          <div className="sell-trust-item">
            <Sparkles size={17} />
            <span>
              Expert valuation
            </span>
          </div>

          <div className="sell-trust-item">
            <MapPin size={17} />
            <span>
              Pan-India network
            </span>
          </div>

        </div>

      </section>


      {/* =================================
          PROCESS
      ================================= */}

      <section className="sell-process">

        <div className="sell-process-heading">

          <span>
            SIMPLE PROCESS
          </span>

          <h2>
            Sell without
            <br />
            the usual hassle.
          </h2>

        </div>

        <div className="sell-process-grid">

          <div>
            <span>01</span>
            <h3>Tell us about it.</h3>
            <p>
              Share the basic details of your
              vehicle in a few minutes.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>We assess it.</h3>
            <p>
              Our specialists review the car,
              condition and market value.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Meet serious buyers.</h3>
            <p>
              We connect your vehicle with
              relevant buyers from our network.
            </p>
          </div>

        </div>

      </section>


      {/* =================================
          FORM
      ================================= */}

      <section className="sell-form-section">

        <div className="sell-form-header">

          <div>
            <span>
              START YOUR REQUEST
            </span>

            <h2>
              Tell us about
              <br />
              your car.
            </h2>
          </div>

          <div className="sell-step-counter">
            <strong>
              {String(step + 1).padStart(2, "0")}
            </strong>

            <span>
              / {String(steps.length).padStart(2, "0")}
            </span>
          </div>

        </div>


        {/* STEPPER */}

        <div className="sell-stepper">

          {steps.map((item, index) => (
            <div
              className={
                index <= step
                  ? "sell-step active"
                  : "sell-step"
              }
              key={item}
            >
              <div className="sell-step-number">
                {index < step ? (
                  <Check size={12} />
                ) : (
                  index + 1
                )}
              </div>

              <span>{item}</span>
            </div>
          ))}

        </div>


        <form
          className="sell-form"
          onSubmit={handleSubmit}
        >

          {/* =================================
              STEP 1
          ================================= */}

          {step === 0 && (
            <div className="sell-form-step">

              <div className="sell-form-step-heading">
                <span>01 / VEHICLE</span>
                <h3>
                  What are you selling?
                </h3>
              </div>

              <div className="sell-field-grid">

                <div className="sell-field">
                  <label>MAKE</label>

                  <input
                    value={form.make}
                    onChange={(e) =>
                      updateForm(
                        "make",
                        e.target.value
                      )
                    }
                    placeholder="e.g. BMW"
                  />
                </div>

                <div className="sell-field">
                  <label>MODEL</label>

                  <input
                    value={form.model}
                    onChange={(e) =>
                      updateForm(
                        "model",
                        e.target.value
                      )
                    }
                    placeholder="e.g. X5"
                  />
                </div>

                <div className="sell-field">
                  <label>VARIANT</label>

                  <input
                    value={form.variant}
                    onChange={(e) =>
                      updateForm(
                        "variant",
                        e.target.value
                      )
                    }
                    placeholder="e.g. xDrive40i"
                  />
                </div>

                <div className="sell-field">
                  <label>YEAR</label>

                  <input
                    type="number"
                    value={form.year}
                    onChange={(e) =>
                      updateForm(
                        "year",
                        e.target.value
                      )
                    }
                    placeholder="2022"
                  />
                </div>

                <div className="sell-field">
                  <label>KILOMETRES</label>

                  <input
                    type="number"
                    value={form.kilometers}
                    onChange={(e) =>
                      updateForm(
                        "kilometers",
                        e.target.value
                      )
                    }
                    placeholder="e.g. 32000"
                  />
                </div>

                <div className="sell-field">
                  <label>FUEL</label>

                  <select
                    value={form.fuel}
                    onChange={(e) =>
                      updateForm(
                        "fuel",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select fuel
                    </option>
                    <option value="Petrol">
                      Petrol
                    </option>
                    <option value="Diesel">
                      Diesel
                    </option>
                    <option value="Hybrid">
                      Hybrid
                    </option>
                    <option value="Electric">
                      Electric
                    </option>
                  </select>
                </div>

                <div className="sell-field">
                  <label>TRANSMISSION</label>

                  <select
                    value={form.transmission}
                    onChange={(e) =>
                      updateForm(
                        "transmission",
                        e.target.value
                      )
                    }
                  >
                    <option value="">
                      Select transmission
                    </option>
                    <option value="Automatic">
                      Automatic
                    </option>
                    <option value="Manual">
                      Manual
                    </option>
                  </select>
                </div>

              </div>

            </div>
          )}


          {/* =================================
              STEP 2
          ================================= */}

          {step === 1 && (
            <div className="sell-form-step">

              <div className="sell-form-step-heading">
                <span>02 / CONDITION</span>

                <h3>
                  How would you describe
                  <br />
                  your car?
                </h3>
              </div>

              <div className="condition-grid">

                {[
                  {
                    title: "Excellent",
                    text: "Almost showroom condition",
                  },
                  {
                    title: "Very Good",
                    text: "Well maintained with minor wear",
                  },
                  {
                    title: "Good",
                    text: "Normal signs of ownership",
                  },
                  {
                    title: "Needs Attention",
                    text: "Some repairs or work required",
                  },
                ].map((item) => (
                  <button
                    type="button"
                    key={item.title}
                    className={
                      form.condition === item.title
                        ? "condition-card active"
                        : "condition-card"
                    }
                    onClick={() =>
                      updateForm(
                        "condition",
                        item.title
                      )
                    }
                  >
                    <span>
                      {item.title}
                    </span>

                    <p>
                      {item.text}
                    </p>

                    {form.condition ===
                      item.title && (
                      <Check size={15} />
                    )}
                  </button>
                ))}

              </div>

              <div className="sell-price-field">

                <label>
                  EXPECTED PRICE
                </label>

                <div className="price-input">

                  <span>₹</span>

                  <input
                    type="number"
                    value={form.expectedPrice}
                    onChange={(e) =>
                      updateForm(
                        "expectedPrice",
                        e.target.value
                      )
                    }
                    placeholder="What would you like to receive?"
                  />

                </div>

                <small>
                  Don't worry if you're unsure.
                  Our team will help you understand
                  the market value.
                </small>

              </div>

            </div>
          )}


          {/* =================================
              STEP 3
          ================================= */}

          {step === 2 && (
            <div className="sell-form-step">

              <div className="sell-form-step-heading">
                <span>03 / PHOTOS</span>

                <h3>
                  Show us the car.
                </h3>

                <p>
                  Upload clear photos from different
                  angles. Better photos help us assess
                  your car faster.
                </p>
              </div>


              <label className="photo-upload-box">

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                />

                <div className="photo-upload-icon">
                  <ImagePlus size={21} />
                </div>

                <strong>
                  Upload vehicle photos
                </strong>

                <span>
                  JPG, PNG · Multiple photos allowed
                </span>

                <div className="photo-upload-button">
                  <Upload size={13} />
                  Choose files
                </div>

              </label>


              {photos.length > 0 && (
                <div className="uploaded-photos">

                  {photos.map((photo, index) => (
                    <div
                      className="uploaded-photo"
                      key={`${photo.name}-${index}`}
                    >

                      <img
                        src={photo.url}
                        alt={photo.name}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removePhoto(index)
                        }
                      >
                        ×
                      </button>

                    </div>
                  ))}

                </div>
              )}

            </div>
          )}


          {/* =================================
              STEP 4
          ================================= */}

          {step === 3 && (
            <div className="sell-form-step">

              <div className="sell-form-step-heading">
                <span>04 / YOUR DETAILS</span>

                <h3>
                  Where can we reach you?
                </h3>
              </div>

              <div className="sell-field-grid">

                <div className="sell-field">
                  <label>FULL NAME</label>

                  <input
                    value={form.name}
                    onChange={(e) =>
                      updateForm(
                        "name",
                        e.target.value
                      )
                    }
                    placeholder="Your name"
                  />
                </div>

                <div className="sell-field">
                  <label>PHONE NUMBER</label>

                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      updateForm(
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="+91"
                  />
                </div>

                <div className="sell-field">
                  <label>EMAIL</label>

                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      updateForm(
                        "email",
                        e.target.value
                      )
                    }
                    placeholder="you@example.com"
                  />
                </div>

                <div className="sell-field">
                  <label>CITY</label>

                  <input
                    value={form.city}
                    onChange={(e) =>
                      updateForm(
                        "city",
                        e.target.value
                      )
                    }
                    placeholder="e.g. Delhi"
                  />
                </div>

              </div>


              {/* REVIEW */}

              <div className="sell-review">

                <span>
                  QUICK REVIEW
                </span>

                <div className="sell-review-grid">

                  <div>
                    <small>VEHICLE</small>
                    <strong>
                      {form.make || "—"}{" "}
                      {form.model || ""}
                    </strong>
                  </div>

                  <div>
                    <small>YEAR</small>
                    <strong>
                      {form.year || "—"}
                    </strong>
                  </div>

                  <div>
                    <small>CONDITION</small>
                    <strong>
                      {form.condition || "—"}
                    </strong>
                  </div>

                  <div>
                    <small>PHOTOS</small>
                    <strong>
                      {photos.length}
                    </strong>
                  </div>

                </div>

              </div>

            </div>
          )}


          {/* =================================
              NAVIGATION
          ================================= */}

          <div className="sell-form-actions">

            {step > 0 ? (
              <button
                type="button"
                className="sell-back-button"
                onClick={previousStep}
              >
                <ArrowLeft size={14} />
                Back
              </button>
            ) : (
              <span />
            )}

            {step < steps.length - 1 ? (
              <button
                type="button"
                className="sell-next-button"
                onClick={nextStep}
              >
                Continue
                <ArrowRight size={14} />
              </button>
            ) : (
              <button
                type="submit"
                className="sell-next-button"
              >
                Submit Request
                <CheckCircle2 size={15} />
              </button>
            )}

          </div>

        </form>

      </section>

    </div>
  );
};

export default SellCar;