import React from "react";
import "boxicons/css/boxicons.min.css";
import Spline from "@splinetool/react-spline";

const Hero = () => {
  return (
    <main className="flex flex-col lg:flex-row items-start justify-start lg:mt-20 min-h-[calc(90vh-6rem)] px-4 lg:px-20">
      <div className="max-w-xl z-10 mt-20 sm:mt-10">
        {/* Tag box with gradient border */}
        <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full">
          <div className="absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
            <i className="bx bx-diamond"></i>
            Introducing
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wider my-8">
          EMAIL FOR
          <br />
          DEVELOPERS
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg tracking-wider text-gray-400 max-w-[25rem] lg:max-w-[30rem]">
          The best way to reach humans instead of spam folders, deliver
          transactional and marketing emails at scale.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-12">
          <a
            className="border border-[#2a2a2a] py-2 sm:py-3 px-4 sm:px-5 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a]"
            href="#"
          >
            Documentation
            <i className="bx bx-link-external ml-1"></i>
          </a>

          <a
            className="border border-[#2a2a2a] py-2 sm:py-3 px-8 sm:px-10 rounded-full sm:text-lg text-sm font-semibold tracking-wider transition-all duration-300 hover:bg-[#1a1a1a] bg-gray-300 text-black hover:text-white"
            href="#"
          >
            Get Started
            <i className="bx bx-link-external ml-1"></i>
          </a>
        </div>
      </div>

      {/* 3D Robot */}
      <Spline
        className="absolute lg:top-0 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full"
        scene="https://prod.spline.design/VcskI0gyI6byiCdW/scene.splinecode"
      />
    </main>
  );
};

export default Hero;
