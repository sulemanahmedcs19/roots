import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoLoader({ onFinish }) {
  const audioRef = useRef(null);
  const [showLoader, setShowLoader] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowLoader(false), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(interval);
  }, []);

  // When exit animation is complete
  function handleAnimationComplete() {
    // Scroll smoothly up
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Play sound
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        console.log("Sound play blocked by browser");
      });
    }

    // onFinish call
    if (typeof onFinish === "function") {
      onFinish();
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.8 },
    },
  };

  const progressBarVariants = {
    hidden: { width: 0 },
    visible: {
      width: `${progress}%`,
      transition: { duration: 0.3 },
    },
  };

  return (
    <>
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
            className="relative w-full h-screen flex flex-col items-center justify-center bg-gray-900"
          >
            <div className="text-center mb-12">
              <motion.div
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span className="text-white font-bold text-3xl">H</span>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                HubStudio
              </motion.h1>

              <motion.p
                className="text-lg text-gray-400 max-w-md mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Creating digital experiences that inspire
              </motion.p>
            </div>

            {/* Progress bar */}
            <div className="w-64 h-1.5 bg-gray-800 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                variants={progressBarVariants}
                initial="hidden"
                animate="visible"
                key={progress}
              />
            </div>

            <motion.p
              className="text-gray-500 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Loading... {progress}%
            </motion.p>

            <audio ref={audioRef} src="/enter.mp3" preload="auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
