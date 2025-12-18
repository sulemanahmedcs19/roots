import React, { useRef, useEffect, useState } from "react";
import { blogPosts } from "./data/blogData";
import { useNavigate, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Blog = ({ setModalOpen }) => {
  const [activePost, setActivePost] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const modalRef = useRef(null);
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Handle slide navigation
  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, blogPosts.length - 3) : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= blogPosts.length - 3 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <section className="w-full h-full px-4 lg:px-16 py-16 text-white max-w-[1200px] mx-auto bg-gradient-to-br from-gray-900 to-black">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-gray-800/50 backdrop-blur-sm rounded-full border border-gray-700 mb-6">
            <span className="flex h-3 w-3 relative mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
            <span className="text-sm font-medium text-amber-400">
              Latest Articles
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
              Blog
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            Insights, tutorials, and industry news from our team of experts
          </p>
        </div>

        {/* MOBILE VIEW - Vertical Scroll */}
        {isMobile ? (
          <div className="space-y-6">
            {blogPosts.map((post, i) => (
              <div
                key={i}
                onClick={() => openModal(post)}
                className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-amber-500/10 border border-gray-700/50 hover:border-amber-500/50 h-auto flex flex-col hover:scale-[1.02] transform-gpu ease-in-out transition-all duration-300"
              >
                <div className="relative overflow-hidden h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-gray-900/70 backdrop-blur-sm rounded-full mb-2">
                      {post.category}
                    </span>
                    <h3 className="font-bold text-lg text-white">
                      {post.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                    {post.desc}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500">{post.date}</span>
                    <button className="text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* DESKTOP VIEW - Horizontal Slider */
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-amber-500 transition-colors -translate-x-5"
            >
              <i className="bx bx-chevron-left text-2xl"></i>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center text-white hover:bg-amber-500 transition-colors translate-x-5"
            >
              <i className="bx bx-chevron-right text-2xl"></i>
            </button>

            {/* SLIDER */}
            <div ref={sliderRef} className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                }}
              >
                {blogPosts.map((post, i) => (
                  <div
                    key={i}
                    className="w-1/3 px-3 flex-shrink-0"
                    onClick={() => openModal(post)}
                  >
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer hover:shadow-lg hover:shadow-amber-500/10 border border-gray-700/50 hover:border-amber-500/50 h-full flex flex-col hover:scale-[1.02] transform-gpu ease-in-out transition-all duration-300">
                      <div className="relative overflow-hidden h-48">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-gray-900/70 backdrop-blur-sm rounded-full mb-2">
                            {post.category}
                          </span>
                          <h3 className="font-bold text-lg text-white">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      <div className="p-4 flex-grow flex flex-col">
                        <p className="text-gray-300 text-sm mb-4 line-clamp-3 flex-grow">
                          {post.desc}
                        </p>

                        <div className="flex items-center justify-between mt-auto">
                          <span className="text-xs text-gray-500">
                            {post.date}
                          </span>
                          <button className="text-sm bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* MODAL */}
      {activePost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-gray-800/90 backdrop-blur-lg max-w-full md:max-w-4xl w-full rounded-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-700/50"
          >
            <div className="p-4 lg:p-6 border-b border-gray-700/50 flex justify-between items-center">
              <h2 className="text-xl lg:text-2xl font-bold text-white">
                {activePost.title}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700/50 transition-colors"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>

            <div className="overflow-y-auto flex-grow">
              <img
                src={activePost.image}
                className="w-full h-48 lg:h-64 object-cover"
              />

              <div className="p-4 lg:p-6">
                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-400 bg-gray-700/50 rounded-full">
                    {activePost.category}
                  </span>
                  <span className="text-sm text-gray-400">
                    {activePost.date}
                  </span>
                </div>

                <div className="text-gray-300 prose prose-invert max-w-none">
                  {activePost.fullContent}
                </div>
              </div>
            </div>

            <div className="p-4 lg:p-6 border-t border-gray-700/50 flex justify-end">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
