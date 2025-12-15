import React, { useEffect, useState } from "react";

// ✅ Import Web Design images
import web1 from "../assets/web/web1.png";
import web2 from "../assets/web/web2.png";
import web3 from "../assets/web/web3.png";
import web4 from "../assets/web/web4.png";
import web5 from "../assets/web/web5.png";
import web6 from "../assets/web/web6.png";
import web7 from "../assets/web/web7.png";
import web8 from "../assets/web/web8.png";

// ✅ Import Branding videos
import brand1 from "../assets/Branding/brand1.mp4";
import brand2 from "../assets/Branding/brand2.mp4";
import brand3 from "../assets/Branding/brand3.mp4";
import brand4 from "../assets/Branding/brand4.mp4";

// ✅ Import Mobile App images
import mobile1 from "../assets/Mobile/mobile1.png";
import mobile2 from "../assets/Mobile/mobile2.png";
import mobile3 from "../assets/Mobile/mobile3.png";
import mobile4 from "../assets/Mobile/mobile4.png";
import mobile5 from "../assets/Mobile/mobile5.png";
import mobile6 from "../assets/Mobile/mobile6.png";

// ✅ Import UI/UX images
import ui1 from "../assets/UI/ui1.png";
import ui2 from "../assets/UI/ui2.png";
import ui3 from "../assets/UI/ui3.png";
import ui4 from "../assets/UI/ui4.png";
import ui5 from "../assets/UI/ui5.png";
import ui6 from "../assets/UI/ui6.png";

const projectsData = [
  // Web Design
  {
    id: 1,
    category: "Web Design",
    title: "Web Project 1",
    media: web1,
    type: "image",
  },
  {
    id: 2,
    category: "Web Design",
    title: "Web Project 2",
    media: web2,
    type: "image",
  },
  {
    id: 3,
    category: "Web Design",
    title: "Web Project 3",
    media: web3,
    type: "image",
  },
  {
    id: 4,
    category: "Web Design",
    title: "Web Project 4",
    media: web4,
    type: "image",
  },
  {
    id: 5,
    category: "Web Design",
    title: "Web Project 5",
    media: web5,
    type: "image",
  },
  {
    id: 6,
    category: "Web Design",
    title: "Web Project 6",
    media: web6,
    type: "image",
  },
  {
    id: 7,
    category: "Web Design",
    title: "Web Project 7",
    media: web7,
    type: "image",
  },
  {
    id: 8,
    category: "Web Design",
    title: "Web Project 8",
    media: web8,
    type: "image",
  },

  // Branding videos
  {
    id: 9,
    category: "Branding",
    title: "Brand Video 1",
    media: brand1,
    type: "video",
  },
  {
    id: 10,
    category: "Branding",
    title: "Brand Video 2",
    media: brand2,
    type: "video",
  },
  {
    id: 11,
    category: "Branding",
    title: "Brand Video 3",
    media: brand3,
    type: "video",
  },
  {
    id: 12,
    category: "Branding",
    title: "Brand Video 4",
    media: brand4,
    type: "video",
  },

  // Mobile App images
  {
    id: 13,
    category: "Mobile App",
    title: "Mobile App 1",
    media: mobile1,
    type: "image",
  },
  {
    id: 14,
    category: "Mobile App",
    title: "Mobile App 2",
    media: mobile2,
    type: "image",
  },
  {
    id: 15,
    category: "Mobile App",
    title: "Mobile App 3",
    media: mobile3,
    type: "image",
  },
  {
    id: 16,
    category: "Mobile App",
    title: "Mobile App 4",
    media: mobile4,
    type: "image",
  },
  {
    id: 17,
    category: "Mobile App",
    title: "Mobile App 5",
    media: mobile5,
    type: "image",
  },
  {
    id: 18,
    category: "Mobile App",
    title: "Mobile App 6",
    media: mobile6,
    type: "image",
  },

  // UI/UX images
  {
    id: 19,
    category: "UI/UX Design",
    title: "UI/UX Project 1",
    media: ui1,
    type: "image",
  },
  {
    id: 20,
    category: "UI/UX Design",
    title: "UI/UX Project 2",
    media: ui2,
    type: "image",
  },
  {
    id: 21,
    category: "UI/UX Design",
    title: "UI/UX Project 3",
    media: ui3,
    type: "image",
  },
  {
    id: 22,
    category: "UI/UX Design",
    title: "UI/UX Project 4",
    media: ui4,
    type: "image",
  },
  {
    id: 23,
    category: "UI/UX Design",
    title: "UI/UX Project 5",
    media: ui5,
    type: "image",
  },
  {
    id: 24,
    category: "UI/UX Design",
    title: "UI/UX Project 6",
    media: ui6,
    type: "image",
  },
];

const Portfolio = () => {
  const categories = ["Web Design", "Branding", "UI/UX Design", "Mobile App"];
  const [selectedCategory, setSelectedCategory] = useState("Web Design"); // Default
  const [visible, setVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    setTimeout(() => setVisible(true), 100);
    categories.forEach((_, index) => {
      setTimeout(() => {
        setButtonsVisible((prev) => {
          const newState = [...prev];
          newState[index] = true;
          return newState;
        });
      }, 400 + index * 200);
    });
  }, []);

  // ✅ Disable background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = activeProject ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [activeProject]);

  const filteredProjects = selectedCategory
    ? projectsData.filter((p) => p.category === selectedCategory)
    : [];

  return (
    <div
      className={`w-full h-full px-4 lg:px-16 py-16 text-white flex flex-col items-center justify-start overflow-y-auto transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center mb-8 mt-12 text-[#e99b63]">
        Creative Portfolio
      </h2>

      {/* Category Buttons */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() =>
              setSelectedCategory((prev) => (prev === cat ? null : cat))
            }
            className={`px-6 py-3 rounded-full border border-[#e99b63] font-semibold hover:bg-[#e99b63] hover:text-black transition-all duration-700 ${
              buttonsVisible[idx]
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5"
            } ${
              selectedCategory === cat
                ? "bg-[#e99b63] text-black"
                : "bg-transparent text-[#e99b63]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#222] p-4 rounded-lg cursor-pointer hover:shadow-[0_0_15px_rgba(233,155,99,0.4)] transition-all"
            onClick={() => setActiveProject(project)}
          >
            <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
            {project.type === "image" ? (
              <img
                src={project.media}
                alt={project.title}
                className="rounded-md w-full object-cover h-40"
              />
            ) : (
              <video
                src={project.media}
                className="rounded-md w-full object-cover h-40"
                muted
                loop
                playsInline
              />
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-[#1a1a1a] rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative border border-[#e99b63]"
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()} // ✅ Only scroll inside modal
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-2xl hover:text-red-400"
            >
              ✕
            </button>

            <h2 className="text-2xl text-[#e99b63] font-bold mb-4">
              {activeProject.title}
            </h2>

            {activeProject.type === "image" ? (
              <img
                src={activeProject.media}
                alt={activeProject.title}
                className="rounded-xl w-full mb-4"
              />
            ) : (
              <video
                src={activeProject.media}
                controls
                className="rounded-xl w-full mb-4"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
