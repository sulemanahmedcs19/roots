import React, { useState, useEffect, useRef } from "react";

/* PLANS DATA */
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

/* CARD */
const PricingCard = ({ plan, billingCycle, isActive, isMobile }) => {
  const price =
    billingCycle === "monthly"
      ? plan.priceMonthly
      : plan.priceYearly ?? plan.priceMonthly;

  return (
    <div
      className={`
        rounded-2xl w-full ${isMobile ? "h-auto" : "h-[480px]"}
        bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm
        p-6 text-white
        transition-all duration-500 cursor-pointer
        border ${
          plan.popular
            ? "border-amber-500/50 shadow-lg shadow-amber-500/10"
            : "border-gray-700/50"
        }
        ${isActive ? "scale-105" : "scale-100 hover:scale-[1.03]"}
        relative overflow-hidden
      `}
      style={{ userSelect: "none" }}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
          MOST POPULAR
        </div>
      )}

      <div className="mb-4">
        <h3 className="text-2xl font-bold mb-1">{plan.title}</h3>
        <p className="text-gray-400 text-sm">{plan.description}</p>
      </div>

      <div className="mb-2">
        <div className="flex items-baseline">
          <span className="text-5xl font-bold">${price}</span>
          <span className="text-gray-400 ml-2">
            /{billingCycle === "monthly" ? "mo" : "yr"}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-1">
          {billingCycle === "monthly" ? "Billed monthly" : "Billed yearly"}
        </div>
      </div>

      <button
        className={`w-full py-3 rounded-xl font-medium mb-1 transition-all ${
          plan.popular
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:opacity-90"
            : "bg-gray-700/50 text-white hover:bg-gray-600/50"
        }`}
      >
        {plan.buttonText}
      </button>

      <ul className="space-y-1.5 mt-4">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-start">
            <i className="bx bx-check text-amber-400 text-xl mr-3 mt-0.5"></i>
            <span className="text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/* MAIN */
const Pricing = ({ isMobile }) => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [rotation, setRotation] = useState(0);
  const [activeCard, setActiveCard] = useState(null);

  const radius = 400;
  const cardCount = plans.length;

  const rotateRef = useRef(true);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const rotationRef = useRef(0);
  const activeCardRef = useRef(null);

  /* Auto rotate - only for desktop */
  useEffect(() => {
    if (isMobile) return;

    const interval = setInterval(() => {
      if (rotateRef.current && !draggingRef.current) {
        rotationRef.current += 0.3;
        setRotation(rotationRef.current);
      }
    }, 30);
    return () => clearInterval(interval);
  }, [isMobile]);

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
    if (isMobile) {
      // Simple toggle for mobile
      if (activeCardRef.current === index) {
        activeCardRef.current = null;
        setActiveCard(null);
      } else {
        activeCardRef.current = index;
        setActiveCard(index);
      }
    } else {
      // Desktop 3D carousel behavior
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
    }
  };

  return (
    <section
      id="pricing"
      className="min-h-screen w-full py-16 md:py-24 flex flex-col items-center text-white bg-gradient-to-br from-gray-900 to-black"
    >
      {/* Section Header */}
      <div className="text-center mb-12 px-6">
        <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-3">
          <span className="flex h-3 w-3 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-sm font-medium text-amber-400">
            Pricing Plans
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Simple,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Transparent
          </span>{" "}
          Pricing
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. Always know what you'll pay.
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="mb-8 md:mb-12 flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-gray-700">
        {["monthly", "yearly"].map((cycle) => (
          <button
            key={cycle}
            onClick={() => setBillingCycle(cycle)}
            className={`px-6 py-3 rounded-full font-medium transition ${
              billingCycle === cycle
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {cycle === "monthly" ? "Monthly" : "Yearly"}
            {cycle === "yearly" && (
              <span className="ml-2 text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Mobile Pricing Cards */}
      {isMobile ? (
        <div className="w-full max-w-md mx-auto space-y-6">
          {plans.map((plan, i) => (
            <div key={plan.id} onClick={() => handleCardClick(i)}>
              <PricingCard
                plan={plan}
                billingCycle={billingCycle}
                isActive={activeCard === i}
                isMobile={isMobile}
              />
            </div>
          ))}
        </div>
      ) : (
        /* Desktop Carousel */
        <div
          className="relative w-[950px] h-[600px] -mt-16"
          style={{ perspective: "1300px" }}
        >
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
              transition: draggingRef.current ? "none" : "transform 0.6s ease",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {plans.map((plan, i) => {
              const angle = (360 / cardCount) * i;
              return (
                <div
                  key={plan.id}
                  style={{
                    position: "absolute",
                    width: "320px",
                    height: "480px",
                    top: "50%",
                    left: "50%",
                    marginTop: "-240px",
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
                    isMobile={isMobile}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
