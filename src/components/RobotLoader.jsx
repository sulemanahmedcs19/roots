import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const random = (min, max) => Math.random() * (max - min) + min;

const FloatingParticles = () => {
  const particles = Array.from({ length: 25 });
  return (
    <>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-orange-600 opacity-30"
          style={{
            width: `${random(5, 12)}px`,
            height: `${random(5, 12)}px`,
            top: `${random(0, 100)}%`,
            left: `${random(0, 100)}%`,
            filter: "blur(6px)",
          }}
          animate={{
            y: [0, random(-15, 15), 0],
            x: [0, random(-15, 15), 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: random(5, 9),
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

const SplashScreen = ({ onFinish }) => {
  const [blast, setBlast] = useState(false);

  useEffect(() => {
    const blastTimer = setTimeout(() => setBlast(true), 3500);
    const finishTimer = setTimeout(() => onFinish(), 4500);

    return () => {
      clearTimeout(blastTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-[#0a0a0a] overflow-hidden">
      <FloatingParticles />

      {/* Arena */}
      <div className="w-64 h-64 border-4 border-orange-700 rounded-full flex items-center justify-center relative">
        {!blast && (
          <>
            {/* Robot */}
            <motion.div
              animate={{
                x: [0, 40, -40, 0],
                y: [0, 40, -40, 0],
                rotate: [0, 15, -15, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-7xl select-none"
              style={{
                filter:
                  "drop-shadow(0 0 12px #ff6f45) drop-shadow(0 0 30px #ff6f45)",
              }}
            >
              🤖
            </motion.div>

            {/* Laser beams */}
            {[
              { top: "-36px", left: "-36px", rotate: 45 },
              { top: "-36px", right: "-36px", rotate: -45 },
              { bottom: "-36px", left: "-36px", rotate: -45 },
              { bottom: "-36px", right: "-36px", rotate: 45 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-32 bg-orange-600 rounded"
                style={pos}
                animate={{ rotate: [pos.rotate, pos.rotate + 20, pos.rotate] }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ))}
          </>
        )}

        {/* Blast */}
        {blast && (
          <>
            <motion.div
              className="absolute w-32 h-32 bg-orange-700 rounded-full"
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {Array.from({ length: 14 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-orange-500 rounded-full"
                style={{ top: "50%", left: "50%" }}
                animate={{
                  x: [0, random(-110, 110)],
                  y: [0, random(-110, 110)],
                  opacity: [1, 0],
                  scale: [1, 0.5],
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            ))}
          </>
        )}
      </div>

      {/* Loading text */}
      <motion.h1
        className="absolute bottom-10 text-orange-400 text-2xl font-semibold tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Preparing your digital experience...
      </motion.h1>
    </div>
  );
};

const HomeContent = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white text-3xl font-semibold">
    Welcome to Home Page!
  </div>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && <HomeContent />}
    </>
  );
};

export default App;
