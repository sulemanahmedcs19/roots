import React, { useState, useEffect, useRef } from "react";

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
  },
];

/* ================= CARD ================= */

const PricingCard = ({ plan, billingCycle, isActive }) => {
  const price =
    billingCycle === "monthly"
      ? plan.priceMonthly
      : plan.priceYearly ?? plan.priceMonthly;

  return (
    <div
      className={`
        rounded-3xl w-80 h-[440px]
        bg-transparent border border-[#ff8c32]/50
        p-7 text-[#e8d7c7]
        transition-all duration-500 cursor-pointer
        ${
          isActive
            ? "scale-125 shadow-[0_0_45px_rgba(255,140,50,0.75)]"
            : "scale-100 hover:scale-105 hover:shadow-[0_0_25px_rgba(255,140,50,0.5)]"
        }
      `}
      style={{ userSelect: "none" }}
    >
      <h3 className="text-3xl font-bold mb-2 text-[#ff8c32]">{plan.title}</h3>

      <p className="text-sm text-[#c9a98f] mb-4">{plan.description}</p>

      <div className="text-5xl font-extrabold text-[#ff8c32] mb-2">
        ${price}
      </div>

      <div className="text-xs mb-5 tracking-widest text-[#c8b39e]">
        {billingCycle === "monthly" ? "BILLED MONTHLY" : "BILLED YEARLY"}
      </div>

      <button className="bg-[#ff8c32] text-black font-semibold w-full rounded-full py-3 mb-6 tracking-wide hover:scale-105 transition shadow-[0_0_20px_rgba(255,140,50,0.6)]">
        {plan.buttonText}
      </button>

      <ul className="text-sm space-y-2">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex gap-2 items-start">
            <i className="bx bx-check text-[#ff8c32] text-xl"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ================= MAIN ================= */

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const radius = 400; // 👈 bigger radius for big cards
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
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      className="min-h-screen py-24 flex flex-col items-center text-white"
    >
      {/* Billing */}
      <div className="mb-12 flex gap-4">
        {["monthly", "yearly"].map((cycle) => (
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={`px-8 py-3 rounded-full font-semibold transition ${
              billingCycle === cycle
                ? "bg-[#ff8c32] text-black shadow-[0_0_20px_rgba(255,140,50,0.8)]"
                : "border border-[#ff8c32] text-[#e8d7c7]"
            }`}
          >
            {cycle.toUpperCase()}
          </button>
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
    </section>
  );
};

export default Pricing;
