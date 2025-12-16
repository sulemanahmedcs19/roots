import React, { useEffect, useState } from "react";

/* ================= IMAGES & VIDEOS ================= */

// Web Design
import web1 from "../assets/web/web1.png";
import web2 from "../assets/web/web2.png";
import web3 from "../assets/web/web3.png";
import web4 from "../assets/web/web4.png";
import web5 from "../assets/web/web5.png";
import web6 from "../assets/web/web6.png";
import web7 from "../assets/web/web7.png";
import web8 from "../assets/web/web8.png";

// Branding
import brand1 from "../assets/Branding/brand1.mp4";
import brand2 from "../assets/Branding/brand2.mp4";
import brand3 from "../assets/Branding/brand3.mp4";
import brand4 from "../assets/Branding/brand4.mp4";

// Mobile
import mobile1 from "../assets/Mobile/mobile1.png";
import mobile2 from "../assets/Mobile/mobile2.png";
import mobile3 from "../assets/Mobile/mobile3.png";
import mobile4 from "../assets/Mobile/mobile4.png";
import mobile5 from "../assets/Mobile/mobile5.png";
import mobile6 from "../assets/Mobile/mobile6.png";

// UI/UX
import ui1 from "../assets/UI/ui1.png";
import ui2 from "../assets/UI/ui2.png";
import ui3 from "../assets/UI/ui3.png";
import ui4 from "../assets/UI/ui4.png";
import ui5 from "../assets/UI/ui5.png";
import ui6 from "../assets/UI/ui6.png";

/* ================= PROJECT DATA ================= */

const projectsData = [
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

/* ================= COMPONENT ================= */

const Portfolio = ({ setModalOpen }) => {
  const categories = ["Web Design", "Branding", "UI/UX Design", "Mobile App"];

  const [selectedCategory, setSelectedCategory] = useState("Web Design");
  const [activeProject, setActiveProject] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 150);
  }, []);

  useEffect(() => {
    if (setModalOpen) setModalOpen(activeProject !== null);
  }, [activeProject, setModalOpen]);

  const filteredProjects = projectsData.filter(
    (p) => p.category === selectedCategory
  );

  return (
    <div
      className={`w-full h-full px-8 py-16 text-white transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Title */}
      <h2 className="text-5xl font-bold text-center mb-12 mt-12 text-[#e99b63]">
        Creative Portfolio
      </h2>

      {/* Categories */}
      <div className="flex justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-full border border-[#e99b63] font-semibold transition
              ${
                selectedCategory === cat
                  ? "bg-[#e99b63] text-black"
                  : "text-[#e99b63] hover:bg-[#e99b63] hover:text-black"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ===== GRID (2 ROWS × 4 COLUMNS) ===== */}
      <div className="max-w-7xl mx-auto h-[520px] overflow-y-auto">
        <div className="grid grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="bg-[#1c1c1c] rounded-xl p-4 cursor-pointer transition hover:scale-105 hover:shadow-[0_0_25px_rgba(233,155,99,0.45)]"
            >
              <h3 className="text-lg font-semibold mb-3">{project.title}</h3>

              {project.type === "image" ? (
                <img
                  src={project.media}
                  alt={project.title}
                  className="w-full h-36 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={project.media}
                  muted
                  loop
                  playsInline
                  className="w-full h-36 object-cover rounded-lg"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#111] border border-[#e99b63] rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 relative"
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-3xl text-[#e99b63] hover:text-red-400"
            >
              ✕
            </button>

            <h2 className="text-3xl font-bold text-center text-[#e99b63] mb-6">
              {activeProject.title}
            </h2>

            <div className="flex justify-center items-center">
              {activeProject.type === "image" ? (
                <img
                  src={activeProject.media}
                  alt={activeProject.title}
                  className="w-[1600px] max-w-none rounded-xl"
                />
              ) : (
                <video
                  src={activeProject.media}
                  controls
                  className="w-auto max-w-full max-h-[80vh] object-contain rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
