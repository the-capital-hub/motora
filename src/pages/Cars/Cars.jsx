import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Heart,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import "./Cars.css";

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "M4 Competition",
    year: 2024,
    price: 14800000,
    type: "Coupe",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "8,200 km",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 2,
    brand: "Mercedes-Benz",
    model: "AMG GT 63 S",
    year: 2024,
    price: 28600000,
    type: "Coupe",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "5,400 km",
    location: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 3,
    brand: "Porsche",
    model: "911 Carrera",
    year: 2023,
    price: 19500000,
    type: "Sports",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "11,800 km",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 4,
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2024,
    price: 21400000,
    type: "SUV",
    fuel: "Diesel",
    transmission: "Automatic",
    km: "9,600 km",
    location: "Delhi",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 5,
    brand: "Audi",
    model: "RS Q8",
    year: 2023,
    price: 17800000,
    type: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "14,200 km",
    location: "Pune",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 6,
    brand: "BMW",
    model: "X5 xDrive40i",
    year: 2024,
    price: 12500000,
    type: "SUV",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "7,100 km",
    location: "Gurgaon",
    image:
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 7,
    brand: "Mercedes-Benz",
    model: "E-Class",
    year: 2023,
    price: 8200000,
    type: "Sedan",
    fuel: "Petrol",
    transmission: "Automatic",
    km: "18,400 km",
    location: "Mumbai",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=85",
  },
  {
    id: 8,
    brand: "Volvo",
    model: "XC90 Recharge",
    year: 2024,
    price: 10500000,
    type: "SUV",
    fuel: "Hybrid",
    transmission: "Automatic",
    km: "6,900 km",
    location: "Bangalore",
    image:
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1200&q=85",
  },
];

const formatPrice = (price) => {
  if (price >= 10000000) {
    return `₹${(price / 10000000).toFixed(2)} Cr`;
  }

  return `₹${(price / 100000).toFixed(1)} L`;
};

const Cars = () => {
  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("All");
  const [bodyType, setBodyType] = useState("All");
  const [fuel, setFuel] = useState("All");
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const brands = [
    "All",
    ...new Set(cars.map((car) => car.brand)),
  ];

  const bodyTypes = [
    "All",
    ...new Set(cars.map((car) => car.type)),
  ];

  const fuels = [
    "All",
    ...new Set(cars.map((car) => car.fuel)),
  ];

  const filteredCars = useMemo(() => {
    let result = cars.filter((car) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        `${car.brand} ${car.model} ${car.type}`
          .toLowerCase()
          .includes(searchValue);

      const matchesBrand =
        brand === "All" || car.brand === brand;

      const matchesBody =
        bodyType === "All" ||
        car.type === bodyType;

      const matchesFuel =
        fuel === "All" ||
        car.fuel === fuel;

      return (
        matchesSearch &&
        matchesBrand &&
        matchesBody &&
        matchesFuel
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "year-new") {
      result.sort((a, b) => b.year - a.year);
    }

    return result;
  }, [search, brand, bodyType, fuel, sort]);

  const toggleWishlist = (id) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const clearFilters = () => {
    setSearch("");
    setBrand("All");
    setBodyType("All");
    setFuel("All");
    setSort("featured");
  };

  return (
    <div className="cars-page">

      {/* =================================
          HEADER
      ================================= */}

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
            Explore a curated collection of premium,
            performance and everyday cars.
          </p>

        </div>

        <div className="cars-header-meta">
          <span>CURATED INVENTORY</span>
          <strong>{cars.length.toString().padStart(2, "0")}</strong>
          <small>vehicles available</small>
        </div>

      </section>


      {/* =================================
          SEARCH
      ================================= */}

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
              onClick={() => setSearch("")}
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
          <SlidersHorizontal size={15} />
          Filters
        </button>

      </section>


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <section className="cars-content">

        {/* FILTERS */}

        <aside
          className={`cars-filters ${
            mobileFilters
              ? "cars-filters-open"
              : ""
          }`}
        >

          <div className="filters-header">

            <div>
              <span>REFINE</span>
              <h2>Filters</h2>
            </div>

            <button
              className="mobile-filter-close"
              onClick={() =>
                setMobileFilters(false)
              }
            >
              <X size={18} />
            </button>

          </div>


          <div className="filter-group">

            <label>BRAND</label>

            <div className="filter-options">

              {brands.map((item) => (
                <button
                  key={item}
                  className={
                    brand === item
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() => setBrand(item)}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>


          <div className="filter-group">

            <label>BODY TYPE</label>

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


          <div className="filter-group">

            <label>FUEL</label>

            <div className="filter-options">

              {fuels.map((item) => (
                <button
                  key={item}
                  className={
                    fuel === item
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() => setFuel(item)}
                >
                  {item}
                </button>
              ))}

            </div>

          </div>


          <button
            className="clear-filters"
            onClick={clearFilters}
          >
            Clear all filters
          </button>

        </aside>


        {/* RESULTS */}

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

              <span>Sort by</span>

              <div className="sort-select">

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
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

                <ChevronDown size={13} />

              </div>

            </div>

          </div>


          {/* CAR GRID */}

          {filteredCars.length > 0 ? (

            <div className="cars-grid">

              {filteredCars.map((car) => (

                <article
                  className="browse-car-card"
                  key={car.id}
                >

                  <div className="browse-car-image">

                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                    />

                    <button
                      className={
                        wishlist.includes(car.id)
                          ? "car-wishlist active"
                          : "car-wishlist"
                      }
                      onClick={() =>
                        toggleWishlist(car.id)
                      }
                      aria-label="Add to wishlist"
                    >
                      <Heart
                        size={16}
                        fill={
                          wishlist.includes(car.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>

                    <span className="car-condition">
                      VERIFIED
                    </span>

                  </div>


                  <div className="browse-car-info">

                    <div className="browse-car-title">

                      <div>
                        <span>{car.brand}</span>

                        <h3>
                          {car.model}
                        </h3>
                      </div>

                      <strong>
                        {formatPrice(car.price)}
                      </strong>

                    </div>


                    <div className="browse-car-specs">

                      <span>{car.year}</span>
                      <span>{car.km}</span>
                      <span>{car.fuel}</span>
                      <span>{car.transmission}</span>

                    </div>


                    <div className="browse-car-bottom">

                      <span>
                        {car.location}
                      </span>

                      <button
                        onClick={() =>
                          window.location.href =
                            `/cars/${car.id}`
                        }
                      >
                        View details
                        <ArrowUpRight size={14} />
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
                Try adjusting your search or filters.
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

    </div>
  );
};

export default Cars;