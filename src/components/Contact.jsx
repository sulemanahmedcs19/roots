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
      className="min-h-screen w-full px-6 lg:px-16 py-32 
                 text-white 
                 bg-gradient-to-br from-gray-900 to-black"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6">
            <span className="flex h-3 w-3 relative mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-medium text-amber-400">
              Get In Touch
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Us
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a project in mind? We'd love to hear from you. Send us a
            message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Animated Heading */}
        <div ref={headingRef} className="overflow-hidden mb-20 text-center">
          <h1
            className={`text-5xl sm:text-6xl font-extrabold uppercase tracking-wide
                      bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text
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

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* OUR OFFICE */}
          <div
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
            data-aos="fade-up"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
              <i className="bx bx-map text-2xl text-amber-400"></i>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Our Office</h3>

            <p className="text-gray-300">
              7901 4th Street, Saint Petersburg, FL, <br /> United States,
              Florida
            </p>
          </div>

          {/* CONTACT */}
          <div
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
              <i className="bx bx-envelope text-2xl text-amber-400"></i>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Contact</h3>

            <p className="text-gray-300">
              contact@hubstodiodigitals.com <br />
              Tel: 727-334-6557
            </p>
          </div>

          {/* SOCIAL */}
          <div
            className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-6">
              <i className="bx bx-share-alt text-2xl text-amber-400"></i>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Social</h3>

            <div className="flex gap-4 mt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
              >
                <i className="bx bxl-instagram text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
              >
                <i className="bx bxl-facebook text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
              >
                <i className="bx bxl-twitter text-xl"></i>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center hover:bg-amber-500/20 hover:text-amber-400 transition-colors"
              >
                <i className="bx bxl-linkedin text-xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div
          className="mt-20 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h3 className="text-2xl font-bold text-white mb-6">
            Send us a message
          </h3>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-gray-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Subject"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Your message"
              ></textarea>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
