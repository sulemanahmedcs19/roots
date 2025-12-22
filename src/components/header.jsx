import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";

const Header = ({ scrollToPanel }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Slide-down animation
  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuOpen &&
        !e.target.closest("header") &&
        !e.target.closest(".mobile-menu")
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  // Sections
  const sections = [
    "Home",
    "Services",
    "Blog",
    "Contact",
    "Pricing",
    "Portfolio",
  ];

  const handleNavClick = (index, e) => {
    e.preventDefault();
    if (scrollToPanel) scrollToPanel(index);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8 
      transition-all duration-500 
      ${animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
      ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent"
      }
      `}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">H</span>
          </div>
          <span className="text-white font-bold text-xl">HubStudio</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {sections.map((label, idx) => (
            <button
              key={idx}
              onClick={(e) => handleNavClick(idx, e)}
              className="relative px-1 py-2 text-gray-300 hover:text-white transition-colors duration-300 font-medium group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white p-2 rounded-lg transition-colors"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Menu - Improved */}
      <div
        className={`mobile-menu fixed top-0 left-0 w-full h-full bg-gray-900/95 backdrop-blur-lg md:hidden z-40 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 pt-16">
          {sections.map((label, idx) => (
            <button
              key={idx}
              onClick={(e) => handleNavClick(idx, e)}
              className="text-2xl text-gray-300 hover:text-white transition-colors duration-300 font-medium"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
