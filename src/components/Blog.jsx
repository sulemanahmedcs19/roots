import React, { useRef, useEffect, useState } from "react";
import "boxicons/css/boxicons.min.css";

const Blog = () => {
  const posts = [
    {
      title: "How Developers Use Modern Email APIs",
      desc: "Discover how modern workflows use automation and powerful APIs to manage emails. Learn best practices for sending, tracking, and optimizing email campaigns in modern applications.",
      icon: "bx bx-code-alt",
    },
    {
      title: "Top 5 Email Tools for 2024",
      desc: "Explore trending email tools designed for developers and startups. Compare features, performance, and integrations to choose the best solution for your workflow.",
      icon: "bx bx-envelope",
    },
    {
      title: "Why Custom Email Templates Matter",
      desc: "Learn why brands rely on custom templates to deliver better user experiences. Understand design tips, personalization techniques, and responsive layouts to maximize engagement.",
      icon: "bx bx-edit",
    },
    {
      title: "Best Practices for Email Deliverability",
      desc: "Understand how to keep your emails out of spam folders. Techniques include authentication, proper content formatting, and regular list maintenance.",
      icon: "bx bx-check-shield",
    },
    {
      title: "Email Analytics Every Developer Should Track",
      desc: "Learn which metrics matter: open rates, click-through rates, bounce rates, and more. Optimize campaigns based on real-time data.",
      icon: "bx bx-stats",
    },
    {
      title: "Automating Emails with Modern Frameworks",
      desc: "Step-by-step guide on integrating email automation into your applications using Node.js, Python, and serverless frameworks for scalability.",
      icon: "bx bx-robot",
    },
  ];

  const cardRefs = useRef([]);
  const [scrollDir, setScrollDir] = useState("down");

  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollDir(currentScroll > lastScroll ? "down" : "up");
      lastScroll = currentScroll;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          if (entry.isIntersecting) {
            target.classList.add("translate-x-0", "opacity-100");
            target.classList.remove("-translate-x-20", "translate-x-20");
          } else {
            const dir = target.dataset.direction;
            target.classList.remove("translate-x-0", "opacity-100");
            target.classList.add(
              dir === "left" ? "-translate-x-20" : "translate-x-20"
            );
          }
        });
      },
      { threshold: 0.15 } // earlier 0.3, now low for smoother trigger
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [scrollDir]);

  return (
    <section id="blog" className="px-6 lg:px-20 py-20 text-white space-y-10">
      <div className="relative w-[95%] sm:w-48 h-10 bg-gradient-to-r from-[#656565] to-[#e99b63] shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full mt-10">
        <div className="animate-pulse absolute inset-[3px] bg-black rounded-full flex items-center justify-center gap-1">
          BLOGS
        </div>
      </div>

      <p className="text-gray-400 max-w-2xl">
        Latest insights, developer tips, and product updates to help you build
        better email systems. Explore articles, tools, and best practices for
        developers and tech enthusiasts.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {posts.map((post, index) => {
          const direction = index < 3 ? "left" : "right";
          return (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              data-direction={direction}
              className={`bg-[#0f0f0f] border border-[#2a2a2a] p-6 rounded-2xl hover:bg-[#1a1a1a] cursor-pointer group transform transition-all duration-700 opacity-0 ${
                direction === "left" ? "-translate-x-20" : "translate-x-20"
              }`}
            >
              <i
                className={`${post.icon} text-4xl text-gray-300 group-hover:text-white transition-all`}
              ></i>
              <h3 className="text-xl font-semibold mt-4 group-hover:text-white transition-all">
                {post.title}
              </h3>
              <p className="text-gray-400 mt-3 text-sm leading-relaxed">
                {post.desc}
              </p>
              <button className="mt-4 text-sm text-gray-300 group-hover:text-white flex items-center gap-1">
                Read More <i className="bx bx-right-arrow-alt text-lg"></i>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Blog;
