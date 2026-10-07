import { useEffect, useState } from "react";
import { ArrowUpRight, CarFront, Check, X } from "lucide-react";
import { compareCars } from "../../api/smartApi";
import "./CompareCars.css";

const fields = [
  ["Price", "price"],
  ["Year", "year"],
  ["Type", "type"],
  ["Fuel", "fuel"],
  ["Transmission", "transmission"],
  ["Kilometres", "km"],
  ["Location", "location"],
  ["Engine", "specs.engine"],
  ["Power", "specs.power"],
  ["Mileage", "specs.mileage"],
  ["Owners", "specs.owners"],
  ["Color", "specs.color"],
];

const valueAt = (car, path) =>
  path
    .split(".")
    .reduce((value, key) => value?.[key], car) ?? "Not available";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function CompareCars() {
  const [ids, setIds] = useState(() =>
    JSON.parse(
      localStorage.getItem("motoraCompare") || "[]"
    )
  );

  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ids.length < 2) {
      setItems([]);
      return;
    }

    setLoading(true);
    setError("");

    compareCars(ids)
      .then((data) => {
        setItems(data.items || []);
      })
      .catch((err) => {
        setError(
          err?.message ||
            "Unable to load comparison right now."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [ids]);

  const removeCar = (id) => {
    const next = ids.filter((item) => item !== id);

    setIds(next);
    localStorage.setItem(
      "motoraCompare",
      JSON.stringify(next)
    );
  };

  const clearComparison = () => {
    localStorage.removeItem("motoraCompare");
    setIds([]);
    setItems([]);
    setError("");
  };

  const addCarId = (value) => {
    const cleanValue = value.trim();

    if (!cleanValue || ids.includes(cleanValue)) {
      return;
    }

    const next = [...ids, cleanValue].slice(-4);

    setIds(next);

    localStorage.setItem(
      "motoraCompare",
      JSON.stringify(next)
    );
  };

  return (
    <section className="compare-page">

      {/* HERO */}

      <div className="compare-hero">

        <div className="compare-hero-content">

          <div className="compare-eyebrow">
            MOTORA COMPARE
          </div>

          <h1>
            Compare cars.
            <br />
            <strong>Choose smarter.</strong>
          </h1>

          <p>
            Compare your shortlisted cars side by
            side and find the right balance of
            price, performance and features.
          </p>

        </div>

        <div className="compare-hero-stat">
          <span>
            CARS SELECTED
          </span>

          <strong>
            {String(ids.length).padStart(2, "0")}
          </strong>

          <small>
            Up to 4 cars
          </small>
        </div>

      </div>

      {/* ID BAR */}

      <div className="compare-toolbar">

        <div className="compare-input-wrap">

          <CarFront size={18} />

          <input
            id="compare-id"
            placeholder="Paste a car ID and press Enter"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                addCarId(event.currentTarget.value);
                event.currentTarget.value = "";
              }
            }}
          />

        </div>

        <button
          type="button"
          className="compare-clear"
          onClick={clearComparison}
        >
          Clear comparison
        </button>

      </div>

      {/* SELECTED CARS */}

      {ids.length > 0 && (
        <div className="compare-selected">

          <div className="compare-selected-heading">
            <span>
              SHORTLIST
            </span>

            <strong>
              {ids.length} selected
            </strong>
          </div>

          <div className="compare-id-list">

            {ids.map((id, index) => (
              <div
                className="compare-id-chip"
                key={id}
              >

                <span>
                  Car {index + 1}
                </span>

                <strong>
                  {id}
                </strong>

                <button
                  type="button"
                  onClick={() => removeCar(id)}
                  aria-label={`Remove car ${id}`}
                >
                  <X size={14} />
                </button>

              </div>
            ))}

          </div>

        </div>
      )}

      {/* ERROR */}

      {error && (
        <div className="compare-error">
          <span>
            {error}
          </span>
        </div>
      )}

      {/* LOADING */}

      {loading && (
        <div className="compare-loading">
          <div className="compare-loader" />
          <span>
            Preparing your comparison
          </span>
        </div>
      )}

      {/* COMPARISON */}

      {!loading && items.length >= 2 && (
        <div className="compare-content">

          <div className="compare-result-head">

            <div>
              <span>
                SIDE BY SIDE
              </span>

              <h2>
                Your car comparison
              </h2>
            </div>

            <div className="compare-result-count">
              <Check size={16} />
              <span>
                {items.length} cars compared
              </span>
            </div>

          </div>

          <div className="compare-table-wrap">

            <table className="compare-table">

              <thead>

                <tr>

                  <th className="compare-label-column">
                    Specification
                  </th>

                  {items.map((car) => (
                    <th
                      key={car._id}
                      className="compare-car-column"
                    >

                      <div className="compare-car-head">

                        {car.images?.[0] && (
                          <div className="compare-car-image">
                            <img
                              src={car.images[0]}
                              alt={`${car.brand} ${car.model}`}
                            />
                          </div>
                        )}

                        <div className="compare-car-info">

                          <span>
                            {car.brand}
                          </span>

                          <strong>
                            {car.model}
                          </strong>

                          {car.variant && (
                            <small>
                              {car.variant}
                            </small>
                          )}

                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeCar(car._id)
                          }
                          aria-label="Remove car"
                          className="compare-remove"
                        >
                          <X size={14} />
                        </button>

                      </div>

                    </th>
                  ))}

                </tr>

              </thead>

              <tbody>

                {fields.map(([label, path]) => (
                  <tr key={path}>

                    <td className="compare-field">
                      <span>
                        {label}
                      </span>
                    </td>

                    {items.map((car) => (
                      <td key={car._id}>

                        {path === "price"
                          ? money(
                              valueAt(car, path)
                            )
                          : valueAt(car, path)}

                      </td>
                    ))}

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

          <div className="compare-bottom-note">

            <div>
              <span>
                MOTORA INSIGHT
              </span>

              <p>
                Compare the numbers, then choose
                the car that fits your lifestyle.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
            >
              Back to top
              <ArrowUpRight size={15} />
            </button>

          </div>

        </div>
      )}

      {/* EMPTY */}

      {!loading && items.length < 2 && (
        <div className="compare-empty">

          <div className="compare-empty-icon">
            <CarFront size={28} />
          </div>

          <span>
            READY TO COMPARE
          </span>

          <h2>
            Select at least two cars.
          </h2>

          <p>
            Add car IDs from your shortlisted
            vehicles to see a detailed comparison.
          </p>

          <div className="compare-empty-steps">

            <div>
              <strong>01</strong>
              <span>
                Add a car ID
              </span>
            </div>

            <div>
              <strong>02</strong>
              <span>
                Add another car
              </span>
            </div>

            <div>
              <strong>03</strong>
              <span>
                Compare details
              </span>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}