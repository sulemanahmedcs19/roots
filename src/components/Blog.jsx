import React, { useRef, useEffect, useState } from "react";
import { blogPosts } from "./data/blogData";
import { useNavigate, useLocation } from "react-router-dom";
import "boxicons/css/boxicons.min.css";

const Blog = ({ setModalOpen }) => {
  const [activePost, setActivePost] = useState(null);
  const cardRefs = useRef([]);
  const modalRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // 🔒 Disable body scroll + app scroll
  useEffect(() => {
    document.body.style.overflow = activePost ? "hidden" : "auto";
    setModalOpen(!!activePost);
  }, [activePost]);

  // 🔁 URL → modal sync
  useEffect(() => {
    const slug = location.pathname.split("/blog/")[1];
    if (!slug) return;

    const post = blogPosts.find((p) => p.slug === slug);
    if (post) setActivePost(post);
  }, [location.pathname]);

  // 🎯 Click outside close
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

  // ✨ Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("opacity-100", "translate-y-0");
            }, index * 120);
          }
        });
      },
      { threshold: 0.15 }
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));
  }, []);

  return (
    <>
      {/* ⬇️ TOP PADDING ZYADA KI */}
      <section className="px-4 lg:px-16 pt-24 pb-16 text-white max-w-[1200px] mx-auto space-y-12">
        {/* ⬇️ BADGE KO NEECHE KIYA */}
        <div className="animate-pulse 0w-40 h-9 border border-[#e99b63] rounded-full mx-auto mt-6 flex items-center justify-center text-[#e99b63] font-semibold">
          BLOGS
        </div>

        {/* 🧱 MASONRY GRID (GAP BARHA DIYA) */}
        <div
          className="
            columns-1
            sm:columns-2
            lg:columns-3
            gap-6
          "
        >
          {blogPosts.slice(0, 6).map((post, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              onClick={() => openModal(post)}
              className="
                mb-6 break-inside-avoid
                opacity-0 translate-y-10 transition-all duration-700
                bg-[#201e1c]/40 border border-[#e99b63]/40
                rounded-xl p-3 cursor-pointer
                hover:shadow-[0_0_15px_rgba(233,155,99,0.3)]
                flex flex-col
                h-[210px]
                sm:h-[230px]
                lg:h-[250px]
                
              "
            >
              <img
                src={post.image}
                alt={post.title}
                className="
                  rounded-lg w-full object-cover mb-2
                  h-20 sm:h-24 lg:h-28
                "
              />

              <h3 className="font-semibold text-sm">{post.title}</h3>

              <p className="text-gray-300 text-xs mt-1 line-clamp-2">
                {post.desc}
              </p>

              <button className="mt-auto text-sm bg-[#e99b63] text-black px-3 py-1 rounded-md">
                Read More
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 MODAL */}
      {activePost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div
            ref={modalRef}
            className="bg-[#1a1a1a] max-w-3xl w-full rounded-2xl p-6 max-h-[90vh] overflow-y-auto relative border border-[#e99b63]"
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-2xl hover:text-red-400"
            >
              ✕
            </button>

            <img src={activePost.image} className="rounded-xl mb-5 w-full" />

            <h2 className="text-2xl text-[#e99b63] font-bold mb-4">
              {activePost.title}
            </h2>

            <div className="text-gray-300 whitespace-pre-line">
              {activePost.fullContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
