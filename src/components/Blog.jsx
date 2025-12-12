import React, { useRef, useEffect, useState } from "react";
import { blogPosts } from "./data/blogData";
import "boxicons/css/boxicons.min.css";

const Blog = () => {
  const [activePost, setActivePost] = useState(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    document.body.style.overflow = activePost ? "hidden" : "auto";
  }, [activePost]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          const el = entry.target;
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.classList.add("opacity-100", "translate-y-0");
              el.classList.remove("opacity-0", "translate-y-10");
            }, index * 150);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => card && observer.observe(card));
  }, []);

  return (
    <>
      <section className="px-4 lg:px-16 py-16 text-white space-y-10 bg-transparent max-w-[1200px] mx-auto">
        {/* Badge */}
        <div className="relative w-40 h-9 bg-transparent rounded-full mx-auto mt-8 border border-[#e99b63] shadow-[0_0_20px_rgba(233,155,99,0.4)]">
          <div className="absolute inset-[2px] bg-transparent rounded-full flex items-center justify-center text-[#e99b63] font-semibold tracking-wide text-sm">
            BLOGS
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-gray-300 max-w-xl text-center mx-auto leading-relaxed text-base">
          Latest insights, developer tips, and product updates to help you build
          smarter systems.
        </p>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {blogPosts.slice(0, 6).map((post, i) => (
            <div
              key={i}
              ref={(el) => (cardRefs.current[i] = el)}
              className="
                opacity-0 translate-y-10
                transition-all duration-700 ease-out
                bg-[#201e1c]/30 backdrop-blur-md border border-[#e99b63]/40
                hover:border-[#ffbe8a] hover:shadow-[0_0_15px_rgba(233,155,99,0.3)]
                rounded-xl p-3 cursor-pointer flex flex-col
              "
              onClick={() => setActivePost(post)}
              style={{ minHeight: "250px" }}
            >
              {/* Thumbnail */}
              {post.image && (
                <img
                  src={post.image}
                  loading="lazy"
                  alt={post.title}
                  className="rounded-lg w-full h-28 object-cover mb-2"
                />
              )}

              {/* Icon */}
              {post.icon && (
                <i className={`${post.icon} text-2xl text-[#e99b63] mb-2`}></i>
              )}

              {/* Title */}
              <h3 className="text-md font-semibold">{post.title}</h3>

              {/* Desc */}
              <p className="text-gray-300 mt-1 text-xs flex-grow">
                {post.desc}
              </p>

              {/* Button */}
              <button
                className="mt-3 px-3 py-1.5 bg-[#e99b63] text-black font-semibold
                  rounded-md flex items-center gap-1.5 hover:bg-[#ffca9a] transition w-fit text-sm"
              >
                Read More <i className="bx bx-right-arrow-alt text-sm"></i>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FULLSCREEN MODAL */}
      {activePost && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center p-4 z-[9999] transition-all duration-300 ease-out animate-[fadeIn_0.3s_ease-out]">
          <div className="bg-[#1a1a1a] max-w-3xl w-full rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] border border-[#e99b63] shadow-[0_0_30px_rgba(233,155,99,0.3)] transform animate-[zoomIn_0.35s_ease-out_forwards]">
            {/* Close */}
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-red-400"
              onClick={() => setActivePost(null)}
            >
              ✕
            </button>

            {/* Image */}
            {activePost.image && (
              <img
                src={activePost.image}
                alt={activePost.title}
                className="rounded-xl mb-6 w-full"
              />
            )}

            {/* Title */}
            <h2 className="text-2xl font-bold text-[#e99b63] mb-4">
              {activePost.title}
            </h2>

            {/* Full Content */}
            <div className="text-gray-300 whitespace-pre-line leading-relaxed text-[15.5px]">
              {activePost.fullContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
