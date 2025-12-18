import React, { useState, useEffect } from "react";
import "boxicons/css/boxicons.min.css";
import Spline from "@splinetool/react-spline";
import backgroundVideo from "../assets/background/home.mp4";

const Hero = ({ scrollToPanel, isMobile }) => {
  return (
    <main
      id="home"
      className="relative w-full min-h-screen overflow-hidden flex flex-col lg:flex-row items-center justify-between px-4 py-16 md:py-24 text-white"
    >
      {/* Background Video - Desktop only */}
      {!isMobile && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            style={{ transform: "scale(1.1)" }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Overlay to make content more readable */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90"></div>
        </div>
      )}

      {/* Left Content - Desktop */}
      <div className="relative z-10 w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:space-y-8 px-4 lg:px-8 lg:pl-16">
        <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 w-fit">
          <span className="flex h-3 w-3 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-sm font-medium text-amber-400">
            Introducing HubStudio
          </span>
        </div>

        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold leading-tight tracking-tight">
          Digital Experiences
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            That Inspire
          </span>
        </h1>

        <p className="text-base md:text-lg text-gray-300 max-w-lg leading-relaxed">
          We craft innovative digital solutions that transform ideas into
          powerful experiences. Our approach combines creativity with technology
          to build brands that stand out.
        </p>

        <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
          <button
            className="px-6 py-2 md:px-8 md:py-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-medium hover:opacity-90 transition-all text-sm md:text-base"
            onClick={() => scrollToPanel(1)}
          >
            Get Started <i className="bx bx-right-arrow-alt ml-2"></i>
          </button>

          <button
            className="px-6 py-2 md:px-8 md:py-3 rounded-lg bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-white font-medium hover:bg-gray-700/50 transition-all text-sm md:text-base"
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

      {/* Mobile visual placeholder */}
      {isMobile && (
        <div className="relative z-10 w-full h-64 flex items-center justify-center overflow-hidden mt-8">
          <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
                <i className="bx bx-rocket text-white text-2xl"></i>
              </div>
              <p className="text-amber-400 font-medium">Digital Innovation</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Hero;
