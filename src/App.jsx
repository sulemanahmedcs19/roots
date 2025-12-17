import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "./components/header";
import Hero from "./components/hero";
import Services from "./components/Services";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import Portfolio from "./components/Portfolio";
import RobotLoader from "./components/RobotLoader";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const sections = [
    "hero",
    "services",
    "blog",
    "contact",
    "pricing",
    "portfolio",
  ];
  const sectionRefs = useRef([]);
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);
  const touchStartX = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  // Mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // AOS init
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-out-cubic" });
  }, []);

  // Scroll handler
  const scrollToPanel = (index, updateURL = true) => {
    if (
      index < 0 ||
      index >= sections.length ||
      !containerRef.current ||
      isModalOpen ||
      isMobile
    )
      return;

    currentIndex.current = index;
    isScrolling.current = true;

    gsap.to(containerRef.current, {
      scrollLeft: index * window.innerWidth,
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        isScrolling.current = false;
        setActiveIndex(index);
        if (updateURL) navigate("/" + sections[index], { replace: true });
      },
    });
  };

  // Disable scroll when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      if (containerRef.current) containerRef.current.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      if (containerRef.current)
        containerRef.current.style.overflow = isMobile ? "auto" : "hidden";
    }
  }, [isModalOpen, isMobile]);

  // Mouse wheel scroll (desktop)
  useEffect(() => {
    if (loading || isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e) => {
      if (isModalOpen) return;
      e.preventDefault();
      if (isScrolling.current) return;
      if (e.deltaY > 0) scrollToPanel(currentIndex.current + 1);
      else scrollToPanel(currentIndex.current - 1);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [loading, isModalOpen, isMobile]);

  // Arrow keys (desktop)
  useEffect(() => {
    if (isMobile) return;
    const handleKey = (e) => {
      if (isModalOpen || isScrolling.current) return;
      if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;

      if (e.key === "ArrowRight" || e.key === "ArrowDown")
        scrollToPanel(currentIndex.current + 1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
        scrollToPanel(currentIndex.current - 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isModalOpen, isMobile]);

  // Touch swipe (desktop)
  useEffect(() => {
    if (isMobile) return;
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      if (isModalOpen) return;
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
  }, [isModalOpen, isMobile]);

  // Sync URL on refresh
  useEffect(() => {
    const path = location.pathname.replace(/\/$/, "");
    const index = sections.findIndex((sec) => "/" + sec === path);
    if (index >= 0) requestAnimationFrame(() => scrollToPanel(index, false));
  }, [location.pathname, isMobile]);

  // Intersection observer for active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveIndex(index);
            if (!isScrolling.current && !isModalOpen) {
              currentIndex.current = index;
              navigate("/" + sections[index], { replace: true });
            }
          }
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );

    sectionRefs.current.forEach((sec) => sec && observer.observe(sec));
    return () =>
      sectionRefs.current.forEach((sec) => sec && observer.unobserve(sec));
  }, [isModalOpen]);

  if (loading) {
    return (
      <RobotLoader
        onFinish={() => setLoading(false)}
        scrollToPanel={scrollToPanel}
      />
    );
  }

  const panelStyle = isMobile
    ? "w-full h-auto relative" // Mobile vertical
    : "w-screen h-screen flex-shrink-0 relative"; // Desktop horizontal

  return (
    <div className="overflow-hidden w-screen h-screen relative bg-gray-900">
      <div className="fixed top-0 left-0 w-screen z-50">
        <Header scrollToPanel={scrollToPanel} />
      </div>

      <main
        ref={containerRef}
        className={`flex ${
          isMobile ? "flex-col overflow-y-auto" : "flex-row overflow-x-hidden"
        } w-screen h-screen`}
      >
        {[Hero, Services, Blog, Contact, Pricing, Portfolio].map(
          (Component, idx) => (
            <motion.section
              key={idx}
              ref={(el) => (sectionRefs.current[idx] = el)}
              data-index={idx}
              className={panelStyle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Component
                scrollToPanel={scrollToPanel}
                setModalOpen={
                  Component === Blog || Component === Portfolio
                    ? setIsModalOpen
                    : undefined
                }
              />
            </motion.section>
          )
        )}
      </main>

      {/* Navigation Dots (desktop only) */}
      {!isMobile && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex gap-3 bg-black/60 backdrop-blur-lg px-5 py-3 rounded-full border border-gray-700 shadow-lg">
            {sections.map((_, idx) => (
              <motion.button
                key={idx}
                onClick={() => scrollToPanel(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "bg-blue-500"
                    : "bg-gray-600 hover:bg-gray-400"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ width: "0.5rem" }}
                animate={{
                  width: activeIndex === idx ? "2.5rem" : "0.5rem",
                  backgroundColor: activeIndex === idx ? "#3b82f6" : "#4b5563",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
