import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";

const header = ({ scrollToPanel }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Slide-down animation
  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  // 👇 Home ke baad Services add kiya (same style as Blog & Contact)
  const sections = ["Home", "Services", "Blog", "Contact", "Pricing"];

  const handleNavClick = (index, e) => {
    e.preventDefault();
    if (scrollToPanel) scrollToPanel(index);
    setMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-20 
      bg-black/60 backdrop-blur-md border-b border-[#1f1f1f] 
      transition-all duration-700 
      ${animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}
    >
      <div className="flex justify-between items-center">
        {/* Logo */}
        <img
          src="/roots.jpeg"
          alt="Logo"
          className="w-18 h-12 rounded-md shadow-[0_0_20px_rgba(233,155,99,0.35)]"
        />

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-14 mx-auto">
          {sections.map((label, idx) => (
            <button
              key={idx}
              onClick={(e) => handleNavClick(idx, e)}
              className="px-4 py-2 rounded-full border border-[#2a2a2a] 
                hover:border-[#e99b63] hover:bg-[#111] transition-all 
                tracking-wider text-gray-300 hover:text-[#e99b63]"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl p-2 text-white"
        >
          <i className={menuOpen ? "bx bx-x" : "bx bx-menu"}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 right-0 left-0 p-5 bg-black/80 backdrop-blur-lg md:hidden z-40 border-t border-[#1a1a1a] shadow-[0_0_20px_rgba(233,155,99,0.25)]">
          <nav className="flex flex-col gap-6 items-center text-white">
            {sections.map((label, idx) => (
              <button
                key={idx}
                onClick={(e) => handleNavClick(idx, e)}
                className="px-5 py-3 rounded-full border border-[#2a2a2a] 
                  hover:border-[#e99b63] hover:bg-[#111] transition-all text-gray-300 hover:text-[#e99b63]"
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default header;
