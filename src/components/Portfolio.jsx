import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    title: "E-commerce Platform",
    media: web1,
    type: "image",
    description: "Modern e-commerce solution with intuitive user experience",
  },
  {
    id: 2,
    category: "Web Design",
    title: "Corporate Website",
    media: web2,
    type: "image",
    description: "Professional website for a financial services company",
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
    description: "Analytics dashboard for a SaaS platform",
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
    title: "Travel Agency",
    media: web6,
    type: "image",
    description: "Interactive travel booking platform",
  },
  {
    id: 7,
    category: "Web Design",
    title: "Real Estate Portal",
    media: web7,
    type: "image",
    description: "Property listing website with advanced search",
  },
  {
    id: 8,
    category: "Web Design",
    title: "Educational Platform",
    media: web8,
    type: "image",
    description: "Online learning management system",
  },

  {
    id: 9,
    category: "Branding",
    title: "Tech Startup Branding",
    media: brand1,
    type: "video",
    description: "Complete brand identity for a tech startup",
  },
  {
    id: 10,
    category: "Branding",
    title: "Fashion Brand Identity",
    media: brand2,
    type: "video",
    description: "Brand identity for a luxury fashion label",
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
    title: "Fitness Brand Identity",
    media: brand4,
    type: "video",
    description: "Brand identity for a fitness app and equipment",
  },

  {
    id: 13,
    category: "Mobile App",
    title: "Fitness Tracker App",
    media: mobile1,
    type: "image",
    description: "Mobile app for tracking workouts and nutrition",
  },
  {
    id: 14,
    category: "Mobile App",
    title: "Banking App",
    media: mobile2,
    type: "image",
    description: "Secure mobile banking application",
  },
  {
    id: 15,
    category: "Mobile App",
    title: "Food Delivery App",
    media: mobile3,
    type: "image",
    description: "Food ordering and delivery platform",
  },
  {
    id: 16,
    category: "Mobile App",
    title: "Travel Planner App",
    media: mobile4,
    type: "image",
    description: "App for planning and booking travel itineraries",
  },
  {
    id: 17,
    category: "Mobile App",
    title: "Meditation App",
    media: mobile5,
    type: "image",
    description: "Mindfulness and meditation application",
  },
  {
    id: 18,
    category: "Mobile App",
    title: "Social Media App",
    media: mobile6,
    type: "image",
    description: "Niche social networking platform",
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
    title: "E-commerce App UI",
    media: ui2,
    type: "image",
    description: "User interface for a shopping application",
  },
  {
    id: 21,
    category: "UI/UX Design",
    title: "Music App UI",
    media: ui3,
    type: "image",
    description: "Streaming music application interface",
  },
  {
    id: 22,
    category: "UI/UX Design",
    title: "Healthcare App UI",
    media: ui4,
    type: "image",
    description: "Patient management application interface",
  },
  {
    id: 23,
    category: "UI/UX Design",
    title: "Education App UI",
    media: ui5,
    type: "image",
    description: "Online learning platform interface",
  },
  {
    id: 24,
    category: "UI/UX Design",
    title: "Finance App UI",
    media: ui6,
    type: "image",
    description: "Personal finance management application",
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
      className={`w-full h-full px-4 lg:px-16 py-16 text-white transition-opacity duration-1000 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Section Header */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium mb-4">
          <i className="bx bx-briefcase text-blue-400 mr-2"></i>
          Our Portfolio
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Creative Works</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore our latest projects and see how we've helped businesses
          transform their digital presence.
        </p>
      </motion.div>

      {/* Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-3 rounded-full font-medium transition ${
              selectedCategory === cat
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              onClick={() => setActiveProject(project)}
              className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] flex flex-col h-full"
              whileHover={{ y: -10 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="h-48 overflow-hidden">
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
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-blue-400 font-medium mb-1">
                  {project.category}
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm flex-1">
                  {project.description}
                </p>
                <div className="mt-4 text-blue-400 text-sm font-medium flex items-center">
                  View Project
                  <i className="bx bx-right-arrow-alt ml-1"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {activeProject && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setActiveProject(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 border border-gray-700 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-y-auto p-6 relative"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={() => setActiveProject(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl z-10"
            >
              ✕
            </button>

            <div className="mb-4">
              <div className="text-blue-400 text-sm font-medium">
                {activeProject.category}
              </div>
              <h2 className="text-3xl font-bold text-white mt-1">
                {activeProject.title}
              </h2>
            </div>

            <div className="flex justify-center items-center my-6">
              {activeProject.type === "image" ? (
                <img
                  src={activeProject.media}
                  alt={activeProject.title}
                  className="rounded-xl max-w-full"
                />
              ) : (
                <video
                  src={activeProject.media}
                  controls
                  className="rounded-xl max-w-full max-h-[70vh]"
                />
              )}
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Project Description
              </h3>
              <p className="text-gray-300">
                {activeProject.description} This project showcases our expertise
                in creating engaging digital experiences that drive results for
                our clients. Our team worked closely with the client to
                understand their goals and deliver a solution that exceeded
                expectations.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-blue-400 font-medium">Client</div>
                <div className="text-white">Leading Industry Brand</div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-blue-400 font-medium">Duration</div>
                <div className="text-white">3 Months</div>
              </div>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <div className="text-blue-400 font-medium">Technologies</div>
                <div className="text-white">React, Node.js, MongoDB</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Portfolio;
