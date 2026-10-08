import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Search,
  MapPin,
  X,
  Sparkles,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./CarSearch.css";

const bodyTypes = [
  "SUV",
  "Sedan",
  "Coupe",
  "Convertible",
  "Electric",
];

const purposes = [
  "Family",
  "Business",
  "Performance",
  "Daily Drive",
];

const brands = [
  "BMW",
  "Mercedes Benz",
  "Audi",
  "Porsche",
  "Range Rover",
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const CarSearch = () => {
  const navigate = useNavigate();

  const [bodyType, setBodyType] = useState("SUV");
  const [purpose, setPurpose] = useState("Family");
  const [brand, setBrand] = useState("BMW");
  const [budget, setBudget] = useState(60);

  const [selectedCity, setSelectedCity] = useState("");
  const [citySearch, setCitySearch] = useState("");
  const [showCityModal, setShowCityModal] = useState(false);

  const filteredCities = useMemo(() => {
    const query = citySearch.trim().toLowerCase();

    if (!query) {
      return cities;
    }

    return cities.filter((city) =>
      city.toLowerCase().includes(query)
    );
  }, [citySearch]);

  const handleFindCar = () => {
    setShowCityModal(true);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleContinue = () => {
    if (!selectedCity) {
      return;
    }

    const params = new URLSearchParams();

    if (selectedCity) {
      params.set("city", selectedCity);
    }

    if (bodyType) {
      params.set("type", bodyType);
    }

    if (brand) {
      params.set("brand", brand);
    }

    if (purpose) {
      params.set("purpose", purpose);
    }

    if (budget) {
      params.set("maxPrice", budget * 100000);
    }

    setShowCityModal(false);

    navigate(`/cars?${params.toString()}`);
  };

  const handleAiConcierge = () => {
    navigate("/ai-concierge");
  };

  return (
    <>
      <section className="car-search" id="cars">
        <div className="car-search-container">

          <div className="car-search-header">
            <div className="car-search-eyebrow">
              <span className="eyebrow-line" />
              <span>FIND YOUR CAR</span>
            </div>

            <div className="car-search-heading-row">
              <h2>
                Find a car that
                <br />
                fits your drive
              </h2>

              <p>
                Choose what matters to you and discover
                automobiles that match your lifestyle,
                preferences and budget.
              </p>
            </div>
          </div>

          <div className="car-search-panel">

            <div className="search-field search-field-body">
              <div className="search-field-label">
                BODY TYPE
              </div>

              <div className="search-options">
                {bodyTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className={
                      bodyType === type
                        ? "search-option active"
                        : "search-option"
                    }
                    onClick={() => setBodyType(type)}
                    aria-pressed={bodyType === type}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="search-field search-field-budget">
              <div className="search-field-top">
                <span className="search-field-label">
                  MAXIMUM BUDGET
                </span>

                <strong>
                  ₹{budget}L
                </strong>
              </div>

              <input
                type="range"
                min="20"
                max="150"
                value={budget}
                onChange={(event) =>
                  setBudget(Number(event.target.value))
                }
                className="budget-range"
                aria-label="Maximum budget"
              />

              <div className="range-values">
                <span>₹20L</span>
                <span>₹1.5Cr+</span>
              </div>
            </div>

            <div className="search-field search-field-select">
              <div className="search-field-label">
                PURPOSE
              </div>

              <div className="custom-select">
                <select
                  value={purpose}
                  onChange={(event) =>
                    setPurpose(event.target.value)
                  }
                  aria-label="Purpose"
                >
                  {purposes.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <div className="search-field search-field-select">
              <div className="search-field-label">
                PREFERRED BRAND
              </div>

              <div className="custom-select">
                <select
                  value={brand}
                  onChange={(event) =>
                    setBrand(event.target.value)
                  }
                  aria-label="Preferred brand"
                >
                  {brands.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <button
              type="button"
              className="find-car-button"
              onClick={handleFindCar}
            >
              <span>VIEW CAR COLLECTION</span>

              <span className="find-car-icon">
                <ArrowUpRight size={19} />
              </span>
            </button>
          </div>

          <div className="ai-discovery">

            <div className="ai-discovery-left">

              <div className="ai-discovery-icon">
                <Sparkles
                  size={18}
                  strokeWidth={1.6}
                />
              </div>

              <div className="ai-discovery-content">
                <span className="ai-discovery-label">
                  MOTORA AI
                </span>

                <h3>
                  Let AI find your perfect match
                </h3>

                <p>
                  Share your requirements and get
                  personalised car recommendations.
                </p>
              </div>

            </div>

            <button
              type="button"
              className="ai-discovery-button"
              onClick={handleAiConcierge}
            >
              <span>ASK MOTORA AI</span>

              <ArrowUpRight size={16} />
            </button>

          </div>
        </div>
      </section>

      {showCityModal && (
        <div
          className="city-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="city-modal-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setShowCityModal(false);
            }
          }}
        >
          <div className="city-modal">

            <button
              type="button"
              className="city-modal-close"
              onClick={() => setShowCityModal(false)}
              aria-label="Close city selection"
            >
              <X size={20} />
            </button>

            <div className="city-modal-icon">
              <MapPin size={23} />
            </div>

            <div className="city-modal-heading">
              <span>WELCOME TO MOTORA</span>

              <h2 id="city-modal-title">
                Select your city
              </h2>

              <p>
                Choose your city to discover cars
                available near you.
              </p>
            </div>

            <div className="city-search-box">
              <Search size={19} />

              <input
                type="text"
                value={citySearch}
                onChange={(event) =>
                  setCitySearch(event.target.value)
                }
                placeholder="Search your city"
                aria-label="Search your city"
              />
            </div>

            <div className="popular-city-heading">
              <span>POPULAR CITIES</span>
            </div>

            <div className="city-grid">
              {filteredCities.map((city) => {
                const isSelected = selectedCity === city;

                return (
                  <button
                    key={city}
                    type="button"
                    className={
                      isSelected
                        ? "city-option active"
                        : "city-option"
                    }
                    onClick={() => handleCitySelect(city)}
                  >
                    <span className="city-option-name">
                      {city}
                    </span>

                    {isSelected && (
                      <span className="city-option-check">
                        <Check size={16} />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {filteredCities.length === 0 && (
              <div className="city-empty-state">
                <MapPin size={22} />
                <p>
                  No city found
                </p>
              </div>
            )}

            <button
              type="button"
              className={
                selectedCity
                  ? "city-continue-button active"
                  : "city-continue-button"
              }
              onClick={handleContinue}
              disabled={!selectedCity}
            >
              <span>
                {selectedCity
                  ? `CONTINUE WITH ${selectedCity.toUpperCase()}`
                  : "SELECT A CITY TO CONTINUE"}
              </span>

              <ArrowUpRight size={18} />
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default CarSearch;