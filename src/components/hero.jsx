import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "boxicons/css/boxicons.min.css";
import Spline from "@splinetool/react-spline";

const Hero = ({ scrollToPanel }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main
      id="home"
      className="flex flex-col-reverse lg:flex-row items-center justify-between w-full h-full px-4 sm:px-8 lg:px-16 relative text-white overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl"></div>
      </div>

      {/* Left Content */}
      <div className="max-w-full lg:max-w-xl z-10 flex flex-col justify-center space-y-6 sm:space-y-8 text-left lg:flex-1 mt-10 lg:mt-0 px-4 h-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative w-48 h-10 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-full flex items-center justify-center"
        >
          <div className="flex items-center gap-2 text-sm font-medium text-blue-300">
            <i className="bx bx-burst text-blue-400"></i>
            <span>Leading Innovation</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
        >
          Digital Solutions
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mt-2">
            For Modern Businesses
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-300 max-w-lg"
        >
          We transform ideas into powerful digital experiences. Our team of
          experts delivers innovative solutions that drive growth and
          engagement.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4 mt-4"
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20"
            whileHover={{
              y: -3,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ y: 0 }}
            onClick={() => scrollToPanel(1)}
          >
            Explore Services
          </motion.button>

          <motion.button
            className="px-8 py-3 bg-gray-800/50 backdrop-blur border border-gray-700 text-white rounded-lg font-medium"
            whileHover={{ y: -3, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
            whileTap={{ y: 0 }}
            onClick={() => scrollToPanel(5)}
          >
            View Portfolio
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center gap-6 mt-8"
        >
          <div>
            <div className="text-2xl font-bold">150+</div>
            <div className="text-gray-400 text-sm">Projects Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98%</div>
            <div className="text-gray-400 text-sm">Client Satisfaction</div>
          </div>
          <div>
            <div className="text-2xl font-bold">24/7</div>
            <div className="text-gray-400 text-sm">Support Available</div>
          </div>
        </motion.div>
      </div>

      {!isMobile && (
        <motion.div
          className="relative lg:w-1/2 w-full h-full flex justify-center items-center z-10"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Spline */}
          <Spline
            className="w-full h-full relative z-20"
            scene="https://prod.spline.design/VcskI0gyI6byiCdW/scene.splinecode"
            onMouseDown={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </main>
  );
};

export default Hero;
