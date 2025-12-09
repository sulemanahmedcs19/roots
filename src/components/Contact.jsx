import React, { useEffect, useRef, useState } from "react";

const Contact = () => {
  const headingRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    if (headingRef.current) observer.observe(headingRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section
      id="contact"
      className="min-h-screen px-6 lg:px-40 py-32 
                 text-white 
                 bg-gradient-to-b from-[#0a0705] to-[#1c120c]"
    >
      {/* Animated Heading */}
      <div ref={headingRef} className="overflow-hidden mb-20">
        <h1
          className={`text-5xl sm:text-6xl font-extrabold uppercase tracking-wide
                      bg-gradient-to-r from-[#e99b63] to-[#c47a45] text-transparent bg-clip-text
                      transition-all duration-1000
                      ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
        >
          WE CREATE DIGITAL
        </h1>

        <h2
          className={`text-4xl sm:text-5xl font-extrabold uppercase tracking-wide
                      text-[#b08a6a]
                      transition-all duration-1000 delay-200
                      ${
                        visible
                          ? "translate-y-0 opacity-100"
                          : "translate-y-full opacity-0"
                      }`}
        >
          SOLUTIONS
        </h2>
      </div>

      {/* Contact Details */}
      <div className="text-lg sm:text-xl space-y-10">
        {/* OUR OFFICE */}
        <div className="flex justify-between pb-4 border-b border-[#e99b63]/30">
          <div className="font-semibold text-[#e99b63]">OUR OFFICE</div>

          <div className="text-right leading-snug text-gray-300 max-w-lg">
            7901 4th Street, Saint Petersburg, FL, <br /> United States, Florida
          </div>
        </div>

        {/* CONTACT */}
        <div className="flex justify-between pb-4 border-b border-[#e99b63]/30">
          <div className="font-semibold text-[#e99b63]">CONTACT</div>

          <div className="uppercase font-medium text-right leading-snug text-gray-300 max-w-lg">
            CONTACT@THEROOTSDIGITAL.COM <br />
            Tel : 727-334-6557
          </div>
        </div>

        {/* SOCIAL */}
        <div className="flex justify-between pb-4 border-b border-[#e99b63]/30">
          <div className="font-semibold text-[#e99b63]">SOCIAL</div>

          <div className="uppercase font-medium text-right text-gray-300 max-w-lg space-x-2">
            <a href="#" className="hover:text-[#e99b63] transition">
              INSTAGRAM
            </a>
            <span>,</span>
            <a href="#" className="hover:text-[#e99b63] transition">
              FACEBOOK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
