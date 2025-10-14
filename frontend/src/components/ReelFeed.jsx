import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }

  return (
    <div className="w-full h-screen overflow-hidden bg-black">
      {items.length === 0 && (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-gray-500 text-lg">{emptyMessage}</p>
        </div>
      )}

      {items.map((item) => (
        <section key={item._id} className="relative w-full h-screen" role="listitem">
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
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                </svg>
              </button>
              <span className="text-white text-sm mt-1">{item.likeCount ?? item.likesCount ?? item.likes ?? 0}</span>
            </div>

            {/* Save */}
            <div className="flex flex-col items-center">
              <button
                onClick={onSave ? () => onSave(item) : undefined}
                className="p-3 rounded-full bg-white/20 hover:bg-white/30"
                aria-label="Bookmark"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                </svg>
              </button>
              <span className="text-white text-sm mt-1">{item.saveCount ?? item.bookmarks ?? item.saves ?? 0}</span>
            </div>

            {/* Comments */}
            <div className="flex flex-col items-center">
              <button className="p-3 rounded-full bg-white/20 hover:bg-white/30" aria-label="Comments">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
                </svg>
              </button>
              <span className="text-white text-sm mt-1">{item.commentsCount ?? (Array.isArray(item.comments) ? item.comments.length : 0)}</span>
            </div>
          </div>

          {/* Bottom-left description and store button */}
          <div className="absolute left-4 bottom-20 flex flex-col space-y-2 max-w-xs">
            <p className="text-white text-sm pl-2" title={item.description}>{item.description}</p>
            {item.foodPartner && (
              <Link to={`/food-partner/${item.foodPartner}`} className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600 transition duration-200" aria-label="Visit store">Visit store</Link>
            )}
          </div>
        </section>
      ))}
    </div>
  )
}

export default ReelFeed