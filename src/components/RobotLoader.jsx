import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoLoader({ onFinish }) {
  const audioRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // 3 sec ke baad exit animation start karenge
    const timer = setTimeout(() => {
      setShowLoader(false); // AnimatePresence se exit animation trigger hoga
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Jab exit animation complete ho jaye tab ye function call hoga
  function handleAnimationComplete() {
    // Scroll smoothly up
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Play sound (user interaction hona chahiye browser me)
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Agar autoplay block ho to error handle kar lo
        console.log("Sound play blocked by browser");
      });
    }

    // onFinish call karo animation ke baad
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
      transition: { duration: 1.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 1.1,
      transition: { duration: 0.8 },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.5 },
    },
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={textVariants}
          onAnimationComplete={(definition) => {
            if (definition === "exit") {
              handleAnimationComplete();
            }
          }}
          className="relative w-full h-screen flex flex-col items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          }}
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
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
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>

          {/* Logo */}
          <motion.div variants={logoVariants} className="mb-8">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-bold shadow-xl">
              HS
            </div>
          </motion.div>

          {/* Company Name */}
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-center text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            HubStudio
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-lg md:text-xl text-center text-gray-300 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1 }}
          >
            Digital Solutions for Modern Businesses
          </motion.p>

          {/* Loading Bar */}
          <motion.div
            className="mt-12 w-64 h-1 bg-gray-700 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
          </motion.div>

          <audio ref={audioRef} src="/enter.mp3" preload="auto" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
