import React, { useState } from "react";
import "boxicons/css/boxicons.min.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center py-4 px-4 lg:px-20">
      <img src="/roots.jpeg" alt="Logo" className="w-18 h-12" />

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12">
        {/* Reusable Button Style */}
        <a
          data-aos="fade-down"
          data-aos-duration="1000"
          className="px-4 py-2 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
          href="#"
        >
          Home
        </a>
        <a
          data-aos="fade-down"
          data-aos-duration="1500"
          className="px-4 py-2 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
          href="#"
        >
          Blog
        </a>
        <a
          data-aos="fade-down"
          data-aos-duration="2000"
          className="px-4 py-2 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
          href="#"
        >
          Contact
        </a>
        <a
          data-aos="fade-down"
          data-aos-duration="2500"
          className="px-4 py-2 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
          href="#"
        >
          Pricing
        </a>
      </nav>

      {/* Desktop Sign In */}
      <button className="hidden md:block bg-[#a7a7a7] text-black py-3 px-8 rounded-full font-medium hover:bg-white transition-all">
        SIGN IN
      </button>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden text-3xl p-2"
      >
        <i className={menuOpen ? "bx bx-x" : "bx bx-menu"}></i>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-16 right-0 left-0 p-5 bg-black bg-opacity-70 backdrop-blur-md md:hidden z-40">
          <nav className="flex flex-col gap-6 items-center">
            <a
              className="px-5 py-3 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
              href="#"
            >
              Home
            </a>
            <a
              className="px-5 py-3 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
              href="#"
            >
              Blog
            </a>
            <a
              className="px-5 py-3 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
              href="#"
            >
              Contact
            </a>
            <a
              className="px-5 py-3 rounded-full border border-[#2a2a2a] hover:bg-[#1a1a1a] transition-all tracking-wider"
              href="#"
            >
              Pricing
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
