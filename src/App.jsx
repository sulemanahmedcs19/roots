import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/header";
import Hero from "./components/hero";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import RobotLoader from "./components/RobotLoader";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AOS from "aos";
import "aos/dist/aos.css";

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // ⭐ UPDATED: Services ko sections me add kar diya
  const sections = ["hero", "services", "blog", "contact", "pricing"];

  const currentIndex = useRef(0);
  const isScrolling = useRef(false);
  const touchStartX = useRef(0);
  const sectionRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1500, once: true });
  }, []);

  // ⭐ Scroll function
  const scrollToPanel = (index, updateURL = true) => {
    if (index < 0 || index >= sections.length || !containerRef.current) return;

    currentIndex.current = index;
    isScrolling.current = true;
    const scrollTo = index * window.innerWidth;

    gsap.to(containerRef.current, {
      scrollLeft: scrollTo,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isScrolling.current = false;
        setActiveIndex(index);

        if (updateURL) navigate("/" + sections[index], { replace: true });
      },
    });
  };

  // ⭐ Mouse wheel navigation
  useEffect(() => {
    if (loading) return;
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      e.preventDefault();
      if (isScrolling.current) return;

      if (e.deltaY > 0) scrollToPanel(currentIndex.current + 1);
      else scrollToPanel(currentIndex.current - 1);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [loading]);

  // ⭐ Arrow keys support
  useEffect(() => {
    const handleKey = (e) => {
      if (isScrolling.current) return;

      if (["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        scrollToPanel(currentIndex.current + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        scrollToPanel(currentIndex.current - 1);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ⭐ Mobile swipe support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) < 75) return;

      if (diff > 0) scrollToPanel(currentIndex.current + 1);
      else scrollToPanel(currentIndex.current - 1);
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  // ⭐ Sync URL on refresh
  useEffect(() => {
    const path = location.pathname.replace(/\/$/, "");
    const index = sections.findIndex((sec) => "/" + sec === path);

    if (index >= 0) {
      requestAnimationFrame(() => scrollToPanel(index, false));
    }
  }, [location.pathname]);

  // ⭐ Intersection observer for active indicator
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);

            if (!isScrolling.current) {
              currentIndex.current = index;
              navigate("/" + sections[index], { replace: true });
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.5,
      }
    );

    sectionRefs.current.forEach((sec) => sec && observer.observe(sec));

    return () => {
      sectionRefs.current.forEach((sec) => sec && observer.unobserve(sec));
    };
  }, []);

  // ⭐ Loader
  if (loading)
    return (
      <RobotLoader
        onFinish={() => setLoading(false)}
        scrollToPanel={scrollToPanel}
      />
    );

  const panelStyle = "w-screen h-screen flex-shrink-0 relative";

  return (
    <div className="overflow-hidden w-screen h-screen relative">
      {/* Header */}
      <div className="fixed top-0 left-0 w-screen z-50">
        <Header scrollToPanel={scrollToPanel} />
      </div>

      {/* Main Sections */}
      <main
        ref={containerRef}
        className="flex w-screen h-screen overflow-x-hidden overflow-y-hidden"
      >
        {/* ⭐ UPDATED: Services added here */}
        {[Hero, Services, Blog, Contact, Pricing].map((Component, idx) => (
          <section
            key={idx}
            ref={(el) => (sectionRefs.current[idx] = el)}
            data-index={idx}
            className={`panel ${panelStyle}`}
          >
            <Component scrollToPanel={scrollToPanel} />
          </section>
        ))}
      </main>

      {/* Right Side Dots Navigation */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
        {sections.map((_, idx) => (
          <button
            key={idx}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === idx ? "bg-white scale-150" : "bg-gray-500"
            }`}
            onClick={() => scrollToPanel(idx)}
          />
        ))}
      </div>
    </div>
  );
}
