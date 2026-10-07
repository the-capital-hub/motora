import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";

import "./Wishlist.css";

const formatPrice = (price) => {
  const value = Number(price || 0);

  if (value >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `₹${(value / 100000).toFixed(1)} L`;
  }

  return `₹${value.toLocaleString("en-IN")}`;
};

const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await api.get("/wishlist");

      setCars(data?.cars || []);
    } catch (err) {
      console.error("Failed to load wishlist:", err);
      setError(
        err.message || "Unable to load your wishlist."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: { from: "/wishlist" },
      });
      return;
    }

    fetchWishlist();
  }, [isAuthenticated]);

  const removeFromWishlist = async (id) => {
    try {
      setRemovingId(id);

      await api.delete(`/wishlist/${id}`);

      setCars((current) =>
        current.filter(
          (car) => String(car._id) !== String(id)
        )
      );
    } catch (err) {
      alert(err.message || "Unable to remove car.");
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <main className="wishlist-page">
        <section className="wishlist-loading">
          <div className="wishlist-loading-head">
            <span>MOTORA / WISHLIST</span>
            <h1>Your collection is loading.</h1>
            <p>
              Preparing your saved cars for you.
            </p>
          </div>

          <div className="wishlist-loading-grid">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                className="wishlist-skeleton-card"
                key={index}
              >
                <div className="wishlist-skeleton-image" />

                <div className="wishlist-skeleton-content">
                  <span />
                  <strong />
                  <div />
                  <div />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="wishlist-page">
      {/* HERO */}
      <section className="wishlist-hero">
        <div className="wishlist-hero-copy">
          <span className="wishlist-eyebrow">
            MOTORA / WISHLIST
          </span>

          <h1>
            Cars worth
            <br />
            <span>remembering.</span>
          </h1>

          <p>
            Your saved vehicles, kept in one place for whenever
            you are ready to make your next move.
          </p>

          <div className="wishlist-hero-meta">
            <div>
              <Heart size={16} fill="currentColor" />
              <span>
                {cars.length} saved{" "}
                {cars.length === 1 ? "car" : "cars"}
              </span>
            </div>

            <div>
              <ShieldCheck size={16} />
              <span>Verified collection</span>
            </div>
          </div>
        </div>

        <div className="wishlist-hero-count">
          <span>SAVED CARS</span>

          <strong>
            {String(cars.length).padStart(2, "0")}
          </strong>
        </div>
      </section>

      {/* ERROR */}
      {error && (
        <section className="wishlist-state wishlist-error-state">
          <div className="wishlist-state-icon error">
            <X size={24} />
          </div>

          <span className="wishlist-state-label">
            SOMETHING WENT WRONG
          </span>

          <h2>Unable to load your collection.</h2>

          <p>{error}</p>

          <button
            className="wishlist-primary-button"
            onClick={fetchWishlist}
          >
            Try again
            <ArrowUpRight size={16} />
          </button>
        </section>
      )}

      {/* EMPTY */}
      {!error && cars.length === 0 && (
        <section className="wishlist-empty">
          <div className="wishlist-empty-visual">
            <Heart size={38} />
          </div>

          <span className="wishlist-state-label">
            YOUR COLLECTION
          </span>

          <h2>
            Nothing saved
            <br />
            <span>just yet.</span>
          </h2>

          <p>
            Explore the Motora collection and save cars that
            catch your eye. Your favourites will appear here.
          </p>

          <button
            className="wishlist-primary-button"
            onClick={() => navigate("/cars")}
          >
            Explore cars
            <ArrowUpRight size={16} />
          </button>
        </section>
      )}

      {/* CARS */}
      {!error && cars.length > 0 && (
        <section className="wishlist-content">
          <div className="wishlist-section-head">
            <div>
              <span>YOUR COLLECTION</span>
              <h2>Saved vehicles</h2>
            </div>

            <button
              className="wishlist-browse-button"
              onClick={() => navigate("/cars")}
            >
              Browse more
              <ArrowUpRight size={15} />
            </button>
          </div>

          <div className="wishlist-grid">
            {cars.map((car) => (
              <article
                className={`wishlist-card ${
                  removingId === car._id
                    ? "is-removing"
                    : ""
                }`}
                key={car._id}
              >
                {/* IMAGE */}
                <div className="wishlist-image">
                  {car.images?.[0] ? (
                    <img
                      src={car.images[0]}
                      alt={`${car.brand} ${car.model}`}
                      loading="lazy"
                    />
                  ) : (
                    <div className="wishlist-image-empty">
                      <Search size={24} />
                      <span>Image unavailable</span>
                    </div>
                  )}

                  <div className="wishlist-image-overlay" />

                  <div className="wishlist-card-top">
                    <span className="wishlist-verified">
                      <ShieldCheck size={13} />
                      VERIFIED
                    </span>

                    <button
                      className="wishlist-remove"
                      onClick={() =>
                        removeFromWishlist(car._id)
                      }
                      disabled={removingId === car._id}
                      aria-label="Remove from wishlist"
                    >
                      <Heart
                        size={17}
                        fill="currentColor"
                      />
                    </button>
                  </div>

                  <div className="wishlist-image-bottom">
                    <span>
                      {car.year || "Year unavailable"}
                    </span>

                    <span>
                      {car.fuel || "Fuel unavailable"}
                    </span>
                  </div>
                </div>

                {/* INFO */}
                <div className="wishlist-info">
                  <div className="wishlist-title">
                    <div>
                      <span>{car.brand}</span>

                      <h2>{car.model}</h2>
                    </div>

                    <strong>
                      {formatPrice(car.price)}
                    </strong>
                  </div>

                  <div className="wishlist-specs">
                    <span>
                      {car.year || "Year unavailable"}
                    </span>

                    <span>
                      {Number(
                        car.km || 0
                      ).toLocaleString("en-IN")}{" "}
                      km
                    </span>

                    <span>
                      {car.transmission ||
                        "Transmission unavailable"}
                    </span>
                  </div>

                  <div className="wishlist-location">
                    <MapPin size={14} />

                    <span>
                      {car.location ||
                        "Location unavailable"}
                    </span>
                  </div>

                  <button
                    className="wishlist-details-button"
                    onClick={() =>
                      navigate(`/cars/${car._id}`)
                    }
                  >
                    <span>View details</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Wishlist;