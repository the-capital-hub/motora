import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Fuel,
  Gauge,
  MapPin,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/client";
import "./Cars.css";

const BODY_TYPES = [
  "SUV",
  "Sedan",
  "Coupe",
  "Convertible",
  "Hatchback",
];

const FUEL_TYPES = [
  "Petrol",
  "Diesel",
  "Electric",
  "Hybrid",
];

const TRANSMISSIONS = [
  "Automatic",
  "Manual",
];

const CITIES = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Gurgaon",
  "Noida",
];

const MIN_PRICE = 0;
const MAX_PRICE = 15000000;

const MIN_YEAR = 2015;
const MAX_YEAR = new Date().getFullYear();

const MIN_KM = 0;
const MAX_KM = 150000;

const formatPrice = (value) => {
  const amount = Number(value || 0);

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)}Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1)}L`;
  }

  return `₹${amount.toLocaleString("en-IN")}`;
};

const formatKm = (value) => {
  return `${Number(value || 0).toLocaleString("en-IN")} km`;
};

const Cars = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const initialCity = searchParams.get("city") || "All";
  const initialBrand = searchParams.get("brand") || "All";
  const initialType = searchParams.get("type") || "All";
  const initialMaxPrice = Number(searchParams.get("maxPrice")) || MAX_PRICE;

  const [cars, setCars] = useState([]);
  const [filterInventory, setFilterInventory] = useState([]);

  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [city, setCity] = useState(initialCity);
  const [brand, setBrand] = useState(initialBrand);
  const [model, setModel] = useState("All");

  const [bodyType, setBodyType] = useState(
    initialType !== "All" ? initialType : "All"
  );

  const [fuel, setFuel] = useState("All");
  const [transmission, setTransmission] = useState("All");

  const [minPrice, setMinPrice] = useState(MIN_PRICE);
  const [maxPrice, setMaxPrice] = useState(
    Math.min(initialMaxPrice, MAX_PRICE)
  );

  const [minYear, setMinYear] = useState(MIN_YEAR);
  const [maxYear, setMaxYear] = useState(MAX_YEAR);

  const [maxKm, setMaxKm] = useState(MAX_KM);

  const [sort, setSort] = useState("featured");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCars, setTotalCars] = useState(0);

  const [wishlist, setWishlist] = useState([]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [popup, setPopup] = useState(null);

  const [citySearch, setCitySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const [selectedBrandDraft, setSelectedBrandDraft] = useState(brand);
  const [selectedModelDraft, setSelectedModelDraft] = useState(model);

  const [selectedFuelDraft, setSelectedFuelDraft] = useState(fuel);
  const [selectedBodyDraft, setSelectedBodyDraft] =
    useState(bodyType);
  const [selectedTransmissionDraft, setSelectedTransmissionDraft] =
    useState(transmission);

  const [draftMinPrice, setDraftMinPrice] = useState(minPrice);
  const [draftMaxPrice, setDraftMaxPrice] = useState(maxPrice);

  const [draftMinYear, setDraftMinYear] = useState(minYear);
  const [draftMaxYear, setDraftMaxYear] = useState(maxYear);

  const [draftMaxKm, setDraftMaxKm] = useState(maxKm);

  const [favoritesLoading, setFavoritesLoading] = useState(false);

  const openPopup = (type) => {
    if (type === "city") {
      setCitySearch("");
    }

    if (type === "brand") {
      setBrandSearch("");
      setSelectedBrandDraft(brand);
      setSelectedModelDraft(model);
    }

    if (type === "fuel") {
      setSelectedFuelDraft(fuel);
    }

    if (type === "body") {
      setSelectedBodyDraft(bodyType);
    }

    if (type === "transmission") {
      setSelectedTransmissionDraft(transmission);
    }

    if (type === "price") {
      setDraftMinPrice(minPrice);
      setDraftMaxPrice(maxPrice);
    }

    if (type === "year") {
      setDraftMinYear(minYear);
      setDraftMaxYear(maxYear);
    }

    if (type === "km") {
      setDraftMaxKm(maxKm);
    }

    setPopup(type);
  };

  const closePopup = () => {
    setPopup(null);
  };

  const clearFilters = () => {
    setCity("All");
    setBrand("All");
    setModel("All");
    setBodyType("All");
    setFuel("All");
    setTransmission("All");
    setMinPrice(MIN_PRICE);
    setMaxPrice(MAX_PRICE);
    setMinYear(MIN_YEAR);
    setMaxYear(MAX_YEAR);
    setMaxKm(MAX_KM);
    setSearch("");
    setPage(1);

    navigate("/cars");
  };

  const applyCity = (value) => {
    setCity(value);
    setPage(1);
    setPopup(null);
  };

  const applyBrand = () => {
    setBrand(selectedBrandDraft);
    setModel(selectedModelDraft);
    setPage(1);
    setPopup(null);
  };

  const applyPrice = () => {
    const safeMin = Math.min(draftMinPrice, draftMaxPrice);
    const safeMax = Math.max(draftMinPrice, draftMaxPrice);

    setMinPrice(safeMin);
    setMaxPrice(safeMax);
    setPage(1);
    setPopup(null);
  };

  const applyYear = () => {
    const safeMin = Math.min(draftMinYear, draftMaxYear);
    const safeMax = Math.max(draftMinYear, draftMaxYear);

    setMinYear(safeMin);
    setMaxYear(safeMax);
    setPage(1);
    setPopup(null);
  };

  const applyKm = () => {
    setMaxKm(draftMaxKm);
    setPage(1);
    setPopup(null);
  };

  const applyBodyType = () => {
    setBodyType(selectedBodyDraft);
    setPage(1);
    setPopup(null);
  };

  const applyFuel = () => {
    setFuel(selectedFuelDraft);
    setPage(1);
    setPopup(null);
  };

  const applyTransmission = () => {
    setTransmission(selectedTransmissionDraft);
    setPage(1);
    setPopup(null);
  };

  useEffect(() => {
    const fetchFilterInventory = async () => {
      try {
        setFilterLoading(true);

        const data = await api.get(
          "/cars?limit=1000&status=Available"
        );

        const inventory = (data.items || []).map((car) => ({
          id: car._id,
          brand: car.brand || "",
          model: car.model || "",
          year: Number(car.year || 0),
          price: Number(car.price || 0),
          type: car.type || "",
          fuel: car.fuel || "",
          transmission: car.transmission || "",
          km: Number(car.km || 0),
          location: car.location || "",
          featured: Boolean(car.featured),
        }));

        setFilterInventory(inventory);
      } catch (err) {
        console.error("Filter inventory error:", err);
      } finally {
        setFilterLoading(false);
      }
    };

    fetchFilterInventory();
  }, []);

  const brands = useMemo(() => {
    const values = filterInventory
      .map((item) => item.brand)
      .filter(Boolean);

    return ["All", ...Array.from(new Set(values)).sort()];
  }, [filterInventory]);

  const models = useMemo(() => {
    if (selectedBrandDraft === "All") {
      return [];
    }

    const values = filterInventory
      .filter((item) => item.brand === selectedBrandDraft)
      .map((item) => item.model)
      .filter(Boolean);

    return Array.from(new Set(values)).sort();
  }, [filterInventory, selectedBrandDraft]);

  const availableCities = useMemo(() => {
    const values = filterInventory
      .map((item) => item.location)
      .filter(Boolean);

    const unique = Array.from(new Set(values));

    const ordered = [
      ...CITIES.filter((item) => unique.includes(item)),
      ...unique.filter((item) => !CITIES.includes(item)),
    ];

    return ["All", ...ordered];
  }, [filterInventory]);

  const filteredCities = useMemo(() => {
    const query = citySearch.trim().toLowerCase();

    if (!query) {
      return availableCities;
    }

    return availableCities.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }, [availableCities, citySearch]);

  const filteredBrands = useMemo(() => {
    const query = brandSearch.trim().toLowerCase();

    if (!query) {
      return brands;
    }

    return brands.filter((item) =>
      item.toLowerCase().includes(query)
    );
  }, [brands, brandSearch]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        const params = new URLSearchParams();

        params.set("page", String(page));
        params.set("limit", "12");
        params.set("status", "Available");

        if (search.trim()) {
          params.set("search", search.trim());
        }

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
          params.set("transmission", transmission);
        }

        if (minPrice > MIN_PRICE) {
          params.set("minPrice", String(minPrice));
        }

        if (maxPrice < MAX_PRICE) {
          params.set("maxPrice", String(maxPrice));
        }

        if (minYear > MIN_YEAR) {
          params.set("minYear", String(minYear));
        }

        if (maxYear < MAX_YEAR) {
          params.set("maxYear", String(maxYear));
        }

        if (maxKm < MAX_KM) {
          params.set("maxKm", String(maxKm));
        }

        if (city !== "All") {
          params.set("location", city);
        }

        if (sort === "price-low") {
          params.set("sort", "price");
        } else if (sort === "price-high") {
          params.set("sort", "-price");
        } else if (sort === "year-new") {
          params.set("sort", "-year");
        } else {
          params.set("sort", "featured");
        }

        const data = await api.get(`/cars?${params.toString()}`);

        setCars(data.items || []);
        setTotalPages(Number(data.pages || 1));
        setTotalCars(Number(data.total || 0));
      } catch (err) {
        console.error(err);
        setError(
          err.message || "Unable to load the car collection."
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
    city,
    sort,
  ]);

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
    city,
    sort,
  ]);

  const toggleWishlist = async (carId) => {
    if (favoritesLoading) return;

    try {
      setFavoritesLoading(true);

      if (wishlist.includes(carId)) {
        await api.delete(`/wishlist/${carId}`);

        setWishlist((current) =>
          current.filter((id) => id !== carId)
        );
      } else {
        await api.post(`/wishlist/${carId}`);

        setWishlist((current) => [...current, carId]);
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    } finally {
      setFavoritesLoading(false);
    }
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (city !== "All") count += 1;
    if (brand !== "All") count += 1;
    if (model !== "All") count += 1;
    if (bodyType !== "All") count += 1;
    if (fuel !== "All") count += 1;
    if (transmission !== "All") count += 1;
    if (minPrice > MIN_PRICE || maxPrice < MAX_PRICE) count += 1;
    if (minYear > MIN_YEAR || maxYear < MAX_YEAR) count += 1;
    if (maxKm < MAX_KM) count += 1;

    return count;
  }, [
    city,
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
  ]);

  const priceMinPercent =
    ((draftMinPrice - MIN_PRICE) /
      (MAX_PRICE - MIN_PRICE)) *
    100;

  const priceMaxPercent =
    ((draftMaxPrice - MIN_PRICE) /
      (MAX_PRICE - MIN_PRICE)) *
    100;

  const handleMinPriceChange = (event) => {
    const value = Number(event.target.value);

    if (value <= draftMaxPrice) {
      setDraftMinPrice(value);
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = Number(event.target.value);

    if (value >= draftMinPrice) {
      setDraftMaxPrice(value);
    }
  };

  const goToDetails = (carId) => {
    navigate(`/cars/${carId}`);
  };

  const getImage = (car) => {
    if (Array.isArray(car.images) && car.images.length) {
      return car.images[0];
    }

    return "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85";
  };

  const visiblePageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).slice(
    Math.max(0, page - 3),
    Math.min(totalPages, page + 2)
  );

  return (
    <main className="cars-page">

      <section className="cars-header">
        <div className="cars-header-inner">

          <button
            type="button"
            className="cars-back-button"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={16} />
            <span>Back to home</span>
          </button>

          <div className="cars-header-content">
            <div>
              <div className="cars-eyebrow">
                
                MOTORA COLLECTION
              </div>

              <h1>
                Find your next
                <br />
                <em>perfect drive.</em>
              </h1>
            </div>

            <p>
              Explore our curated collection of premium
              automobiles selected for quality, performance
              and everyday confidence.
            </p>
          </div>

        </div>
      </section>

      <section className="cars-toolbar">
        <div className="cars-toolbar-inner">

          <div className="cars-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search cars, brands or models"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
            />

            {search && (
              <button
                type="button"
                className="search-clear"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <button
            type="button"
            className="mobile-filter-button"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={17} />
            Filters

            {activeFilterCount > 0 && (
              <span>{activeFilterCount}</span>
            )}
          </button>

          <div className="cars-sort">
            <span>Sort by</span>

            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price low to high
              </option>
              <option value="price-high">
                Price high to low
              </option>
              <option value="year-new">
                Newest first
              </option>
            </select>

            <ChevronDown size={15} />
          </div>

        </div>
      </section>

      <section className="cars-content">

        <aside
          className={`cars-filters ${
            mobileFiltersOpen ? "is-open" : ""
          }`}
        >

          <div className="mobile-filter-header">
            <div>
              <span>REFINE COLLECTION</span>
              <strong>Filters</strong>
            </div>

            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          <div className="filters-header">
            <div>
              <span>REFINE</span>
              <strong>Find your match</strong>
            </div>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearFilters}
              >
                <RotateCcw size={13} />
                Clear
              </button>
            )}
          </div>

          <button
            type="button"
            className={`filter-card ${
              city !== "All" ? "is-active" : ""
            }`}
            onClick={() => openPopup("city")}
          >
            <div className="filter-card-icon">
              <MapPin size={17} />
            </div>

            <div className="filter-card-content">
              <span>LOCATION</span>
              <strong>
                {city === "All" ? "Select city" : city}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              brand !== "All" ? "is-active" : ""
            }`}
            onClick={() => openPopup("brand")}
          >
            <div className="filter-card-icon">
              <span className="brand-icon">M</span>
            </div>

            <div className="filter-card-content">
              <span>BRAND</span>
              <strong>
                {brand === "All" ? "Select brand" : brand}

                {model !== "All" && (
                  <small>{model}</small>
                )}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              minPrice > MIN_PRICE ||
              maxPrice < MAX_PRICE
                ? "is-active"
                : ""
            }`}
            onClick={() => openPopup("price")}
          >
            <div className="filter-card-icon">
              <span className="price-icon">₹</span>
            </div>

            <div className="filter-card-content">
              <span>PRICE RANGE</span>
              <strong>
                {minPrice > MIN_PRICE ||
                maxPrice < MAX_PRICE
                  ? `${formatPrice(minPrice)} to ${formatPrice(
                      maxPrice
                    )}`
                  : "Any budget"}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              bodyType !== "All" ? "is-active" : ""
            }`}
            onClick={() => openPopup("body")}
          >
            <div className="filter-card-icon">
              <Gauge size={17} />
            </div>

            <div className="filter-card-content">
              <span>BODY TYPE</span>
              <strong>
                {bodyType === "All" ? "All types" : bodyType}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              fuel !== "All" ? "is-active" : ""
            }`}
            onClick={() => openPopup("fuel")}
          >
            <div className="filter-card-icon">
              <Fuel size={17} />
            </div>

            <div className="filter-card-content">
              <span>FUEL TYPE</span>
              <strong>
                {fuel === "All" ? "All fuels" : fuel}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              transmission !== "All" ? "is-active" : ""
            }`}
            onClick={() => openPopup("transmission")}
          >
            <div className="filter-card-icon">
              <span className="transmission-icon">T</span>
            </div>

            <div className="filter-card-content">
              <span>TRANSMISSION</span>
              <strong>
                {transmission === "All"
                  ? "All transmissions"
                  : transmission}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              minYear > MIN_YEAR ||
              maxYear < MAX_YEAR
                ? "is-active"
                : ""
            }`}
            onClick={() => openPopup("year")}
          >
            <div className="filter-card-icon">
              <span className="year-icon">Y</span>
            </div>

            <div className="filter-card-content">
              <span>MODEL YEAR</span>
              <strong>
                {minYear === MIN_YEAR &&
                maxYear === MAX_YEAR
                  ? "Any year"
                  : `${minYear} to ${maxYear}`}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className={`filter-card ${
              maxKm < MAX_KM ? "is-active" : ""
            }`}
            onClick={() => openPopup("km")}
          >
            <div className="filter-card-icon">
              <Gauge size={17} />
            </div>

            <div className="filter-card-content">
              <span>MAXIMUM DISTANCE</span>
              <strong>
                {maxKm >= MAX_KM
                  ? "Any distance"
                  : `Up to ${formatKm(maxKm)}`}
              </strong>
            </div>

            <ChevronRight size={17} />
          </button>

          <button
            type="button"
            className="filters-clear-button"
            onClick={clearFilters}
          >
            <RotateCcw size={15} />
            Reset all filters
          </button>

        </aside>

        {mobileFiltersOpen && (
          <button
            type="button"
            className="filters-overlay"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
        )}

        <div className="cars-results">

          <div className="results-heading">

            <div>
              <span>CURATED FOR YOU</span>

              <h2>
                {totalCars || filterInventory.length || 0}
                {" "}
                premium cars
              </h2>
            </div>

            <div className="results-location">
              <MapPin size={14} />
              <span>
                {city === "All"
                  ? "All locations"
                  : city}
              </span>
            </div>

          </div>

          {error && (
            <div className="cars-error">
              <strong>Something went wrong</strong>
              <span>{error}</span>
            </div>
          )}

          {loading ? (
            <div className="cars-loading-grid">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  className="car-skeleton"
                  key={index}
                >
                  <div className="skeleton-image" />
                  <div className="skeleton-content">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              ))}
            </div>
          ) : cars.length === 0 ? (
            <div className="cars-empty">
              <div className="cars-empty-icon">
                <Filter size={25} />
              </div>

              <h3>No matching cars found</h3>

              <p>
                Try changing your filters or explore
                the complete collection.
              </p>

              <button
                type="button"
                onClick={clearFilters}
              >
                Explore all cars
                <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <>
              <div className="cars-grid">
                {cars.map((car) => {
                  const carId = car._id;

                  return (
                    <article
                      className="car-card"
                      key={carId}
                    >
                      <div className="car-image-wrap">

                        <img
                          src={getImage(car)}
                          alt={`${car.brand} ${car.model}`}
                          className="car-image"
                          loading="lazy"
                        />

                        <div className="car-image-gradient" />

                        {car.featured && (
                          <span className="car-featured">
                            Featured
                          </span>
                        )}

                        <button
                          type="button"
                          className={`car-wishlist ${
                            wishlist.includes(carId)
                              ? "is-active"
                              : ""
                          }`}
                          onClick={() =>
                            toggleWishlist(carId)
                          }
                          aria-label="Save car"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill={
                              wishlist.includes(carId)
                                ? "currentColor"
                                : "none"
                            }
                            stroke="currentColor"
                            strokeWidth="1.7"
                          >
                            <path d="M20.8 8.6c0 5.4-8.8 10.1-8.8 10.1S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.2Z" />
                          </svg>
                        </button>

                        <div className="car-image-bottom">
                          <span>
                            {car.year}
                          </span>

                          <span>
                            {formatKm(car.km)}
                          </span>
                        </div>

                      </div>

                      <div className="car-card-content">

                        <div className="car-card-top">

                          <div>
                            <span className="car-brand">
                              {car.brand}
                            </span>

                            <h3>
                              {car.model}
                            </h3>

                            {car.variant && (
                              <p>
                                {car.variant}
                              </p>
                            )}
                          </div>

                          <strong className="car-price">
                            {formatPrice(car.price)}
                          </strong>

                        </div>

                        <div className="car-meta">

                          <span>
                            {car.fuel}
                          </span>

                          <span>
                            {car.transmission}
                          </span>

                          <span>
                            {car.type}
                          </span>

                        </div>

                        <div className="car-card-footer">

                          <span className="car-location">
                            <MapPin size={13} />
                            {car.location}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              goToDetails(carId)
                            }
                          >
                            View car
                            <ArrowUpRight size={15} />
                          </button>

                        </div>

                      </div>
                    </article>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="cars-pagination">

                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() =>
                      setPage((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={17} />
                  </button>

                  {visiblePageNumbers.map(
                    (pageNumber) => (
                      <button
                        type="button"
                        key={pageNumber}
                        className={
                          page === pageNumber
                            ? "is-active"
                            : ""
                        }
                        onClick={() =>
                          setPage(pageNumber)
                        }
                      >
                        {pageNumber}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={() =>
                      setPage((current) =>
                        Math.min(
                          totalPages,
                          current + 1
                        )
                      )
                    }
                    aria-label="Next page"
                  >
                    <ChevronRight size={17} />
                  </button>

                </div>
              )}
            </>
          )}

        </div>

      </section>

      {popup && (
        <div
          className="filter-modal-backdrop"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closePopup();
            }
          }}
        >
          <div className="filter-modal">

            <div className="filter-modal-header">

              <div>
                <span>
                  {popup === "city" && "LOCATION"}
                  {popup === "brand" && "MANUFACTURER"}
                  {popup === "price" && "BUDGET"}
                  {popup === "body" && "BODY STYLE"}
                  {popup === "fuel" && "POWERTRAIN"}
                  {popup === "transmission" &&
                    "TRANSMISSION"}
                  {popup === "year" && "MODEL YEAR"}
                  {popup === "km" && "DISTANCE"}
                </span>

                <h3>
                  {popup === "city" &&
                    "Where are you shopping?"}

                  {popup === "brand" &&
                    "Choose your preferred brand"}

                  {popup === "price" &&
                    "Set your ideal budget"}

                  {popup === "body" &&
                    "Choose a body type"}

                  {popup === "fuel" &&
                    "Choose a fuel type"}

                  {popup === "transmission" &&
                    "Choose transmission"}

                  {popup === "year" &&
                    "Choose model year"}

                  {popup === "km" &&
                    "Set maximum distance"}
                </h3>
              </div>

              <button
                type="button"
                onClick={closePopup}
                aria-label="Close popup"
              >
                <X size={19} />
              </button>

            </div>

            {popup === "city" && (
              <div className="modal-body">

                <div className="modal-search">
                  <Search size={17} />

                  <input
                    autoFocus
                    type="text"
                    placeholder="Search your city"
                    value={citySearch}
                    onChange={(event) =>
                      setCitySearch(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="modal-option-list">

                  {filteredCities.map(
                    (item) => (
                      <button
                        type="button"
                        key={item}
                        className={
                          city === item
                            ? "modal-option is-selected"
                            : "modal-option"
                        }
                        onClick={() =>
                          applyCity(item)
                        }
                      >
                        <span>
                          <MapPin size={15} />
                          {item === "All"
                            ? "All locations"
                            : item}
                        </span>

                        {city === item && (
                          <Check size={17} />
                        )}
                      </button>
                    )
                  )}

                </div>

              </div>
            )}

            {popup === "brand" && (
              <div className="modal-body">

                <div className="modal-search">
                  <Search size={17} />

                  <input
                    autoFocus
                    type="text"
                    placeholder="Search brand"
                    value={brandSearch}
                    onChange={(event) =>
                      setBrandSearch(
                        event.target.value
                      )
                    }
                  />
                </div>

                <div className="brand-modal-list">

                  {filteredBrands.map(
                    (item) => {
                      const brandModels =
                        filterInventory
                          .filter(
                            (car) =>
                              car.brand === item
                          )
                          .map(
                            (car) =>
                              car.model
                          )
                          .filter(Boolean);

                      const uniqueModels =
                        Array.from(
                          new Set(brandModels)
                        ).sort();

                      return (
                        <div
                          className="brand-modal-group"
                          key={item}
                        >

                          <button
                            type="button"
                            className={
                              selectedBrandDraft ===
                              item
                                ? "brand-modal-row is-selected"
                                : "brand-modal-row"
                            }
                            onClick={() => {
                              setSelectedBrandDraft(
                                item
                              );
                              setSelectedModelDraft(
                                "All"
                              );
                            }}
                          >
                            <span className="brand-radio">
                              {selectedBrandDraft ===
                                item && (
                                <span />
                              )}
                            </span>

                            <strong>
                              {item === "All"
                                ? "All brands"
                                : item}
                            </strong>

                            {selectedBrandDraft ===
                              item && (
                              <Check size={16} />
                            )}
                          </button>

                          {selectedBrandDraft ===
                            item &&
                            item !== "All" &&
                            uniqueModels.length >
                              0 && (
                              <div className="brand-models">

                                <button
                                  type="button"
                                  className={
                                    selectedModelDraft ===
                                    "All"
                                      ? "model-option is-selected"
                                      : "model-option"
                                  }
                                  onClick={() =>
                                    setSelectedModelDraft(
                                      "All"
                                    )
                                  }
                                >
                                  <span>
                                    All models
                                  </span>

                                  {selectedModelDraft ===
                                    "All" && (
                                    <Check size={15} />
                                  )}
                                </button>

                                {uniqueModels.map(
                                  (modelName) => (
                                    <button
                                      type="button"
                                      className={
                                        selectedModelDraft ===
                                        modelName
                                          ? "model-option is-selected"
                                          : "model-option"
                                      }
                                      key={modelName}
                                      onClick={() =>
                                        setSelectedModelDraft(
                                          modelName
                                        )
                                      }
                                    >
                                      <span>
                                        {modelName}
                                      </span>

                                      {selectedModelDraft ===
                                        modelName && (
                                        <Check
                                          size={15}
                                        />
                                      )}
                                    </button>
                                  )
                                )}

                              </div>
                            )}

                        </div>
                      );
                    }
                  )}

                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() => {
                      setSelectedBrandDraft("All");
                      setSelectedModelDraft("All");
                    }}
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyBrand}
                  >
                    Apply brand
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {popup === "price" && (
              <div className="modal-body price-modal">

                <div className="price-display">

                  <div>
                    <span>MINIMUM</span>
                    <strong>
                      {formatPrice(
                        draftMinPrice
                      )}
                    </strong>
                  </div>

                  <div>
                    <span>MAXIMUM</span>
                    <strong>
                      {formatPrice(
                        draftMaxPrice
                      )}
                    </strong>
                  </div>

                </div>

                <div className="range-wrapper">

                  <div
                    className="range-track-active"
                    style={{
                      left: `${priceMinPercent}%`,
                      right: `${
                        100 - priceMaxPercent
                      }%`,
                    }}
                  />

                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100000}
                    value={draftMinPrice}
                    onChange={
                      handleMinPriceChange
                    }
                    className="range-input range-min"
                    aria-label="Minimum price"
                  />

                  <input
                    type="range"
                    min={MIN_PRICE}
                    max={MAX_PRICE}
                    step={100000}
                    value={draftMaxPrice}
                    onChange={
                      handleMaxPriceChange
                    }
                    className="range-input range-max"
                    aria-label="Maximum price"
                  />

                </div>

                <div className="range-labels">
                  <span>₹0</span>
                  <span>₹1.5Cr+</span>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() => {
                      setDraftMinPrice(
                        MIN_PRICE
                      );
                      setDraftMaxPrice(
                        MAX_PRICE
                      );
                    }}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyPrice}
                  >
                    Apply budget
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {popup === "body" && (
              <div className="modal-body">

                <div className="choice-grid">

                  {[
                    "All",
                    ...BODY_TYPES,
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        selectedBodyDraft === item
                          ? "choice-card is-selected"
                          : "choice-card"
                      }
                      onClick={() =>
                        setSelectedBodyDraft(
                          item
                        )
                      }
                    >
                      <span>
                        {item === "All"
                          ? "All types"
                          : item}
                      </span>

                      {selectedBodyDraft ===
                        item && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}

                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() =>
                      setSelectedBodyDraft(
                        "All"
                      )
                    }
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyBodyType}
                  >
                    Apply
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {popup === "fuel" && (
              <div className="modal-body">

                <div className="choice-grid">

                  {[
                    "All",
                    ...FUEL_TYPES,
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        selectedFuelDraft === item
                          ? "choice-card is-selected"
                          : "choice-card"
                      }
                      onClick={() =>
                        setSelectedFuelDraft(
                          item
                        )
                      }
                    >
                      <span>
                        {item === "All"
                          ? "All fuels"
                          : item}
                      </span>

                      {selectedFuelDraft ===
                        item && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}

                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() =>
                      setSelectedFuelDraft(
                        "All"
                      )
                    }
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyFuel}
                  >
                    Apply
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {popup === "transmission" && (
              <div className="modal-body">

                <div className="choice-grid">

                  {[
                    "All",
                    ...TRANSMISSIONS,
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        selectedTransmissionDraft ===
                        item
                          ? "choice-card is-selected"
                          : "choice-card"
                      }
                      onClick={() =>
                        setSelectedTransmissionDraft(
                          item
                        )
                      }
                    >
                      <span>
                        {item === "All"
                          ? "All transmissions"
                          : item}
                      </span>

                      {selectedTransmissionDraft ===
                        item && (
                        <Check size={16} />
                      )}
                    </button>
                  ))}

                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() =>
                      setSelectedTransmissionDraft(
                        "All"
                      )
                    }
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyTransmission}
                  >
                    Apply
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {popup === "year" && (
              <div className="modal-body price-modal">

                <div className="price-display">

                  <div>
                    <span>FROM</span>
                    <strong>
                      {draftMinYear}
                    </strong>
                  </div>

                  <div>
                    <span>TO</span>
                    <strong>
                      {draftMaxYear}
                    </strong>
                  </div>

                </div>

                <div className="year-range-grid">

                  <label>
                    <span>Minimum year</span>

                    <select
                      value={draftMinYear}
                      onChange={(event) =>
                        setDraftMinYear(
                          Number(
                            event.target.value
                          )
                        )
                      }
                    >
                      {Array.from(
                        {
                          length:
                            MAX_YEAR -
                            MIN_YEAR +
                            1,
                        },
                        (_, index) =>
                          MIN_YEAR + index
                      ).map((year) => (
                        <option
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label>
                    <span>Maximum year</span>

                    <select
                      value={draftMaxYear}
                      onChange={(event) =>
                        setDraftMaxYear(
                          Number(
                            event.target.value
                          )
                        )
                      }
                    >
                      {Array.from(
                        {
                          length:
                            MAX_YEAR -
                            MIN_YEAR +
                            1,
                        },
                        (_, index) =>
                          MIN_YEAR + index
                      ).map((year) => (
                        <option
                          key={year}
                          value={year}
                        >
                          {year}
                        </option>
                      ))}
                    </select>
                  </label>

                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() => {
                      setDraftMinYear(
                        MIN_YEAR
                      );
                      setDraftMaxYear(
                        MAX_YEAR
                      );
                    }}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyYear}
                  >
                    Apply year
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

            {popup === "km" && (
              <div className="modal-body price-modal">

                <div className="price-display">

                  <div>
                    <span>MAXIMUM DISTANCE</span>
                    <strong>
                      {formatKm(
                        draftMaxKm
                      )}
                    </strong>
                  </div>

                </div>

                <input
                  type="range"
                  min={MIN_KM}
                  max={MAX_KM}
                  step={5000}
                  value={draftMaxKm}
                  onChange={(event) =>
                    setDraftMaxKm(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="single-range"
                  aria-label="Maximum distance"
                />

                <div className="range-labels">
                  <span>0 km</span>
                  <span>150,000 km</span>
                </div>

                <div className="modal-actions">
                  <button
                    type="button"
                    className="modal-reset"
                    onClick={() =>
                      setDraftMaxKm(MAX_KM)
                    }
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    className="modal-apply"
                    onClick={applyKm}
                  >
                    Apply distance
                    <ArrowUpRight size={16} />
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

    </main>
  );
};

export default Cars;