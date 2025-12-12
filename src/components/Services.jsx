import React, { useState, useRef, useEffect } from "react";

export default function Services() {
  const services = [
    {
      title: "Website Design",
      description:
        "Creative and responsive website designs to impress your audience.",
      paragraph:
        "We craft websites that are visually appealing, responsive on all devices, and designed to engage your audience. Using modern design principles, your website will stand out while maintaining optimal performance.",
      bgImage:
        "https://images.unsplash.com/photo-1581091215362-1c87c3f12a1d?auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Custom Website Development",
      description: "Tailored web solutions with high performance and security.",
      paragraph:
        "Our team develops custom websites with scalable architecture, secure coding practices, and fast-loading features. Every project is tailored to your business needs and growth.",
      bgImage:
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Mobile App Design",
      description: "User-friendly mobile interfaces for iOS and Android apps.",
      paragraph:
        "We design mobile apps that offer seamless user experience, attractive interface, and smooth navigation. Apps are optimized for both iOS and Android devices.",
      bgImage:
        "https://images.unsplash.com/photo-1587825140708-6c4f08b9d7f7?auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Branding Services",
      description: "Logo, brand identity, and visual design for your brand.",
      paragraph:
        "We build strong brand identities through logos, color schemes, and visual design. Every element is designed to reflect your brand’s personality and resonate with your audience.",
      bgImage:
        "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Motion Design",
      description: "Engaging animations and motion graphics for your projects.",
      paragraph:
        "Our motion design services create dynamic animations, video content, and interactive graphics that capture attention and communicate your message effectively.",
      bgImage:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "UI/UX Design",
      description:
        "Clean and intuitive user interfaces with top-notch experience.",
      paragraph:
        "We design user interfaces and experiences that are intuitive, visually appealing, and highly functional. Every design is user-centered and tailored to your product’s needs.",
      bgImage:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80",
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
