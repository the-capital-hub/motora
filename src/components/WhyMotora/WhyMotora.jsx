import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  BadgeCheck,
  Eye,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import gsap from "gsap";

import "./WhyMotora.css";

const reasons = [
  {
    number: "01",
    title: "VERIFIED VEHICLES",
    description:
      "Every automobile goes through a detailed verification process before it becomes part of the MOTORA collection.",
    icon: ShieldCheck,
    image:
      "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "02",
    title: "COMPLETE TRANSPARENCY",
    description:
      "Clear pricing, detailed specifications and relevant vehicle information help you make confident decisions.",
    icon: Eye,
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "03",
    title: "PREMIUM EXPERIENCE",
    description:
      "From the first discovery to the final delivery, every interaction is designed around a seamless premium experience.",
    icon: BadgeCheck,
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    number: "04",
    title: "AI + HUMAN ASSISTANCE",
    description:
      "Smart recommendations from MOTORA AI combined with genuine human expertise whenever you need it.",
    icon: Sparkles,
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=85",
  },
];

const WhyMotora = () => {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".why-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".why-title-line", {
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

      gsap.from(".why-row", {
        scrollTrigger: {
          trigger: ".why-list",
          start: "top 80%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const ActiveIcon = reasons[active].icon;

  return (
    <section
      ref={sectionRef}
      className="why-motora"
      id="why-motora"
    >
      <div className="why-container">

        {/* HEADER */}

        <div className="why-header">

          <div className="why-heading">

            <div className="why-eyebrow">
              <span />
              WHY MOTORA
            </div>

            <h2 className="why-title">

              <span className="why-title-mask">
                <span className="why-title-line">
                  Buy with
                </span>
              </span>

              <span className="why-title-mask">
                <span className="why-title-line why-title-bold">
                  confidence.
                </span>
              </span>

            </h2>

          </div>

          <p className="why-intro">
            Exceptional automobiles deserve an
            exceptional buying experience.
          </p>

        </div>


        {/* CONTENT */}

        <div className="why-content">

          {/* LEFT LIST */}

          <div className="why-list">

            {reasons.map((reason, index) => {
              const Icon = reason.icon;

              return (
                <div
                  key={reason.number}
                  className={
                    active === index
                      ? "why-row active"
                      : "why-row"
                  }
                  onMouseEnter={() =>
                    setActive(index)
                  }
                  onClick={() =>
                    setActive(index)
                  }
                >

                  <span className="why-number">
                    {reason.number}
                  </span>

                  <div className="why-row-main">

                    <div className="why-row-title">

                      <h3>
                        {reason.title}
                      </h3>

                      <Icon size={18} />

                    </div>

                    <p>
                      {reason.description}
                    </p>

                  </div>

                  <ArrowUpRight
                    className="why-arrow"
                    size={19}
                  />

                </div>
              );
            })}

          </div>


          {/* RIGHT VISUAL */}

          <div className="why-visual">

            {reasons.map((reason, index) => (
              <img
                key={reason.number}
                src={reason.image}
                alt=""
                className={
                  active === index
                    ? "why-image active"
                    : "why-image"
                }
              />
            ))}

            <div className="why-visual-overlay" />

            <div className="why-visual-content">

              <span>
                {reasons[active].number}
              </span>

              <div className="why-visual-icon">
                <ActiveIcon size={20} />
              </div>

              <h3>
                {reasons[active].title}
              </h3>

              <p>
                {reasons[active].description}
              </p>

            </div>

            <div className="why-visual-meta">
              MOTORA / EXPERIENCE
            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="why-footer">

          <span>
            DESIGNED AROUND YOU
          </span>

          <span>
            MOTORA / 04
          </span>

        </div>

      </div>
    </section>
  );
};

export default WhyMotora;