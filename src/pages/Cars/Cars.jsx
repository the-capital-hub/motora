import { useEffect, useMemo, useState } from "react";

import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import api from "../../api/client";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import "./Cars.css";


/* =========================================================
   PRICE FORMAT
========================================================= */

const formatPrice = (price) => {
  if (!price) return "₹0";

  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  return `₹${(price / 100000).toFixed(1)} L`;
};


/* =========================================================
   CARS
========================================================= */

const Cars = () => {
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();


  /* =======================================================
     CARS
  ======================================================= */

  const [cars, setCars] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =======================================================
     SEARCH
  ======================================================= */

  const [search, setSearch] = useState("");


  /* =======================================================
     BASIC FILTERS
  ======================================================= */

  const [brand, setBrand] = useState("All");

  const [model, setModel] = useState("All");

  const [bodyType, setBodyType] = useState("All");

  const [fuel, setFuel] = useState("All");

  const [transmission, setTransmission] =
    useState("All");


  /* =======================================================
     PRICE FILTERS
  ======================================================= */

  const [minPrice, setMinPrice] =
    useState("");

  const [maxPrice, setMaxPrice] =
    useState("");


  /* =======================================================
     YEAR FILTERS
  ======================================================= */

  const [minYear, setMinYear] =
    useState("");

  const [maxYear, setMaxYear] =
    useState("");


  /* =======================================================
     KM FILTER
  ======================================================= */

  const [maxKm, setMaxKm] =
    useState("");


  /* =======================================================
     OTHER FILTERS
  ======================================================= */

  const [location, setLocation] =
    useState("All");

  const [ownership, setOwnership] =
    useState("All");

  const [featuredOnly, setFeaturedOnly] =
    useState(false);


  /* =======================================================
     SORT
  ======================================================= */

  const [sort, setSort] =
    useState("featured");


  /* =======================================================
     MOBILE FILTER
  ======================================================= */

  const [mobileFilters, setMobileFilters] =
    useState(false);


  /* =======================================================
     PAGINATION
  ======================================================= */

  const [page, setPage] = useState(1);

  const [pagination, setPagination] =
    useState({
      page: 1,
      pages: 1,
      total: 0,
    });


  /* =======================================================
     WISHLIST
  ======================================================= */

  const [wishlist, setWishlist] =
    useState([]);

  const [wishlistLoading, setWishlistLoading] =
    useState(false);


  /* =======================================================
     FETCH CARS
  ======================================================= */

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);

        setError("");


        const params = new URLSearchParams({
          page: String(page),

          limit: "12",

          sort:
            sort === "price-low"
              ? "price"
              : sort === "price-high"
                ? "-price"
                : sort === "year-new"
                  ? "-year"
                  : "featured",
        });


        /* SEARCH */

        if (search.trim()) {
          params.set(
            "search",
            search.trim()
          );
        }


        /* BASIC FILTERS */

        if (brand !== "All") {
          params.set("brand", brand);
        }

        if (model !== "All") {
          params.set("model", model);
        }

        if (bodyType !== "All") {
          params.set("type", bodyType);
        }

        if (fuel !== "All") {
          params.set("fuel", fuel);
        }

        if (transmission !== "All") {
          params.set(
            "transmission",
            transmission
          );
        }


        /* PRICE */

        if (minPrice) {
          params.set(
            "minPrice",
            minPrice
          );
        }

        if (maxPrice) {
          params.set(
            "maxPrice",
            maxPrice
          );
        }


        /* YEAR */

        if (minYear) {
          params.set(
            "minYear",
            minYear
          );
        }

        if (maxYear) {
          params.set(
            "maxYear",
            maxYear
          );
        }


        /* KM */

        if (maxKm) {
          params.set(
            "maxKm",
            maxKm
          );
        }


        /* LOCATION */

        if (location !== "All") {
          params.set(
            "location",
            location
          );
        }


        /* OWNERSHIP */

        if (ownership !== "All") {
          params.set(
            "ownership",
            ownership
          );
        }


        /* FEATURED */

        if (featuredOnly) {
          params.set(
            "featured",
            "true"
          );
        }


        /* PUBLIC INVENTORY */

        params.set(
          "status",
          "Available"
        );


        const data = await api.get(
          `/cars?${params.toString()}`
        );


        const formattedCars =
          (data.items || []).map((car) => ({
            id: car._id,

            brand: car.brand,

            model: car.model,

            year: car.year,

            price: car.price,

            type: car.type,

            fuel: car.fuel,

            transmission:
              car.transmission,

            km: `${Number(
              car.km || 0
            ).toLocaleString("en-IN")} km`,

            kmValue: Number(
              car.km || 0
            ),

            location: car.location,

            ownership:
              car.ownership ||
              car.ownerCount ||
              "",

            image:
              car.images?.[0] || "",

            featured:
              Boolean(car.featured),

            status: car.status,
          }));


        setCars(formattedCars);


        setPagination(
          data.pagination || {
            page,
            pages: 1,
            total: formattedCars.length,
          }
        );
      } catch (err) {
        console.error(
          "Failed to fetch cars:",
          err
        );

        setError(
          err.message ||
            "Unable to load cars. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };


    fetchCars();
  }, [
    page,
    search,
    brand,
    model,
    bodyType,
    fuel,
    transmission,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    maxKm,
    location,
    ownership,
    featuredOnly,
    sort,
  ]);


  /* =======================================================
     FETCH USER WISHLIST
  ======================================================= */

  useEffect(() => {
    if (!isAuthenticated) {
      setWishlist([]);
      return;
    }


    const fetchWishlist = async () => {
      try {
        const data =
          await api.get("/wishlist");


        setWishlist(
          (data?.cars || []).map(
            (car) => car._id
          )
        );
      } catch (err) {
        console.error(
          "Failed to fetch wishlist:",
          err
        );
      }
    };


    fetchWishlist();
  }, [isAuthenticated]);


  /* =======================================================
     FILTER OPTIONS
  ======================================================= */

  const brands = useMemo(() => {
    return [
      "All",
      ...new Set(
        cars
          .map((car) => car.brand)
          .filter(Boolean)
      ),
    ];
  }, [cars]);


  const models = useMemo(() => {
    return [
      "All",
      ...new Set(
        cars
          .filter(
            (car) =>
              brand === "All" ||
              car.brand === brand
          )
          .map((car) => car.model)
          .filter(Boolean)
      ),
    ];
  }, [cars, brand]);


  const bodyTypes = useMemo(() => {
    return [
      "All",
      ...new Set(
        cars
          .map((car) => car.type)
          .filter(Boolean)
      ),
    ];
  }, [cars]);


  const fuels = useMemo(() => {
    return [
      "All",
      ...new Set(
        cars
          .map((car) => car.fuel)
          .filter(Boolean)
      ),
    ];
  }, [cars]);


  const transmissions = useMemo(() => {
    return [
      "All",
      ...new Set(
        cars
          .map((car) => car.transmission)
          .filter(Boolean)
      ),
    ];
  }, [cars]);


  const locations = useMemo(() => {
    return [
      "All",
      ...new Set(
        cars
          .map((car) => car.location)
          .filter(Boolean)
      ),
    ];
  }, [cars]);


  /* =======================================================
     YEARS
  ======================================================= */

  const currentYear =
    new Date().getFullYear();


  const years = Array.from(
    { length: 12 },
    (_, index) =>
      currentYear - index
  );


  /* =======================================================
     FILTER + SEARCH
  ======================================================= */

  const filteredCars = cars;


  /* =======================================================
     RESET PAGE WHEN FILTER CHANGES
  ======================================================= */

  useEffect(() => {
    setPage(1);
  }, [
    search,
    brand,
    model,
    bodyType,
    fuel,
    transmission,
    minPrice,
    maxPrice,
    minYear,
    maxYear,
    maxKm,
    location,
    ownership,
    featuredOnly,
    sort,
  ]);


  /* =======================================================
     TOGGLE WISHLIST
  ======================================================= */

  const toggleWishlist = async (id) => {
    if (!isAuthenticated) {
      navigate("/login", {
        state: {
          from: "/cars",
        },
      });

      return;
    }


    try {
      setWishlistLoading(true);


      if (wishlist.includes(id)) {
        await api.delete(
          `/wishlist/${id}`
        );


        setWishlist((current) =>
          current.filter(
            (item) => item !== id
          )
        );
      } else {
        await api.post(
          `/wishlist/${id}`
        );


        setWishlist((current) => [
          ...current,
          id,
        ]);
      }
    } catch (err) {
      console.error(
        "Failed to update wishlist:",
        err
      );

      alert(
        err.message ||
          "Unable to update wishlist."
      );
    } finally {
      setWishlistLoading(false);
    }
  };


  /* =======================================================
     CLEAR FILTERS
  ======================================================= */

  const clearFilters = () => {
    setSearch("");

    setBrand("All");

    setModel("All");

    setBodyType("All");

    setFuel("All");

    setTransmission("All");

    setMinPrice("");

    setMaxPrice("");

    setMinYear("");

    setMaxYear("");

    setMaxKm("");

    setLocation("All");

    setOwnership("All");

    setFeaturedOnly(false);

    setSort("featured");

    setPage(1);
  };


  /* =======================================================
     ACTIVE FILTER COUNT
  ======================================================= */

  const activeFilterCount = [
    brand !== "All",
    model !== "All",
    bodyType !== "All",
    fuel !== "All",
    transmission !== "All",
    Boolean(minPrice),
    Boolean(maxPrice),
    Boolean(minYear),
    Boolean(maxYear),
    Boolean(maxKm),
    location !== "All",
    ownership !== "All",
    featuredOnly,
  ].filter(Boolean).length;


  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="cars-page">
        <div className="cars-empty">
          <div>
            <Search size={20} />
          </div>

          <h3>
            Loading cars
          </h3>

          <p>
            Please wait while we load
            the latest inventory.
          </p>
        </div>
      </div>
    );
  }


  /* =======================================================
     ERROR
  ======================================================= */

  if (error) {
    return (
      <div className="cars-page">
        <div className="cars-empty">
          <div>
            <X size={20} />
          </div>

          <h3>
            Unable to load cars
          </h3>

          <p>{error}</p>

          <button
            onClick={() =>
              window.location.reload()
            }
          >
            Try again
          </button>
        </div>
      </div>
    );
  }


  /* =======================================================
     RETURN
  ======================================================= */

  return (
    <div className="cars-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <section className="cars-header">

        <div className="cars-header-content">

          <span className="cars-eyebrow">
            MOTORA COLLECTION
          </span>

          <h1>
            Find a car
            <br />
            worth driving.
          </h1>

          <p>
            Explore a curated collection of
            premium, performance and everyday cars.
          </p>

        </div>


        <div className="cars-header-meta">

          <span>
            CURATED INVENTORY
          </span>

          <strong>
            {pagination.total
              ?.toString()
              .padStart(2, "0") ||
              cars.length
                .toString()
                .padStart(2, "0")}
          </strong>

          <small>
            vehicles available
          </small>

        </div>

      </section>


      {/* =================================================
          SEARCH
      ================================================= */}

      <section className="cars-search-section">

        <div className="cars-search">

          <Search size={17} />

          <input
            type="text"
            placeholder="Search by brand, model or body type..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          {search && (
            <button
              onClick={() =>
                setSearch("")
              }
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}

        </div>


        <button
          className="mobile-filter-button"
          onClick={() =>
            setMobileFilters(true)
          }
        >
          <SlidersHorizontal
            size={15}
          />

          Filters

          {activeFilterCount > 0 && (
            <span>
              {activeFilterCount}
            </span>
          )}
        </button>

      </section>


      {/* =================================================
          CONTENT
      ================================================= */}

      <section className="cars-content">


        {/* =================================================
            FILTERS
        ================================================= */}

        <aside
          className={`cars-filters ${
            mobileFilters
              ? "cars-filters-open"
              : ""
          }`}
        >

          <div className="filters-header">

            <div>

              <span>
                REFINE
              </span>

              <h2>
                Filters
              </h2>

              {activeFilterCount > 0 && (
                <small className="active-filter-count">
                  {activeFilterCount} active
                </small>
              )}

            </div>


            <button
              className="mobile-filter-close"
              onClick={() =>
                setMobileFilters(false)
              }
              aria-label="Close filters"
            >
              <X size={18} />
            </button>

          </div>


          {/* =================================================
              BRAND
          ================================================= */}

          <div className="filter-group">

            <label>
              BRAND
            </label>

            <div className="filter-options">

              {brands.map((item) => (
                <button
                  key={item}
                  className={
                    brand === item
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() => {
                    setBrand(item);
                    setModel("All");
                  }}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>


          {/* =================================================
              MODEL
          ================================================= */}

          <div className="filter-group">

            <label>
              MODEL
            </label>

            <div className="filter-select-wrap">

              <select
                value={model}
                onChange={(e) =>
                  setModel(e.target.value)
                }
              >
                {models.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item === "All"
                      ? "All Models"
                      : item}
                  </option>
                ))}
              </select>

              <ChevronDown
                size={14}
              />

            </div>

          </div>


          {/* =================================================
              PRICE
          ================================================= */}

          <div className="filter-group">

            <label>
              PRICE RANGE
            </label>

            <div className="filter-price-grid">

              <div className="filter-input-wrap">

                <span>
                  MIN
                </span>

                <input
                  type="number"
                  min="0"
                  placeholder="₹20 L"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="filter-input-wrap">

                <span>
                  MAX
                </span>

                <input
                  type="number"
                  min="0"
                  placeholder="₹1 Cr"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

          </div>


          {/* =================================================
              BODY TYPE
          ================================================= */}

          <div className="filter-group">

            <label>
              BODY TYPE
            </label>

            <div className="filter-options">

              {bodyTypes.map((item) => (
                <button
                  key={item}
                  className={
                    bodyType === item
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() =>
                    setBodyType(item)
                  }
                >
                  {item}
                </button>
              ))}

            </div>

          </div>


          {/* =================================================
              FUEL
          ================================================= */}

          <div className="filter-group">

            <label>
              FUEL TYPE
            </label>

            <div className="filter-options filter-options-grid">

              {fuels.map((item) => (
                <button
                  key={item}
                  className={
                    fuel === item
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() =>
                    setFuel(item)
                  }
                >
                  {item}
                </button>
              ))}

            </div>

          </div>


          {/* =================================================
              TRANSMISSION
          ================================================= */}

          <div className="filter-group">

            <label>
              TRANSMISSION
            </label>

            <div className="filter-options">

              {transmissions.map(
                (item) => (
                  <button
                    key={item}
                    className={
                      transmission === item
                        ? "filter-option active"
                        : "filter-option"
                    }
                    onClick={() =>
                      setTransmission(item)
                    }
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>


          {/* =================================================
              MODEL YEAR
          ================================================= */}

          <div className="filter-group">

            <label>
              MODEL YEAR
            </label>

            <div className="filter-price-grid">

              <div className="filter-input-wrap">

                <span>
                  FROM
                </span>

                <select
                  value={minYear}
                  onChange={(e) =>
                    setMinYear(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Any
                  </option>

                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </select>

              </div>


              <div className="filter-input-wrap">

                <span>
                  TO
                </span>

                <select
                  value={maxYear}
                  onChange={(e) =>
                    setMaxYear(
                      e.target.value
                    )
                  }
                >
                  <option value="">
                    Any
                  </option>

                  {years.map((year) => (
                    <option
                      key={year}
                      value={year}
                    >
                      {year}
                    </option>
                  ))}
                </select>

              </div>

            </div>

          </div>


          {/* =================================================
              KILOMETRES
          ================================================= */}

          <div className="filter-group">

            <label>
              KILOMETRES
            </label>

            <div className="filter-options">

              <button
                className={
                  maxKm === "10000"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() =>
                  setMaxKm("10000")
                }
              >
                Under 10,000 km
              </button>

              <button
                className={
                  maxKm === "25000"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() =>
                  setMaxKm("25000")
                }
              >
                Under 25,000 km
              </button>

              <button
                className={
                  maxKm === "50000"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() =>
                  setMaxKm("50000")
                }
              >
                Under 50,000 km
              </button>

              <button
                className={
                  maxKm === "75000"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() =>
                  setMaxKm("75000")
                }
              >
                Under 75,000 km
              </button>

            </div>

          </div>


          {/* =================================================
              LOCATION
          ================================================= */}

          <div className="filter-group">

            <label>
              LOCATION
            </label>

            <div className="filter-select-wrap">

              <select
                value={location}
                onChange={(e) =>
                  setLocation(
                    e.target.value
                  )
                }
              >
                {locations.map(
                  (item) => (
                    <option
                      key={item}
                      value={item}
                    >
                      {item === "All"
                        ? "All Locations"
                        : item}
                    </option>
                  )
                )}
              </select>

              <ChevronDown
                size={14}
              />

            </div>

          </div>


          {/* =================================================
              OWNERSHIP
          ================================================= */}

          <div className="filter-group">

            <label>
              OWNERSHIP
            </label>

            <div className="filter-options">

              <button
                className={
                  ownership === "First Owner"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() =>
                  setOwnership(
                    ownership === "First Owner"
                      ? "All"
                      : "First Owner"
                  )
                }
              >
                First Owner
              </button>

              <button
                className={
                  ownership === "Second Owner"
                    ? "filter-option active"
                    : "filter-option"
                }
                onClick={() =>
                  setOwnership(
                    ownership === "Second Owner"
                      ? "All"
                      : "Second Owner"
                  )
                }
              >
                Second Owner
              </button>

            </div>

          </div>


          {/* =================================================
              FEATURED
          ================================================= */}

          <div className="filter-group">

            <label className="featured-filter">

              <input
                type="checkbox"
                checked={featuredOnly}
                onChange={(e) =>
                  setFeaturedOnly(
                    e.target.checked
                  )
                }
              />

              <span>
                Featured Cars Only
              </span>

            </label>

          </div>


          {/* =================================================
              CLEAR
          ================================================= */}

          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear all filters
          </button>

        </aside>


        {/* =================================================
            RESULTS
        ================================================= */}

        <div className="cars-results">

          <div className="cars-results-top">

            <div>

              <span>
                {filteredCars.length} VEHICLES
              </span>

              <h2>
                Available now
              </h2>

            </div>


            <div className="cars-sort">

              <span>
                Sort by
              </span>

              <div className="sort-select">

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(
                      e.target.value
                    )
                  }
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="price-low">
                    Price: Low to High
                  </option>

                  <option value="price-high">
                    Price: High to Low
                  </option>

                  <option value="year-new">
                    Newest First
                  </option>
                </select>

                <ChevronDown
                  size={13}
                />

              </div>

            </div>

          </div>


          {/* =================================================
              CAR GRID
          ================================================= */}

          {filteredCars.length > 0 ? (

            <div className="cars-grid">

              {filteredCars.map((car) => (

                <article
                  className="browse-car-card"
                  key={car.id}
                >

                  {/* IMAGE */}

                  <div className="browse-car-image">

                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      loading="lazy"
                    />


                    {/* WISHLIST */}

                    <button
                      className={
                        wishlist.includes(
                          car.id
                        )
                          ? "car-wishlist active"
                          : "car-wishlist"
                      }
                      onClick={() =>
                        toggleWishlist(
                          car.id
                        )
                      }
                      disabled={
                        wishlistLoading
                      }
                      aria-label={
                        wishlist.includes(
                          car.id
                        )
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >
                      <Heart
                        size={16}
                        fill={
                          wishlist.includes(
                            car.id
                          )
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>


                    {/* VERIFIED */}

                    <span className="car-condition">
                      VERIFIED
                    </span>

                  </div>


                  {/* INFO */}

                  <div className="browse-car-info">

                    <div className="browse-car-title">

                      <div>

                        <span>
                          {car.brand}
                        </span>

                        <h3>
                          {car.model}
                        </h3>

                      </div>

                      <strong>
                        {formatPrice(
                          car.price
                        )}
                      </strong>

                    </div>


                    {/* SPECS */}

                    <div className="browse-car-specs">

                      <span>
                        {car.year}
                      </span>

                      <span>
                        {car.km}
                      </span>

                      <span>
                        {car.fuel}
                      </span>

                      <span>
                        {car.transmission}
                      </span>

                    </div>


                    {/* BOTTOM */}

                    <div className="browse-car-bottom">

                      <span>
                        {car.location}
                      </span>

                      <button
                        onClick={() =>
                          navigate(
                            `/cars/${car.id}`
                          )
                        }
                      >
                        View details

                        <ArrowUpRight
                          size={14}
                        />
                      </button>

                    </div>

                  </div>

                </article>

              ))}

            </div>

          ) : (

            <div className="cars-empty">

              <div>
                <Search size={20} />
              </div>

              <h3>
                No cars found
              </h3>

              <p>
                Try adjusting your search
                or filters.
              </p>

              <button
                onClick={clearFilters}
              >
                Reset filters
              </button>

            </div>

          )}

        </div>

      </section>


      {/* =================================================
          PAGINATION
      ================================================= */}

      <div className="cars-pagination">

        <button
          type="button"
          disabled={page <= 1}
          onClick={() =>
            setPage(
              (current) =>
                Math.max(
                  1,
                  current - 1
                )
            )
          }
        >
          Previous
        </button>


        <span>
          Page{" "}
          {pagination.page || page}{" "}
          of{" "}
          {pagination.pages || 1}
        </span>


        <button
          type="button"
          disabled={
            page >=
            (pagination.pages || 1)
          }
          onClick={() =>
            setPage(
              (current) =>
                Math.min(
                  pagination.pages || 1,
                  current + 1
                )
            )
          }
        >
          Next
        </button>

      </div>

    </div>
  );
};


export default Cars;