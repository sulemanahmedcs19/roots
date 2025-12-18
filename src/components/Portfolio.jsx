import React, { useEffect, useState } from "react";

/* IMAGES & VIDEOS */
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

/* PROJECT DATA */
const projectsData = [
  {
    id: 1,
    category: "Web Design",
    title: "E-commerce Platform",
    media: web1,
    type: "image",
    description: "Modern e-commerce solution with seamless user experience",
  },
  {
    id: 2,
    category: "Web Design",
    title: "Corporate Website",
    media: web2,
    type: "image",
    description: "Professional website for a leading financial firm",
  },
  {
    id: 3,
    category: "Web Design",
    title: "Portfolio Website",
    media: web3,
    type: "image",
    description: "Creative portfolio for a digital artist",
  },
  {
    id: 4,
    category: "Web Design",
    title: "SaaS Dashboard",
    media: web4,
    type: "image",
    description: "Analytics dashboard for a data management platform",
  },
  {
    id: 5,
    category: "Web Design",
    title: "Restaurant Website",
    media: web5,
    type: "image",
    description: "Elegant website for a fine dining restaurant",
  },
  {
    id: 6,
    category: "Web Design",
    title: "Travel Blog",
    media: web6,
    type: "image",
    description: "Interactive travel blog with booking functionality",
  },
  {
    id: 7,
    category: "Web Design",
    title: "Real Estate Platform",
    media: web7,
    type: "image",
    description: "Property listing platform with advanced search",
  },
  {
    id: 8,
    category: "Web Design",
    title: "Educational Portal",
    media: web8,
    type: "image",
    description: "Online learning platform with course management",
  },

  {
    id: 9,
    category: "Branding",
    title: "Tech Startup Identity",
    media: brand1,
    type: "video",
    description: "Complete brand identity for an AI startup",
  },
  {
    id: 10,
    category: "Branding",
    title: "Fashion Brand Rebrand",
    media: brand2,
    type: "video",
    description: "Rebranding for a sustainable fashion label",
  },
  {
    id: 11,
    category: "Branding",
    title: "Food & Beverage Brand",
    media: brand3,
    type: "video",
    description: "Brand identity for a craft beverage company",
  },
  {
    id: 12,
    category: "Branding",
    title: "Fitness App Branding",
    media: brand4,
    type: "video",
    description: "Dynamic branding for a fitness app",
  },

  {
    id: 13,
    category: "Mobile App",
    title: "Fitness Tracker",
    media: mobile1,
    type: "image",
    description: "Health and fitness tracking mobile application",
  },
  {
    id: 14,
    category: "Mobile App",
    title: "Food Delivery App",
    media: mobile2,
    type: "image",
    description: "On-demand food delivery platform",
  },
  {
    id: 15,
    category: "Mobile App",
    title: "Banking App",
    media: mobile3,
    type: "image",
    description: "Secure mobile banking application",
  },
  {
    id: 16,
    category: "Mobile App",
    title: "Travel Planner",
    media: mobile4,
    type: "image",
    description: "Trip planning and booking application",
  },
  {
    id: 17,
    category: "Mobile App",
    title: "Social Media App",
    media: mobile5,
    type: "image",
    description: "Photo sharing social platform",
  },
  {
    id: 18,
    category: "Mobile App",
    title: "E-learning App",
    media: mobile6,
    type: "image",
    description: "Interactive learning platform for students",
  },

  {
    id: 19,
    category: "UI/UX Design",
    title: "Dashboard UI",
    media: ui1,
    type: "image",
    description: "Analytics dashboard with data visualization",
  },
  {
    id: 20,
    category: "UI/UX Design",
    title: "E-commerce UI",
    media: ui2,
    type: "image",
    description: "Online shopping interface with product filters",
  },
  {
    id: 21,
    category: "UI/UX Design",
    title: "Music App UI",
    media: ui3,
    type: "image",
    description: "Music streaming application interface",
  },
  {
    id: 22,
    category: "UI/UX Design",
    title: "Task Management UI",
    media: ui4,
    type: "image",
    description: "Productivity app for team collaboration",
  },
  {
    id: 23,
    category: "UI/UX Design",
    title: "Weather App UI",
    media: ui5,
    type: "image",
    description: "Weather forecast application with maps",
  },
  {
    id: 24,
    category: "UI/UX Design",
    title: "News App UI",
    media: ui6,
    type: "image",
    description: "News reading app with personalized content",
  },
];

/* COMPONENT */
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
      className={`w-full h-full px-6 lg:px-16 py-16 text-white transition-opacity duration-1000 bg-gradient-to-br from-gray-900 to-black ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6">
          <span className="flex h-3 w-3 relative mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
          <span className="text-sm font-medium text-amber-400">Our Work</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Creative{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
            Portfolio
          </span>
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our latest projects and see how we bring ideas to life
        </p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg"
                : "bg-gray-800/50 border border-gray-700 text-gray-300 hover:bg-gray-700/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer transition-all hover:scale-[1.03] hover:shadow-lg hover:shadow-amber-500/10 border border-gray-700/50 hover:border-amber-500/50"
            >
              <div className="relative overflow-hidden h-48">
                {project.type === "image" ? (
                  <img
                    src={project.media}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <video
                    src={project.media}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-gray-900/70 backdrop-blur-sm rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-bold text-lg text-white">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-400 text-sm line-clamp-2">
                  {project.description}
                </p>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500">
                    {project.type === "image" ? "Image" : "Video"}
                  </span>
                  <button className="text-sm text-amber-400 hover:text-amber-300 transition-colors flex items-center">
                    View Project <i className="bx bx-right-arrow-alt ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeProject && (
        <div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800/90 backdrop-blur-lg rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-700/50"
          >
            <div className="p-6 border-b border-gray-700/50 flex justify-between items-center">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-gray-700/50 rounded-full mb-2">
                  {activeProject.category}
                </span>
                <h2 className="text-2xl font-bold text-white">
                  {activeProject.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveProject(null)}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>

            <div className="overflow-y-auto flex-grow flex items-center justify-center p-4 bg-gray-900/50">
              {activeProject.type === "image" ? (
                <img
                  src={activeProject.media}
                  alt={activeProject.title}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={activeProject.media}
                  controls
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              )}
            </div>

            <div className="p-6 border-t border-gray-700/50">
              <p className="text-gray-300">{activeProject.description}</p>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;
