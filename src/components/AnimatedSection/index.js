// AnimatedSection.jsx
import React, { useRef, useEffect } from "react";
import "./index.css";

const AnimatedSection = ({ children }) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("entry",entry.target.classList)
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target); // Stop observing once the animation is triggered
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Adjust the threshold as needed
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className="section">
      {children}
    </div>
  );
};

export default AnimatedSection;
