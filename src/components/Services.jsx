import React, { useState, useRef, useEffect } from "react";
import webImg from "../assets/services/web.jpg";
import customImg from "../assets/services/custom.jpg";
import mobileImg from "../assets/services/mobile.jpg";
import brandingImg from "../assets/services/Branding.jpg";
import motionImg from "../assets/services/Motion.PNG";
import uiImg from "../assets/services/UIdesign.PNG";
import servicesBg from "../assets/background/services.jpg";

export default function Services({ isMobile }) {
  const services = [
    {
      title: "Website Design",
      description:
        "Creative and responsive website designs to impress your audience.",
      paragraph:
        "Website design plays a major role in how users perceive your business online. At HubStudioDigital, we design websites that look clean, modern, and easy to navigate. A well-structured website helps users understand your services quickly and builds credibility from the first visit.We focus on layout balance, readable typography, and user-friendly navigation. Every section is designed to guide visitors smoothly through content without overwhelming them. Our designs support fast loading, mobile responsiveness, and clear visual hierarchy.A good website design improves engagement and encourages users to explore more pages. We ensure your website communicates professionalism while delivering a smooth browsing experience that supports your business goals.",
      bgImage: webImg,
      icon: "bx bx-desktop",
    },
    {
      title: "Custom Development",
      description: "Tailored web solutions with high performance and security.",
      paragraph:
        "Custom website design allows businesses to create a unique digital presence that stands apart from generic templates. At HubStudioDigital, we design websites based on specific business needs, user behavior, and content structure.We build layouts that align with your brand identity and functionality requirements. From custom sections to interactive elements, every part of the website is designed with purpose. Custom design gives flexibility, better performance, and stronger visual consistency.Our focus is on clarity, scalability, and long-term usability. A custom website design helps businesses grow without limitations and ensures the website remains adaptable as needs evolve.",
      bgImage: customImg,
      icon: "bx bx-code-alt",
    },
    {
      title: "Mobile App Design",
      description: "User-friendly mobile interfaces for iOS and Android apps.",
      paragraph:
        "Mobile app design requires a deep understanding of user behavior and screen interaction. At HubStudioDigital, we design mobile interfaces that feel smooth, intuitive, and visually balanced. Every screen is designed with usability and performance in mind.We focus on clear navigation, readable layouts, and consistent design patterns that help users move through the app without confusion. Our designs support both functionality and aesthetics, ensuring the app looks professional while remaining easy to use.From onboarding screens to interactive elements, we design experiences that keep users engaged. Mobile app design is not just about appearance; it is about creating flows that feel natural and responsive. Our approach helps businesses deliver apps that users enjoy using repeatedly.",
      bgImage: mobileImg,
      icon: "bx bx-mobile-alt",
    },
    {
      title: "Branding Services",
      description: "Logo, brand identity, and visual design for your brand.",
      paragraph:
        "Branding is not just about visuals, it is about how people recognize, remember, and trust your business. At HubStudioDigital, we focus on building brand identities that feel clear, confident, and consistent across every digital touchpoint. From brand voice to visual direction, every element is designed to communicate purpose and credibility.We help businesses define their brand personality, color systems, typography, and overall identity in a way that aligns with their audience's expectations. A strong brand reduces confusion, increases recognition, and creates emotional connection with users. When people understand your brand instantly, they are more likely to engage and convert.Our branding process is built around clarity and usability. Whether you are launching a new business or refining an existing one, we ensure your brand looks professional and communicates the right message on websites, social platforms, and marketing materials. The goal is to create a brand presence that feels reliable, modern, and easy to recognize in competitive digital spaces.",
      bgImage: brandingImg,
      icon: "bx bx-palette",
    },
    {
      title: "Motion Design",
      description: "Engaging animations and motion graphics for your projects.",
      paragraph:
        "Motion design adds life to your digital presence and helps communicate ideas faster than static visuals. At HubStudioDigital, we create motion graphics that improve engagement and guide users through content naturally. Smooth animations help explain services, highlight key messages, and keep attention where it matters most.We design motion elements for websites, social media, ads, and digital presentations. Every movement is purposeful, clean, and aligned with your brand identity. Motion design is especially effective for storytelling, product highlights, and promotional content where clarity and impact are essential.Good motion design improves user experience by making content easier to understand and more enjoyable to interact with. Instead of overwhelming users, our approach focuses on balance, timing, and visual flow. This results in animations that feel professional and meaningful rather than distracting. Motion design helps brands stand out while maintaining a polished digital image.",
      bgImage: motionImg,
      icon: "bx bx-video",
    },
    {
      title: "UI/UX Design",
      description:
        "Clean and intuitive user interfaces with top-notch experience.",
      paragraph:
        "UI/UX design is about creating digital experiences that feel simple, intuitive, and user-friendly. At HubStudioDigital, we focus on how users think, navigate, and interact with digital products. A well-designed interface reduces friction and makes every action feel natural.We design layouts that guide users clearly from one step to the next. From button placement to content hierarchy, every decision is made to improve usability and engagement. Good UX design helps users find what they need quickly, while strong UI design ensures the interface looks clean and modern.Our UI/UX process prioritizes accessibility, clarity, and responsiveness. Whether it's a website or a mobile application, we ensure the design works smoothly across devices. The result is a digital experience that feels effortless, builds trust, and encourages users to stay longer and take action.",
      bgImage: uiImg,
      icon: "bx bx-layer",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);
  const sliderRef = useRef(null);

  const isDragging = useRef(false);
  const startY = useRef(0);
  const scrollTop = useRef(0);

  const handleMouseDown = (e) => {
    if (isMobile) return; // Disable drag for mobile
    isDragging.current = true;
    startY.current = e.clientY;
    scrollTop.current = sliderRef.current.scrollTop;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || isMobile) return;
    const dy = e.clientY - startY.current;
    sliderRef.current.scrollTop = scrollTop.current - dy * 1.5;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleCardClick = (index) => {
    if (isMobile) return; // Disable click for mobile
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

  // Auto-scroll effect for desktop only
  useEffect(() => {
    if (isMobile || activeIndex !== null) return;

    const slider = sliderRef.current;
    if (!slider) return;

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
  }, [activeIndex, isMobile]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-4 lg:px-16 text-white relative py-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${servicesBg})` }}
      >
        {/* Dark overlay to make content more readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90"></div>
      </div>

      <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16 p-4 lg:p-8 rounded-xl z-10">
        {/* LEFT SIDE */}
        <div className="flex-1 text-left space-y-6 lg:space-y-8 z-10 px-4">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 w-fit">
            <span className="flex h-3 w-3 relative mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-medium text-amber-400">
              Our Services
            </span>
          </div>

          <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
            Building
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Digital Experiences
            </span>
          </h1>

          <p className="text-base lg:text-lg text-gray-300 leading-relaxed max-w-lg">
            We design and develop modern creative solutions for brands. Stunning
            visuals and clean UI design bring your ideas to life.
          </p>
        </div>

        {/* RIGHT SIDE - CONDITIONAL RENDERING */}
        {isMobile ? (
          // Mobile View: All cards shown vertically without any slider
          <div className="flex-1 space-y-4 z-10">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                    <i
                      className={`${service.icon} text-2xl text-amber-400`}
                    ></i>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {service.title}
                  </h2>
                </div>
                <p className="text-gray-300 text-sm">{service.paragraph}</p>
              </div>
            ))}
          </div>
        ) : (
          // Desktop View: Original slider functionality with auto-scroll
          <div
            className="flex-1 h-[400px] lg:h-[500px] overflow-hidden relative z-10 cursor-grab bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-4"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div className="absolute top-0 flex flex-col gap-4 lg:gap-6 w-full">
              {[...services, ...services].map((service, index) => {
                const isActive = index === activeIndex;
                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`p-4 lg:p-6 rounded-2xl cursor-pointer transition-all duration-700 ease-in-out transform backdrop-blur-sm ${
                      isActive ? "scale-105 h-80 lg:h-96" : "h-24 lg:h-32"
                    } bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-amber-500/50`}
                  >
                    <div className="relative z-10 flex flex-col justify-center h-full">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center">
                          <i
                            className={`${service.icon} text-2xl text-amber-400`}
                          ></i>
                        </div>
                        <h2 className="text-xl lg:text-2xl font-bold text-white">
                          {service.title}
                        </h2>
                      </div>

                      <p className="text-gray-300 text-sm">
                        {isActive ? service.paragraph : service.description}
                      </p>

                      {isActive && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveIndex(null);
                          }}
                          className="absolute top-4 right-4 text-white bg-gray-800/80 backdrop-blur-sm rounded-full p-2 hover:bg-amber-500 transition-all"
                        >
                          <i className="bx bx-x text-xl"></i>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
