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
      transition: { duration: 1.5, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 1 },
    },
  };

  const colorAnimation = {
    color: [
      "#f57c00", // warm orange
      "#bf360c", // dark orange / brownish
      "#ffb74d", // light orange
      "#f57c00",
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
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
            className="relative w-full h-screen flex items-center justify-center"
            style={{
              background: "radial-gradient(circle, #1a0a00, #000000 80%)",
            }}
          >
            <motion.h1
              animate={colorAnimation}
              className="text-5xl md:text-7xl font-bold text-center tracking-wide"
              style={{
                fontFamily: "'Poppins', sans-serif",
                textShadow: "0 0 8px #f57c00, 0 0 15px #bf360c",
              }}
            >
              Welcome to HubStudioDigitals
            </motion.h1>

            <audio ref={audioRef} src="/enter.mp3" preload="auto" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
