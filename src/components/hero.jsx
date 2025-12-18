import React, { useState, useEffect } from "react";
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
      className="relative w-screen h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 text-white bg-gradient-to-br from-gray-900 to-black"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-amber-500 rounded-full blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-20 w-72 h-72 bg-orange-500 rounded-full blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      {/* Left Content */}
      <div className="relative z-10 max-w-full lg:max-w-xl flex flex-col justify-center space-y-8 lg:py-20">
        <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 w-fit">
          <span className="flex h-3 w-3 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-sm font-medium text-amber-400">
            Introducing HubStudio
          </span>
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
          Digital Experiences
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            That Inspire
          </span>
        </h1>

        <p className="text-lg text-gray-300 max-w-lg leading-relaxed">
          We craft innovative digital solutions that transform ideas into
          powerful experiences. Our approach combines creativity with technology
          to build brands that stand out.
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <button
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:opacity-90 transition-all"
            onClick={() => scrollToPanel(1)}
          >
            Get Started <i className="bx bx-right-arrow-alt ml-2"></i>
          </button>

          <button
            className="px-8 py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white font-medium hover:bg-gray-700/50 transition-all"
            onClick={() => scrollToPanel(1)}
          >
            Learn More <i className="bx bx-book-open ml-2"></i>
          </button>
        </div>
      </div>

      {/* Spline – Desktop only */}
      {!isMobile && (
        <div className="relative z-10 w-1/2 h-full flex items-center justify-center overflow-hidden">
          <Spline
            scene="https://prod.spline.design/VcskI0gyI6byiCdW/scene.splinecode"
            style={{ width: "100%", height: "100%" }}
            onMouseDown={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};

export default Hero;
