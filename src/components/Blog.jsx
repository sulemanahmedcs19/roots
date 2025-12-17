import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { blogPosts } from "./data/blogData";
import { useNavigate, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Blog = ({ setModalOpen }) => {
  const [activePost, setActivePost] = useState(null);
  const cardRefs = useRef([]);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Disable body scroll + app scroll
  useEffect(() => {
    document.body.style.overflow = activePost ? "hidden" : "auto";
    setModalOpen(!!activePost);
  }, [activePost]);

  // URL → modal sync
  useEffect(() => {
    const slug = location.pathname.split("/blog/")[1];
    if (!slug) return;

    const post = blogPosts.find((p) => p.slug === slug);
    if (post) setActivePost(post);
  }, [location.pathname]);

  // Click outside close
  useEffect(() => {
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal();
      }
    };

    if (activePost) document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [activePost]);

  const openModal = (post) => {
    setActivePost(post);
    navigate(`/blog/${post.slug}`);
  };

  const closeModal = () => {
    setActivePost(null);
    navigate("/blog");
  };

  // Intersection Observer for Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            // Add animation after a slight delay to stagger the effects
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
            }, index * 100); // Adjust delay for staggered effect
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the card is visible
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <>
      <section className="px-4 lg:px-16 pt-24 pb-16 text-white max-w-[1200px] mx-auto space-y-12 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 font-medium mb-4">
            <i className="bx bx-book-open text-blue-400 mr-2"></i>
            Latest Insights
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Blog</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in
            the digital world.
          </p>
        </motion.div>

        {/* MASONRY GRID */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {blogPosts.slice(0, 6).map((post, i) => (
            <motion.div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => openModal(post)}
              className="mb-6 break-inside-avoid opacity-0 translate-y-10 transition-all duration-700 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl overflow-hidden cursor-pointer hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] flex flex-col h-[210px] sm:h-[230px] lg:h-[250px] hover:scale-105 transform-gpu ease-in-out"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-32 object-cover"
              />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                  {post.desc}
                </p>
                <div className="flex items-center text-blue-400 text-sm font-medium">
                  Read More
                  <i className="bx bx-right-arrow-alt ml-1"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all">
            View All Articles
          </button>
        </motion.div>
      </section>

      {/* MODAL */}
      {activePost && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            ref={modalRef}
            className="bg-gray-800 max-w-3xl w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto relative border border-gray-700"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              ✕
            </button>

            {/* Post Content */}
            <img src={activePost.image} className="rounded-xl mb-5 w-full" />
            <h2 className="text-2xl font-bold text-white mb-4">
              {activePost.title}
            </h2>
            <div className="text-gray-300 whitespace-pre-line">
              {activePost.fullContent}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Blog;
