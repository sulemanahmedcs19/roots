import React, { useState } from "react";

// 5 sample plans array
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

// Gradient colors for each card
const gradients = [
  "from-pink-500 to-orange-400",
  "from-purple-500 to-blue-400",
  "from-yellow-400 to-pink-400",
  "from-green-400 to-blue-400",
  "from-red-500 to-yellow-400",
];

const PricingCard = ({ plan, billingCycle, gradient }) => {
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
      className={`rounded-xl w-72 sm:w-64 md:w-56 flex flex-col p-6 text-white
        bg-gradient-to-r ${gradient} shadow-xl transform transition duration-500 hover:scale-105`}
    >
      <h3 className="text-2xl font-extrabold mb-2">{plan.title}</h3>
      <p className="text-sm italic mb-4">{plan.description}</p>

      <div className="text-4xl font-extrabold mb-1">${price}</div>

      {billingCycle === "monthly" && setupFee > 0 && (
        <div className="text-xs line-through text-red-400 mb-3">
          ${setupFee} setup fee
        </div>
      )}

      {billingCycle === "yearly" && setupFee > 0 && (
        <div className="text-xs text-green-400 mb-3">Save on setup fee!</div>
      )}

      <div className="text-xs mb-6">
        {billingCycle === "monthly" ? "Billed Monthly" : "Billed Yearly"}
      </div>

      <button
        className="bg-white text-black font-semibold rounded-md py-2 mb-4 hover:opacity-90 transition"
        type="button"
      >
        {plan.buttonText}
      </button>

      <ul className="text-xs space-y-1 flex-grow">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start">
            <span className="mr-2 mt-1 text-lg">→</span>
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
    <section className="bg-black min-h-screen py-20 px-6 flex flex-col items-center">
      <h2 className="text-4xl font-extrabold mb-8 text-white uppercase tracking-wide">
        Our Pricing
      </h2>

      <div className="mb-12 flex space-x-4">
        <button
          onClick={() => setBillingCycle("monthly")}
          className={`px-6 py-2 font-semibold rounded ${
            billingCycle === "monthly"
              ? "bg-lime-400 text-black"
              : "border border-white text-white"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBillingCycle("yearly")}
          className={`px-6 py-2 font-semibold rounded ${
            billingCycle === "yearly"
              ? "bg-lime-400 text-black"
              : "border border-white text-white"
          }`}
        >
          Yearly
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-8 max-w-7xl w-full">
        {plans.map((plan, idx) => (
          <PricingCard
            key={plan.id}
            plan={plan}
            billingCycle={billingCycle}
            gradient={gradients[idx % gradients.length]}
          />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
