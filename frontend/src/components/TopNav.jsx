import React from 'react'
import { NavLink } from 'react-router-dom'
import logoutIcon from '../assets/logout.svg'
import cartIcon from '../assets/cart.svg'

const TopNav = () => {
  return (
    <nav className="fixed top-0 w-full bg-black/50 backdrop-blur-md shadow-b border-b border-white/20 z-20">
      <div className="flex justify-around items-center h-16 relative z-10">
        <NavLink
          to="/logout"
          className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? 'text-blue-400' : 'text-white/70'}`}
        >
          <img
            src={logoutIcon}
            alt="Logout"
            className="w-6 h-6 mb-1 invert"
          />
          <span className="text-xs">Logout</span>
        </NavLink>

        <NavLink
          to="/cart"
          className={({ isActive }) => `flex flex-col items-center justify-center ${isActive ? 'text-blue-400' : 'text-white/70'}`}
        >
          <img
            src={cartIcon}
            alt="Cart"
            className="w-6 h-6 mb-1 invert"
          />
          <span className="text-xs">Cart</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default TopNav
