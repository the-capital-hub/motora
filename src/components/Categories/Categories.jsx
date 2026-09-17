import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";

import "./Categories.css";

const categories = [
  {
    number: "01",
    title: "LUXURY",
    description:
      "Refined. Effortless. Extraordinary.",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "02",
    title: "PERFORMANCE",
    description:
      "Built for those who love to drive.",
    image:
      "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "03",
    title: "SUV",
    description:
      "Space. Presence. Capability.",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1800&q=85",
  },
  {
    number: "04",
    title: "ELECTRIC",
    description:
      "The future, beautifully engineered.",
    image:
      "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=1800&q=85",
  },
];

const Categories = () => {
  const sectionRef = useRef(null);

  const [activeCategory, setActiveCategory] =
    useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".categories-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".categories-title-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        yPercent: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
      });

      gsap.from(".category-row", {
        scrollTrigger: {
          trigger: ".categories-list",
          start: "top 80%",
        },
        y: 35,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power4.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="categories"
      id="categories"
    >
      {/* =================================
          BACKGROUND IMAGE
      ================================= */}

      <div className="categories-background">

        {categories.map((category, index) => (
          <img
            key={category.number}
            src={category.image}
            alt=""
            className={
              activeCategory === index
                ? "category-background-image active"
                : "category-background-image"
            }
          />
        ))}

        <div className="categories-overlay" />

      </div>


      <div className="categories-container">

        {/* =================================
            HEADER
        ================================= */}

        <div className="categories-header">

          <div className="categories-eyebrow">
            <span />
            DISCOVER YOUR STYLE
          </div>

          <h2 className="categories-title">

            <span className="categories-title-mask">
              <span className="categories-title-line">
                What drives
              </span>
            </span>

            <span className="categories-title-mask">
              <span className="categories-title-line categories-title-bold">
                you?
              </span>
            </span>

          </h2>

        </div>


        {/* =================================
            CATEGORY LIST
        ================================= */}

        <div className="categories-list">

          {categories.map((category, index) => (
            <div
              key={category.number}
              className={
                activeCategory === index
                  ? "category-row active"
                  : "category-row"
              }
              onMouseEnter={() =>
                setActiveCategory(index)
              }
              onClick={() =>
                setActiveCategory(index)
              }
            >

              <div className="category-number">
                {category.number}
              </div>


              <div className="category-main">

                <h3>
                  {category.title}
                </h3>

                <p>
                  {category.description}
                </p>

              </div>


              <div className="category-action">

                <span>
                  EXPLORE
                </span>

                <ArrowUpRight
                  size={19}
                />

              </div>

            </div>
          ))}

        </div>


        {/* =================================
            FOOTER TEXT
        ================================= */}

        <div className="categories-footer">

          <span>
            FIND A CAR THAT FEELS LIKE YOU.
          </span>

          <span>
            MOTORA / 04
          </span>

        </div>

      </div>
    </section>
  );
};

export default Categories;