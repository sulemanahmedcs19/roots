import React, { useState } from "react";

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

const PricingCard = ({ plan, billingCycle }) => {
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
      className={`rounded-2xl w-80 bg-[#0d0d0d]/70 border border-[#2a2a2a] backdrop-blur-md
      shadow-[0_0_20px_rgba(233,155,99,0.15)]
      p-7 text-white transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_35px_rgba(233,155,99,0.35)]`}
    >
      <h3 className="text-3xl font-bold tracking-wide mb-2">{plan.title}</h3>
      <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>

      <div className="text-5xl font-extrabold mb-2 text-[#e99b63] drop-shadow-sm">
        ${price}
      </div>

      {billingCycle === "monthly" && setupFee > 0 && (
        <div className="text-xs line-through text-red-400 mb-3">
          ${setupFee} setup fee
        </div>
      )}

      {billingCycle === "yearly" && setupFee > 0 && (
        <div className="text-xs text-green-400 mb-3">Save on setup fee!</div>
      )}

      <div className="text-xs mb-6 text-gray-400 tracking-wider">
        {billingCycle === "monthly" ? "BILLED MONTHLY" : "BILLED YEARLY"}
      </div>

      <button
        className="bg-gradient-to-r from-[#656565] to-[#e99b63] text-black font-semibold 
        w-full rounded-full py-3 mb-6 tracking-wide hover:opacity-90 transition-all"
        type="button"
      >
        {plan.buttonText}
      </button>

      <ul className="text-sm space-y-2 text-gray-300">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <i className="bx bx-check text-[#e99b63] text-lg"></i>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  return (
    <section
      id="pricing"
      className="bg-black min-h-screen py-24 px-6 flex flex-col items-center"
    >
      {/* Section Label */}
      <div
        className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] 
      shadow-[0_0_15px_rgba(255,255,255,0.3)] rounded-full mb-10"
      >
        <div className="animate-pulse absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1 text-white tracking-wider">
          PRICING
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="mb-12 flex space-x-4">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-6 py-2 font-semibold rounded-full tracking-wide transition-all 
            ${
              billingCycle === "monthly"
                ? "bg-[#e99b63] text-black"
                : "border border-[#2a2a2a] text-gray-300 hover:bg-[#1a1a1a]"
            }`}
        >
          Monthly
        </button>

        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-6 py-2 font-semibold rounded-full tracking-wide transition-all 
            ${
              billingCycle === "yearly"
                ? "bg-[#e99b63] text-black"
                : "border border-[#2a2a2a] text-gray-300 hover:bg-[#1a1a1a]"
            }`}
        >
          Yearly
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap justify-center gap-10 max-w-7xl w-full">
        {plans.map((plan) => (
          <PricingCard key={plan.id} plan={plan} billingCycle={billingCycle} />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
