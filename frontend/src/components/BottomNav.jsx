import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom'
import logoutIcon from "../assets/logout.svg";
import cartIcon from "../assets/cart.svg";
import axios from 'axios'

const BottomNav = () => {
  const navigate = useNavigate()
   
  const handleLogout = async () => {

    try {
      await axios.post('http://localhost:3000/api/auth/user/logout',{
        withCredentials: true
      })

      navigate('/user/login')
    } catch (error) {
      console.log("Logout failed:", error);
    }
  }

  const handleCart = async () => {
    try {
      await axios.get('http://localhost:3000/api/cart',{
        withCredentials: true
      })

      navigate('/cart')
    } catch (error) {
      console.log('Cart cannot open: ',error)
    }
  }

  return (
    <nav className="fixed bottom-0 w-full bg-black/50 backdrop-blur-md shadow-t border-t border-white/20 z-20">
      <div className="flex justify-around items-center h-16 relative z-10">
        <button
                  onClick={handleLogout}
                  className="flex flex-col items-center justify-center text-white/70"
                >
                  <img src={logoutIcon} alt="Logout" className="w-6 h-6 mb-1 invert" />
                  <span className="text-xs">Logout</span>
                </button>
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

        <NavLink
          to="/cart"
          className={({ isActive }) =>
            `flex flex-col items-center justify-center ${
              isActive ? "text-blue-400" : "text-white/70"
            }`
          }
        >
          <img src={cartIcon} alt="Cart" className="w-6 h-6 mb-1 invert" />
          <span className="text-xs">Cart</span>
        </NavLink>
      </div>
    </nav>
  )
}

export default BottomNav