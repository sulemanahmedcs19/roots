import React from "react";
import "boxicons/css/boxicons.min.css";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  return (
    <main
      id="home"
      className="
        flex flex-col lg:flex-row items-start justify-start
        min-h-[calc(90vh-6rem)]
        px-4 lg:px-20 relative
        pt-32   /* 👈 YAHAN SE TOP GAP ADD HO GAYA */
      "
    >
      <div className="max-w-xl z-10 mt-10 sm:mt-10">
        {/* Tag Box */}
        <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full mt-10">
          <div className="animate-pulse absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
            <i className="bx bx-diamond"></i>
            Introducing
          </div>
        </div>

        {/* Main Heading */}
        <h1
          data-aos="fade-up"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8"
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
          className="flex flex-wrap gap-4 mt-12"
        >
          <a
            className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full text-sm sm:text-lg font-semibold tracking-wider hover:bg-[#1a1a1a] transition-all"
            href="#"
          >
            Documentation <i className="bx bx-link-external ml-1"></i>
          </a>

          <a
            className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full text-sm sm:text-lg font-semibold tracking-wider bg-gray-300 text-black hover:bg-[#1a1a1a] hover:text-white transition-all"
            href="#"
          >
            Get Started <i className="bx bx-link-external ml-1"></i>
          </a>
        </div>
      </div>

      {/* 3D Model */}
      <Spline
        className="absolute lg:top-[10%] top-[40%] left-0 lg:left-[25%] h-full"
        scene="https://prod.spline.design/VcskI0gyI6byiCdW/scene.splinecode"
      />
    </main>
  );
};

export default Hero;
