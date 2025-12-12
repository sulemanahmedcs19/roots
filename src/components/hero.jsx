import React from "react";
import "boxicons/css/boxicons.min.css";
import Spline from "@splinetool/react-spline";

const Hero = ({ scrollToPanel }) => {
  return (
    <main
      id="home"
      className="
        flex flex-col-reverse lg:flex-row items-center justify-between
        w-screen min-h-screen
        px-4 sm:px-8 lg:px-20
        relative
        bg-black
        text-white
        overflow-hidden
      "
    >
      {/* Left Content */}
      <div className="max-w-full lg:max-w-xl z-10 flex flex-col justify-center space-y-6 sm:space-y-8 text-left lg:flex-1 mt-10 lg:mt-0">
        {/* Tag Box */}
        <div className="relative w-[90%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full">
          <div className="animate-pulse absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1 text-sm sm:text-base">
            <i className="bx bx-diamond"></i>
            Introducing
          </div>
        </div>

        {/* Main Heading */}
        <h1
          data-aos="fade-up"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-wide"
        >
          EMAIL FOR <br /> DEVELOPERS
        </h1>

        {/* Description */}
        <p
          data-aos="fade-up"
          data-aos-delay="300"
          className="text-sm sm:text-base md:text-lg tracking-wide text-gray-400 max-w-full lg:max-w-lg"
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
            className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full text-sm sm:text-base font-semibold tracking-wide hover:bg-[#1a1a1a] transition-all"
            onClick={() => scrollToPanel(1)}
          >
            Documentation <i className="bx bx-link-external ml-1"></i>
          </button>

          <button
            className="border border-[#2a2a2a] py-2 sm:py-3 px-6 sm:px-8 rounded-full text-sm sm:text-base font-semibold tracking-wide bg-gray-300 text-black hover:bg-[#1a1a1a] hover:text-white transition-all"
            onClick={() => scrollToPanel(2)}
          >
            Get Started <i className="bx bx-link-external ml-1"></i>
          </button>
        </div>
      </div>

      {/* Right Side Spline & Light Effects */}
      <div className="relative lg:w-1/2 w-full h-96 sm:h-[400px] md:h-[500px] lg:h-full flex justify-center items-center mb-10 lg:mb-0">
        {/* Orange subtle glow behind spline */}
        <div
          className="absolute rounded-full z-10 pointer-events-none"
          style={{
            width: "300px",
            height: "300px",
            top: "10%",
            right: "5%",
            filter: "blur(100px)",
            background:
              "radial-gradient(circle, rgba(233,155,99,0.5) 0%, rgba(233,155,99,0.2) 60%, transparent 100%)",
          }}
        />
        {/* Shadow at bottom of spline */}
        <div
          className="absolute rounded-full z-9 pointer-events-none"
          style={{
            width: "200px",
            height: "70px",
            bottom: "5%",
            left: "20%",
            filter: "blur(60px)",
            background: "rgba(0,0,0,0.7)",
          }}
        />
        {/* Spline 3D Model */}
        <Spline
          className="w-full h-full relative z-20"
          scene="https://prod.spline.design/VcskI0gyI6byiCdW/scene.splinecode"
          onMouseDown={(e) => e.stopPropagation()} // prevent scroll hijack on mobile
        />
      </div>

      {/* Background Video */}
      <video
        src="/videos/bg.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
      />
    </main>
  );
};

export default Hero;
