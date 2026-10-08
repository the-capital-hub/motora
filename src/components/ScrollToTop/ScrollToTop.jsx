import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import "./ScrollToTop.css";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`scroll-to-top ${
        visible ? "is-visible" : ""
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp
        size={19}
        strokeWidth={1.8}
      />
    </button>
  );
};

export default ScrollToTop;