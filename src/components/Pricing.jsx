import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/* ================= PLANS DATA ================= */

const plans = [
  {
    id: 1,
    title: "Starter",
    description: "Perfect for individuals",
    priceMonthly: 5,
    priceYearly: 50,
    setupFeeMonthly: 5,
    setupFeeYearly: 0,
    buttonText: "Get Started",
    features: ["1 Project", "Basic Support", "Access to Tutorials"],
    popular: false,
  },
  {
    id: 2,
    title: "Basic",
    description: "For small teams",
    priceMonthly: 15,
    priceYearly: 150,
    setupFeeMonthly: 10,
    setupFeeYearly: 0,
    buttonText: "Join Now",
    features: ["5 Projects", "Priority Support", "Team Collaboration"],
    popular: false,
  },
  {
    id: 3,
    title: "Pro",
    description: "For growing businesses",
    priceMonthly: 25,
    priceYearly: 250,
    setupFeeMonthly: 15,
    setupFeeYearly: 0,
    buttonText: "Go Pro",
    features: ["Unlimited Projects", "Advanced Analytics", "24/7 Support"],
    popular: true,
  },
  {
    id: 4,
    title: "Enterprise",
    description: "For large organizations",
    priceMonthly: 50,
    priceYearly: 500,
    setupFeeMonthly: 20,
    setupFeeYearly: 0,
    buttonText: "Contact Sales",
    features: ["Custom Solutions", "Dedicated Manager", "Priority Support"],
    popular: false,
  },
  {
    id: 5,
    title: "Ultimate",
    description: "All-in-one package",
    priceMonthly: 100,
    priceYearly: 1000,
    setupFeeMonthly: 30,
    setupFeeYearly: 0,
    buttonText: "Get Ultimate",
    features: ["All Features", "Dedicated Support", "Custom Integrations"],
    popular: false,
  },
];

/* ================= CARD ================= */

const PricingCard = ({ plan, billingCycle, isActive }) => {
  const price =
    billingCycle === "monthly"
      ? plan.priceMonthly
      : plan.priceYearly ?? plan.priceMonthly;

  return (
    <motion.div
      className={`
        rounded-2xl w-80 h-[440px]
        bg-gradient-to-b from-gray-800 to-gray-900 border
        p-7 text-white
        transition-all duration-500 cursor-pointer relative overflow-hidden
        ${
          plan.popular
            ? "border-blue-500 shadow-lg shadow-blue-500/20"
            : "border-gray-700"
        }
        ${isActive ? "scale-110 z-10" : "scale-100 hover:scale-105"}
      `}
      whileHover={{ y: -10 }}
      style={{ userSelect: "none" }}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}

      <h3 className="text-3xl font-bold mb-2">{plan.title}</h3>

      <p className="text-sm text-gray-400 mb-4">{plan.description}</p>

      <div className="text-5xl font-extrabold mb-2 bg-gradient-to-r from-blue-400 to-indigo-400 text-transparent bg-clip-text">
        ${price}
      </div>

      <div className="text-xs mb-5 tracking-widest text-gray-500">
        {billingCycle === "monthly" ? "BILLED MONTHLY" : "BILLED YEARLY"}
      </div>

      <motion.button
        className={`w-full rounded-full py-3 mb-6 tracking-wide font-semibold ${
          plan.popular
            ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
            : "bg-gray-700 text-gray-300"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {plan.buttonText}
      </motion.button>

      <ul className="text-sm space-y-3">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex gap-2 items-start">
            <i className="bx bx-check text-blue-400 text-xl"></i>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

/* ================= MAIN ================= */

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const radius = 400; // bigger radius for big cards
  const cardCount = plans.length;

  const rotateRef = useRef(true);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const rotationRef = useRef(0);
  const activeCardRef = useRef(null);

  /* Auto rotate */
  useEffect(() => {
    const interval = setInterval(() => {
      if (rotateRef.current && !draggingRef.current) {
        rotationRef.current += 0.3;
        setRotation(rotationRef.current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const handleMouseDown = (e) => {
    draggingRef.current = true;
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!draggingRef.current) return;
    const delta = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    rotationRef.current += delta * 0.45;
    setRotation(rotationRef.current);
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  const handleCardClick = (index) => {
    if (activeCardRef.current === index) {
      activeCardRef.current = null;
      setActiveCard(null);
      rotateRef.current = true;
    } else {
      activeCardRef.current = index;
      setActiveCard(index);
      rotateRef.current = false;

      const angle = 360 / cardCount;
      const target = -angle * index;
      rotationRef.current = target;
      setRotation(target);
    }
  };

  return (
    <section
      id="pricing"
      className="min-h-screen py-24 flex flex-col items-center text-white bg-gradient-to-br from-gray-900 to-gray-800"
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-16 max-w-3xl px-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium mb-4">
          <i className="bx bx-tag text-blue-400 mr-2"></i>
          Pricing Plans
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-400">
          Choose the perfect plan for your needs. All plans include a 14-day
          free trial.
        </p>
      </motion.div>

      {/* Billing */}
      <div className="mb-12 flex gap-4">
        {["monthly", "yearly"].map((cycle) => (
          <motion.button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              billingCycle === cycle
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cycle.toUpperCase()}
            {cycle === "yearly" && (
              <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Carousel */}
      <div
        className="relative w-[950px] h-[600px]"
        style={{ perspective: "1300px" }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transition: draggingRef.current ? "none" : "transform 0.6s ease",
          }}
        >
          {plans.map((plan, i) => {
            const angle = (360 / cardCount) * i;
            return (
              <div
                key={plan.id}
                style={{
                  position: "absolute",
                  width: "320px",
                  height: "440px",
                  top: "50%",
                  left: "50%",
                  marginTop: "-220px",
                  marginLeft: "-160px",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                onClick={() => handleCardClick(i)}
              >
                <PricingCard
                  plan={plan}
                  billingCycle={billingCycle}
                  isActive={activeCard === i}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Additional Info */}
      <motion.div
        className="mt-16 text-center max-w-2xl px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-2">Need a custom plan?</h3>
        <p className="text-gray-400 mb-4">
          We can create a tailored solution to meet your specific requirements.
        </p>
        <button className="px-6 py-2 bg-gray-800 text-gray-300 rounded-lg font-medium border border-gray-700 hover:bg-gray-700 transition-colors">
          Contact Sales
        </button>
      </motion.div>
    </section>
  );
};

export default Pricing;
