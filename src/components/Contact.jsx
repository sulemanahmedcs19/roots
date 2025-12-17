import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const headingRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Form submitted successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="min-h-screen px-6 lg:px-16 py-32 
                 text-white 
                 bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
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
          Have a project in mind? We'd love to hear from you. Send us a message
          and we'll respond as soon as possible.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your message"
                  required
                ></textarea>
              </div>

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Animated Heading */}
          <div ref={headingRef} className="overflow-hidden mb-12">
            <h1
              className={`text-5xl sm:text-6xl font-extrabold uppercase tracking-wide
                        bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text
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
                        text-gray-300
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
          <div className="space-y-8">
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
                    7901 4th Street, Saint Petersburg, FL, <br /> United States,
                    Florida
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
                    contact@hubstudiodigital.com <br />
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
