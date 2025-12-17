import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

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
      className="min-h-screen px-6 lg:px-16 py-32 text-white bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium mb-4">
          <i className="bx bx-envelope text-blue-400 mr-2"></i>
          Get In Touch
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Agar aap ke paas koi project hai, tou hum se contact karein. Hum jaldi
          se response denge.
        </p>
      </motion.div>

      {/* Content Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT SIDE HEADING */}
        <motion.div
          ref={headingRef}
          className="overflow-hidden flex flex-col justify-center mt-0 lg:-mt-20"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`text-5xl sm:text-6xl font-extrabold uppercase tracking-wide
              bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text
              transition-all duration-1000
              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
          >
            WE CREATE DIGITAL
          </h1>

          <h2
            className={`text-4xl sm:text-5xl font-extrabold uppercase tracking-wide
              text-gray-300
              transition-all duration-1000 delay-200
              ${
                visible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
          >
            SOLUTIONS
          </h2>
        </motion.div>

        {/* RIGHT SIDE CARDS */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          {/* OUR OFFICE */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-400">
                <i className="bx bx-map text-2xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  OUR OFFICE
                </h3>
                <p className="text-gray-300">
                  7901 4th Street, Saint Petersburg, FL,
                  <br />
                  United States, Florida
                </p>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-400">
                <i className="bx bx-phone text-2xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  CONTACT
                </h3>
                <p className="text-gray-300">
                  contact@hubstudiodigital.com
                  <br />
                  Tel: 727-334-6557
                </p>
              </div>
            </div>
          </div>

          {/* SOCIAL */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <div className="flex items-start">
              <div className="mr-4 mt-1 text-blue-400">
                <i className="bx bx-share-alt text-2xl"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  SOCIAL
                </h3>
                <div className="flex gap-4">
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    <i className="bx bxl-instagram text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    <i className="bx bxl-facebook text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    <i className="bx bxl-twitter text-2xl"></i>
                  </a>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-blue-400 transition"
                  >
                    <i className="bx bxl-linkedin text-2xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
