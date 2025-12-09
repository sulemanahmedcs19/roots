import React from "react";
import "boxicons/css/boxicons.min.css";
import Spline from "@splinetool/react-spline";

const Hero = ({ scrollToPanel }) => {
  return (
    <main
      id="home"
      className="
        flex flex-col lg:flex-row items-center justify-between
        w-screen h-screen
        px-4 lg:px-20 relative
        pt-0
        bg-black
        text-white
      "
    >
      {/* Left Content */}
      <div className="max-w-xl z-10 flex flex-col justify-center space-y-8 text-left lg:text-left lg:flex-1">
        {/* Tag Box */}
        <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full">
          <div className="animate-pulse absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
            <i className="bx bx-diamond"></i>
            Introducing
          </div>
        </div>

        {/* Main Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider"
        >
          EMAIL FOR <br /> DEVELOPERS
        </h1>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem]"
        >
          Our mission is to rethink how digital innovation shapes brands in an
          ever-evolving world. We see technology as the language of modern
          connection. Every brand has a story — our goal is to transform it into
          a powerful digital experience.
        </p>

        {/* Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="flex flex-wrap gap-4 mt-4"
        >
          <button
            className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full text-sm sm:text-lg font-semibold tracking-wider hover:bg-[#1a1a1a] transition-all"
            onClick={() => scrollToPanel(1)} // Blog section
          >
            Documentation <i className="bx bx-link-external ml-1"></i>
          </button>

          <button
            className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full text-sm sm:text-lg font-semibold tracking-wider bg-gray-300 text-black hover:bg-[#1a1a1a] hover:text-white transition-all"
            onClick={() => scrollToPanel(2)} // Contact section
          >
            Get Started <i className="bx bx-link-external ml-1"></i>
          </button>
        </div>
      </div>

      {/* Right Side Spline & Light Effects */}
      <div className="relative lg:w-1/2 w-full h-full flex justify-center items-center mt-12 lg:mt-0">
        {/* Orange subtle glow behind spline */}
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            filter: "blur(100px)",
            background:
              "radial-gradient(circle, rgba(233,155,99,0.5) 0%, rgba(233,155,99,0.2) 60%, transparent 100%)",
            top: "15%",
            right: "5%",
            zIndex: 10,
            pointerEvents: "none",
          }}
        />
        {/* Shadow at bottom of spline */}
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "25%",
            width: "250px",
            height: "90px",
            borderRadius: "50%",
            filter: "blur(70px)",
            background: "rgba(0,0,0,0.7)",
            zIndex: 9,
            pointerEvents: "none",
          }}
        />
        {/* Spline 3D Model */}
        <Spline
          className="w-full h-full relative z-20"
          scene="https://prod.spline.design/VcskI0gyI6byiCdW/scene.splinecode"
        />
      </div>
    </main>
  );
};

export default Hero;
