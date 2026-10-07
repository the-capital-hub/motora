import { useState } from "react";
import {
  ArrowUpRight,
  CarFront,
  Fuel,
  Gauge,
  MapPin,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
} from "lucide-react";

import { smartSearch } from "../../api/smartApi";
import "./SmartSearch.css";

const money = (n) =>
  `₹${Number(n || 0).toLocaleString("en-IN")}`;

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=2200&q=90";

const SIDE_IMAGE =
  "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=90";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=90";

export default function SmartSearch() {
  const [form, setForm] = useState({
    q: "",
    maxPrice: "",
    fuel: "",
    transmission: "",
    type: "",
  });

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateForm = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetFilters = () => {
    setForm({
      q: "",
      maxPrice: "",
      fuel: "",
      transmission: "",
      type: "",
    });

    setItems([]);
    setError("");
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await smartSearch(form);

      setItems(response?.items || []);
    } catch (err) {
      setError(
        err?.message ||
          "Unable to search the inventory right now."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="smart-page">

      {/* HERO */}

      <section className="smart-hero">

        <img
          src={HERO_IMAGE}
          alt="Premium luxury car"
          className="smart-hero-image"
        />

        <div className="smart-hero-overlay" />

        <div className="smart-hero-content">

          <div className="smart-eyebrow">
            <Sparkles size={15} />
            SMART SEARCH
          </div>

          <h1>
            Find a car that
            <span> fits your life.</span>
          </h1>

          <p>
            Tell Motora what you need and discover cars
            from the current inventory that match your
            preferences.
          </p>

          <div className="smart-hero-points">

            <div>
              <ShieldCheck size={16} />
              Verified inventory
            </div>

            <div>
              <CarFront size={16} />
              Premium collection
            </div>

            <div>
              <MapPin size={16} />
              Multiple cities
            </div>

          </div>

        </div>

        <div className="smart-hero-badge">
          <span>LIVE INVENTORY</span>
          <strong>Smart matching</strong>
        </div>

      </section>


      {/* SEARCH AREA */}

      <section className="smart-search-section">

        <div className="smart-section-heading">

          <div>
            <span>SEARCH INVENTORY</span>

            <h2>
              Your next car starts here.
            </h2>

            <p>
              Use natural preferences or refine your
              search with practical filters.
            </p>
          </div>

          <button
            type="button"
            className="smart-reset"
            onClick={resetFilters}
          >
            <RotateCcw size={15} />
            Reset filters
          </button>

        </div>


        <form
          className="smart-form"
          onSubmit={submit}
        >

          <div className="smart-search-box">

            <Search size={19} />

            <input
              value={form.q}
              onChange={(e) =>
                updateForm("q", e.target.value)
              }
              placeholder="Try BMW SUV, family car, luxury sedan..."
            />

          </div>


          <div className="smart-filter-label">
            <SlidersHorizontal size={16} />
            Refine your search
          </div>


          <div className="smart-fields">

            <div className="smart-field">

              <label>Maximum price</label>

              <input
                value={form.maxPrice}
                onChange={(e) =>
                  updateForm(
                    "maxPrice",
                    e.target.value
                  )
                }
                placeholder="Example 6000000"
                type="number"
              />

            </div>


            <div className="smart-field">

              <label>Body type</label>

              <select
                value={form.type}
                onChange={(e) =>
                  updateForm(
                    "type",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Any body type
                </option>

                <option value="SUV">
                  SUV
                </option>

                <option value="Sedan">
                  Sedan
                </option>

                <option value="Hatchback">
                  Hatchback
                </option>

                <option value="MUV">
                  MUV
                </option>

                <option value="Coupe">
                  Coupe
                </option>

                <option value="Convertible">
                  Convertible
                </option>
              </select>

            </div>


            <div className="smart-field">

              <label>Fuel</label>

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
                  Any fuel
                </option>

                <option value="Petrol">
                  Petrol
                </option>

                <option value="Diesel">
                  Diesel
                </option>

                <option value="Electric">
                  Electric
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>
              </select>

            </div>


            <div className="smart-field">

              <label>Transmission</label>

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
                  Any transmission
                </option>

                <option value="Automatic">
                  Automatic
                </option>

                <option value="Manual">
                  Manual
                </option>
              </select>

            </div>


            <button
              type="submit"
              className="smart-submit"
              disabled={loading}
            >
              <Search size={17} />

              {loading
                ? "Searching..."
                : "Find Cars"}

              <ArrowUpRight size={16} />
            </button>

          </div>

        </form>

      </section>


      {/* CONTENT */}

      <section className="smart-content">

        <div className="smart-results-column">

          <div className="smart-results-header">

            <div>
              <span>MATCHED VEHICLES</span>

              <h2>
                {items.length
                  ? `${items.length} cars found`
                  : "Explore the collection"}
              </h2>
            </div>

            {items.length > 0 && (
              <div className="smart-result-count">
                {items.length} results
              </div>
            )}

          </div>


          {error && (
            <div className="smart-error">
              <strong>
                Search unavailable
              </strong>

              <span>
                {error}
              </span>
            </div>
          )}


          {loading && (
            <div className="smart-loading-grid">

              {Array.from({ length: 4 }).map(
                (_, index) => (
                  <div
                    className="smart-skeleton"
                    key={index}
                  >
                    <div className="skeleton-image" />

                    <div className="skeleton-content">
                      <div />
                      <div />
                      <div />
                    </div>
                  </div>
                )
              )}

            </div>
          )}


          {!loading && items.length > 0 && (
            <div className="smart-results">

              {items.map((car) => {

                const image =
                  car.images?.[0] ||
                  FALLBACK_IMAGE;

                return (
                  <article
                    className="smart-card"
                    key={car._id}
                  >

                    <div className="smart-card-image">

                      <img
                        src={image}
                        alt={`${car.brand} ${car.model}`}
                        loading="lazy"
                      />

                      <div className="smart-card-image-overlay" />

                      <div className="smart-verified">
                        <ShieldCheck size={13} />
                        Verified
                      </div>

                      <button
                        type="button"
                        className="smart-card-arrow"
                        aria-label="View car"
                      >
                        <ArrowUpRight size={17} />
                      </button>

                    </div>


                    <div className="smart-card-content">

                      <div className="smart-card-top">

                        <span>
                          {car.year || "Latest"}
                        </span>

                        <span>
                          {car.type || "Premium"}
                        </span>

                      </div>


                      <h3>
                        {car.brand} {car.model}
                      </h3>


                      <div className="smart-card-specs">

                        <div>
                          <Fuel size={14} />
                          <span>
                            {car.fuel ||
                              "Not available"}
                          </span>
                        </div>

                        <div>
                          <Gauge size={14} />
                          <span>
                            {car.transmission ||
                              "Not available"}
                          </span>
                        </div>

                        <div>
                          <CarFront size={14} />
                          <span>
                            {Number(
                              car.km || 0
                            ).toLocaleString(
                              "en-IN"
                            )}{" "}
                            km
                          </span>
                        </div>

                      </div>


                      <div className="smart-card-bottom">

                        <div>
                          <small>
                            Starting price
                          </small>

                          <strong>
                            {money(car.price)}
                          </strong>
                        </div>

                        <div className="smart-location">
                          <MapPin size={14} />

                          <span>
                            {car.location ||
                              car.city ||
                              "India"}
                          </span>
                        </div>

                      </div>


                      <button
                        type="button"
                        className="smart-view-button"
                      >
                        View car details
                        <ArrowUpRight size={16} />
                      </button>

                    </div>

                  </article>
                );
              })}

            </div>
          )}


          {!loading &&
            !items.length &&
            !error && (
              <div className="smart-empty">

                <div className="smart-empty-icon">
                  <CarFront size={25} />
                </div>

                <span>
                  MOTORA COLLECTION
                </span>

                <h3>
                  Search the inventory
                </h3>

                <p>
                  Start with a simple preference
                  or use the filters above to find
                  your ideal car.
                </p>

              </div>
            )}

        </div>


        {/* SIDE VISUAL */}

        <aside className="smart-side">

          <div className="smart-side-image">

            <img
              src={SIDE_IMAGE}
              alt="Luxury car showroom"
              loading="lazy"
            />

            <div className="smart-side-overlay" />

            <div className="smart-side-content">

              <span>
                MOTORA EXPERIENCE
              </span>

              <h3>
                More than a search.
                <br />
                A better way to buy.
              </h3>

              <p>
                Discover premium cars with
                a buying experience designed
                around you.
              </p>

            </div>

          </div>


          <div className="smart-side-stats">

            <div>
              <strong>01</strong>
              <span>
                Tell us what you need
              </span>
            </div>

            <div>
              <strong>02</strong>
              <span>
                Explore matching cars
              </span>
            </div>

            <div>
              <strong>03</strong>
              <span>
                Choose your favourite
              </span>
            </div>

          </div>

        </aside>

      </section>

    </main>
  );
}