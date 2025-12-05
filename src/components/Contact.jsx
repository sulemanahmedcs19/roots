import React, { useEffect, useRef, useState } from "react";

const Contact = () => {
  const headingRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting); // toggle visible on scroll in/out
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) observer.observe(headingRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
    };
  }, []);

  return (
    <section className="bg-black text-white min-h-screen px-6 lg:px-40 py-32">
      {/* Animated Heading */}
      <div ref={headingRef} className="overflow-hidden mb-20">
        <h1
          className={`text-5xl sm:text-6xl font-extrabold tracking-wide uppercase transition-transform duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          WE CREATE DIGITAL
        </h1>

        <h2
          className={`text-4xl sm:text-5xl font-extrabold tracking-wide text-gray-600 uppercase mt-2 transition-transform duration-1000 delay-200 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          SOLUTIONS
        </h2>
      </div>

      {/* Contact Details (Left + Full Right) */}
      <div className="text-lg sm:text-xl space-y-10">
        {/* OUR OFFICE */}
        <div className="flex justify-between border-b border-gray-700 pb-4">
          <div className="animate-pulse font-semibold text-left">
            OUR OFFICE
          </div>

          <div className="text-right leading-snug max-w-lg">
            7901 4th Street, Saint Petersburg, FL, <br /> United States, Florida
          </div>
        </div>

        {/* CONTACT */}
        <div className="flex justify-between border-b border-gray-700 pb-4">
          <div className="animate-pulse font-semibold text-left">CONTACT</div>

          <div className="uppercase font-medium text-right leading-snug max-w-lg">
            CONTACT@THEROOTSDIGITAL.COM <br />
            Tel : 727-334-6557
          </div>
        </div>

        {/* SOCIAL */}
        <div className="flex justify-between border-b border-gray-700 pb-4">
          <div className="animate-pulse font-semibold text-left">SOCIAL</div>

          <div className="uppercase font-medium text-right space-x-2 max-w-lg">
            <a href="#" className="hover:underline">
              INSTAGRAM
            </a>
            <span>,</span>
            <a href="#" className="hover:underline">
              FACEBOOK
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
