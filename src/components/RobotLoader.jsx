import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

const random = (min, max) => Math.random() * (max - min) + min;

const FloatingParticles = () => {
  return Array.from({ length: 25 }).map((_, i) => (
    <motion.div
      key={i}
      className="absolute rounded-full bg-orange-500 opacity-30"
      style={{
        width: `${random(6, 14)}px`,
        height: `${random(6, 14)}px`,
        top: `${random(0, 100)}%`,
        left: `${random(0, 100)}%`,
        filter: "blur(10px)",
      }}
      animate={{
        y: [0, random(-30, 30), 0],
        x: [0, random(-30, 30), 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: random(5, 8),
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ));
};

export default function RobotLoader({ onFinish, scrollToPanel }) {
  const [slide, setSlide] = useState(false);
  const audioRef = useRef(new Audio("/enter.mp3"));

  const handleEnter = () => {
    audioRef.current.volume = 0.7;
    audioRef.current.play();

    setSlide(true);

    setTimeout(() => {
      onFinish(); // Hide loader
      if (scrollToPanel) scrollToPanel(0); // Scroll to first section
    }, 900);
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={
        slide
          ? { y: "-100%", rotate: 15, scale: 1.2, opacity: 0 }
          : { y: 0, opacity: 1 }
      }
      transition={{ duration: 0.9, ease: "easeInOut" }}
      className="relative flex items-center justify-center h-screen bg-[#0b0b0b] overflow-hidden"
    >
      <FloatingParticles />

      <div
        className="absolute right-0 top-0 w-[60%] h-full"
        style={{
          background:
            "radial-gradient(circle at 80% 50%, rgba(255,120,30,0.25), transparent 70%)",
          filter: "blur(45px)",
        }}
      />

      <motion.div
        className="absolute w-72 h-72 rounded-full border-4 border-orange-500"
        style={{
          boxShadow:
            "0 0 30px rgba(255,120,30,0.7), inset 0 0 25px rgba(255,120,30,0.9)",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        style={{
          width: "70px",
          height: "70px",
          background: "linear-gradient(145deg, #232323, #0d0d0d)",
          borderRadius: "12px",
          border: "2px solid rgba(255,120,40,0.5)",
          boxShadow:
            "0 0 28px rgba(255,120,30,0.8), inset 0 0 25px rgba(255,120,30,0.7)",
        }}
        animate={{
          rotate: [0, 25, -25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.button
        onClick={handleEnter}
        className="absolute bottom-14 px-7 py-3 text-[#0b0b0b] font-semibold rounded-full bg-orange-400 hover:bg-orange-500 transition-all shadow-xl"
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.95 }}
      >
        Click Here To Enter
      </motion.button>
    </motion.div>
  );
}
