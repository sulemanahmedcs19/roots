import React, { useRef, useEffect } from "react";
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;

          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-10");
            el.classList.add("opacity-100", "translate-y-0");
          } else {
            el.classList.add("opacity-0", "translate-y-10");
            el.classList.remove("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));

    return () =>
      cardRefs.current.forEach((card) => card && observer.unobserve(card));
  }, []);

  return (
    <section
      id="blog"
      className="px-6 lg:px-20 py-20 
                 bg-gradient-to-b from-[#0a0705] to-[#1c120c]
                 text-white space-y-14"
    >
      {/* HEADING */}
      <div
        className="relative w-48 h-10 
                      bg-gradient-to-r from-[#c47a45] to-[#e99b63]
                      shadow-[0_0_25px_rgba(233,155,99,0.6)]
                      rounded-full mx-auto mt-8"
      >
        <div
          className="absolute inset-[3px] bg-[#0a0705] rounded-full 
                        flex items-center justify-center 
                        text-[#ffb782] font-semibold tracking-wider"
        >
          BLOGS
        </div>
      </div>

      <p className="text-gray-400 max-w-2xl text-center mx-auto leading-relaxed">
        Latest insights, developer tips, and product updates to help you build
        better and smarter systems.
      </p>

      {/* CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, i) => (
          <div
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            className="opacity-0 translate-y-10 transition-all duration-[900ms]
                       bg-[#120e0c] border border-[#e99b63]/40 
                       hover:border-[#e99b63] hover:bg-[#1b1512]
                       rounded-3xl p-4 shadow-md shadow-black/40
                       hover:shadow-[0_0_20px_rgba(233,155,99,0.25)]
                       cursor-pointer"
          >
            <i className={`${post.icon} text-4xl text-[#e99b63] mb-4`}></i>

            <h3 className="text-xl font-semibold text-white transition">
              {post.title}
            </h3>

            <p className="text-gray-400 mt-3 text-sm">{post.desc}</p>

            <button
              className="mt-5 px-4 py-2 bg-[#e99b63] text-black 
                               font-semibold rounded-lg flex items-center gap-2 
                               hover:bg-[#ffca9a] transition"
            >
              Read More <i className="bx bx-right-arrow-alt text-lg"></i>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
