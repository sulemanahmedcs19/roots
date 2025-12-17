import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function RobotLoader({ onFinish }) {
  const audioRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  function handleAnimationComplete() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Sound play blocked by browser");
      });
    }

    if (typeof onFinish === "function") {
      onFinish();
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 1 },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const dotVariants = {
    hidden: { y: 0, opacity: 0.3 },
    visible: {
      y: [0, -20, 0],
      opacity: 1,
      transition: {
        duration: 1.4,
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === "exit") {
                handleAnimationComplete();
              }
            }}
            className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-blue-500/10"
                  style={{
                    width: Math.random() * 100 + 20,
                    height: Math.random() * 100 + 20,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: Math.random() * 5 + 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              ))}
            </div>

            <motion.h1
              variants={textVariants}
              className="text-4xl md:text-6xl font-bold text-center mb-8 z-10"
              style={{
                fontFamily: "'Inter', sans-serif",
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HubStudio Digitals
            </motion.h1>

            <motion.div className="flex space-x-2 z-10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={dotVariants}
                  className="w-3 h-3 rounded-full bg-blue-500"
                  style={{
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </motion.div>

            <audio ref={audioRef} src="/enter.mp3" preload="auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
