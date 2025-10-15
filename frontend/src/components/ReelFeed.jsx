import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ReelFeed = ({
  items = [],
  onLike,
  onSave,
  onAddToCart,
  likedVideos,
  savedVideos,
  emptyMessage = "No videos yet.",
}) => {
  const videoRefs = useRef(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          if (!(video instanceof HTMLVideoElement)) return;
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    );

    videoRefs.current.forEach((vid) => observer.observe(vid));
    return () => observer.disconnect();
  }, [items]);

  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

  const heartIcons = [
    // liked (filled)
    <svg
      key="filled-heart"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="red"
      stroke="red"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>,

    // unliked (empty)
    <svg
      key="empty-heart"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>,
  ];

  const bookmarkIcons = [
    // saved (filled)
    <svg
      key="filled-bookmark"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="white"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>,

    // unsaved (empty)
    <svg
      key="empty-bookmark"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
    </svg>,
  ];

  return (
    <div className="w-full h-screen bg-black">
      {items.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      )}

      {items.map((item) => (
        <section
          key={item._id}
          className="relative w-full h-screen"
          role="listitem"
        >
          <video
            ref={setVideoRef(item._id)}
            src={item.videos}
            muted
            playsInline
            loop
            preload="metadata"
            className="w-full h-full object-cover"
          />

          {/* Right-side actions */}
          <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
            {/* Like */}
            <div className="flex flex-col items-center">
              <button
                onClick={onLike ? () => onLike(item) : undefined}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30"
                aria-label="Like"
              >
                {Array.isArray(likedVideos) && likedVideos.includes(item._id)
                  ? heartIcons[0]
                  : heartIcons[1]}
              </button>
              <span className="text-white text-sm mt-1">
                {item.likeCount ?? item.likesCount ?? item.likes ?? 0}
              </span>
            </div>

            {/* Save */}
            <div className="flex flex-col items-center">
              <button
                onClick={onSave ? () => onSave(item) : undefined}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30"
                aria-label="Bookmark"
              >
                {Array.isArray(savedVideos) && savedVideos.includes(item._id)
                  ? bookmarkIcons[0]
                  : bookmarkIcons[1]}
              </button>
              <span className="text-white text-sm mt-1">
                {item.saveCount ?? item.bookmarks ?? item.saves ?? 0}
              </span>
            </div>

            {/* Add to cart */}
            <div className="flex flex-col items-center">
              <button
                onClick={onAddToCart ? () => onAddToCart(item) : undefined}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30"
                aria-label="Add to cart"
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 6h15l-1.5 9h-13z" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                </svg>
              </button>
              <span className="text-white text-sm mt-1">Add to cart</span>
            </div>
          </div>

          {/* Bottom-left description and store button */}
          <div className="absolute left-4 bottom-20 flex flex-col space-y-2 max-w-[80%]">
            <p className="text-white text-sm pl-2 break-words line-clamp-2">
              {item.description}
            </p>
            {item.foodPartner && (
              <Link
                to={`/food-partner/${item.foodPartner}`}
                className="self-start bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600 transition duration-200 whitespace-nowrap"
                aria-label="Visit store"
              >
                Visit store
              </Link>
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default ReelFeed;
