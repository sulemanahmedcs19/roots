import React, { useState, useRef, useEffect } from "react";
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
      bgImage: webImg,
    },
    {
      title: "Custom Website Development",
      description: "Tailored web solutions with high performance and security.",
      paragraph:
        "Custom website design allows businesses to create a unique digital presence that stands apart from generic templates. At HubStudioDigital, we design websites based on specific business needs, user behavior, and content structure.We build layouts that align with your brand identity and functionality requirements. From custom sections to interactive elements, every part of the website is designed with purpose. Custom design gives flexibility, better performance, and stronger visual consistency.Our focus is on clarity, scalability, and long-term usability. A custom website design helps businesses grow without limitations and ensures the website remains adaptable as needs evolve.",
      bgImage: customImg,
    },
    {
      title: "Mobile App Design",
      description: "User-friendly mobile interfaces for iOS and Android apps.",
      paragraph:
        "Mobile app design requires a deep understanding of user behavior and screen interaction. At HubStudioDigital, we design mobile interfaces that feel smooth, intuitive, and visually balanced. Every screen is designed with usability and performance in mind.We focus on clear navigation, readable layouts, and consistent design patterns that help users move through the app without confusion. Our designs support both functionality and aesthetics, ensuring the app looks professional while remaining easy to use.From onboarding screens to interactive elements, we design experiences that keep users engaged. Mobile app design is not just about appearance; it is about creating flows that feel natural and responsive. Our approach helps businesses deliver apps that users enjoy using repeatedly.",
      bgImage: mobileImg,
    },
    {
      title: "Branding Services",
      description: "Logo, brand identity, and visual design for your brand.",
      paragraph:
        "Branding is not just about visuals, it is about how people recognize, remember, and trust your business. At HubStudioDigital, we focus on building brand identities that feel clear, confident, and consistent across every digital touchpoint. From brand voice to visual direction, every element is designed to communicate purpose and credibility.We help businesses define their brand personality, color systems, typography, and overall identity in a way that aligns with their audience’s expectations. A strong brand reduces confusion, increases recognition, and creates emotional connection with users. When people understand your brand instantly, they are more likely to engage and convert.Our branding process is built around clarity and usability. Whether you are launching a new business or refining an existing one, we ensure your brand looks professional and communicates the right message on websites, social platforms, and marketing materials. The goal is to create a brand presence that feels reliable, modern, and easy to recognize in competitive digital spaces.",
      bgImage: brandingImg,
    },
    {
      title: "Motion Design",
      description: "Engaging animations and motion graphics for your projects.",
      paragraph:
        "Motion design adds life to your digital presence and helps communicate ideas faster than static visuals. At HubStudioDigital, we create motion graphics that improve engagement and guide users through content naturally. Smooth animations help explain services, highlight key messages, and keep attention where it matters most.We design motion elements for websites, social media, ads, and digital presentations. Every movement is purposeful, clean, and aligned with your brand identity. Motion design is especially effective for storytelling, product highlights, and promotional content where clarity and impact are essential.Good motion design improves user experience by making content easier to understand and more enjoyable to interact with. Instead of overwhelming users, our approach focuses on balance, timing, and visual flow. This results in animations that feel professional and meaningful rather than distracting. Motion design helps brands stand out while maintaining a polished digital image.",
      bgImage: motionImg,
    },
    {
      title: "UI/UX Design",
      description:
        "Clean and intuitive user interfaces with top-notch experience.",
      paragraph:
        "UI/UX design is about creating digital experiences that feel simple, intuitive, and user-friendly. At HubStudioDigital, we focus on how users think, navigate, and interact with digital products. A well-designed interface reduces friction and makes every action feel natural.We design layouts that guide users clearly from one step to the next. From button placement to content hierarchy, every decision is made to improve usability and engagement. Good UX design helps users find what they need quickly, while strong UI design ensures the interface looks clean and modern.Our UI/UX process prioritizes accessibility, clarity, and responsiveness. Whether it’s a website or a mobile application, we ensure the design works smoothly across devices. The result is a digital experience that feels effortless, builds trust, and encourages users to stay longer and take action.",
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
    <div className="w-full h-full flex items-center justify-center px-16 text-white relative">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-start md:items-center gap-20 p-8 rounded-xl">
        {/* LEFT SIDE */}
        <div className="flex-1 text-left space-y-6 z-10">
          <button className="px-6 py-2 rounded-full border border-[#3a3a3a] bg-black/40 backdrop-blur-lg text-gray-300 hover:text-[#e99b63] transition-all">
            🚀 Introducing Services
          </button>

          <h1 className="text-6xl font-bold leading-[1.1]">
            BUILDING
            <span className="text-[#e99b63]"> DIGITAL EXPERIENCES</span>
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed">
            We design and develop modern creative solutions for brands. Stunning
            front-end visuals and clean UI design bring your ideas to life.
          </p>
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
                <div
                  key={index}
                  onClick={() => handleCardClick(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-700 ease-in-out transform ${
                    isActive ? "scale-105 h-96" : "h-28"
                  }`}
                  style={{
                    backgroundImage: isActive
                      ? `url(${service.bgImage})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "relative",
                  }}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
                  )}

                  <div className="relative z-10 flex flex-col justify-center h-full">
                    <h2 className="text-2xl font-bold mb-2 text-[#e99b63]">
                      {service.title}
                    </h2>
                    <p className="text-gray-200 text-sm">
                      {isActive ? service.paragraph : service.description}
                    </p>

                    {isActive && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveIndex(null);
                        }}
                        className="absolute top-2 right-2 text-white bg-black/60 rounded-full px-3 py-1 hover:bg-[#e99b63] transition-all"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>
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
