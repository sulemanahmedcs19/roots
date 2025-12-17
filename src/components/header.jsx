import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "boxicons/css/boxicons.min.css";

const Header = ({ scrollToPanel }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Slide-down animation
  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-8 
      transition-all duration-500 
      ${animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}
      ${
        scrolled
          ? "bg-gray-900/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold">
            HS
          </div>
          <span className="text-white font-bold text-xl hidden sm:block">
            HubStudio
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {sections.map((label, idx) => (
            <motion.button
              key={idx}
              onClick={(e) => handleNavClick(idx, e)}
              className="px-4 py-2 rounded-lg text-gray-300 hover:text-white font-medium transition-colors relative group"
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </motion.button>
          ))}

          <motion.button
            className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </nav>

        {/* Mobile Menu Button */}
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl p-2 text-gray-300"
          whileTap={{ scale: 0.9 }}
        >
          <i className={menuOpen ? "bx bx-x" : "bx bx-menu"}></i>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          className="fixed top-16 right-0 left-0 p-5 bg-gray-900/95 backdrop-blur-lg md:hidden z-40 border-t border-gray-800 shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <nav className="flex flex-col gap-4 items-center text-white">
            {sections.map((label, idx) => (
              <motion.button
                key={idx}
                onClick={(e) => handleNavClick(idx, e)}
                className="px-5 py-3 w-full max-w-xs rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all font-medium"
                whileHover={{ x: 5 }}
                whileTap={{ x: 0 }}
              >
                {label}
              </motion.button>
            ))}

            <motion.button
              className="px-5 py-3 w-full max-w-xs bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors mt-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.button>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;
