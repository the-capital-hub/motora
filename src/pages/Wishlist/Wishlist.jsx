import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Heart,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import "./Wishlist.css";

const initialCars = [
  {
    id: 1,
    brand: "BMW",
    model: "X5",
    variant: "xDrive40i M Sport",
    year: 2024,
    price: "₹95.00 L",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "12 km/l",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
    tag: "Featured",
  },
  {
    id: 2,
    brand: "Mercedes-Benz",
    model: "GLE",
    variant: "300d 4MATIC",
    year: 2024,
    price: "₹96.40 L",
    fuel: "Diesel",
    transmission: "Automatic",
    mileage: "14.5 km/l",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
    tag: "Popular",
  },
  {
    id: 3,
    brand: "Porsche",
    model: "Cayenne",
    variant: "Base",
    year: 2024,
    price: "₹1.42 Cr",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "10.8 km/l",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    tag: "Performance",
  },
  {
    id: 4,
    brand: "Audi",
    model: "Q7",
    variant: "45 TFSI Technology",
    year: 2024,
    price: "₹88.00 L",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "11.2 km/l",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
    tag: "New Arrival",
  },
  {
    id: 5,
    brand: "Volvo",
    model: "XC90",
    variant: "B6 Ultimate",
    year: 2024,
    price: "₹1.05 Cr",
    fuel: "Petrol",
    transmission: "Automatic",
    mileage: "11.04 km/l",
    image:
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=85",
    tag: "Premium",
  },
];

const Wishlist = () => {
  const [savedCars, setSavedCars] =
    useState(initialCars);

  const [search, setSearch] = useState("");

  const [filter, setFilter] =
    useState("All");

  const [sort, setSort] =
    useState("Recently Added");

  const [showFilters, setShowFilters] =
    useState(false);

  const removeCar = (id) => {
    setSavedCars((current) =>
      current.filter((car) => car.id !== id)
    );
  };

  const clearWishlist = () => {
    setSavedCars([]);
  };

  const filteredCars = useMemo(() => {
    let result = [...savedCars];

    if (search.trim()) {
      const value = search.toLowerCase();

      result = result.filter((car) =>
        `${car.brand} ${car.model} ${car.variant}`
          .toLowerCase()
          .includes(value)
      );
    }

    if (filter !== "All") {
      result = result.filter(
        (car) => car.fuel === filter
      );
    }

    if (sort === "Price: Low to High") {
      result.sort(
        (a, b) =>
          parseFloat(
            a.price
              .replace("₹", "")
              .replace(" Cr", "")
              .replace(" L", "")
          ) -
          parseFloat(
            b.price
              .replace("₹", "")
              .replace(" Cr", "")
              .replace(" L", "")
          )
      );
    }

    if (sort === "Year: Newest") {
      result.sort(
        (a, b) => b.year - a.year
      );
    }

    return result;
  }, [savedCars, search, filter, sort]);

  return (
    <div className="wishlist-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="wishlist-hero">

        <div className="wishlist-hero-content">

          <span className="wishlist-eyebrow">
            YOUR COLLECTION
          </span>

          <h1>
            Cars worth
            <br />
            <strong>remembering.</strong>
          </h1>

          <p>
            Keep the cars you love close.
            Save your favourites and come back
            when you're ready.
          </p>

        </div>

        <div className="wishlist-count">

          <span>
            SAVED CARS
          </span>

          <strong>
            {String(savedCars.length).padStart(
              2,
              "0"
            )}
          </strong>

          <small>
            in your collection
          </small>

        </div>

      </section>


      {/* =================================
          TOOLBAR
      ================================= */}

      <section className="wishlist-toolbar">

        <div className="wishlist-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search saved cars..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />

          {search && (
            <button
              onClick={() => setSearch("")}
            >
              <X size={14} />
            </button>
          )}

        </div>


        <button
          className="filter-toggle"
          onClick={() =>
            setShowFilters(!showFilters)
          }
        >
          <SlidersHorizontal size={14} />
          Filters
        </button>


        {savedCars.length > 0 && (
          <button
            className="clear-wishlist"
            onClick={clearWishlist}
          >
            Clear all
          </button>
        )}

      </section>


      {/* =================================
          FILTERS
      ================================= */}

      {showFilters && (
        <section className="wishlist-filters">

          <div className="filter-group">

            <span>
              FUEL
            </span>

            <div>

              {[
                "All",
                "Petrol",
                "Diesel",
              ].map((item) => (

                <button
                  key={item}
                  className={
                    filter === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setFilter(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          <div className="filter-group">

            <span>
              SORT BY
            </span>

            <div>

              {[
                "Recently Added",
                "Price: Low to High",
                "Year: Newest",
              ].map((item) => (

                <button
                  key={item}
                  className={
                    sort === item
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setSort(item)
                  }
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        </section>
      )}


      {/* =================================
          SAVED CARS
      ================================= */}

      {filteredCars.length > 0 ? (

        <section className="wishlist-grid">

          {filteredCars.map((car) => (

            <article
              className="wishlist-card"
              key={car.id}
            >

              <div className="wishlist-card-image">

                <img
                  src={car.image}
                  alt={`${car.brand} ${car.model}`}
                />

                <div />

                <span>
                  {car.tag}
                </span>

                <button
                  className="wishlist-heart active"
                  onClick={() =>
                    removeCar(car.id)
                  }
                  aria-label="Remove from wishlist"
                >
                  <Heart
                    size={17}
                    fill="currentColor"
                  />
                </button>

              </div>


              <div className="wishlist-card-content">

                <div className="wishlist-card-heading">

                  <div>

                    <span>
                      {car.brand}
                    </span>

                    <h2>
                      {car.model}
                    </h2>

                  </div>

                  <strong>
                    {car.price}
                  </strong>

                </div>


                <p className="wishlist-variant">
                  {car.variant}
                </p>


                <div className="wishlist-specs">

                  <span>
                    {car.year}
                  </span>

                  <span>
                    {car.fuel}
                  </span>

                  <span>
                    {car.transmission}
                  </span>

                  <span>
                    {car.mileage}
                  </span>

                </div>


                <div className="wishlist-actions">

                  <button
                    onClick={() =>
                      (window.location.href =
                        "/cars")
                    }
                  >
                    View car
                    <ArrowUpRight size={14} />
                  </button>

                  <button
                    className="compare-button"
                    onClick={() =>
                      (window.location.href =
                        "/compare")
                    }
                  >
                    Compare
                  </button>

                </div>

              </div>

            </article>

          ))}

        </section>

      ) : (

        <section className="wishlist-empty">

          <div className="empty-icon">

            <Heart size={20} />

          </div>

          <span>
            YOUR COLLECTION IS EMPTY
          </span>

          <h2>
            Nothing saved yet.
          </h2>

          <p>
            Explore our collection and save
            the cars that catch your eye.
          </p>

          <button
            onClick={() =>
              (window.location.href =
                "/cars")
            }
          >
            Explore cars
            <ArrowUpRight size={15} />
          </button>

        </section>

      )}


      {/* =================================
          BOTTOM CTA
      ================================= */}

      {savedCars.length > 0 && (
        <section className="wishlist-cta">

          <div>

            <span>
              KEEP EXPLORING
            </span>

            <h2>
              Your next car
              <br />
              might be one scroll away.
            </h2>

          </div>

          <button
            onClick={() =>
              (window.location.href =
                "/cars")
            }
          >
            Explore more cars
            <ArrowUpRight size={15} />
          </button>

        </section>
      )}

    </div>
  );
};

export default Wishlist;