import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  CarFront,
  Clock3,
  MapPin,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react";

import "./Showroom.css";

const showrooms = [
  {
    id: 1,
    city: "Delhi",
    area: "Vasant Kunj",
    address: "12 Nelson Mandela Road, Vasant Kunj",
    phone: "+91 11 4567 8900",
    hours: "10:00 AM — 8:00 PM",
    cars: 42,
    type: "Flagship",
    image:
      "https://images.unsplash.com/photo-1562141961-b9d9b8b8e4f5?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 2,
    city: "Mumbai",
    area: "Bandra",
    address: "Linking Road, Bandra West",
    phone: "+91 22 4567 8900",
    hours: "10:00 AM — 8:00 PM",
    cars: 35,
    type: "Premium",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 3,
    city: "Bangalore",
    area: "Indiranagar",
    address: "100 Feet Road, Indiranagar",
    phone: "+91 80 4567 8900",
    hours: "10:00 AM — 8:00 PM",
    cars: 29,
    type: "Premium",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 4,
    city: "Gurgaon",
    area: "Golf Course Road",
    address: "Golf Course Road, Sector 54",
    phone: "+91 12 4567 8900",
    hours: "10:00 AM — 8:00 PM",
    cars: 31,
    type: "Premium",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
  },
  {
    id: 5,
    city: "Pune",
    area: "Koregaon Park",
    address: "North Main Road, Koregaon Park",
    phone: "+91 20 4567 8900",
    hours: "10:00 AM — 8:00 PM",
    cars: 24,
    type: "Studio",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1600&q=85",
  },
];

const Showroom = () => {
  const [search, setSearch] = useState("");
  const [selectedShowroom, setSelectedShowroom] =
    useState(null);
  const [visitOpen, setVisitOpen] = useState(false);

  const filteredShowrooms = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return showrooms;

    return showrooms.filter((showroom) =>
      `${showroom.city} ${showroom.area} ${showroom.address}`
        .toLowerCase()
        .includes(value)
    );
  }, [search]);

  const activeShowroom =
    showrooms.find(
      (showroom) => showroom.id === selectedShowroom
    ) || null;

  return (
    <div className="showroom-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="showroom-hero">

        <div className="showroom-hero-content">

          <span className="showroom-eyebrow">
            MOTORA SHOWROOMS
          </span>

          <h1>
            Come see it
            <br />
            <strong>in person.</strong>
          </h1>

          <p>
            Experience our collection up close,
            speak with automotive specialists and
            find the car that feels right.
          </p>

        </div>

        <div className="showroom-hero-meta">

          <span>LOCATIONS</span>

          <strong>
            {String(showrooms.length).padStart(2, "0")}
          </strong>

          <small>
            across India
          </small>

        </div>

      </section>


      {/* =================================
          SEARCH
      ================================= */}

      <section className="showroom-search-section">

        <div className="showroom-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search city or location..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </div>

        <span>
          {filteredShowrooms.length} locations
        </span>

      </section>


      {/* =================================
          FEATURED SHOWROOM
      ================================= */}

      {!search && (
        <section className="showroom-featured">

          <div className="showroom-featured-image">

            <img
              src={showrooms[0].image}
              alt="Motora Delhi showroom"
            />

            <div className="showroom-image-overlay" />

            <span>
              MOTORA FLAGSHIP
            </span>

          </div>

          <div className="showroom-featured-content">

            <span>
              {showrooms[0].city} ·{" "}
              {showrooms[0].area}
            </span>

            <h2>
              The Motora
              <br />
              flagship.
            </h2>

            <p>
              Our flagship showroom is designed as
              more than a place to buy a car. Come
              experience the collection, meet our
              specialists and take your time.
            </p>

            <div className="showroom-featured-stats">

              <div>
                <strong>
                  {showrooms[0].cars}
                </strong>
                <span>Cars available</span>
              </div>

              <div>
                <strong>
                  7 Days
                </strong>
                <span>Open every week</span>
              </div>

            </div>

            <button
              onClick={() =>
                setSelectedShowroom(
                  showrooms[0].id
                )
              }
            >
              Explore showroom
              <ArrowUpRight size={15} />
            </button>

          </div>

        </section>
      )}


      {/* =================================
          LOCATIONS
      ================================= */}

      <section className="showroom-locations">

        <div className="showroom-section-heading">

          <div>
            <span>
              OUR LOCATIONS
            </span>

            <h2>
              Find us near you.
            </h2>
          </div>

          <p>
            Every Motora location is designed
            around a relaxed, transparent and
            premium buying experience.
          </p>

        </div>


        <div className="showroom-grid">

          {filteredShowrooms.map(
            (showroom, index) => (

              <article
                className="showroom-card"
                key={showroom.id}
              >

                <div className="showroom-card-image">

                  <img
                    src={showroom.image}
                    alt={`${showroom.city} showroom`}
                  />

                  <div />

                  <span>
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <small>
                    {showroom.type}
                  </small>

                </div>


                <div className="showroom-card-content">

                  <div className="showroom-card-title">

                    <div>
                      <span>
                        {showroom.city}
                      </span>

                      <h3>
                        {showroom.area}
                      </h3>
                    </div>

                    <MapPin size={16} />

                  </div>


                  <p>
                    {showroom.address}
                  </p>


                  <div className="showroom-card-info">

                    <div>
                      <Clock3 size={13} />
                      <span>
                        {showroom.hours}
                      </span>
                    </div>

                    <div>
                      <CarFront size={13} />
                      <span>
                        {showroom.cars} cars
                      </span>
                    </div>

                  </div>


                  <button
                    onClick={() =>
                      setSelectedShowroom(
                        showroom.id
                      )
                    }
                  >
                    View showroom
                    <ArrowUpRight size={14} />
                  </button>

                </div>

              </article>

            )
          )}

        </div>


        {filteredShowrooms.length === 0 && (
          <div className="showroom-empty">

            <MapPin size={22} />

            <h3>
              We couldn't find that location.
            </h3>

            <p>
              Try searching for another city.
            </p>

            <button
              onClick={() => setSearch("")}
            >
              View all locations
            </button>

          </div>
        )}

      </section>


      {/* =================================
          SHOWROOM EXPERIENCE
      ================================= */}

      <section className="showroom-experience">

        <div className="showroom-experience-image">

          <img
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=85"
            alt="Premium showroom interior"
          />

        </div>

        <div className="showroom-experience-content">

          <span>
            THE MOTORA EXPERIENCE
          </span>

          <h2>
            Take your time.
            <br />
            There is no rush.
          </h2>

          <p>
            Browse at your own pace, ask questions,
            compare cars and take a test drive.
            Our specialists are here to help —
            never to pressure.
          </p>

          <div className="experience-points">

            <div>
              <Sparkles size={15} />
              <span>
                Curated collection
              </span>
            </div>

            <div>
              <CarFront size={15} />
              <span>
                Test drives available
              </span>
            </div>

            <div>
              <Phone size={15} />
              <span>
                Dedicated specialists
              </span>
            </div>

          </div>

        </div>

      </section>


      {/* =================================
          VISIT CTA
      ================================= */}

      <section className="showroom-visit-cta">

        <div>

          <span>
            PLAN YOUR VISIT
          </span>

          <h2>
            See the car.
            <br />
            Feel the difference.
          </h2>

        </div>

        <button
          onClick={() => setVisitOpen(true)}
        >
          Book a showroom visit
          <CalendarDays size={16} />
        </button>

      </section>


      {/* =================================
          SHOWROOM MODAL
      ================================= */}

      {activeShowroom && (
        <div
          className="showroom-modal-overlay"
          onClick={() =>
            setSelectedShowroom(null)
          }
        >

          <div
            className="showroom-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="showroom-modal-close"
              onClick={() =>
                setSelectedShowroom(null)
              }
            >
              ×
            </button>

            <div className="showroom-modal-image">

              <img
                src={activeShowroom.image}
                alt={activeShowroom.city}
              />

              <div />

              <span>
                MOTORA {activeShowroom.type.toUpperCase()}
              </span>

            </div>


            <div className="showroom-modal-content">

              <span>
                {activeShowroom.city}
              </span>

              <h2>
                {activeShowroom.area}
              </h2>

              <p>
                {activeShowroom.address}
              </p>


              <div className="showroom-modal-details">

                <div>
                  <Clock3 size={14} />
                  <div>
                    <small>OPENING HOURS</small>
                    <strong>
                      {activeShowroom.hours}
                    </strong>
                  </div>
                </div>

                <div>
                  <CarFront size={14} />
                  <div>
                    <small>AVAILABLE CARS</small>
                    <strong>
                      {activeShowroom.cars} vehicles
                    </strong>
                  </div>
                </div>

                <div>
                  <Phone size={14} />
                  <div>
                    <small>CONTACT</small>
                    <strong>
                      {activeShowroom.phone}
                    </strong>
                  </div>
                </div>

              </div>


              <div className="showroom-modal-actions">

                <button
                  onClick={() => {
                    setSelectedShowroom(null);
                    setVisitOpen(true);
                  }}
                >
                  Book a visit
                  <CalendarDays size={14} />
                </button>

                <button
                  className="secondary"
                  onClick={() =>
                    setSelectedShowroom(null)
                  }
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>
      )}


      {/* =================================
          VISIT MODAL
      ================================= */}

      {visitOpen && (
        <div
          className="showroom-modal-overlay"
          onClick={() =>
            setVisitOpen(false)
          }
        >

          <div
            className="visit-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="showroom-modal-close"
              onClick={() =>
                setVisitOpen(false)
              }
            >
              ×
            </button>

            <span>
              SHOWROOM VISIT
            </span>

            <h2>
              Let's arrange a time.
            </h2>

            <p>
              Choose your preferred showroom and
              we'll confirm your visit.
            </p>

            <select>
              <option>
                Select showroom
              </option>

              {showrooms.map((showroom) => (
                <option
                  key={showroom.id}
                >
                  {showroom.city} —{" "}
                  {showroom.area}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Your name"
            />

            <input
              type="tel"
              placeholder="Phone number"
            />

            <input type="date" />

            <button
              className="visit-submit"
              onClick={() =>
                setVisitOpen(false)
              }
            >
              Request a Visit
              <ArrowUpRight size={15} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Showroom;