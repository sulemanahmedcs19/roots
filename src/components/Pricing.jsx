import React, { useState, useEffect, useRef } from "react";

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

const PricingCard = ({ plan, billingCycle, isActive }) => {
  const price =
    billingCycle === "monthly"
      ? plan.priceMonthly
      : plan.priceYearly ?? plan.priceMonthly;

  const setupFee =
    billingCycle === "monthly"
      ? plan.setupFeeMonthly
      : plan.setupFeeYearly ?? plan.setupFeeMonthly;

  return (
    <div
      className={`rounded-2xl w-72 h-96 
      bg-transparent border border-[#ff8c32]/40
      p-6 text-[#e8d7c7]
      transition-all duration-500 cursor-pointer
      ${
        isActive
          ? "scale-110 shadow-[0_0_35px_rgba(255,132,37,0.6)]"
          : "hover:shadow-[0_0_22px_rgba(255,132,37,0.45)]"
      }`}
      style={{ userSelect: "none" }}
    >
      <h3 className="text-2xl font-bold tracking-wide mb-1 text-[#ff8c32]">
        {plan.title}
      </h3>

      <p className="text-[#b8997f] mb-3 text-sm">{plan.description}</p>

      <div className="text-4xl font-extrabold mb-1 text-[#ff8c32]">
        ${price}
      </div>

      {billingCycle === "monthly" && setupFee > 0 && (
        <div className="text-xs line-through text-red-400 mb-2">
          ${setupFee} setup fee
        </div>
      )}

      {billingCycle === "yearly" && (
        <div className="text-xs text-green-400 mb-2">Save on setup fee!</div>
      )}

      <div className="text-xs mb-4 text-[#c8b39e] tracking-wider">
        {billingCycle === "monthly" ? "BILLED MONTHLY" : "BILLED YEARLY"}
      </div>

      <button className="bg-[#ff8c32] text-black font-semibold w-full rounded-full py-2 mb-5 tracking-wide hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,132,37,0.55)]">
        {plan.buttonText}
      </button>

      <ul className="text-sm space-y-1 text-[#e7d5c3]">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <i className="bx bx-check text-[#ff8c32] text-lg"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const radius = 350;
  const cardCount = plans.length;

  const rotateRef = useRef(true);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const rotationRef = useRef(rotation);
  const activeCardRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (rotateRef.current && !draggingRef.current) {
        setRotation((prev) => {
          rotationRef.current = (prev + 0.3) % 360;
          return rotationRef.current;
        });
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
    const deltaX = e.clientX - startXRef.current;
    startXRef.current = e.clientX;
    rotationRef.current += deltaX * 0.5;
    setRotation(rotationRef.current);
  };

  const handleMouseUp = () => {
    draggingRef.current = false;
  };

  const handleCardClick = (index) => {
    if (activeCardRef.current === index) {
      setActiveCard(null);
      activeCardRef.current = null;
      rotateRef.current = true;
    } else {
      setActiveCard(index);
      activeCardRef.current = index;
      rotateRef.current = false;

      const anglePerCard = 360 / cardCount;
      const targetRotation = -anglePerCard * index;

      setRotation(targetRotation);
      rotationRef.current = targetRotation;
    }
  };

  const handleBillingToggle = (cycle) => {
    setBillingCycle(cycle);
    rotateRef.current = activeCardRef.current === null;
  };

  const handleBackgroundClick = (e) => {
    if (e.target.closest(".pricing-card-container")) return;
    setActiveCard(null);
    activeCardRef.current = null;
    rotateRef.current = true;
  };

  return (
    <section
      id="pricing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onClick={handleBackgroundClick}
      className="bg-transparent min-h-screen py-24 px-6 flex flex-col items-center text-white"
    >
      {/* PRICING BADGE */}
      <div className="relative w-[95%] sm:w-48 h-10 bg-transparent border border-[#ff8c32] rounded-full mb-10">
        <div className="absolute inset-[3px] bg-transparent border border-[#ff8c32] rounded-full flex items-center justify-center gap-1 text-[#ff8c32] tracking-wider font-semibold">
          PRICING
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="mb-12 flex space-x-4">
        <button
          onClick={() => handleBillingToggle("monthly")}
          className={`px-6 py-2 font-semibold rounded-full tracking-wide transition-all ${
            billingCycle === "monthly"
              ? "bg-[#ff8c32] text-black shadow-[0_0_20px_rgba(255,132,37,0.7)]"
              : "border border-[#ff8c32] text-[#e8d7c7]"
          }`}
        >
          Monthly
        </button>

        <button
          onClick={() => handleBillingToggle("yearly")}
          className={`px-6 py-2 font-semibold rounded-full tracking-wide transition-all ${
            billingCycle === "yearly"
              ? "bg-[#ff8c32] text-black shadow-[0_0_20px_rgba(255,132,37,0.7)]"
              : "border border-[#ff8c32] text-[#e8d7c7]"
          }`}
        >
          Yearly
        </button>
      </div>

      {/* Carousel */}
      <div
        className="relative w-[800px] h-[500px]"
        style={{ perspective: "1200px" }}
      >
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
            transition: draggingRef.current ? "none" : "transform 0.5s ease",
          }}
        >
          {plans.map((plan, index) => {
            const angle = (360 / cardCount) * index;
            return (
              <div
                key={plan.id}
                className="pricing-card-container"
                style={{
                  position: "absolute",
                  width: "280px",
                  height: "380px",
                  top: "50%",
                  left: "50%",
                  marginTop: "-190px",
                  marginLeft: "-140px",
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(index);
                }}
              >
                <PricingCard
                  plan={plan}
                  billingCycle={billingCycle}
                  isActive={activeCard === index}
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
