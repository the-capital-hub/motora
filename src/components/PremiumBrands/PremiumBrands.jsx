import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

import "./PremiumBrands.css";

const brands = [
  {
    number: "01",
    name: "BMW",
    tagline: "THE ULTIMATE DRIVING MACHINE",
    image:
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "02",
    name: "MERCEDES-BENZ",
    tagline: "THE BEST OR NOTHING",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "03",
    name: "PORSCHE",
    tagline: "THERE IS NO SUBSTITUTE",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "04",
    name: "AUDI",
    tagline: "VORSPRUNG DURCH TECHNIK",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1600&q=85",
  },
  {
    number: "05",
    name: "RANGE ROVER",
    tagline: "ABOVE AND BEYOND",
    image:
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=85",
  },
];

const PremiumBrands = () => {
  const sectionRef = useRef(null);
  const [activeBrand, setActiveBrand] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".brands-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".brands-title-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });

      gsap.from(".brand-row", {
        scrollTrigger: {
          trigger: ".brands-list",
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="premium-brands"
      id="brands"
    >
      {/* BACKGROUND */}

      <div className="brands-background">
        {brands.map((brand, index) => (
          <img
            key={brand.number}
            src={brand.image}
            alt=""
            className={
              activeBrand === index
                ? "brand-bg-image active"
                : "brand-bg-image"
            }
          />
        ))}

        <div className="brands-overlay" />
      </div>


      <div className="brands-container">

        {/* HEADER */}

        <div className="brands-header">

          <div className="brands-eyebrow">
            <span />
            THE COLLECTION
          </div>

          <h2 className="brands-title">

            <span className="brands-title-mask">
              <span className="brands-title-line">
                The world's most
              </span>
            </span>

            <span className="brands-title-mask">
              <span className="brands-title-line brands-title-bold">
                desired brands.
              </span>
            </span>

          </h2>

        </div>


        {/* BRAND LIST */}

        <div className="brands-list">

          {brands.map((brand, index) => (
            <div
              key={brand.number}
              className={
                activeBrand === index
                  ? "brand-row active"
                  : "brand-row"
              }
              onMouseEnter={() =>
                setActiveBrand(index)
              }
              onClick={() =>
                setActiveBrand(index)
              }
            >

              <span className="brand-number">
                {brand.number}
              </span>


              <div className="brand-name-wrapper">

                <h3>
                  {brand.name}
                </h3>

                <span>
                  {brand.tagline}
                </span>

              </div>


              <div className="brand-action">

                <span>
                  EXPLORE
                </span>

                <ArrowUpRight size={20} />

              </div>

            </div>
          ))}

        </div>


        {/* FOOTER */}

        <div className="brands-footer">

          <span>
            CURATED AUTOMOTIVE EXCELLENCE
          </span>

          <span>
            MOTORA / BRANDS
          </span>

        </div>

      </div>

    </section>
  );
};

export default PremiumBrands;