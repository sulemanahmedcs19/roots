import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import webImg from "../assets/services/web.jpg";
import customImg from "../assets/services/custom.jpg";
import mobileImg from "../assets/services/mobile.jpg";
import brandingImg from "../assets/services/Branding.jpg";
import motionImg from "../assets/services/Motion.PNG";
import uiImg from "../assets/services/UIdesign.PNG";

export default function Services() {
  const services = [
    {
      title: "Website Design",
      description:
        "Creative and responsive website designs to impress your audience.",
      paragraph:
        "Website design plays a major role in how users perceive your business online. At HubStudioDigital, we design websites that look clean, modern, and easy to navigate. A well-structured website helps users understand your services quickly and builds credibility from the first visit.We focus on layout balance, readable typography, and user-friendly navigation. Every section is designed to guide visitors smoothly through content without overwhelming them. Our designs support fast loading, mobile responsiveness, and clear visual hierarchy.A good website design improves engagement and encourages users to explore more pages. We ensure your website communicates professionalism while delivering a smooth browsing experience that supports your business goals.",
      icon: "bx-desktop",
      bgImage: webImg,
    },
    {
      title: "Custom Development",
      description: "Tailored web solutions with high performance and security.",
      paragraph:
        "Custom website design allows businesses to create a unique digital presence that stands apart from generic templates. At HubStudioDigital, we design websites based on specific business needs, user behavior, and content structure.We build layouts that align with your brand identity and functionality requirements. From custom sections to interactive elements, every part of the website is designed with purpose. Custom design gives flexibility, better performance, and stronger visual consistency.Our focus is on clarity, scalability, and long-term usability. A custom website design helps businesses grow without limitations and ensures the website remains adaptable as needs evolve.",
      icon: "bx-code-alt",
      bgImage: customImg,
    },
    {
      title: "Mobile App Design",
      description: "User-friendly mobile interfaces for iOS and Android apps.",
      paragraph:
        "Mobile app design requires a deep understanding of user behavior and screen interaction. At HubStudioDigital, we design mobile interfaces that feel smooth, intuitive, and visually balanced. Every screen is designed with usability and performance in mind.We focus on clear navigation, readable layouts, and consistent design patterns that help users move through the app without confusion. Our designs support both functionality and aesthetics, ensuring the app looks professional while remaining easy to use.From onboarding screens to interactive elements, we design experiences that keep users engaged. Mobile app design is not just about appearance; it is about creating flows that feel natural and responsive. Our approach helps businesses deliver apps that users enjoy using repeatedly.",
      icon: "bx-mobile-alt",
      bgImage: mobileImg,
    },
    {
      title: "Branding Services",
      description: "Logo, brand identity, and visual design for your brand.",
      paragraph:
        "Branding is not just about visuals, it is about how people recognize, remember, and trust your business. At HubStudioDigital, we focus on building brand identities that feel clear, confident, and consistent across every digital touchpoint. From brand voice to visual direction, every element is designed to communicate purpose and credibility.We help businesses define their brand personality, color systems, typography, and overall identity in a way that aligns with their audience's expectations. A strong brand reduces confusion, increases recognition, and creates emotional connection with users. When people understand your brand instantly, they are more likely to engage and convert.Our branding process is built around clarity and usability. Whether you are launching a new business or refining an existing one, we ensure your brand looks professional and communicates the right message on websites, social platforms, and marketing materials. The goal is to create a brand presence that feels reliable, modern, and easy to recognize in competitive digital spaces.",
      icon: "bx-palette",
      bgImage: brandingImg,
    },
    {
      title: "Motion Design",
      description: "Engaging animations and motion graphics for your projects.",
      paragraph:
        "Motion design adds life to your digital presence and helps communicate ideas faster than static visuals. At HubStudioDigital, we create motion graphics that improve engagement and guide users through content naturally. Smooth animations help explain services, highlight key messages, and keep attention where it matters most.We design motion elements for websites, social media, ads, and digital presentations. Every movement is purposeful, clean, and aligned with your brand identity. Motion design is especially effective for storytelling, product highlights, and promotional content where clarity and impact are essential.Good motion design improves user experience by making content easier to understand and more enjoyable to interact with. Instead of overwhelming users, our approach focuses on balance, timing, and visual flow. This results in animations that feel professional and meaningful rather than distracting. Motion design helps brands stand out while maintaining a polished digital image.",
      icon: " bx-movie-play",
      bgImage: motionImg,
    },
    {
      title: "UI/UX Design",
      description:
        "Clean and intuitive user interfaces with top-notch experience.",
      paragraph:
        "UI/UX design is about creating digital experiences that feel simple, intuitive, and user-friendly. At HubStudioDigital, we focus on how users think, navigate, and interact with digital products. A well-designed interface reduces friction and makes every action feel natural.We design layouts that guide users clearly from one step to the next. From button placement to content hierarchy, every decision is made to improve usability and engagement. Good UX design helps users find what they need quickly, while strong UI design ensures the interface looks clean and modern.Our UI/UX process prioritizes accessibility, clarity, and responsiveness. Whether it's a website or a mobile application, we ensure the design works smoothly across devices. The result is a digital experience that feels effortless, builds trust, and encourages users to stay longer and take action.",
      icon: "bx-layer",
      bgImage: uiImg,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const sliderRef = useRef(null);

  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startY.current = e.clientY;
    scrollTop.current = sliderRef.current.scrollTop;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    const dy = e.clientY - startY.current;
    sliderRef.current.scrollTop = scrollTop.current - dy * 1.5;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCardClick = (index) => {
    const slider = sliderRef.current;
    const card = slider.children[0].children[index];

    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);

      if (card) {
        const cardTop = card.offsetTop;
        slider.scrollTo({
          top: cardTop - 10,
          behavior: "smooth",
        });
      }
    }
  };

  useEffect(() => {
    if (activeIndex !== null) return;

    const slider = sliderRef.current;
    let animationFrameId;

    const scroll = () => {
      slider.scrollTop += 1;

      if (slider.scrollTop >= slider.scrollHeight / 2) {
        slider.scrollTop = 0;
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeIndex]);

  return (
    <div className="w-full h-full flex items-center justify-center px-4 lg:px-16 text-white relative bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-3xl"></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-start md:items-center gap-12 lg:gap-20 p-6 lg:p-8 rounded-xl z-10">
        {/* LEFT SIDE */}
        <div className="flex-1 text-left space-y-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium"
          >
            <i className="bx bx-burst text-blue-400 mr-2"></i>
            Our Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
          >
            Building
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mt-2">
              Digital Experiences
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-lg"
          >
            We design and develop modern creative solutions for brands. Stunning
            front-end visuals and clean UI design bring your ideas to life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mt-8"
          >
            <div className="bg-gray-800/50 backdrop-blur p-4 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-gray-400 text-sm">Happy Clients</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur p-4 rounded-lg border border-gray-700">
              <div className="text-3xl font-bold text-blue-400">100+</div>
              <div className="text-gray-400 text-sm">Projects Delivered</div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT SIDE – VERTICAL SLIDER */}
        <div
          className="flex-1 h-128 overflow-hidden relative z-10 cursor-grab"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div className="absolute top-0 flex flex-col gap-6">
            {[...services, ...services].map((service, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-700 ease-in-out transform ${
                    isActive ? "scale-105 h-96" : "h-28"
                  } bg-gray-800/50 backdrop-blur border border-gray-700`}
                  whileHover={!isActive ? { y: -5 } : {}}
                  style={{
                    backgroundImage: isActive
                      ? `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.9)), url(${service.bgImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  <div className="relative z-10 flex flex-col justify-center h-full">
                    <div className="flex items-center gap-3 mb-2">
                      <i
                        className={`${service.icon} text-2xl text-blue-400`}
                      ></i>
                      <h2 className="text-xl font-bold text-white">
                        {service.title}
                      </h2>
                    </div>
                    <p className="text-gray-300 text-sm">
                      {isActive ? service.paragraph : service.description}
                    </p>

                    {isActive && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(null);
                        }}
                        className="absolute top-4 right-4 text-white bg-gray-700/80 backdrop-blur rounded-full px-3 py-1 hover:bg-blue-500 transition-all"
                      >
                        Close
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .h-128 {
          height: 32rem;
        }
      `}</style>
    </div>
  );
}
