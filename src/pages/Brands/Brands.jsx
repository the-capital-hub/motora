import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Search,
  Sparkles,
} from "lucide-react";

import "./Brands.css";

const brands = [
  {
    id: 1,
    name: "BMW",
    country: "Germany",
    founded: "1916",
    tagline: "The ultimate driving machine.",
    description:
      "Performance, precision and unmistakable design come together across BMW's luxury and performance range.",
    models: ["3 Series", "5 Series", "7 Series", "X5", "M4"],
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 2,
    name: "Mercedes-Benz",
    country: "Germany",
    founded: "1926",
    tagline: "The best or nothing.",
    description:
      "A blend of luxury, technology and performance designed around an unmistakable premium experience.",
    models: ["C-Class", "E-Class", "S-Class", "GLE", "AMG GT"],
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 3,
    name: "Porsche",
    country: "Germany",
    founded: "1931",
    tagline: "There is no substitute.",
    description:
      "Engineering focused on the pure pleasure of driving, from iconic sports cars to performance SUVs.",
    models: ["911", "718", "Taycan", "Cayenne", "Macan"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 4,
    name: "Audi",
    country: "Germany",
    founded: "1909",
    tagline: "Vorsprung durch Technik.",
    description:
      "Progressive design and advanced technology define Audi's modern luxury vehicle lineup.",
    models: ["A4", "A6", "A8", "Q7", "RS Q8"],
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 5,
    name: "Land Rover",
    country: "United Kingdom",
    founded: "1948",
    tagline: "Above and beyond.",
    description:
      "Luxury, capability and adventure come together in a range built for both city streets and open terrain.",
    models: ["Defender", "Discovery", "Velar", "Sport", "Range Rover"],
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 6,
    name: "Volvo",
    country: "Sweden",
    founded: "1927",
    tagline: "Designed around people.",
    description:
      "Scandinavian design, safety and thoughtful technology define Volvo's premium experience.",
    models: ["XC40", "XC60", "XC90", "S90", "EX90"],
    image:
      "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 7,
    name: "Lexus",
    country: "Japan",
    founded: "1989",
    tagline: "Experience amazing.",
    description:
      "Refined craftsmanship, quiet luxury and advanced engineering shape the Lexus experience.",
    models: ["ES", "LS", "NX", "RX", "LX"],
    image:
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: 8,
    name: "Jaguar",
    country: "United Kingdom",
    founded: "1935",
    tagline: "Copy nothing.",
    description:
      "Distinctive design and dynamic performance create Jaguar's unmistakable character.",
    models: ["XE", "XF", "F-Pace", "F-Type", "I-Pace"],
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1400&q=85",
  },
];

const Brands = () => {
  const [search, setSearch] = useState("");
  const [activeBrand, setActiveBrand] = useState(null);

  const filteredBrands = useMemo(() => {
    return brands.filter((brand) => {
      const value = search.toLowerCase();

      return (
        brand.name.toLowerCase().includes(value) ||
        brand.country.toLowerCase().includes(value) ||
        brand.models.some((model) =>
          model.toLowerCase().includes(value)
        )
      );
    });
  }, [search]);

  const selectedBrand =
    brands.find((brand) => brand.id === activeBrand) ||
    null;

  return (
    <div className="brands-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="brands-hero">

        <div className="brands-hero-content">

          <span className="brands-eyebrow">
            MOTORA COLLECTION
          </span>

          <h1>
            The brands
            <br />
            <strong>worth knowing.</strong>
          </h1>

          <p>
            Explore a carefully curated selection of
            the world's most desirable automotive
            marques.
          </p>

        </div>

        <div className="brands-hero-meta">

          <span>
            CURATED BRANDS
          </span>

          <strong>
            {String(brands.length).padStart(2, "0")}
          </strong>

          <small>
            premium marques
          </small>

        </div>

      </section>


      {/* =================================
          SEARCH
      ================================= */}

      <section className="brands-search-section">

        <div className="brands-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search brands or models..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="brands-search-count">
          {filteredBrands.length} brands
        </div>

      </section>


      {/* =================================
          FEATURED BRAND
      ================================= */}

      {!search && (
        <section className="featured-brand">

          <div className="featured-brand-image">

            <img
              src={brands[0].image}
              alt={brands[0].name}
            />

            <div className="featured-brand-overlay" />

            <span>
              FEATURED MARQUE
            </span>

          </div>

          <div className="featured-brand-content">

            <span>
              {brands[0].country} · Since{" "}
              {brands[0].founded}
            </span>

            <h2>
              {brands[0].name}
            </h2>

            <h3>
              {brands[0].tagline}
            </h3>

            <p>
              {brands[0].description}
            </p>

            <button
              onClick={() =>
                setActiveBrand(brands[0].id)
              }
            >
              Explore BMW
              <ArrowUpRight size={15} />
            </button>

          </div>

        </section>
      )}


      {/* =================================
          BRANDS
      ================================= */}

      <section className="brands-section">

        <div className="brands-section-header">

          <div>
            <span>
              ALL MARQUES
            </span>

            <h2>
              Find your marque.
            </h2>
          </div>

          <p>
            From understated luxury to pure
            performance, find the brand that
            fits your taste.
          </p>

        </div>


        <div className="brands-grid">

          {filteredBrands.map((brand, index) => (

            <article
              className="brand-card"
              key={brand.id}
              onClick={() =>
                setActiveBrand(brand.id)
              }
            >

              <div className="brand-card-image">

                <img
                  src={brand.image}
                  alt={brand.name}
                />

                <div className="brand-card-overlay" />

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <button
                  aria-label={`Explore ${brand.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveBrand(brand.id);
                  }}
                >
                  <ArrowUpRight size={15} />
                </button>

              </div>


              <div className="brand-card-content">

                <div>

                  <span>
                    {brand.country}
                  </span>

                  <h3>
                    {brand.name}
                  </h3>

                </div>

                <ChevronRight size={15} />

              </div>


              <div className="brand-models">

                {brand.models.slice(0, 4).map(
                  (model) => (
                    <span key={model}>
                      {model}
                    </span>
                  )
                )}

              </div>

            </article>

          ))}

        </div>


        {filteredBrands.length === 0 && (
          <div className="brands-empty">

            <Sparkles size={22} />

            <h3>
              No brand found.
            </h3>

            <p>
              Try searching for another brand
              or model.
            </p>

          </div>
        )}

      </section>


      {/* =================================
          AI BRAND DISCOVERY
      ================================= */}

      <section className="brand-ai-section">

        <div className="brand-ai-icon">
          <Sparkles size={20} />
        </div>

        <div className="brand-ai-content">

          <span>
            MOTORA AI CONCIERGE
          </span>

          <h2>
            Not sure which brand
            <br />
            is right for you?
          </h2>

          <p>
            Tell us what you value — performance,
            comfort, design, practicality or all of
            them — and we'll help narrow it down.
          </p>

        </div>

        <button>
          Find my perfect brand
          <ArrowUpRight size={15} />
        </button>

      </section>


      {/* =================================
          BRAND MODAL
      ================================= */}

      {selectedBrand && (
        <div
          className="brand-modal-overlay"
          onClick={() =>
            setActiveBrand(null)
          }
        >

          <div
            className="brand-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              className="brand-modal-close"
              onClick={() =>
                setActiveBrand(null)
              }
            >
              ×
            </button>

            <div className="brand-modal-image">

              <img
                src={selectedBrand.image}
                alt={selectedBrand.name}
              />

              <div />

              <span>
                {selectedBrand.country} ·{" "}
                {selectedBrand.founded}
              </span>

            </div>


            <div className="brand-modal-content">

              <span>
                PREMIUM MARQUE
              </span>

              <h2>
                {selectedBrand.name}
              </h2>

              <h3>
                {selectedBrand.tagline}
              </h3>

              <p>
                {selectedBrand.description}
              </p>


              <div className="brand-modal-models">

                <small>
                  POPULAR MODELS
                </small>

                <div>
                  {selectedBrand.models.map(
                    (model) => (
                      <span key={model}>
                        {model}
                      </span>
                    )
                  )}
                </div>

              </div>


              <button
                className="brand-modal-action"
                onClick={() => {
                  window.location.href =
                    "/cars";
                }}
              >
                Explore {selectedBrand.name} cars
                <ArrowUpRight size={15} />
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default Brands;
