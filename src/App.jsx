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

gsap.registerPlugin(ScrollToPlugin);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [activeIndex, setActiveIndex] = useState(0);

  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const currentIndex = useRef(0);
  const isScrolling = useRef(false);

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

  /* -------------------- Resize -------------------- */
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* -------------------- Body scroll lock -------------------- */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  /* -------------------- AOS -------------------- */
  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  /* -------------------- Scroll To Panel -------------------- */
  const scrollToPanel = (index, updateURL = true) => {
    if (
      index < 0 ||
      index >= sections.length ||
      !containerRef.current ||
      isModalOpen ||
      isScrolling.current
    )
      return;

    currentIndex.current = index;
    setActiveIndex(index);
    isScrolling.current = true;

    const value = index * (isMobile ? window.innerHeight : window.innerWidth);
    const prop = isMobile ? "scrollTop" : "scrollLeft";

    gsap.to(containerRef.current, {
      [prop]: value,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        isScrolling.current = false;
        if (updateURL) navigate("/" + sections[index], { replace: true });
      },
    });
  };

  /* -------------------- Mouse Wheel (Desktop) -------------------- */
  useEffect(() => {
    if (isMobile || loading) return;
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e) => {
      e.preventDefault();
      if (e.deltaY > 0) scrollToPanel(currentIndex.current + 1);
      else scrollToPanel(currentIndex.current - 1);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isMobile, loading]);

  /* -------------------- Touch Swipe (Mobile) -------------------- */
  useEffect(() => {
    if (!isMobile) return;
    const el = containerRef.current;
    if (!el) return;

    let startY = 0;

    const start = (e) => (startY = e.touches[0].clientY);
    const end = (e) => {
      const diff = startY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 60) {
        diff > 0
          ? scrollToPanel(currentIndex.current + 1)
          : scrollToPanel(currentIndex.current - 1);
      }
    };

    el.addEventListener("touchstart", start);
    el.addEventListener("touchend", end);
    return () => {
      el.removeEventListener("touchstart", start);
      el.removeEventListener("touchend", end);
    };
  }, [isMobile]);

  /* -------------------- URL Sync -------------------- */
  useEffect(() => {
    const path = location.pathname.replace("/", "");
    const index = sections.indexOf(path);
    if (index >= 0) requestAnimationFrame(() => scrollToPanel(index, false));
  }, [location.pathname, isMobile]);

  /* -------------------- Loader -------------------- */
  if (loading) {
    return <RobotLoader onFinish={() => setLoading(false)} />;
  }

  /* -------------------- Styles -------------------- */
  const panelClass = "w-screen h-screen flex-shrink-0 relative overflow-hidden";

  return (
    <div className="w-screen h-screen overflow-hidden bg-gray-900 relative">
      <Header scrollToPanel={scrollToPanel} />

      <main
        ref={containerRef}
        className={`flex ${
          isMobile ? "flex-col overflow-y-auto" : "flex-row overflow-x-hidden"
        } w-screen h-screen`}
      >
        {[Hero, Services, Blog, Contact, Pricing, Portfolio].map(
          (Component, i) => (
            <section
              key={i}
              ref={(el) => (sectionRefs.current[i] = el)}
              className={panelClass}
            >
              <Component
                scrollToPanel={scrollToPanel}
                setModalOpen={
                  Component === Blog || Component === Portfolio
                    ? setIsModalOpen
                    : undefined
                }
              />
            </section>
          )
        )}
      </main>

      {/* Desktop dots */}
      {!isMobile && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/60 px-4 py-2 rounded-full">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToPanel(i)}
              className={`h-2 rounded-full transition-all ${
                activeIndex === i ? "w-8 bg-orange-500" : "w-2 bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
