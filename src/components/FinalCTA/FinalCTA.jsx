import { useEffect, useRef } from "react";
import {
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";

import "./FinalCTA.css";

const FinalCTA = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".final-eyebrow", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
        y: 25,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".final-title-line", {
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

      gsap.from(".final-copy", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
      });

      gsap.from(".final-actions", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="final-cta"
      id="contact"
    >
      {/* BACKGROUND */}

      <div className="final-background">

        <img
          src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=2200&q=90"
          alt=""
        />

        <div className="final-overlay" />

      </div>


      <div className="final-container">

        {/* EYEBROW */}

        <div className="final-eyebrow">
          <span className="final-spark">
            <Sparkles size={12} />
          </span>

          YOUR NEXT AUTOMOBILE
        </div>


        {/* TITLE */}

        <h2 className="final-title">

          <span className="final-title-mask">
            <span className="final-title-line">
              Ready to find
            </span>
          </span>

          <span className="final-title-mask">
            <span className="final-title-line final-title-bold">
              your next car?
            </span>
          </span>

        </h2>


        {/* COPY */}

        <p className="final-copy">
          Discover exceptional automobiles,
          get intelligent recommendations
          and experience a better way to buy.
        </p>


        {/* ACTIONS */}

        <div className="final-actions">

          <a
            href="#collection"
            className="final-primary"
          >
            Explore Collection

            <ArrowUpRight size={18} />
          </a>

          <a
            href="#ai"
            className="final-secondary"
          >
            Talk to MOTORA AI

            <Sparkles size={15} />
          </a>

        </div>


        {/* BOTTOM */}

        <div className="final-bottom">

          <span>
            MOTORA / AUTOMOTIVE INTELLIGENCE
          </span>

          <span>
            DISCOVER · EXPERIENCE · DRIVE
          </span>

        </div>

      </div>

    </section>
  );
};

export default FinalCTA;