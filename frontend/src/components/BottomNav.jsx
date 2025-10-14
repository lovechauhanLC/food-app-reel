import React from 'react'
import { NavLink } from 'react-router-dom'

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 w-full bg-black/50 backdrop-blur-md shadow-t border-t border-white/20 z-20">
      <div className="flex justify-around items-center h-16 relative z-10">
        <NavLink
          to="/"
          end
          className={({ isActive }) => `flex flex-col items-center justify-center text-white ${isActive ? 'text-blue-400' : 'text-white/70'}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 10.5 12 3l9 7.5"/>
            <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
          </svg>
          <span className="text-xs mt-1">Home</span>
        </NavLink>

        <NavLink
          to="/saved"
          className={({ isActive }) => `flex flex-col items-center justify-center text-white ${isActive ? 'text-blue-400' : 'text-white/70'}`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
          </svg>
          <span className="text-xs mt-1">Saved</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav